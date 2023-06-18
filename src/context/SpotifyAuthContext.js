import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import axios from 'axios'
import { DEFAULT_PLAYLISTS } from '../constants';
import 'react-spotify-auth/dist/index.css'
import { createContext } from 'react';

const getSongUrls = async (playlistUrl, token) => {
    try {
        const playlistId = playlistUrl.split('/')[4].split('?')[0]
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const playlist = response.data;
        const trackURLs = playlist.tracks.items.map(item => item.track.uri);
        return trackURLs;
    } catch (error) {
        console.error('Error retrieving playlist track URLs:', error);
        return [];
    }
}

export const SpotifyAuthContext = createContext(null);

export const SpotifyAuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
    const [playlists, setPlaylists] = useState(() => {
        const ret = JSON.parse(JSON.stringify(DEFAULT_PLAYLISTS));
        const token = Cookies.get("spotifyAuthToken");

        Object.keys(DEFAULT_PLAYLISTS).map(async (mood) => {
            const url = Cookies.get(`${mood}PlaylistUrl`);
            if (url && token) {
                const songs = await getSongUrls(url, token)
                if (songs.length) {
                    ret[mood]['url'] = url;
                    ret[mood]['songs'] = songs;
                }
            }
        });
        return ret;
    });

    useEffect(() => {
        if (!token) {
            Cookies.remove('spotifyAuthToken');
            return;
        }
        Cookies.set('spotifyAuthToken', token);
    }, [token]);

    const changeMoodPlaylist = async (mood, playlistUrl) => {
        if (DEFAULT_PLAYLISTS[mood] === undefined) {
            return;
        }

        let newPlaylists = { ...playlists};
        if (!playlistUrl || !token) {
            newPlaylists[mood] = DEFAULT_PLAYLISTS[mood];
        }
        else {
            const songs = await getSongUrls(playlistUrl, token);
            if (songs.length) {
                newPlaylists[mood]['songs'] = songs;
                newPlaylists[mood]['url'] = playlistUrl;
                Cookies.set(`${mood}PlaylistUrl`, playlistUrl);
            }
            else {
                alert('Error: Could not find playlist');
            }
        }
        console.log(newPlaylists)
        Cookies.set('defaultSong', newPlaylists['neutral'].songs[0]);
        setPlaylists(newPlaylists);
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