import React from 'react'
import styled from 'styled-components';
import { useMatch } from 'react-router-dom';

const StyledDiv = styled.div`
    ${(props) => props.show ? 
        "padding: 30px; text-align: center;" :
        "position: absolute; right: 100%;"
    }
`;

const SpotifyIFrameContainer = () => {
    return (
        <StyledDiv 
            id="spotify-iframe-container" 
            show={useMatch('/player')}
        >
            <div id="spotify-iframe">
                Refresh the window!
            </div>
        </StyledDiv>
    )
}

export default SpotifyIFrameContainer;