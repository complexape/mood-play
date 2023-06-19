import Cookies from "js-cookie";
import { DEFAULT_SONG } from "../constants";

export const changeSong = (newSongURI) => {
    const embedContainer = document.getElementById('spotify-iframe-container');
    embedContainer.setAttribute('data-songURI', newSongURI)
    setTimeout(() => {
        const event = new CustomEvent("change-song");
        document.dispatchEvent(event);
    });
}

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('spotify-iframe');
    let song_uri = DEFAULT_SONG;
    if (Cookies.get('spotifyAuthToken') && Cookies.get('defaultSong')) {
        song_uri = Cookies.get('defaultSong');
    }
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