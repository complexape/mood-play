import axios from 'axios';
import * as faceapi from 'face-api.js';

const EYE_RESOLUTION = 64;
const FACE_RESOLUTION = 48;

const EMOTIONURL = "https://mood-detector-api.vercel.app/api/predict-emotion";
const TIREDURL = "https://mood-detector-api.vercel.app/api/predict-tired";

const EYE_THRESHOLD = 0.999;
const TIRED_EMOTIONS = ["neutral", "sad"];

const EYE_OFFSET = 0.04;
const FACE_OFFSET = -0.03;

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
    // remove base64 prefix
    emotionData = emotionData.substring(emotionData.indexOf(',') + 1);

    return axios.post(EMOTIONURL, {imgData: emotionData});
}

const getTiredPrediction = (tiredData) => {
    // remove base64 prefix
    tiredData = tiredData.substring(tiredData.indexOf(',') + 1);

    return axios.post(TIREDURL, {imgData: tiredData});
}
// returns emotion predicted or null if no face found
const predictScreenshot = async (screenshotSrc) => {
    const base64Images = await cropFaceAndEyes(screenshotSrc);
    if (!base64Images) {
        return null;
    }
    const [faceData, leftEyeData, rightEyeData] = base64Images;
    const [emotionPredictions, leftEyePrediction, rightEyePrediction] = await Promise.all([
        getEmotionPredictions(faceData),
        getTiredPrediction(leftEyeData),
        getTiredPrediction(rightEyeData)
    ]);

    console.log(faceData);
    console.log(leftEyeData);
    console.log(rightEyeData);
    console.log(emotionPredictions.data);
    console.log(leftEyePrediction.data);
    console.log(rightEyePrediction.data);

    
    let [maxEmotion, maxValue] = ["", 0];
    for (const [emotion, value] of Object.entries(emotionPredictions.data)) {
        if (value > maxValue) {
            maxValue = value;
            maxEmotion = emotion;
        }
    }

    let tiredPrediction = leftEyePrediction.data["closed_eye"] > EYE_THRESHOLD;
    tiredPrediction &= rightEyePrediction.data["closed_eye"] > EYE_THRESHOLD;
    
    const result = tiredPrediction && TIRED_EMOTIONS.includes(maxEmotion) ? "tired" : maxEmotion;
    return result;
}

export default predictScreenshot;