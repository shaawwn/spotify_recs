import {useState, useEffect} from 'react'

export default function useGetRecommendations(type, id) {
    const [artistRecommendations, setArtistRecommendations] = useState()
    const [trackRecommendations, setTrackRecommendations] = useState()

    function getArtistRecommedations() {
        fetch(`https://api.spotify.com/vi/artists/${id}/related-artists`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.id) {
                throw new Error ("Error getting related artists")
            }
            return response.json()
        }).then((data) => {
            setArtistRecommendations(data)
        })
    }

    function getTrackRecommendations() {
        fetch(`https://api.spotify.com/vi/recommendations?seed_artists=${}seed_tracks=${}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then((response) => {
            if(!response.id) {
                throw new Error ("Error getting related artists")
            }
            return response.json()
        }).then((data) => {
            setArtistRecommendations(data)
        })
    }

    useEffect(() => {
        
    }, [])

    return {artistRecommendations, trackRecommendations}
}