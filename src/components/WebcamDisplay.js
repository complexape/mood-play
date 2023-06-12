import React, { forwardRef }from 'react'
import Webcam from 'react-webcam';
import styled from 'styled-components';


const StyledWebcam = styled(Webcam)`
    ${(props) => (props.show ? 
        'position flex; border: red;':
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