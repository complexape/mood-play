import { DEFAULT_SONG } from "../constants";

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('spotify-iframe');
    const options = {
        width: '80%',
        height: '300',
        uri: DEFAULT_SONG
    };

    const callback = (EmbedController) => {
        const handleNextSong = () => {
            const embedContainer = document.getElementById('spotify-iframe-container');
            const songURI = embedContainer.getAttribute('data-songURI') || DEFAULT_SONG;
            EmbedController.loadUri(songURI);
            EmbedController.play();
        }

        document.addEventListener("change-song", handleNextSong);        
        EmbedController.addListener('playback_update', (e) => {
            if (e['data']['position'] === e['data']['duration']) {
                const event = new CustomEvent("next-song");
                document.dispatchEvent(event);
            }
        });
    };
    IFrameAPI.createController(element, options, callback);
};