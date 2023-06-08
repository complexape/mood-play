import axios from 'axios';
import { EMOTIONURL, TIREDURL } from '../constants';

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