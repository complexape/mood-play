import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios';
import { DEFAULT_PLAYLISTS } from '../constants';
import 'react-spotify-auth/dist/index.css'
import { createContext } from 'react';

export const SpotifyAuthContext = createContext(null);

export const SpotifyAuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
    const [playlists, setPlaylists] = useState(DEFAULT_PLAYLISTS);

    useEffect(() => {
        const initializePlaylists = async () => {
            const playlistObj = {};
            await Promise.all(Object.keys(DEFAULT_PLAYLISTS).map(async (mood) => {
                const url = Cookies.get(`${mood}PlaylistUrl`);
                if (url) {
                    playlistObj[mood] = url;

                }
            }));
            await changeMoodPlaylist(playlistObj)
        }

        initializePlaylists();
    }, []);

    useEffect(() => {
        if (!token) {
            Cookies.remove('spotifyAuthToken');
            return;
        }
        Cookies.set('spotifyAuthToken', token);
    }, [token]);

    const getPlaylistData = async (playlistUrl) => {
        if (!token) {
            return;
        }

        try {
            const playlistId = playlistUrl.split('/')[4].split('?')[0];
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            return response.data;
        } catch (error) {
            if (error.response.status === 401) {
                console.error("Token has expired, logging out");
                setToken("");
                return;
            }
            console.error('Error retrieving playlist data:', error);
        }
    }

    const parsePlaylistData = async (playlistUrl) => {
        const data = await getPlaylistData(playlistUrl, token);
        if (data) {
            return {
                "url": playlistUrl,
                "name": data.name,
                "image": data.images[0].url,
                "songs": data.tracks.items.map(item => item.track.uri)
            }
        }
    }

    const changeMoodPlaylist = async (playlistObj) => {
        let newPlaylists = JSON.parse(JSON.stringify(playlists));
        await Promise.all(Object.entries(playlistObj).map(async ([mood, playlistUrl]) => {
            if (DEFAULT_PLAYLISTS[mood] === undefined) {
                return false;
            }
    
            if (!playlistUrl || !token) {
                newPlaylists[mood] = DEFAULT_PLAYLISTS[mood];
                Cookies.remove(`${mood}PlaylistUrl`)
            }
            else {
                const newPlaylist = await parsePlaylistData(playlistUrl);
                if (newPlaylist) {
                    newPlaylists[mood] = newPlaylist;
                    Cookies.set(`${mood}PlaylistUrl`, playlistUrl);
                }
                else {
                    return false;
                }
            }
        }));
        Cookies.set('defaultSong', newPlaylists['neutral'].songs[0]);
        setPlaylists(newPlaylists);
        return true;
    }

    const value = {
        token,
        setToken,
        playlists,
        changeMoodPlaylist
    }
    
    return (
        <SpotifyAuthContext.Provider value={value}>
            {children}
        </SpotifyAuthContext.Provider>
    );
}