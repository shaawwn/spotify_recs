import {useState, useRef} from 'react'

export default function TrackGrid({items, getRecs}) {

    const selectedTracks = useRef([])

    function handleGenPlaylist() {
        getRecs([], selectedTracks.current, []) // this creates new recTracks
    }

    function resetRecommendedTracks() {
        getRecs(null)
    }


    function addSeedTrack(id) {
        selectedTracks.current.push(id)
    }

    function removeSeedTrack(id) {
        // ids = ids.filter(id => id !== 2);
        selectedTracks.current = selectedTracks.current.filter(item => item !== id)
    }

    function handleClick(e, id) {

        const el = e.currentTarget

        if(el.getAttribute('data-clicked') === 'true') {
            el.setAttribute('data-clicked', false)
            el.style.backgroundColor = '#1DB954'
            removeSeedTrack(id)
            return
        }

        el.setAttribute('data-clicked', true)

        if(selectedTracks.current.length < 5) {
            const genPlaylistButton = document.getElementById("gen-playlist")
            genPlaylistButton.style.display="block"
            el.style.backgroundColor = "#FF1493"
            addSeedTrack(id)
        } else {
            console.log("Cannot add more tracks")
        }

    }

    return(
        <section className="flexbox">
            <button 
                id="gen-playlist" 
                className="bg-slate-400 text-black button hidden"
                onClick={handleGenPlaylist}
                >Gen playlist</button>
            <button className="bg-slate-400 text-black button hidden">Reset</button>
            {items.map((item, index) =>
            <div 
                key={index}
                className="flexbox__item text-center"
                onClick={(e) => handleClick(e, item.id)}
                data-clicked={false}
                >
                <p>{item.name} - {item.artists[0].name}</p>
            </div>
            )}
        </section>
    )
}

