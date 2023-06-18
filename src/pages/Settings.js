import React, { useContext } from 'react';
import Header from '../components/Header';
import { SpotifyAuthContext } from '../context/SpotifyAuthContext';

const Settings = () => {
    const { token, changeMoodPlaylist, playlists } = useContext(SpotifyAuthContext);

    const handlePlaylistChange = (event, mood) =>{
        event.preventDefault();
        changeMoodPlaylist(mood, event.target.elements.input.value)
        event.target.elements.input.value = '';
    } 

    return (
        <>
            {!token ? <Header>Please Log In To Spotify!</Header> : 
                <>  
                    <Header>Edit Playlists</Header>
                    {Object.entries(playlists).map(([mood, obj], index) => (
                        <div key={index}>
                            <form onSubmit={(e) => handlePlaylistChange(e, mood)}>
                                <label>{mood}, Current URL: {playlists[mood].url}</label>
                                <input type='text' name='input'></input>
                                <button type='submit'>Submit</button>
                            </form>
                            <button onClick={() => changeMoodPlaylist(mood, "")}>Reset to Default</button>
                        </div>
                    ))}
                </>
            }
        </>
    );
};

export default Settings;