import PropTypes from 'prop-types'
import {useSpotifyApiContext} from '../context/SpotifyApiContext'
import {useUserContext} from '../context/UserContext'

export default function TrackTable({items, getRecs}) {

    const {spotifyApi} = useSpotifyApiContext()
    const {user} = useUserContext()

    function formatDuration(duration) {
        // utc to minutes:seconds
        const totalSeconds = Math.floor(duration / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
    }

    function resetRecommendations() {
        getRecs([], [], [], true)
    }

    function savePlaylist() {
        console.log("Saving playlist")

        const toAdd = items.map((item) => item.uri) 

        spotifyApi.saveAsPlaylist(toAdd)
    }

    function playPlaylist() {
        // play
        if(user.product !== 'premium') {
            console.log("I'm sorry, this is a spotify premium only feature, please save the playlist and open it in the spotify app")
        } else {
            console.log("Now playing generated playlist")
            // given the list of tracks, play them in the app
            const uris = items.map((item) => item.uri)

            const getDevices = async () => {
                const devices = await spotifyApi.getAvailableDevices()
                console.log("devices on play", devices)

                // find active device, if any
                const activeDevices = devices.filter((device) => device.is_active === true)


                if(activeDevices.length > 0) {
                    spotifyApi.startPlayback(uris, null)
                    try {
                        spotifyApi.startPlayback(uris, null)
                    } catch (err) {
                        console.log("Error starting playback with default palyer")
                    }
                } else if(activeDevices.length === 0) {
                    const browserPlayer = devices.filter((device) => device.name="SpotifyRecsPlayer")
                    try {
                        const player = browserPlayer[browserPlayer.length - 1]
                        spotifyApi.startPlayback(uris, player.id)
                    } catch (err) {
                        console.log("Error starting playback with webplayer")
                    }
   
                }
                // return devices
            }
            getDevices()
            // spotifyApi.startPlayback(uris, null)
        }
    }
    return(
        <div>
            <button onClick={resetRecommendations}
            className="bg-slate-400 p-1">Reset Recommendations</button>
            <button onClick={savePlaylist}
            className="bg-slate-400 p-1">Save playlist</button>
            <button onClick={playPlaylist} className="bg-slate-400 p-1">Play</button>

        <table>
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>Album</th>
                    <th>Artist</th>
                    <th>Duration</th>
                </tr>
                {items.map((item, index) => 
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.album.name}</td>
                        <td>{item.artists[0].name}</td>
                        <td>{formatDuration(item.duration_ms)}</td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
    )
}

TrackTable.propTypes = {
    items: PropTypes.array.isRequired,
    getRecs: PropTypes.func
}