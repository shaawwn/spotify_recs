import PropTypes from 'prop-types'


export default function TrackTable({items}) {

    function formatDuration(duration) {
        // utc to minutes:seconds
        const totalSeconds = Math.floor(duration / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
    }
    return(
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
    )
}

TrackTable.propTypes = {
    items: PropTypes.array.isRequired
}