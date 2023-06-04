import React, { useCallback, useEffect, useState, useRef } from 'react'
import { shuffleRandomNext } from './PlayerUtils';

// CHANGE THIS LATER
const PLAYLISTS = {
    "angry": [
        "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=b7bc6c543bb2443c",
        "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b?si=3e97fa17e1474357",
        "https://open.spotify.com/track/5BZ4aodJTESrcaGQERLzjV?si=063b9c035eb64c0c",
        "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=703016f56dcb4aeb",
        "https://open.spotify.com/track/3gFQOMoUwlR6aUZj81gCzu?si=faa5bbf189b94046",
    ],
    "disgust": [
        "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=b7bc6c543bb2443c",
        "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b?si=3e97fa17e1474357",
        "https://open.spotify.com/track/5BZ4aodJTESrcaGQERLzjV?si=063b9c035eb64c0c",
        "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=703016f56dcb4aeb",
        "https://open.spotify.com/track/3gFQOMoUwlR6aUZj81gCzu?si=faa5bbf189b94046",
    ],
    "fear": [
        "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=b7bc6c543bb2443c",
        "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b?si=3e97fa17e1474357",
        "https://open.spotify.com/track/5BZ4aodJTESrcaGQERLzjV?si=063b9c035eb64c0c",
        "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=703016f56dcb4aeb",
        "https://open.spotify.com/track/3gFQOMoUwlR6aUZj81gCzu?si=faa5bbf189b94046",
    ],
    "happy": [
        "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=b7bc6c543bb2443c",
        "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b?si=3e97fa17e1474357",
        "https://open.spotify.com/track/5BZ4aodJTESrcaGQERLzjV?si=063b9c035eb64c0c",
        "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=703016f56dcb4aeb",
        "https://open.spotify.com/track/3gFQOMoUwlR6aUZj81gCzu?si=faa5bbf189b94046",
    ],
    "neutral": [
        "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=b7bc6c543bb2443c",
        "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b?si=3e97fa17e1474357",
        "https://open.spotify.com/track/5BZ4aodJTESrcaGQERLzjV?si=063b9c035eb64c0c",
        "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=703016f56dcb4aeb",
        "https://open.spotify.com/track/3gFQOMoUwlR6aUZj81gCzu?si=faa5bbf189b94046",
    ],
    "sad": [
        "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=b7bc6c543bb2443c",
        "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b?si=3e97fa17e1474357",
        "https://open.spotify.com/track/5BZ4aodJTESrcaGQERLzjV?si=063b9c035eb64c0c",
        "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=703016f56dcb4aeb",
        "https://open.spotify.com/track/3gFQOMoUwlR6aUZj81gCzu?si=faa5bbf189b94046",
    ],
    "surprise": [
        "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=b7bc6c543bb2443c",
        "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b?si=3e97fa17e1474357",
        "https://open.spotify.com/track/5BZ4aodJTESrcaGQERLzjV?si=063b9c035eb64c0c",
        "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=703016f56dcb4aeb",
        "https://open.spotify.com/track/3gFQOMoUwlR6aUZj81gCzu?si=faa5bbf189b94046",
    ],
    "tired": [
        "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT?si=b7bc6c543bb2443c",
        "https://open.spotify.com/track/1mea3bSkSGXuIRvnydlB5b?si=3e97fa17e1474357",
        "https://open.spotify.com/track/5BZ4aodJTESrcaGQERLzjV?si=063b9c035eb64c0c",
        "https://open.spotify.com/track/39uLYYZytVUwcjgeYLI409?si=703016f56dcb4aeb",
        "https://open.spotify.com/track/3gFQOMoUwlR6aUZj81gCzu?si=faa5bbf189b94046",
    ],
};

const SpotifyPlayer = ({ mood, shuffle}) => {
    const moodRef = useRef(mood);
    const shuffleRef = useRef(shuffle);
    const songIndexRef = useRef(0);
    const playlistsRef = useRef(PLAYLISTS);

    useEffect(() => {
        moodRef.current = mood;
    }, [mood]);

    useEffect(() => {
        shuffleRef.current = shuffle;
    }, [shuffle]);

    useEffect(() => {
        const handleSpotifyIFrameApiReady = (IFrameAPI) => {
            const element = document.getElementById('spotify-embed-iframe');
            const options = {
                width: '80%',
                height: '300',
                uri: playlistsRef.current['neutral'][0]
            };

            const callback = (EmbedController) => {
                const handleMoodChange = () => {
                    const mood = moodRef.current;
                    const shuffle = shuffleRef.current;
                    const playlists = playlistsRef.current

                    const startIndex = shuffle ? shuffleRandomNext(playlists[mood].length) : 0;
                    songIndexRef.current = startIndex;
                    
                    console.log(`Playing Playlist: ${mood}, at position ${startIndex}, shuffle: ${shuffle ? "Yes" : "No"}`)
                    EmbedController.loadUri(playlists[mood][startIndex]);
                    EmbedController.play();
                }
                
                const handleNextSong = () => {
                    const mood = moodRef.current;
                    const shuffle = shuffleRef.current;
                    const songIndex = songIndexRef.current;
                    const playlists = playlistsRef.current;

                    const nextIndex = shuffle ? 
                        shuffleRandomNext(playlists[mood].length, songIndex) : 
                        ((songIndex + 1) % playlists[mood].length);

                    songIndexRef.current = nextIndex;
                    
                    console.log(`Playing Playlist: ${mood}, at position ${nextIndex}, shuffle: ${shuffle ? "Yes" : "No"}`)
                    EmbedController.loadUri(playlists[mood][nextIndex]);
                    EmbedController.play();
                }

                document.addEventListener("change-mood", handleMoodChange);        
                EmbedController.addListener('playback_update', (e) => {
                    if (e['data']['position'] === e['data']['duration']) {
                        handleNextSong()
                    }
                });
            };
            IFrameAPI.createController(element, options, callback);
        };

        window.onSpotifyIframeApiReady = handleSpotifyIFrameApiReady;

        return () => {
            delete window.onSpotifyIframeApiReady;
        };
    }, [])

    return (
        <>
            <div id="spotify-embed-iframe"></div>
        </>
    )
}

export default SpotifyPlayer;