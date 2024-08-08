import PropTypes from 'prop-types'

import DefaultImage from '../assets/images/default.png'
export default function Grid({items, limit}) {
    // console.log('grid items', items)
    // tracks is going to be items.item.album.images
    return(
        <div className="grid">
            {items.slice(0, limit).map((item, index) => 
                item.images && item.images[1].url ? 
                <GridItem key={index} alt={item.name} imgSrc={item.images[1].url}/>
                :<GridItem key={index} alt="default album cover image" imgSrc={DefaultImage}/>
                
            )}         
        </div>
    )
}


function GridItem({imgSrc, alt}) {

    function handleClick(e) {
        console.log("clicking", e.target)
    }

    return(
        <div className="grid__item">
            <img 
                alt={alt} 
                src={imgSrc}
                onClick={(e) => handleClick(e)}
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