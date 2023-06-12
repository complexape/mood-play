import React, { forwardRef }from 'react'
import Webcam from 'react-webcam';
import styled from 'styled-components';


const StyledWebcam = styled(Webcam)`
    ${(props) => (props.show ? 
        `
            outline:none; 
            border: 5px solid #555555; 
            display: block; 
            margin: 10px auto; 
            max-height: 50vw;
            max-width: 80vw;
        `:
        'position: absolute; right: 99.999%;'
    )}
`;

const WebcamDisplay = forwardRef((props, ref) => {
    const { show } = props;
    return (
        <>
            <StyledWebcam
                ref = {ref}
                audio = {false}
                screenshotFormat='image/jpeg'
                onUserMedia={(e) => { console.log(e) }}
                show={show}
            />
        </>
    )
});

export default WebcamDisplay;