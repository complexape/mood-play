import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-spotify-auth/dist/index.css'
import {
    NavbarContainer,
    Logo,
    RoutesContainer,
    RouteLink
} from './NavbarElements';
import { MoodContext } from '../../context/MoodContext';
import { SpotifyAuthContext } from '../../context/SpotifyAuthContext';

const Navbar = () => {
    const location = useLocation();
    const { mood } = useContext(MoodContext);
    const { token } = useContext(SpotifyAuthContext)

    return (
        <NavbarContainer >
            <Logo mood={mood} to='/'>MoodPlay</Logo>
            <RoutesContainer>
                <RouteLink 
                    to='/player' 
                    isActive={location.pathname === '/player'}
                    mood={mood}
                >
                    Player
                </RouteLink>
                <RouteLink 
                    to='/settings' 
                    isActive={location.pathname === '/settings'}
                    mood={mood}
                >Settings
                </RouteLink>
                <RouteLink 
                    to='/sign-in' 
                    isActive={location.pathname === '/sign-in'}
                    mood={mood}
                >
                    {token ? "Log Out" : "Sign In to Spotify"}
                </RouteLink>
            </RoutesContainer>
        </NavbarContainer>
    );
};
  
export default Navbar;