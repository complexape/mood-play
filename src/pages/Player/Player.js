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
    const [shuffle, setShuffle] = useState(false);

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
            return;
        }
        handleMoodChange(mood);
    }, [webcamRef])

    const changeSong = (newSongURI) => {
        const embedContainer = document.getElementById('spotify-iframe-container');
        embedContainer.setAttribute('data-songURI', newSongURI)
        const event = new CustomEvent("change-song");
        document.dispatchEvent(event);
    }

    const handleMoodChange = (mood) => {
        setMood(mood);
        // get new song from new mood playlist
        // changeSong();
    }

    useEffect(() => {
        window.addEventListener('next-song', (event) => {
            // get next song in current mood playlist
            // changeSong();
        });
    })

    // useEffect(() => {
    //     const interval = setInterval(updateMood, updateInterval);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <>
            <Header>MoodPlay</Header>
            <Header> Current Mood: {displayMoodText(mood)} </Header>

            <button onClick={updateMood}>Update Mood</button>
            <button onClick={() => {setShowImgSrc(!showImgSrc)}}>
                {imgSrc ? "Hide" : "Show"} Screenshot Image
            </button>
            <button onClick={() => {setShuffle(!shuffle)}}>
                {shuffle ? "Disable" : "Enable"} Shuffle
            </button>

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