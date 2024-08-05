import React, {useState, useContext, useEffect} from 'react'
import PropTypes from 'prop-types'


import {useAuthContext} from './AuthContext'
const UserContext = React.createContext()


// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
    return useContext(UserContext)
}


export default function UserProvider({children}) {

    const accessToken = useAuthContext().accessToken
    const [user, setUser] = useState()
    
    useEffect(() => {
        if(accessToken && !user) {
            fetch(`https://api.spotify.com/v1/me`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then((response) => {
                if(!response.ok) {
                    throw new Error('Failed to fetch user data')
                }
                return response.json()
            })
            .then((data) => {
                setUser(data)
            }).catch((err) => {
                console.log("Error fetching user data", err)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return(
        <>
            <UserContext.Provider value={{user}}>
                {children}
            </UserContext.Provider>
        </>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};