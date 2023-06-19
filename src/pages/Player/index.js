import React, { useCallback, useRef, useState, useEffect, useContext } from 'react';

import { predictScreenshots } from './PlayerUtils';
import Header from '../../components/Header';
import { MoodContext } from '../../context/MoodContext';
import { Button, ButtonContainer } from '../../components/Button';
import SelectDropdown from '../../components/SelectDropdown';
import MoodSelect from './MoodSelect';
import WebcamDisplay from '../../components/WebcamDisplay';
import { NUM_PHOTOS, PHOTOS_DELAY_MS } from '../../constants/DetectionConstants';

const Player = () => {
    const webcamRef = useRef(null)
    const {
        mood, 
        changeMood, 
        shuffle, 
        setShuffle, 
    } = useContext(MoodContext);

    const [showWebcam, setShowWebcam] = useState(false);
    const [updateInterval, setUpdateInterval] = useState(300000);
    const [moodLoading, setMoodLoading] = useState(false);

    const updateMood = useCallback(async () => {
        if (!webcamRef.current.state.hasUserMedia) {
            alert("No Webcam Found!");
            return;
        }

        const timer = ms => new Promise(res => setTimeout(res, ms))

        setMoodLoading(true);
        let screenshots = [];   
        for (let i = 0; i < NUM_PHOTOS; i++) {
            const screenshot = webcamRef.current.getScreenshot();
            screenshots.push(screenshot);
            await timer(PHOTOS_DELAY_MS);
        }
        // var emotionOptions = ["neutral", "tired", "happy", "sad", "angry", "surprise", "disgust", "fear"];
        // const newMood = emotionOptions[Math.floor(Math.random() * emotionOptions.length)];
        const newMood = await predictScreenshots(screenshots);
        if (newMood) {
            changeMood(newMood);
        }
        setMoodLoading(false);
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
            <Header> Current Mood: {mood.display} </Header>
            <MoodSelect/>
            <ButtonContainer>
                <Button 
                    onClick={() => {setShuffle(!shuffle)}}
                    toggle={shuffle ? 1 : 0}
                >
                    Shuffle: {shuffle ? "✔️" : "❌"}
                </Button>
                <Button 
                    onClick={updateMood} 
                    buttonDisabled={moodLoading}
                >
                    {moodLoading ? <i className="fa fa-refresh fa-spin"></i> : "Detect Mood!"}
                </Button>
                <Button 
                    onClick={() => {setShowWebcam(!showWebcam)}}
                    toggle={showWebcam ? 1 : 0}
                >
                    {showWebcam ? "Hide" : "Show"} Webcam
                </Button>
            </ButtonContainer>
            <SelectDropdown
                options={intervalOptions}
                state={updateInterval}
                setState={setUpdateInterval}
            >
                Automatically detect your mood every:
            </SelectDropdown>
            <WebcamDisplay
                ref={webcamRef}
                show={showWebcam && webcamRef.current.state.hasUserMedia ? 1 : 0}
            />
        </>
    );
};

export default Player;