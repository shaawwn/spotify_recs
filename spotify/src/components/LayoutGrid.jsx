import PropTypes from 'prop-types'

export default function LayoutGrid({items}) {


    return(
        <div className="grid">
            {items.map((item, index) =>
                <p key={index}>imtem here</p>
            )}
        </div>
    )
}

LayoutGrid.propTypes = {
    items: PropTypes.array.isRequired,
    // children: PropTypes.node.isRequired,
}