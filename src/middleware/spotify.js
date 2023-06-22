export const changeSong = (newSongURI) => {
    const embedContainer = document.getElementById('spotify-iframe-container');
    embedContainer.setAttribute('data-songURI', newSongURI)
    setTimeout(() => {
        const event = new CustomEvent("change-song");
        document.dispatchEvent(event);
    });
}