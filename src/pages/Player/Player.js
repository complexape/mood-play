import React, { useCallback, useRef, useState, useEffect, useContext } from 'react';
import Webcam from 'react-webcam';

import { predictScreenshot } from './PlayerUtils';
import './Player.css';
import Header from '../../components/Header';
import { MoodContext } from '../../context/MoodContext';
import { Button, ButtonContainer } from '../../components/Button';
import SelectDropdown from '../../components/SelectDropdown';
import MoodSelect from './MoodSelect';

const Player = (props) => {
    const webcamRef = useRef(null)
    const {
        mood, 
        changeMood, 
        shuffle, 
        setShuffle, 
    } = useContext(MoodContext);

    const [imgSrc, setImgSrc] = useState(null);
    const [showImgSrc, setShowImgSrc] = useState(false);
    const [updateInterval, setUpdateInterval] = useState(300000);

    const updateMood = useCallback(async () => {
        const screenshotSrc = webcamRef.current.getScreenshot();
        if (!screenshotSrc) {
            console.log("No webcam.")
            return;
        }
        setImgSrc(screenshotSrc);
        const newMood = await predictScreenshot(screenshotSrc);
        if (!newMood) {
            return;
        }
        // var emotionOptions = ["neutral", "tired", "happy", "sad", "angry", "surprise", "disgust", "fear"];
        // const newMood = emotionOptions[Math.floor(Math.random() * emotionOptions.length)];
        changeMood(newMood);
    }, [])

    const intervalOptions = [
        { label: '2 Minutes', value: 120000 },
        { label: '5 Minutes', value: 300000 },
        { label: '15 Minutes', value: 900000 },
        { label: '30 Minutes', value: 1800000 },
    ];

    useEffect(() => {
        const interval = setInterval(updateMood, updateInterval);
        return () => clearInterval(interval);
    }, [updateInterval]);

    return (
        <>
            <Header>MoodPlay</Header>
            <Header> Current Mood: {mood.display} </Header>
            <MoodSelect/>
            <ButtonContainer>
                <Button onClick={() => {setShuffle(!shuffle)}}>
                        {shuffle ? "Disable" : "Enable"} Shuffle
                </Button>
                <Button onClick={updateMood}>Detect Mood!</Button>
                <Button onClick={() => {setShowImgSrc(!showImgSrc)}}>
                    {showImgSrc ? "Hide" : "Show"} Screenshot Image
                </Button>
            </ButtonContainer>
            <SelectDropdown
                options={intervalOptions}
                state={updateInterval}
                setState={setUpdateInterval}
            >
                Automatically detect your mood every:
            </SelectDropdown>
            <Webcam
                ref = {webcamRef}
                audio = {false}
                screenshotFormat='image/jpeg'
                onUserMedia={(e) => { console.log(e); }}
            />
            {imgSrc && showImgSrc && (
                <div>
                    <img src={imgSrc} alt="Screenshot"/>
                </div>
            )}
        </>
    );
};
export default Player;