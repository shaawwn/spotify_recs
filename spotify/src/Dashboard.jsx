import {useEffect, useState} from 'react'

import {useUserContext} from './context/UserContext'
import {useSpotifyApiContext} from './context/SpotifyApiContext'

import Navbar from './components/Navbar'
import MainViewport from './components/MainViewport'
import Grid from './components/CardGrid'
import TrackTable from './components/TrackTable'
import Panel from './components/Panel'

export default function Dashboard() {
    const {user} = useUserContext()
    const {spotifyApi} = useSpotifyApiContext()

    const [topArtists, setTopArtists] = useState([])
    const [topTracks, setTopTracks] = useState([])
    const [recommendedArtists, setRecommendedArtists] = useState([])
    const [recommendedTracks, setRecommendedTracks] = useState([]) 

    useEffect(() => {

        const fetchUserTopItems  = async () => {
            try {
                const [artistResponse, trackResponse] = await Promise.all([
                    spotifyApi.getUserTopItems('artists'),
                    spotifyApi.getUserTopItems('tracks')
                ])
                setTopArtists(artistResponse.items)
                setTopTracks(trackResponse.items) 
            } catch(error) {
                console.log("error getting users top items", error)
            }
        }
        fetchUserTopItems()

    }, [spotifyApi, user])

    useEffect(() => {

        const fetchRecommendations = async () => {
            try {
                const artistRecs = await spotifyApi.getRelatedArtists(topArtists[0].id)
                setRecommendedArtists(artistRecs.artists)
    
                const trackRecs = await spotifyApi.getTrackRecommendations([], [topTracks[0].id], [])
                setRecommendedTracks(trackRecs.tracks)
            } catch(error) {
                console.log("error getting recommended items", error)
            }
        }
        if(spotifyApi && topArtists.length > 0 && topTracks.length > 0) {
            fetchRecommendations()
        }
    }, [topTracks, topArtists])

    return(
        <div>
            {user && <Navbar />}
            <MainViewport>
                {topTracks.length > 0 && topArtists.length > 0 && 
                    <div className="flex">
                        <div className="flex flex-col bg-red-400">
                            {recommendedArtists && 
                                <Panel title="Recommended Artists">
                                    <Grid items={recommendedArtists}
                                    limit={10}/>
                                </Panel>}
                            {recommendedTracks &&
                                <Panel title="Recommended Tracks">
                                    <TrackTable items={recommendedTracks}
                                    />
                                </Panel>
                            }
                        </div>
                        <Panel title="Top Artists">
                            <Grid 
                                items={topArtists}
                                limit={20}
                                />
                        </Panel>
                    </div>
                }
            </MainViewport>
        </div>
    )
}

