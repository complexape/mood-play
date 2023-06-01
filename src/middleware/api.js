import axios from 'axios';

const EMOTIONURL = "https://mood-detection-api.vercel.app/api/predict-emotion";
const TIREDURL = "https://mood-detection-api.vercel.app/api/predict-tired";

export const getEmotionPredictions = (emotionData) => {
    // remove base64 prefix
    emotionData = emotionData.substring(emotionData.indexOf(',') + 1);
    return axios.post(EMOTIONURL, {imgData: emotionData});
}

export const getTiredPrediction = (tiredData) => {
    // remove base64 prefix
    tiredData = tiredData.substring(tiredData.indexOf(',') + 1);
    return axios.post(TIREDURL, {imgData: tiredData});
}