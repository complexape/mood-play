import React, { useCallback, useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

import { displayMoodText, predictScreenshot, shuffleRandomNext } from './PlayerUtils';
import './Player.css';
import Header from '../../components/Header';
import { SONGS } from '../../constants';

// in milliseconds
const updateInterval = 10000;

const Player = () => {
    const webcamRef = useRef(null)

    const [mood, setMood] = useState('neutral');
    const [imgSrc, setImgSrc] = useState(null);
    const [showImgSrc, setShowImgSrc] = useState(true);
    const [shuffle, setShuffle] = useState(false);
    const [songIndex, setSongIndex] = useState(0);

    const changeSong = (newSongURI) => {
        console.log(newSongURI);
        const embedContainer = document.getElementById('spotify-iframe-container');
        embedContainer.setAttribute('data-songURI', newSongURI)
        setTimeout(() => {
            const event = new CustomEvent("change-song");
            document.dispatchEvent(event);
        });
    }

    const updateMood = useCallback(async () => {
        const screenshotSrc = webcamRef.current.getScreenshot();
        if (!screenshotSrc) {
            console.log("No webcam.")
            return;
        }
        setImgSrc(screenshotSrc);
        const newMood = await predictScreenshot(screenshotSrc);

        if (!newMood) {
            console.log("No face detected.")
            return;
        }
        if (newMood === mood) {
            return;
        }
        
        const playlistSize = SONGS[newMood].length;
        const newSongIndex = shuffle ? shuffleRandomNext(playlistSize) : 0;
        console.log(playlistSize);
        changeSong(SONGS[newMood][songIndex]);
        setMood(newMood);
        setSongIndex(newSongIndex);
    }, [mood, shuffle, songIndex])

    const handleNextSong = (event) => {
        const playlistSize = SONGS[mood].length;
        const nextSongIndex = shuffle ? 
            shuffleRandomNext(playlistSize, songIndex) : 
            (songIndex + 1) % playlistSize;
        
        console.log("NEXT SONG", songIndex, nextSongIndex);
        changeSong(SONGS[mood][nextSongIndex]);
        setSongIndex(nextSongIndex);
    }

    useEffect(() => {
        document.addEventListener('next-song', handleNextSong);
        return () => {
            document.removeEventListener('next-song', handleNextSong)
        };
    }, [mood, shuffle, songIndex]);

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