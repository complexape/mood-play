import React, { useContext } from 'react';
import Header from '../components/Header';
import { SpotifyAuthContext } from '../context/SpotifyAuthContext';

const Settings = () => {
    const { token } = useContext(SpotifyAuthContext);

    return (
        <>
            <Header>Settings</Header>
            {!token ? <Header>Please Log In To Spotify!</Header> : 
                <>  
                    <Header fontSize={"24px"}>Edit Playlists</Header>
                    
                </>
            }
        </>
    );
};

export default Settings;