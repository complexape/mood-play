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
                    <EditPlaylistsContainer>
                        {Object.entries(playlists).map(([mood, obj], index) => (
                            <EditPlaylistCard mood={mood} key={index}/>
                        ))}
                    </EditPlaylistsContainer>
                </>
            }
        </>
    );
};

const EditPlaylistsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

export default Settings;