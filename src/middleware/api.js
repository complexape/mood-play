import axios from 'axios';
import { EMOTION_URL, TIRED_URL } from '../constants';

export const getEmotionPredictions = (emotionData) => {
    // remove base64 prefix
    emotionData = emotionData.substring(emotionData.indexOf(',') + 1);
    return axios.post(EMOTION_URL, {imgData: emotionData});
}

export const getTiredPrediction = (tiredData) => {
    // remove base64 prefix
    tiredData = tiredData.substring(tiredData.indexOf(',') + 1);
    return axios.post(TIRED_URL, {imgData: tiredData});
}