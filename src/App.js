import './App.css';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Signin  from './pages/Signin';
import Player from './pages/Player/Player';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Player/>} />
                <Route path='/settings' element={<Settings/>} />
                <Route path='/sign-in' element={<Signin/>} />
            </Routes>
        </Router>
    );
}

export default App;
