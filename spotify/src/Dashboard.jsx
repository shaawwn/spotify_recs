import {useEffect, useState} from 'react'

import {useUserContext} from './context/UserContext'
import {useAuthContext} from './context/AuthContext'
import {useSpotifyApiContext} from './context/SpotifyApiContext'

import Navbar from './components/Navbar'
import MainViewport from './components/MainViewport'
import DisplayTopItems from './components/DisplayTopItems'


export default function Dashboard() {
    const {user} = useUserContext()
    const {spotifyApi} = useSpotifyApiContext()

    const [topArtists, setTopArtists] = useState([])
    const [topTracks, setTopTracks] = useState([])


    useEffect(() => {
        const fetchUserTopItems = async (type) => {
            const {items} = await spotifyApi.getUserTopItems(type)
            if(type === 'tracks') {
                setTopTracks(items)
            } else if(type === 'artists') {
                setTopArtists(items)
            }
        }

        if(spotifyApi) {
            fetchUserTopItems('artists')
            fetchUserTopItems('tracks') 
        }
    }, [spotifyApi, user])


    return(
        <div>
            {user && <Navbar />}
            <MainViewport>
                {topTracks.length > 0 && topArtists.length > 0 && 
                    <div className="p-2">
                        <DisplayTopItems 
                            items={topTracks} 
                            type={'tracks'}
                            />
                        <DisplayTopItems 
                            items={topArtists}
                            type={'artists'}
                            />

                    </div>
                }
            </MainViewport>
        </div>
    )
}

