import {useState, useEffect} from 'react'
import {useSpotifyApiContext} from '../context/SpotifyApiContext'

export default function useRecommendations() {

    const {spotifyApi} = useSpotifyApiContext()
    const [topTracks, setTopTracks] = useState(null)
    const [topArtists, setTopArtists] = useState(null)
    const [seedTracks, setSeedTracks] = useState(null)
    const [seedArtists, setSeedArtists] = useState(null)
    const [recommendedArtists, setRecommendedArtists] = useState(null)
    const [recommendedTracks, setRecommendedTracks] = useState(null) 

    useEffect(() => {

        const fetchUserTopItems  = async () => {

            const fetchRecommendations = async (artists, tracks) => {
                console.log("Getting recs")
                try {
                    const artistRecs = await spotifyApi.getRelatedArtists(artists[0].id)
                    setRecommendedArtists(artistRecs.artists)
        
                    const trackRecs = await spotifyApi.getTrackRecommendations([], [tracks[0].id], [])
                    setRecommendedTracks(trackRecs.tracks)
                } catch(error) {
                    console.log("error getting recommended items", error)
                }
            }
            try {
                const [artistResponse, trackResponse] = await Promise.all([
                    spotifyApi.getUserTopItems('artists'),
                    spotifyApi.getUserTopItems('tracks')
                ])
                setTopArtists(artistResponse.items)
                setTopTracks(trackResponse.items) 
                fetchRecommendations(artistResponse.items, trackResponse.items)

                // I could probably get default recs here

            } catch(error) {
                console.log("error getting users top items", error)
            }
        }
        if(spotifyApi) {
            fetchUserTopItems()
        }

    }, [spotifyApi])

    // useEffect(() => {
    //     console.log("getting recs useEffect", spotifyApi)
    //     if(spotifyApi) {
    //         const fetchRecommendations = async () => {
    //             try {
    //                 const artistRecs = await spotifyApi.getRelatedArtists(topArtists[0].id)
    //                 setRecommendedArtists(artistRecs.artists)
        
    //                 const trackRecs = await spotifyApi.getTrackRecommendations([], [topTracks[0].id], [])
    //                 setRecommendedTracks(trackRecs.tracks)
    //             } catch(error) {
    //                 console.log("error getting recommended items", error)
    //             }
    //         }
    //         if(topArtists && topTracks && !recommendedArtists || !recommendedTracks) {
    //             console.log("Ready to get recs in hook", topTracks, topArtists)
    //             console.log(recommendedArtists, recommendedTracks)
    //             fetchRecommendations()
    //         } else {
    //             console.log("Not quite ready to get recs in hook", topTracks, topArtists)
    //         }
    //     }

    // }, [])

    // console.log("hook recs", recommendedArtists, recommendedTracks)
    return [topTracks, topArtists, recommendedArtists, recommendedTracks]
}