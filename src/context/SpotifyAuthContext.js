import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { DEFAULT_PLAYLISTS } from '../constants';
import 'react-spotify-auth/dist/index.css'
import { createContext } from 'react';

export const SpotifyAuthContext = createContext(null);

export const SpotifyAuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get("spotifyAuthToken"));
    const [playlists, setPlaylists] = useState(DEFAULT_PLAYLISTS);

    useEffect(() => {
        if (!token) {
            return;
        }
        console.log(token);
        Cookies.set('spotifyAuthToken', token);
    }, [token])

    const value = {
        token,
        setToken,
        playlists,
        setPlaylists
    }
    
    return (
        <SpotifyAuthContext.Provider value={value}>
            {children}
        </SpotifyAuthContext.Provider>
    );
}