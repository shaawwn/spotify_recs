import {useState, useEffect} from 'react'
import {useSpotifyApiContext} from '../context/SpotifyApiContext'

export default function useRecommendations() {

    const {spotifyApi} = useSpotifyApiContext()

    // topTracks, topArtists are static state as default
    const [topTracks, setTopTracks] = useState(null) 
    const [topArtists, setTopArtists] = useState(null)

    // seedTracks, seeedArtists are dynamic state that will update when items are clicked to get new recc
    const [seedTracks, setSeedTracks] = useState(null)
    const [seedArtists, setSeedArtists] = useState(null)

    const [recommendedArtists, setRecommendedArtists] = useState(null)
    const [recommendedTracks, setRecommendedTracks] = useState(null) 

    function getRecsFromSeeds() {
        // get recs from both
    }

    async function getRecsFromArtistSeeds(artist) {
        // feed it an artist id
        console.log("Getting recs for ", artist.id, seedArtists[0].name)
        try {
            const recs = await spotifyApi.getRelatedArtists(artist.id)
            console.log(recs)
            setRecommendedArtists(recs.artists)
            setSeedArtists([artist]) // set to the artist objects
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

                // these literally just exist to be the first default tracks, but I want to be able to navigate around recommendatiosn
                setTopArtists(artistResponse.items)
                setTopTracks(trackResponse.items)

                // these don't necessarily have to be the whole list, these are just the things that recommendations are being derived from, by default the FIRST in each list
                setSeedTracks(trackResponse.items)
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



    return [seedTracks, seedArtists, topArtists, topTracks, recommendedArtists, recommendedTracks, getRecsFromArtistSeeds]
}