import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components'
import { MoodContextProvider } from './context/MoodContext';
import Navbar from './components/Navbar';
import Credits from './components/Credits';
import Settings from './pages/Settings';
import Signin from './pages/SignIn';
import Player from './pages/Player';
import Home from './pages/Home';
import Wave from './components/Wave';
import SpotifyIFrameContainer from './components/SpotifyIFrameContainer';
import Callback from './pages/SignIn/Callback';

function App() {
    return (
        <AppContainer>
            <MoodContextProvider>
                <ContentContainer>
                    <Navbar />
                    <Wave />
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/player' element={<Player/>} />
                        <Route path='/settings' element={<Settings/>} />
                        <Route path='/sign-in' element={<Signin/>} />
                        <Route path='/callback' element={<Callback/>} />
                    </Routes>
                    <SpotifyIFrameContainer />
                </ContentContainer>
                <Credits/>
            </MoodContextProvider>
        </AppContainer>
    );
}

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 95vh;
`;

const AppContainer = styled.div`
    text-align: center;
    font-weight: 600;
    min-height: 100vh;
    overflow: hidden;
`;

export default App;
