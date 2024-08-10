// import {useEffect, useState, useRef} from 'react'

import {useUserContext} from './context/UserContext'
// import {useSpotifyApiContext} from './context/SpotifyApiContext'

import useRecommendations from './hooks/useRecommendations'
import Navbar from './components/Navbar'
import MainViewport from './components/MainViewport'
import Grid from './components/CardGrid'
import TrackTable from './components/TrackTable'
import Panel from './components/Panel'

export default function Dashboard() {
    const {user} = useUserContext()

    const [seedTracks, seedArtists,recommendedArtists, recommendedTracks, getRecsFromArtistSeeds] = useRecommendations()
    // const renderCount = useRef(0)
    // renderCount.current++
    // console.log("renders: ", renderCount.current)


    return(
        <div>
            {user && <Navbar />}
            <MainViewport>
                {seedTracks && seedArtists && 
                    <div className={window.innerWidth < 764? "flex flex-col" :"flex"}>
                        <div className="flex flex-col"> 
                            {recommendedArtists && 
                                <Panel title="Recommended Artists">
                                    <Grid items={recommendedArtists}
                                    limit={10}
                                    getRecs={getRecsFromArtistSeeds}
                                    />
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
                                items={seedArtists}
                                limit={20}
                                getRecs={getRecsFromArtistSeeds}
                                />
                        </Panel>
                    </div>
                }
            </MainViewport>
        </div>
    )
}

