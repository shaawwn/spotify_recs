
// import PropTypes from 'prop-types'

import {useUserContext} from './context/UserContext'
import Navbar from './components/Navbar'



export default function Dashboard() {
    const user = useUserContext().user

    return(
        <div>
            {user && <Navbar />}
        </div>
    )
}

Dashboard.propTypes = {

}

