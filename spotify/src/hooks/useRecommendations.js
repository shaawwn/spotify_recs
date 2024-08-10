import {useState, useEffect} from 'react'
import {useSpotifyApiContext} from '../context/SpotifyApiContext'

export default function useRecommendations() {

    const {spotifyApi} = useSpotifyApiContext()
    const [topTracks, setTopTracks] = useState(null) // top items are default state for recommendations, but getting recs can change dependin ont he seeds
    const [topArtists, setTopArtists] = useState(null)
    const [seedTracks, setSeedTracks] = useState(null)
    const [seedArtists, setSeedArtists] = useState(null)
    const [recommendedArtists, setRecommendedArtists] = useState(null)
    const [recommendedTracks, setRecommendedTracks] = useState(null) 

    function getRecsFromSeeds() {
        // get recs from both
    }

    async function getRecsFromArtistSeeds(id) {
        // feed it an artist id
        console.log("Getting recs for ", id)
        try {
            const recs = await spotifyApi.getRelatedArtists(id)
            console.log(recs)
            setRecommendedArtists(recs.artists)
        } catch (err) {
            console.log("err: ", err)
        }
    }

    const getRecsFromTrackSeeds = async () => {

        // I want to click on a track, call this funciton, and return recommendations
        try {
            const recs = await spotifyApi.getTrackRecommendations([], [], [])

            console.log("recs from seeds")
        } catch (err) {
            console.log("err: ", err)
        }
    }

    useEffect(() => {

        const fetchUserTopItems  = async () => {

            const fetchRecommendations = async (artists, tracks) => {
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
                setSeedTracks(artistResponse.items)
                setSeedArtists(artistResponse.items) 
                fetchRecommendations(artistResponse.items, trackResponse.items)
            } catch(error) {
                console.log("error getting users top items", error)
            }
        }
        if(spotifyApi) {
            fetchUserTopItems()
        }

    }, [spotifyApi])

    // console.log()

    return [seedTracks, seedArtists, recommendedArtists, recommendedTracks, getRecsFromArtistSeeds]
}