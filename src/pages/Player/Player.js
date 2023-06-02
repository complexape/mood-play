import React, { useCallback, useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { displayMoodText, predictScreenshot } from './PlayerUtils';
import './Player.css';
import Header from '../../components/Header';

// in milliseconds
const updateInterval = 10000;

const Player = () => {
    const webcamRef = useRef(null)

    const [mood, setMood] = useState('neutral');
    const [imgSrc, setImgSrc] = useState(null);
    const [showImgSrc, setShowImgSrc] = useState(true);

    const updateMood = useCallback(async () => {
        const screenshotSrc = webcamRef.current.getScreenshot();
        if (!screenshotSrc) {
            console.log("No webcam.")
            return;
        }
        setImgSrc(screenshotSrc);
        const mood = await predictScreenshot(screenshotSrc);
        if (!mood) {
            console.log("No face detected.")
        }
        setMood(mood);
    }, [webcamRef])

    // useEffect(() => {
    //     const interval = setInterval(updateMood, updateInterval);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <>
            <Header>MoodPlay</Header>
            <Header> Current Mood: {displayMoodText(mood)} </Header>

            <button onClick={updateMood}>Update Mood</button>
            <button onClick={() => {setShowImgSrc(!showImgSrc)}}>Toggle Screenshot Image</button>

            <Webcam
                ref = {webcamRef}
                audio = {false}
                screenshotFormat='image/jpeg'
                onUserMedia={(e) => { console.log(e); }}
            />
            <div>
                <h2>Playing mood: {mood}</h2>
            </div>
            {imgSrc && showImgSrc && (
                <div>
                    <img src={imgSrc} alt="Screenshot"/>
                </div>
            )}
        </>
    );
};

export default Player;