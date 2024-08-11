import PropTypes from 'prop-types'


export default function TrackTable({items, getRecs}) {

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
    return(
        <div>
            <button onClick={resetRecommendations}
            className="bg-slate-400 p-1">Reset Recommendations</button>
            <button onClick={resetRecommendations}
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