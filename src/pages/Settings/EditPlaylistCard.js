import React, { useContext } from 'react';
import styled from 'styled-components'
import PlaylistCard from '../../components/PlaylistCard';
import { SpotifyAuthContext } from '../../context/SpotifyAuthContext';
import { EMOTIONS } from '../../constants';


const EditPlaylistCard = ({mood}) => {
    const { changeMoodPlaylist } = useContext(SpotifyAuthContext);

    const handlePlaylistChange = async (event) =>{
        event.preventDefault();
        const ok = await changeMoodPlaylist(mood, event.target.elements.input.value);
        if (!ok) {
            alert("Error: could not find Spotify playlist.")
        }
        event.target.elements.input.value = '';
    } 

    return (
        <Div>
            <h2>{EMOTIONS[mood].display} Playlist</h2>
            <PlaylistCard mood={mood}/>
            <form onSubmit={handlePlaylistChange}>
                <input type='text' name='input' placeholder='enter a Spotify playlist URL..'></input>
                <button type='submit'>Change</button>
            </form>
            <button onClick={() => changeMoodPlaylist(mood, "")}>Reset to Default</button>
        </Div>
    )
}

const Div = styled.div`
    display: inline-grid;
    background-color: #FFFFF2;
    border-radius: 12px;
    margin: 10px;
    text-align: center;
    padding: 10px;
`;

export default EditPlaylistCard;