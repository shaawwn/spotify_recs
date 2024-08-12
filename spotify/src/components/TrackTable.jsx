import PropTypes from 'prop-types'
import {useSpotifyApiContext} from '../context/SpotifyApiContext'

export default function TrackTable({items, getRecs}) {

    const {spotifyApi} = useSpotifyApiContext()

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

    return(
        <div>
            <button onClick={resetRecommendations}
            className="bg-slate-400 p-1">Reset Recommendations</button>
            <button onClick={savePlaylist}
            className="bg-slate-400 p-1">Save playlist</button>

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