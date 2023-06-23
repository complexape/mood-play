import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpotifyAuthContext } from '../../context/SpotifyAuthContext';

const Callback = () => {
    const navigate = useNavigate();
    const {setToken } = useContext(SpotifyAuthContext);

    useEffect(() => {
        const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce((acc, item) => {
                const [key, value] = item.split('=');
                acc[key] = value;
                return acc;
            }, {});
    
        if (hash.access_token) {
            setToken(hash.access_token);
            navigate('/player')
        }
      }, [navigate]);
    
      return <div>Logging you in...</div>;
}

export default Callback;