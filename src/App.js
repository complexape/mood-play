import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, useMatch } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import Settings from './pages/Settings';
import Signin  from './pages/Signin';
import Player from './pages/Player/Player';
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
        <>
            <Navbar />
            <div id="spotify-iframe-container" style={useMatch('/') ? showSpotifyStyle : hideSpotifyStyle}>
                <div id="spotify-iframe"></div>
            </div>
            <Routes>
                <Route path='/' element={<Player/>} />
                <Route path='/settings' element={<Settings/>} />
                <Route path='/sign-in' element={<Signin/>} />
            </Routes>
        </>
    );
}

export default App;
