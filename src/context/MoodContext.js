import React, {createContext, useEffect, useState} from 'react'
import styled from 'styled-components';
import { COOLDOWN_SECONDS } from '../constants';
import { SONGS } from '../constants';

export const EMOTIONS = {
    "neutral": {
        value: "neutral",
        display: "Neutral 😶",
        primaryColor: "#E1BBC9",
        secondaryColor: "#BBE1D3",
        waveColorA: "rgba(153, 50, 204, 0.3)",
        waveColorB: "rgba(30, 144, 225, 0.3)",
        waveColorC: "rgba(220, 20, 60, 0.3)",
        textColor: "#1B1F3B"
    },
    "tired": {
        value: "tired",
        display: "Tired 😴",
        primaryColor: "#191D32",
        secondaryColor: "#322E19",
        waveColorA: "rgba(124, 152, 179, 0.3)",
        waveColorB: "rgba(172, 203, 225, 0.3)",
        waveColorC: "rgba(206, 229, 242, 0.3)",
        textColor: "#FFFFF2"
    },
    "happy": {
        value: "happy",
        display: "Happy 😃",
        primaryColor: "#FEC601",
        secondaryColor: "#D11149",
        waveColorA: "rgba(64, 31, 62, 0.3)",
        waveColorB: "rgba(63, 46, 86, 0.3)",
        waveColorC: "rgba(69, 63, 120, 0.3)",
        textColor: "#1B1F3B"
    },
    "sad": {
        value: "sad",
        display: "Sad 😔",
        primaryColor: "#4E4C67",
        secondaryColor: "#65674C",
        waveColorA: "rgba(154, 152, 181, 0.3)",
        waveColorB: "rgba(160, 185, 198, 0.3)",
        waveColorC: "rgba(165, 248, 211, 0.3)",
        textColor: "#FFFFF2"
    },
    "angry": {
        value: "angry",
        display: "Angry 😠",
        primaryColor: "#A62329",
        secondaryColor: "#E5F77D",
        waveColorA: "rgba(54, 17, 52, 0.3)",
        waveColorB: "rgba(243, 145, 160, 0.3)",
        waveColorC: "rgba(237, 230, 242, 0.3)",
        textColor: "#FFFFF2"
    },
    "disgust": {
        value: "disgust",
        display: "Disgusted 🤢",
        primaryColor: "#086375",
        secondaryColor: "#BFAE48",
        waveColorA: "rgba(54, 5, 104, 0.3)",
        waveColorB: "rgba(230, 52, 98, 0.3)",
        waveColorC: "rgba(254, 95, 85, 0.3)",
        textColor: "#FFFFF2"
    },
    "fear": {
        value: "fear",
        display: "Afraid 😨",
        primaryColor: "#897C80",
        secondaryColor: "#7C8985",
        waveColorA: "rgba(115, 0, 113, 0.3)",
        waveColorB: "rgba(25, 25, 35, 0.3)",
        waveColorC: "rgba(251, 254, 249, 0.3)",
        textColor: "#1B1F3B"
    },
    "surprise": {
        value: "surprise",
        display: "Surprised 😮",
        primaryColor: "#C5D86D",
        secondaryColor: "#806DD8",
        waveColorA: "rgba(247, 86, 124, 0.3)",
        waveColorB: "rgba(37, 161, 142, 0.3)",
        waveColorC: "rgba(16, 37, 66, 0.3)",
        textColor: "#1B1F3B"
    },
}

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

const changeSong = (newSongURI) => {
    const embedContainer = document.getElementById('spotify-iframe-container');
    embedContainer.setAttribute('data-songURI', newSongURI)
    setTimeout(() => {
        const event = new CustomEvent("change-song");
        document.dispatchEvent(event);
    });
}

export const MoodContext = createContext(null);

export const MoodContextProvider = ({ children }) => {
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

        const playlistSize = SONGS[newMood].length;
        const newSongIndex = shuffle ? shuffleRandomNext(playlistSize) : 0;
        changeSong(SONGS[newMood][songIndex]);
        setLastChanged(date.getTime());
        setMood(EMOTIONS[newMood]);
        setSongIndex(newSongIndex);
    }

    useEffect(() => {
        const handleNextSong = (event) => {
            const playlistSize = SONGS[mood.value].length;
            const nextSongIndex = shuffle ? 
                shuffleRandomNext(playlistSize, songIndex) : 
                (songIndex + 1) % playlistSize;
            
            changeSong(SONGS[mood.value][nextSongIndex]);
            setSongIndex(nextSongIndex);
        }

        document.addEventListener('next-song', handleNextSong);
        return () => {
            document.removeEventListener('next-song', handleNextSong)
        };
    }, [mood, shuffle, songIndex]);

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