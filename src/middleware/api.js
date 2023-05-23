import axios from 'axios';
import * as faceapi from 'face-api.js';

const EYE_RESOLUTION = 64;
const FACE_RESOLUTION = 48;

const EMOTIONURL = "";
const TIREDURL = "";

const EYE_THRESHOLD = 0.5;
const NEUTRAL_MULTIPLIER = 0.5;
const TIRED_EMOTIONS = ["neutral", "sad"];

const EYE_OFFSET = 0.015;
const FACE_OFFSET = 0;

const cropImage = (img, width, height, x, y, offset_factor) => {
    width = height = Math.max(width, height)
    width > height ? y -= width - height : x -= height - width;

    const offset = parseInt(offset_factor * Math.min(img.width, img.height));
    x = Math.max(0, x - offset);
    y = Math.max(0, y - offset);
    width = Math.min(width + 2 * offset, img.width - x);
    height = Math.min(height + 2 * offset, img.height - y);

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

const cropFaceAndEyes = async (base64Image) => {
    await faceapi.loadSsdMobilenetv1Model('/models');
    await faceapi.loadFaceLandmarkModel('/models');

    const image = await faceapi.fetchImage(base64Image);

    // Detect faces in the image
    const faceDetection = await faceapi.detectSingleFace(image).withFaceLandmarks();

    if (!faceDetection) {
        console.log("No Detections Found");
        return [];
    }

    const croppedFace = cropImage(
        image, 
        faceDetection.detection.box.width, 
        faceDetection.detection.box.height,
        faceDetection.detection.box.x,
        faceDetection.detection.box.y,
        FACE_OFFSET
    );
    const faceBase64 = await reduceResolution(croppedFace.toDataURL(), FACE_RESOLUTION);
    // console.log(faceBase64);
    
    const croppedRightEye = cropImage(
        image,
        faceDetection.landmarks.getRightEye()[3].x - faceDetection.landmarks.getRightEye()[0].x,
        faceDetection.landmarks.getRightEye()[4].x - faceDetection.landmarks.getRightEye()[1].x,
        faceDetection.landmarks.getRightEye()[0].x,
        faceDetection.landmarks.getRightEye()[1].y,
        EYE_OFFSET
    )
    const rightEyeBase64 = await reduceResolution(croppedRightEye.toDataURL(), EYE_RESOLUTION);

    const croppedLeftEye = cropImage(
        image,
        faceDetection.landmarks.getLeftEye()[3].x - faceDetection.landmarks.getLeftEye()[0].x,
        faceDetection.landmarks.getLeftEye()[4].x - faceDetection.landmarks.getLeftEye()[1].x,
        faceDetection.landmarks.getLeftEye()[0].x,
        faceDetection.landmarks.getLeftEye()[1].y,
        EYE_OFFSET
    )
    const leftEyeBase64 = await reduceResolution(croppedLeftEye.toDataURL(),  EYE_RESOLUTION);
    
    return [faceBase64, leftEyeBase64, rightEyeBase64];
}

const getEmotionPredictions = (emotionData) => {
    axios.post(EMOTIONURL, {data: emotionData})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
}

const getTiredPrediction = (tiredData) => {
    axios.post(TIREDURL, {data: tiredData})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
}
// returns emotion predicted or null if no face found
const predictScreenshot = async (screenshotSrc) => {
    const base64Images = await cropFaceAndEyes(screenshotSrc);
    if (!base64Images) {
        return null;
    }
    const [faceData, leftEyeData, rightEyeData] = base64Images;

    console.log(faceData);
    console.log(leftEyeData);
    console.log(rightEyeData);

    // let emotionPredictions = getEmotionPredictions(faceData);
    // emotionPredictions[6] = emotionPredictions[6] * NEUTRAL_MULTIPLIER;
    
    // let maxEmotion = "";
    // let maxValue = 0;
    // for(const [emotion, value] of Object.entries(emotionPredictions)) {
    //     if(value > maxValue) {
    //         maxValue = value;
    //         maxEmotion = emotion;
    //     }
    // }

    // let tiredPrediction = getTiredPrediction(leftEyeData) > EYE_THRESHOLD;
    // tiredPrediction &= getTiredPrediction(rightEyeData) > EYE_THRESHOLD;

    // console.log(emotionPredictions);
    // console.log(tiredPrediction);
    
    // let result = maxEmotion;
    // if (TIRED_EMOTIONS.includes(maxEmotion) && tiredPrediction) {
    //     result = "tired";
    // }
    // return result;
    return "1";
}

export default predictScreenshot;