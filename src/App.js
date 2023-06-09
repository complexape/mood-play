import { Routes, Route, useMatch } from 'react-router-dom';
import { useState } from 'react';
import { MoodContextProvider } from './context/MoodContext';

import './App.css';
import Navbar from './components/Navbar';
import Settings from './pages/Settings';
import Signin  from './pages/Signin';
import Player from './pages/Player/Player';
import Wave from './components/Wave';
import './middleware/spotify';

const hideSpotifyStyle = {
    position: "absolute",
    right: "100%"
}

const showSpotifyStyle = {
    padding: "30px",
    textAlign: "center"
}

function App() {
    return (
        <MoodContextProvider>
            <div className={`app-container`}>
                <Navbar />
                <Wave/>
                <Routes>
                    <Route path='/' element={<Player/>} />
                    <Route path='/settings' element={<Settings/>} />
                    <Route path='/sign-in' element={<Signin/>} />
                </Routes>
                <div id="spotify-iframe-container" style={useMatch('/') ? showSpotifyStyle : hideSpotifyStyle}>
                    <div id="spotify-iframe"></div>
                </div>
            </div>
        </MoodContextProvider>
    );
}

export default App;
