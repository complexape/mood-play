import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import { SpotifyAuthContext } from '../../context/SpotifyAuthContext';
import EditPlaylistCard from './EditPlaylistCard';

const Settings = () => {
    const { token, playlists } = useContext(SpotifyAuthContext);

    return (
        <>
            {!token ? <Header>Please Log In To Spotify!</Header> : 
                <>  
                    <Header>Edit Playlists</Header>
                    <PlaylistContainer>
                        {Object.entries(playlists).map(([mood, obj], index) => (
                            <EditPlaylistCard mood={mood} key={index}/>
                        ))}
                    </PlaylistContainer>
                </>
            }
        </>
    );
};

const PlaylistContainer = styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
`;

export default Settings;