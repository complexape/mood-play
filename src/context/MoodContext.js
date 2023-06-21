import React, {createContext, useContext, useEffect, useState} from 'react'
import styled from 'styled-components';
import { COOLDOWN_SECONDS, EMOTIONS } from '../constants';
import { SpotifyAuthContext } from './SpotifyAuthContext';
import { changeSong } from '../middleware/spotify';

const DEFAULT_MOOD = "neutral";

const GradientDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(45deg, ${(props) => props.mood.primaryColor} 20%, ${(props) => props.mood.secondaryColor});
    background-size: cover;
    background-attachment: fixed;
    opacity: ${(props) => (props.mood.value === DEFAULT_MOOD) ? 1 : 0};
    transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    -webkit-transition: all 1.5s ease;
    z-index: -10;
`;

const shuffleRandomNext = (size, exc = -1) => {
    let ret = exc;
    while (ret === exc) {
        ret = Math.floor(Math.random() * size);
    }
    return ret;
}

export const MoodContext = createContext(null);

export const MoodContextProvider = ({ children }) => {
    const { playlists } = useContext(SpotifyAuthContext);

    const [mood, setMood] = useState(EMOTIONS[DEFAULT_MOOD]);
    const [lastChanged, setLastChanged] = useState(0);

    const [shuffle, setShuffle] = useState(false);
    const [songIndex, setSongIndex] = useState(0);

    const changeMood = (newMood) => {
        const date = new Date();
        const timeDiffSeconds = (date.getTime() - lastChanged) / 1000;
        if (timeDiffSeconds < COOLDOWN_SECONDS) {
            alert(`Cooldown: Please try again in ${Math.ceil(COOLDOWN_SECONDS - timeDiffSeconds)} seconds!`)
            return;
        }

        Object.values(EMOTIONS).map((mood) => {
            const gradientDiv = document.getElementById(`gradient-div-${mood.value}`)
            gradientDiv.style.opacity = (mood.value === newMood) ? 1 : 0;  
        })

        const playlistSize = playlists[newMood].songs.length;
        const newSongIndex = shuffle ? shuffleRandomNext(playlistSize) : 0;
        changeSong(playlists[newMood].songs[newSongIndex]);
        setLastChanged(date.getTime());
        setMood(EMOTIONS[newMood]);
        setSongIndex(newSongIndex);
    }

    useEffect(() => {
        const handleNextSong = (event) => {
            const playlistSize = playlists[mood.value].songs.length;
            const nextSongIndex = shuffle ? 
                shuffleRandomNext(playlistSize, songIndex) : 
                (songIndex + 1) % playlistSize;
            
            changeSong(playlists[mood.value].songs[nextSongIndex]);
            setSongIndex(nextSongIndex);
        }

        document.addEventListener('next-song', handleNextSong);
        return () => {
            document.removeEventListener('next-song', handleNextSong)
        };
    }, [mood, shuffle, songIndex, playlists]);

    const value = {
        mood,
        changeMood,
        shuffle,
        setShuffle,
    };

    return (
        <>  
            <MoodContext.Provider value={value}>{children}</MoodContext.Provider>
            <div>
                {Object.values(EMOTIONS).map((emotion) => (
                    <GradientDiv
                        key={emotion.value} 
                        mood={emotion} 
                        id={`gradient-div-${emotion.value}`}
                    />
                ))}
            </div>
        </>
    )
}