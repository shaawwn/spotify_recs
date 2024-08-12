import {useRef} from 'react'

import {useUserContext} from './context/UserContext'
// import {useSpotifyApiContext} from './context/SpotifyApiContext'

import useRecommendations from './hooks/useRecommendations'
import Webplayer from '../src/components/WebPlayer'
import Navbar from './components/Navbar'
import MainViewport from './components/MainViewport'
import Grid from './components/CardGrid'
import TrackGrid from './components/TrackGrid'
import TrackTable from './components/TrackTable'
import Panel from './components/Panel'


// HOC

export default function Dashboard() {
    const {user} = useUserContext()

    const [seedTracks, seedArtists,topArtists, topTracks, recommendedArtists, recommendedTracks, getRecsFromArtistSeeds, getRecsFromTrackSeeds] = useRecommendations()

  
    const renderCount = useRef(0)
    renderCount.current++
    // console.log("renders: ", renderCount.current)

    function renderTopItems() {

        return(
            <div className="flex flex-col">
            <Panel title="Top Artists">
                <Grid 
                    items={topArtists}
                    limit={20}
                    getArtistRecs={getRecsFromArtistSeeds}
                    getTrackRecs={getRecsFromTrackSeeds}
                    tracks={false}
                    artists={true}
                    />
                    
            </Panel>
        </div>
        )
    }

    function renderRecommendedItems() {
        return (
            <div className="flex flex-col"> 
            {recommendedArtists && 
                <Panel title={`Similar to ${seedArtists[0].name}, select to get a playlist`}>
                    <Grid items={recommendedArtists}
                    limit={10}
                    getArtistRecs={getRecsFromArtistSeeds}
                    getTrackRecs={getRecsFromTrackSeeds}
                    artist={false}
                    tracks={true}
                    />
                </Panel>
                }

            {recommendedTracks ?
            <Panel title={`Recommended tracks based on songs you like`}>
                <TrackTable 
                    items={recommendedTracks}
                    getRecs={getRecsFromTrackSeeds}
            />
            </Panel>
            :<Panel title="Select from your top tracks to get a recommended playlist">
                
            <TrackGrid 
            items={topTracks} 
            getRecs={getRecsFromTrackSeeds}
            /></Panel>
            }
        </div>
        )
    }

    return(
        <div>
            {user && <Navbar />}
            <MainViewport>
                {seedTracks && seedArtists && 
                    // This is the main dashboard dic
                    <div className={window.innerWidth < 764? "flex flex-col" :"flex justify-center gap-[10px]"}>
                        {renderRecommendedItems()}
                        {renderTopItems()}
                    </div>
                }
            </MainViewport>
            <Webplayer />
        </div>
    )
}

