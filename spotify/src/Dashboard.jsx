import {useEffect} from 'react'
import PropTypes from 'prop-types'
import useAuth from './hooks/useAuth'

function Dashboard({code}) {

    
    const accessToken = useAuth(code)

    useEffect(() => {
        if(accessToken) {
            console.log("Access Granted", accessToken)
        }
    }, [accessToken])
    return(
        <div>
            <h1>Logged in with spotify</h1>
        </div>
    )
}

Dashboard.propTypes = {
    code: PropTypes.string.isRequired
}
export default Dashboard