import React, {useCallback, useRef, useState, useEffect} from 'react';
import Webcam from 'react-webcam';
import predictScreenshot from '../middleware/api';

const videoConstraints = {
    window:540,
    facingMode: "environment"
};

const captureInterval = 5000

const Camera = () => {

    const webcamRef = useRef(null);

    const [url, setUrl] = useState(null);
    const [prediction, SetPrediction] = useState(null);

    const capturePhoto = useCallback(async() => {
        const screenshotSrc = webcamRef.current.getScreenshot();

        if (!screenshotSrc) {
            console.log("No Webcam!");
        }
        else {
            const prediction = await predictScreenshot(screenshotSrc);
            console.log("screenshot");
            SetPrediction(prediction);
            setUrl(screenshotSrc);
        }
    }, [webcamRef, prediction]);

    // useEffect(() => {
    //     const interval = setInterval(capturePhoto, captureInterval);
    //     return () => clearInterval(interval);
    // }, []);

    const onUserMedia = (e) => {
        console.log(e);
    };

    return (
        <>
            <Webcam
                ref = {webcamRef}
                audio = {false}
                screenshotFormat='image/jpeg'
                videoConstraints={videoConstraints}
                onUserMedia={onUserMedia}
            />
            <button onClick={capturePhoto}>Capture</button>
            <button onClick={() => setUrl(null)}>Refresh</button>
            {prediction && (
                <div>
                    <h1>I Predict that you are: {prediction}</h1>
                </div>
            )}
            {url && (
                <div>
                    <img src={url} alt="Screenshot"/>
                </div>
            )}
        </>
    );
}

export default Camera