import React, {useCallback, useRef, useState} from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
    window:540,
    facingMode: "environment"
};

const Camera = () => {

    const webcamRef = useRef(null);

    const [url, setUrl] = useState(null);

    const capturePhoto = useCallback(async() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setUrl(imageSrc)
    }, [webcamRef]);

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
                    <img stc={url} alt="Screenshot"/>
                </div>
            )}
        </>
    );
}

export default Camera