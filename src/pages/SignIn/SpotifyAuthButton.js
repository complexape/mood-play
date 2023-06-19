import React from 'react';
import styled from 'styled-components';
import { SpotifyAuth } from 'react-spotify-auth';
import { SCOPES } from '../../constants/SpotifyConstants';

const SpotifyAuthButton = () => {
    return (
        <StyledSpotifyAuth
            title="Sign In to Spotify"
            redirectUri={process.env.REACT_APP_SPOTIFY_REDIRECT_URI}
            clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
            scopes={SCOPES}
            noCookie={false}
            showDialog={true}
        /> 
    );
}

const StyledSpotifyAuth = styled(SpotifyAuth)`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

export default SpotifyAuthButton;