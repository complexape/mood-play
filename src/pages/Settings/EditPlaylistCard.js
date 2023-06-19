import React, { useContext } from 'react';
import styled from 'styled-components'
import PlaylistCard from '../../components/PlaylistCard';
import { SpotifyAuthContext } from '../../context/SpotifyAuthContext';
import { EMOTIONS } from '../../constants';
import MiniButton from '../../components/MiniButton';


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
            <Form onSubmit={handlePlaylistChange}>
                <Input type='text' name='input' placeholder='enter a Spotify playlist URL..'/>
                <MiniButton type='submit'>Change</MiniButton>
            </Form>
            <MiniButton onClick={() => changeMoodPlaylist(mood, "")}>Reset to Default</MiniButton>
        </Div>
    )
}

const Form = styled.form`
    margin: 15px auto 5px auto;
`;

const Input = styled.input`
    font-size: 15px;
    padding: 5px;
    border-radius: 5px;
`;

const Div = styled.div`
    user-select: none;
    display: inline-grid;
    background-color: #FFFFF2;
    border-radius: 12px;
    justify-content: center;
    margin: 10px;
    text-align: center;
    color: #555555;
    padding: 10px;
`;

export default EditPlaylistCard;