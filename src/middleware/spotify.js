import Cookies from "js-cookie";

export const changeSong = (newSongURI) => {
    const embedContainer = document.getElementById('spotify-iframe-container');
    embedContainer.setAttribute('data-songURI', newSongURI)
    setTimeout(() => {
        const event = new CustomEvent("change-song");
        document.dispatchEvent(event);
    });
}

const DEFAULT_SONG = "https://open.spotify.com/track/5BZ4aodJTESrcaGQERLzjV?si=535c34478d434568";

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('spotify-iframe');
    let song_uri = Cookies.get('spotifyAuthToken') && Cookies.get('defaultSong')
        ? Cookies.get('defaultSong')
        : DEFAULT_SONG

    const options = {
        width: '80%',
        height: '300',
        uri: song_uri
    };

    // ** The Spotify IFrame Embed shows songs as preview if you're
    // not logged into spotify on your browser **
    const callback = (EmbedController) => {
        const handleNextSong = () => {
            const embedContainer = document.getElementById('spotify-iframe-container');
            const songURI = embedContainer.getAttribute('data-songURI');
            EmbedController.loadUri(songURI);
            EmbedController.play();
        }

        document.addEventListener("change-song", handleNextSong);        
        EmbedController.addListener('playback_update', (e) => {
            if (e['data']['position'] === e['data']['duration'] && e['data']['position'] > 0) {
                const event = new CustomEvent("next-song");
                document.dispatchEvent(event);
            }
        });
    };
    IFrameAPI.createController(element, options, callback);
};