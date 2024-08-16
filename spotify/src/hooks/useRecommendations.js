import {useState, useEffect} from 'react'
import {useSpotifyApiContext} from '../context/SpotifyApiContext'

import {getRandoms, getRecArtistArray} from '../utils/utils'

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

    const [recommendedArtistPlaylist, setRecommendedArtistPlaylist] = useState(null) 

    function getRecsFromSeeds() {
        // get recs from both
    }

    async function genPlaylistFromRecommendedArtists() {
        // using seedArtists, which is an array of artists, generate recommended tracks. Ignore the first item, that is the artist whom the recs were generated from
    }

    async function getRecsFromArtistSeeds(artist) {
        // feed it an artist id
        try {
            const recs = await spotifyApi.getRelatedArtists(artist.id)
            setRecommendedArtists(recs.artists)

            // set seeds for track recommendations
            const indices = getRandoms(5, recs.artists.length)
            const arr = getRecArtistArray(indices, recs.artists)
            arr.splice(0,0, artist)
            setSeedArtists(arr)
        } catch (err) {
            console.log("err: ", err)
        }
    }

    async function getRecsFromTrackSeeds(artists, tracks, genres, reset=false) {
        // tracks - an array of trackIds, max 5
        if(reset === true) {
            setRecommendedTracks(null)
            return
        }
        try{
            const recs = await spotifyApi.getTrackRecommendations(artists, tracks, genres)
            setRecommendedTracks(recs.tracks)
            setSeedTracks(tracks)
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



    return [seedTracks, seedArtists, topArtists, topTracks, recommendedArtists, recommendedTracks, getRecsFromArtistSeeds, getRecsFromTrackSeeds]
}