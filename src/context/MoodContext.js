import React, {createContext, useEffect, useState} from 'react'

const EMOTIONS = {
    "neutral": {
        value: "neutral",
        display: "Neutral 😶",
        bgColor: "#E1BBC9",
        waveColorA: "rgba(153, 50, 204, 0.3)",
        waveColorB: "rgba(30, 144, 225, 0.3)",
        waveColorC: "rgba(220, 20, 60, 0.3)",
        textColor: "#1B1F3B"
    },
    "tired": {
        value: "tired",
        display: "Tired 😴",
        bgColor: "#191D32",
        waveColorA: "rgba(153, 50, 204, 0.3)",
        waveColorB: "rgba(30, 144, 225, 0.3)",
        waveColorC: "rgba(220, 20, 60, 0.3)",
        textColor: "#FFFFF2"
    },
    "happy": {
        value: "happy",
        display: "Happy 😃",
        bgColor: "#FEC601",
        waveColorA: "rgba(153, 50, 204, 0.3)",
        waveColorB: "rgba(30, 144, 225, 0.3)",
        waveColorC: "rgba(220, 20, 60, 0.3)",
        textColor: "#1B1F3B"
    },
    "sad": {
        value: "sad",
        display: "Sad 😔",
        bgColor: "#4E4C67",
        waveColorA: "rgba(153, 50, 204, 0.3)",
        waveColorB: "rgba(30, 144, 225, 0.3)",
        waveColorC: "rgba(220, 20, 60, 0.3)",
        textColor: "#FFFFF2"
    },
    "angry": {
        value: "angry",
        display: "Angry 😠",
        bgColor: "#A62329",
        waveColorA: "rgba(153, 50, 204, 0.3)",
        waveColorB: "rgba(30, 144, 225, 0.3)",
        waveColorC: "rgba(220, 20, 60, 0.3)",
        textColor: "#FFFFF2"
    },
    "disgust": {
        value: "disgust",
        display: "Disgust 🤢",
        bgColor: "#086375",
        waveColorA: "rgba(153, 50, 204, 0.3)",
        waveColorB: "rgba(30, 144, 225, 0.3)",
        waveColorC: "rgba(220, 20, 60, 0.3)",
        textColor: "#FFFFF2"
    },
    "fear": {
        value: "fear",
        display: "Fear 😨",
        bgColor: "#897C80",
        waveColorA: "rgba(153, 50, 204, 0.3)",
        waveColorB: "rgba(30, 144, 225, 0.3)",
        waveColorC: "rgba(220, 20, 60, 0.3)",
        textColor: "#1B1F3B"
    },
    "surprise": {
        value: "surprise",
        display: "Surprise 😮",
        bgColor: "#C5D86D",
        waveColorA: "rgba(153, 50, 204, 0.3)",
        waveColorB: "rgba(30, 144, 225, 0.3)",
        waveColorC: "rgba(220, 20, 60, 0.3)",
        textColor: "#1B1F3B"
    },
}

export const MoodContext = createContext(EMOTIONS['neutral']);

export const MoodContextProvider = ({ children }) => {
    const [mood, setMood] = useState(EMOTIONS['neutral']);

    const changeMood = (newMood) => {
        setMood(EMOTIONS[newMood]);
    }

    useEffect(() => {
        document.body.style.transition = 'background-color 1.5s ease';
        document.body.style.backgroundColor = mood.bgColor;
    }, [mood]);

    const value = {
        mood,
        changeMood
    };

    return (
        <MoodContext.Provider value={value}>{children}</MoodContext.Provider>
    )
}