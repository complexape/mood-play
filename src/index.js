import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SpotifyAuthProvider } from './context/SpotifyAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <SpotifyAuthProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </SpotifyAuthProvider>
    </React.StrictMode>
);

