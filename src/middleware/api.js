import axios from 'axios';
import * as faceapi from 'face-api.js';

const EYE_RESOLUTION = 64;
const FACE_RESOLUTION = 48;

const EMOTIONURL = "";
const TIREDURL = "";

const EYE_THRESHOLD = 0.5;
const NEUTRAL_MULTIPLIER = 0.5;
const TIRED_EMOTIONS = ["neutral", "sad"];


const cropImage = (img, width, height, x, y) => {
    const maxDimension = Math.max(width, height);

    const imageCanvas = document.createElement('canvas');
    const ctx = imageCanvas.getContext('2d');
    imageCanvas.width = maxDimension;
    imageCanvas.height = maxDimension;
    const offsetX = (maxDimension - width) / 2;
    const offsetY = (maxDimension - height) / 2;

    ctx.drawImage(img, x, y, width, height, offsetX, offsetY, width, height);
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
        faceDetection.detection.box.y
    );
    const faceBase64 = await reduceResolution(croppedFace.toDataURL(), FACE_RESOLUTION);
    // console.log(faceBase64);
    
    const croppedRightEye = cropImage(
        image,
        faceDetection.landmarks.getRightEye()[3].x - faceDetection.landmarks.getRightEye()[0].x,
        faceDetection.landmarks.getRightEye()[4].x - faceDetection.landmarks.getRightEye()[1].x,
        faceDetection.landmarks.getRightEye()[0].x,
        faceDetection.landmarks.getRightEye()[1].y
    )
    const rightEyeBase64 = await reduceResolution(croppedRightEye.toDataURL(), EYE_RESOLUTION);

    const croppedLeftEye = cropImage(
        image,
        faceDetection.landmarks.getLeftEye()[3].x - faceDetection.landmarks.getLeftEye()[0].x,
        faceDetection.landmarks.getLeftEye()[4].x - faceDetection.landmarks.getLeftEye()[1].x,
        faceDetection.landmarks.getLeftEye()[0].x,
        faceDetection.landmarks.getLeftEye()[1].y
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