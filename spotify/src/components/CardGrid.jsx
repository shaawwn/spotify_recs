import {useEffect} from 'react'
import PropTypes from 'prop-types'

import DefaultImage from '../assets/images/default.png'

export default function Grid({items, limit, getRecs}) {
    // console.log('grid items', items)
    // tracks is going to be items.item.album.images
    // console.log(getRecs)

    useEffect(() => {

    }, [items])

    return(
        <div className="grid">

            {items.slice(0, limit).map((item, index) => 
                item.images && item.images[1].url ? 
                <GridItem 
                    key={index} 
                    item={item}
                    getRecs={getRecs}
                    />
                :<GridItem 
                    key={index} 
                    getRecs={getRecs}
                    />
                
            )}         
        </div>
    )
}


function GridItem({item, getRecs}) {

    function handleClick() {
        // needs access to artistID
        console.log("get recs in click", item)
        if(item) {
            getRecs(item)
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