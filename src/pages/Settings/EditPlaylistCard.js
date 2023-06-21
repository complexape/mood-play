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
        let playlistObj = {};
        playlistObj[mood] = event.target.elements.input.value;
        const ok = await changeMoodPlaylist(playlistObj);
        if (!ok) {
            alert('Error: could not find Spotify playlist.')
        }
        event.target.elements.input.value = '';
    } 

    const handleDefaultPlaylistChange = async () => {
        let playlistObj = {}
        playlistObj[mood] = ''
        await changeMoodPlaylist(playlistObj);
    }

    return (
        <Div mood={EMOTIONS[mood]}>
            <h2>{EMOTIONS[mood].display} Playlist</h2>
            <PlaylistCard mood={mood}/>
            <Form onSubmit={handlePlaylistChange}>
                <Input type='text' name='input' placeholder='enter a Spotify playlist URL..'/>
                <MiniButton type='submit'>Change</MiniButton>
            </Form>
            <MiniButton onClick={handleDefaultPlaylistChange}>Reset to Default</MiniButton>
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
    display: grid;
    background-image: linear-gradient(45deg, ${(props) => props.mood.primaryColor} 10%, ${(props) => props.mood.secondaryColor});
    border-radius: 12px;
    justify-content: center;
    margin: 10px;
    text-align: center;
    color: ${(props) => props.mood.textColor};
    border: 4px solid ${(props) => props.mood.textColor};
    padding: 10px;
`;

export default EditPlaylistCard;