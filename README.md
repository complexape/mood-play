# MoodPlay

MoodPlay is an interactive music player web app made using React that changes music depending on your mood. It detects your mood using an emotion detection model that's  served through a custom API. The site's theme and playlist then changes to match the mood. The site offers an easy-to-use layout, along with a clean and minimalist look designed to keep users engaged.  

(Currently still WIP)

A demo of the project can be found here: https://mood-play.netlify.app/

<img src=assets/screenshot.png width=50% height=50%>

### Local Setup
1. Clone the repository, navigate to this folder and create a `.env` file with the following contents 
```
REACT_APP_SPOTIFY_REDIRECT_URI=<YOUR_REDIRECT_URI_HERE>
REACT_APP_SPOTIFY_CLIENT_ID=<YOUR_CLIENT_ID_HERE>
```

2. To start the app, run
```
npm i
npm start
```

### Production Setup
**NOTE**: Make sure to change your redirect URI in `.env` before building

To push to production, run
```
npm run build
```




### Features To-do List:
- [ ] **Add Spotify Authentication to utilize Playback SDK  (Premium Only)**
- [x] Custom Playlists
- [x] Settings Page
- [x] Navbar