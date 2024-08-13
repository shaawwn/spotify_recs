import {useEffect, useState, useRef} from 'react'
import {useAuthContext} from '../context/AuthContext'
import { useSpotifyApiContext } from '../context/SpotifyApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faBackward, faForward, faTabletScreenButton} from '@fortawesome/free-solid-svg-icons'

import DefaultImage from '../assets/images/default.png'

export default function Webplayer() {
    const {spotifyApi} = useSpotifyApiContext()
    const accessToken = useAuthContext().accessToken
    const player = useRef(null)
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState();
    const [devices, setDevices] = useState()


    function disconnectPlayer() {
        player.current.removeListener('ready')
        player.current.removeListener('not_ready')
        player.current.removeListener('player_state_changed') 
        player.current.disconnect()
    }

    function renderWebplayerIfPlaying() {
        // IF the webplayback is current playing device, render controls and palybacks
        if(current_track) {
            return(
                <>
                    {renderTrackDetails()}
                    {renderWebplayerControls()}
                </>
            )

        }
    }

    function renderTrackDetails () {
        return(<div className="flex">
            {current_track ?
                <img  src={current_track.album.images[0].url} 
                className="webplayer__image" alt="" /> 
                :<img className="webplayer__image" src={DefaultImage}></img>
            }
            <div className="now-playing__side">
                <div className="now-playing__name">
                    {current_track ? 
                        <p>{current_track.name}</p>
                        :<p>Track name</p>
                    }
                </div>

                <div className="now-playing__artist">
                    {current_track ? 
                    <p>{current_track.artists[0].name}</p>
                    :<p>No track</p>
                    }
                </div>
            </div>
        </div>)
    }

    function renderWebplayerControls() {
        if(player) {
            console.log("Devices set to current", current_track)
        }
        return(
            <div className="webplayer__controls">
            <div>
                <FontAwesomeIcon 
                    icon={faBackward} 
                    color={'black'}
                    size="2x"
                    className="webplayer__controls__control"
                    />
                <FontAwesomeIcon 
                    icon={faPlay} 
                    color={'black'}
                    size="2x"
                    />
                <FontAwesomeIcon 
                    icon={faForward} 
                    color={'black'}
                    size="2x"
                    />
            </div>
        </div>
        )
    }

    function renderDevicesAvailable() {
        return(
            <div>
                <FontAwesomeIcon 
                    icon={faTabletScreenButton} 
                    size="2x"
                    color="#1DB954"
                    />
            </div>
        )
    }
    useEffect(() => {
        const script = document.createElement("script");
        if(player.current) {
            disconnectPlayer()
            // return
        }

        if(accessToken) {
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
        
            document.body.appendChild(script);
            window.onSpotifyWebPlaybackSDKReady = () => {
    
                player.current = new window.Spotify.Player({
                    name: 'SpotifyRecsPlayer',
                    getOAuthToken: cb => { cb(accessToken); },
                    volume: 0.5
                });
    
                player.current.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });
        
                player.current.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
    
                player.current.addListener('player_state_changed', ( state => {
                    if (!state) {
                        return;
                    }
                
                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);
                
                    player.current.getCurrentState().then( state => { 
                        (!state)? setActive(false) : setActive(true) 
                    });
                
                }));

                // connect later
                player.current.connect();
            };
        }

        return () => {
            const existingScript = document.querySelector(`script[src="${script.src}"]`);
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
            if (player.current) {
                player.current.disconnect();
            }
        }
    }, [accessToken]);


    if(!spotifyApi) {
        return (
            <div>Loading spotifyApi...</div>
        )
    }

    return (
        <>
            <div className="webplayer">

                {/* Only render these if CURRENT PLAYING webplayer */}
                {/*  */}
                {/* {renderTrackDetails()}
                {renderWebplayerControls()} */}
                {renderWebplayerIfPlaying()}
                {/*  */}
                {renderDevicesAvailable()}
            </div>
         </>
    )
    
}