import PropTypes from 'prop-types'

export default function Panel({title, children}) {

    return(
        <section className="panel">
            <p>{title}</p> 
            {children}

            {/* Could put something else here, like other recommendations */}
        </section>
    )
}

/*

    Panels are similarly styled components that display different content, for example, a grid layour of all of a users playlist will still be displayed on a colored 'panel' with rounded corners inside the Dashboard, the content just may be different. It might display a grid of playlists, or a single album with a header/tradck table, or a smaller grid with recommendations, but they are all a 'panel', content being displayed ontoop of a background with rounded corners. That's all this component is, a style background component that holds content.
*/

Panel.propTypes = {
    title: PropTypes.string.isRequired, 
    children: PropTypes.node.isRequired
}