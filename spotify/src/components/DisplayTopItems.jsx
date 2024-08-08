import PropTypes from 'prop-types';

export default function DisplayTopItems({items, type}) {
    console.log(items)
    return(
        <section className="">
            <h3 className="">Here are your top ten {type}</h3>
            {items.slice(0, 10).map((item, index) => 
                <p key={index + item.id}>{item.name}</p>
            )}
        </section>
    )
}


DisplayTopItems.propTypes = {
    items: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired
}