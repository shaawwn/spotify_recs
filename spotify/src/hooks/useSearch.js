import { useState } from 'react'
import {useAuthContext} from '../context/AuthContext'


export default function useSearch() {
    const accessToken = useAuthContext().accessToken
    const [searchResults, setSearchResults] = useState([])
    const searchTypes = 'artist'
    function search(queryString) {
        console.log("Querying spotify database...", queryString)
        fetch(`https://api.spotify.com/v1/search?q=${queryString}&type=${searchTypes}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
        .then((data) => {
            console.log("Search results from Spotify: ", data)
            setSearchResults(data)
        }).catch((err) => {
            console.log("Err on search", err)
        })
    }


    return [search, searchResults]
}