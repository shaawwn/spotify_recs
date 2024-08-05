import {useEffect} from 'react'
// import PropTypes from 'prop-types'

import {useUserContext} from './context/UserContext'
import {useAuthContext} from './context/AuthContext'
import Navbar from './components/Navbar'



export default function Dashboard() {
    const user = useUserContext().user
    const accessToken = useAuthContext().accessToken

    useEffect(() => {
        
    }, [accessToken])
    return(
        <div>
            {user && <Navbar />}
        </div>
    )
}

Dashboard.propTypes = {

}

