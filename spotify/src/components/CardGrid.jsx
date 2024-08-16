import {useEffect} from 'react'
import PropTypes from 'prop-types'

import DefaultImage from '../assets/images/default.png'

export default function Grid({items, limit, getArtistRecs, getTrackRecs, artists, tracks}) {

    useEffect(() => {

    }, [items])

    return(
        <div className="grid">

            {items.slice(0, limit).map((item, index) => 
                item.images && item.images[1].url ? 
                <GridItem 
                    key={index} 
                    item={item}
                    getArtistRecs={getArtistRecs}
                    getTrackRecs={getTrackRecs}
                    artists={artists}
                    tracks={tracks}
                    />
                :<GridItem 
                    key={index} 
                    getArtistRecs={getArtistRecs}
                    getTrackRecs={getTrackRecs}
                    artists={artists}
                    tracks={tracks}
                    />
                
            )}         
        </div>
    )
}


function GridItem({item, getArtistRecs, getTrackRecs, artists, tracks}) {

    function handleClick() {
        // needs access to artistID
        if(artists === true) {
            getArtistRecs(item)
        } else if(tracks === true) {
            getTrackRecs([item.id], [], [])
        }
    }

    return(
        <div className="grid__item">
            <img 
                alt={item.name} 
                src={item.images && item.images[0].url ? item.images[0].url : DefaultImage}
                onClick={handleClick}
                ></img>
        </div>
    )
}


Grid.propTypes = {
    items: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired
}

GridItem.propTypes ={
    item: PropTypes.object.isRequired
}