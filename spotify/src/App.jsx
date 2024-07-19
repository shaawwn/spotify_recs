import Dashboard from './Dashboard.jsx'

// Spotify auth url with scope
const auth_scope = [
  'streaming',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-top-read',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private'
]


// Turn the scope into a string
const code = new URLSearchParams(window.location.search).get('code')

const client_id = '634efc955c024f24bc4e1f409de20017' // safe for public
const redirect_uri = 'http://localhost:5173'
const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=${auth_scope.join("%20")}`

function App() {

  return (
    <>
      <div>
        <h1>Spotify Starter Kit</h1>

        {code ? <Dashboard code={code}/> : <a href={AUTH_URL}>Login</a>}

      </div>

    </>
  )
}

export default App
