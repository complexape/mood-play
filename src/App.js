import { Routes, Route } from 'react-router-dom';
import { MoodContextProvider } from './context/MoodContext';

import './App.css';
import Navbar from './components/Navbar';
import Settings from './pages/Settings';
import Signin  from './pages/Signin';
import Player from './pages/Player/Player';
import Wave from './components/Wave';
import SpotifyIFrameContainer from './components/SpotifyIFrameContainer';
import './middleware/spotify';

function App() {
    return (
        <div className={`app-container`}>
            <MoodContextProvider>
                <Navbar />
                <Wave />
                <Routes>
                    <Route path='/' element={<Player/>} />
                    <Route path='/settings' element={<Settings/>} />
                    <Route path='/sign-in' element={<Signin/>} />
                </Routes>
                <SpotifyIFrameContainer />
            </MoodContextProvider>
        </div>
    );
}

export default App;
