import React, { useContext } from 'react';
import Header from '../../components/Header';
import { SpotifyAuthContext } from '../../context/SpotifyAuthContext';
import { Button } from '../../components/Button';
import Cookies from 'js-cookie';
import SpotifyAuthButton from './SpotifyAuthButton';

const Signin = () => {
    const { token } = useContext(SpotifyAuthContext);

    const handleLogout = () => {
        Cookies.remove('spotifyAuthToken');
        window.location.reload();
    }

    return (
        <>
            <Header>Sign In</Header>
            { !token ? 
                <SpotifyAuthButton/> :
                <Button onClick={handleLogout}>Log Out of Spotify</Button>
            }
        </>
    );
};

export default Signin;