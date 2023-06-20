import { faceapi } from '../../middleware/FaceApi';
import { getTiredPrediction, getEmotionPredictions } from '../../middleware/api';
import {
    EYE_RESOLUTION,
    FACE_RESOLUTION,
    EYE_THRESHOLD,
    EYE_MARGIN,
    FACE_MARGIN,
    SOFT_EYE_THRESHOLD,
    TIRED_EMOTIONS
} from '../../constants/DetectionConstants'

const cropImage = (img, width, height, x, y, margin_factor) => {
    // Resize image to square
    width = height = Math.max(width, height)
    width > height ? y -= width - height : x -= height - width;

    // Apply margins on a sides
    const margin = parseInt(margin_factor * Math.min(img.width, img.height));
    x = Math.max(0, x - margin);
    y = Math.max(0, y - margin);
    width = Math.min(width + 2 * margin, img.width - x);
    height = Math.min(height + 2 * margin, img.height - y);

    const imageCanvas = document.createElement('canvas');
    const ctx = imageCanvas.getContext('2d');
    imageCanvas.width = width;
    imageCanvas.height = height;

    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
    return imageCanvas;
}

const reduceResolution = (base64Data, targetSize) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = targetSize;
            canvas.height = targetSize;
            ctx.drawImage(img, 0, 0, targetSize, targetSize);
            resolve(canvas.toDataURL());
        };
        img.onerror = reject;
        img.src = base64Data;
    });
};

const extractFaceAndEyes = async (base64Image) => {
    const image = await faceapi.fetchImage(base64Image);

    // Detect faces in the image
    const faceDetection = await faceapi.detectSingleFace(image).withFaceLandmarks();
    if (!faceDetection) {
        return null;
    }

    const croppedFace = cropImage(
        image, 
        faceDetection.detection.box.width, 
        faceDetection.detection.box.height,
        faceDetection.detection.box.x,
        faceDetection.detection.box.y,
        FACE_MARGIN
    );
    const faceBase64 = await reduceResolution(croppedFace.toDataURL(), FACE_RESOLUTION);
    
    const croppedRightEye = cropImage(
        image,
        faceDetection.landmarks.getRightEye()[3].x - faceDetection.landmarks.getRightEye()[0].x,
        faceDetection.landmarks.getRightEye()[4].x - faceDetection.landmarks.getRightEye()[1].x,
        faceDetection.landmarks.getRightEye()[0].x,
        faceDetection.landmarks.getRightEye()[1].y,
        EYE_MARGIN
    )
    const rightEyeBase64 = await reduceResolution(croppedRightEye.toDataURL(), EYE_RESOLUTION);

    const croppedLeftEye = cropImage(
        image,
        faceDetection.landmarks.getLeftEye()[3].x - faceDetection.landmarks.getLeftEye()[0].x,
        faceDetection.landmarks.getLeftEye()[4].x - faceDetection.landmarks.getLeftEye()[1].x,
        faceDetection.landmarks.getLeftEye()[0].x,
        faceDetection.landmarks.getLeftEye()[1].y,
        EYE_MARGIN
    )
    const leftEyeBase64 = await reduceResolution(croppedLeftEye.toDataURL(),  EYE_RESOLUTION);
    
    return [faceBase64, leftEyeBase64, rightEyeBase64];
}

export const predictScreenshots = async (screenshots) => {
    let [isAsleep, isTired] = [true, true];
    let moodPredictions = {
        "neutral": 1,
        "happy": 1,
        "sad": 1,
        "angry": 1,
        "surprise": 1,
        "disgust": 1,
        "fear": 1
    };
  
    await Promise.all(screenshots.map(async (screenshot) => {
        const base64Images = await extractFaceAndEyes(screenshot);
        if (!base64Images) {
            return;
        }
        const [faceData, leftEyeData, rightEyeData] = base64Images;

        const responses = await Promise.all([
            getEmotionPredictions(faceData),
            getTiredPrediction(leftEyeData),
            getTiredPrediction(rightEyeData)
        ]);
        const [emotionPredictions, leftEyePrediction, rightEyePrediction] = responses.map(
            (response) => response.data
        );

        Object.entries(emotionPredictions).forEach(([emotion, value]) => {
            moodPredictions[emotion] *= value;
        });

        isAsleep &= leftEyePrediction["closed_eye"] > EYE_THRESHOLD && rightEyePrediction["closed_eye"] > EYE_THRESHOLD;
        isTired &= leftEyePrediction["closed_eye"] > SOFT_EYE_THRESHOLD && rightEyePrediction["closed_eye"] > SOFT_EYE_THRESHOLD;
    }));
        
    let maxEmotion = "neutral";
    Object.entries(moodPredictions).forEach(([emotion, pred]) => {
        if (pred > moodPredictions[maxEmotion]) {
            maxEmotion = emotion;
        }
    });
    
    isAsleep &= TIRED_EMOTIONS.includes(maxEmotion);

    return isTired || isAsleep ? "tired" : maxEmotion;
  };