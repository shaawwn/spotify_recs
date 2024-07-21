import {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import useAuth from './hooks/useAuth'

function Dashboard({code}) {

    const [user, setUser] = useState()
    
    const accessToken = useAuth(code)

    useEffect(() => {
        if(accessToken && !user) {
            fetch(`https://api.spotify.com/v1/me`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then((response) => response.json())
            .then((data) => {
                console.log(data)
                setUser(data)
            })
        }
    }, [accessToken])
    return(
        <div>
            {user ? <h1>Hello, {user.display_name}</h1> : <h1>Welcome, guest</h1>}

            <a href="https://www.spotify.com/logout">Logout</a>
            <hr/>
            <a href="http://localhost:5173">Back</a>
        </div>
    )
}

Dashboard.propTypes = {
    code: PropTypes.string.isRequired
}
export default Dashboard