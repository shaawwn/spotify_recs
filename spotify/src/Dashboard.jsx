import {useEffect, useState, useRef} from 'react'

import {useUserContext} from './context/UserContext'
import {useSpotifyApiContext} from './context/SpotifyApiContext'

import useRecommendations from './hooks/useRecommendations'
import Navbar from './components/Navbar'
import MainViewport from './components/MainViewport'
import Grid from './components/CardGrid'
import TrackTable from './components/TrackTable'
import Panel from './components/Panel'

export default function Dashboard() {
    const {user} = useUserContext()
    const {spotifyApi} = useSpotifyApiContext()

    // const [topArtists, setTopArtists] = useState(null)
    // const [topTracks, setTopTracks] = useState(null)


    const [topTracks, topArtists,recommendedArtists, recommendedTracks] = useRecommendations()

    const renderCount = useRef(0)
    renderCount.current++
    console.log("renders: ", renderCount.current)


    // useEffect(() => {


    // }, [spotifyApi])

    return(
        <div>
            {user && <Navbar />}
            <MainViewport>
                {topTracks && topArtists && 
                    <div className="flex">
                        <div className="flex flex-col">
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

