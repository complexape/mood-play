import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useMatch } from 'react-router-dom';

const StyledDiv = styled.div`
    ${(props) => props.show ? 
        "padding: 30px; text-align: center;" :
        "position: absolute; right: 100%;"
    }
`;

const SpotifyIFrameContainer = () => {

    // reload page to load spotify iframe if no iframe is found
    useEffect(() => {
        const container = document.getElementById("spotify-iframe-container" );
        if (container.querySelector("#spotify-iframe")) {
            const timer = setTimeout(() => {
                if (container.querySelector("#spotify-iframe")) {
                    window.location.reload();
                }
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [])

    return (
        <StyledDiv 
            id="spotify-iframe-container" 
            show={useMatch('/')}
        >
            <div id="spotify-iframe">
                Refresh the window!
            </div>
        </StyledDiv>
    )
}

export default SpotifyIFrameContainer;