import { Routes, Route } from 'react-router-dom';
import { MoodContextProvider } from './context/MoodContext';

import './App.css';
import Navbar from './components/Navbar';
import Settings from './pages/Settings';
import Signin from './pages/SignIn/Signin';
import Player from './pages/Player/Player';
import Wave from './components/Wave';
import SpotifyIFrameContainer from './components/SpotifyIFrameContainer';
import './middleware/spotify';
import Callback from './pages/Callback';

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
                    <Route path='/callback' element={<Callback/>} />
                </Routes>
                <SpotifyIFrameContainer />
            </MoodContextProvider>
        </div>
    );
}

export default App;
