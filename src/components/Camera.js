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
    }, [webcamRef]);

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
                screenshotFormat='image/png'
                videoConstraints={videoConstraints}
                onUserMedia={onUserMedia}
            />
            <button onClick={capturePhoto}>Capture</button>
            <button onClick={() => setUrl(null)}>Refresh</button>
            {url && (
                <div>
                    <img src={url} alt="Screenshot"/>
                </div>
            )}
            {prediction && (
                <div>
                    <h1>prediction</h1>
                </div>
            )}
        </>
    );
}

export default Camera