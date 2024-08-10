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
                    alt={item.name}
                    id={item.id} 
                    imgSrc={item.images[1].url}
                    getRecs={getRecs}
                    />
                :<GridItem 
                    key={index} 
                    alt="default album cover image" 
                    imgSrc={DefaultImage}
                    getRecs={getRecs}
                    />
                
            )}         
        </div>
    )
}


function GridItem({imgSrc, id, alt, getRecs}) {

    function handleClick() {
        // needs access to artistID
        if(id) {
            getRecs(id)
        }
    }

    return(
        <div className="grid__item">
            <img 
                alt={alt} 
                src={imgSrc}
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
    imgSrc: PropTypes.string,
    alt: PropTypes.string.isRequired
}