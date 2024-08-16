import {useEffect, useState, useRef} from 'react'
import {useAuthContext} from '../context/AuthContext'
import { useSpotifyApiContext } from '../context/SpotifyApiContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faBackward, faForward, faTabletScreenButton, faDesktop, faLaptop, faMobileScreen} from '@fortawesome/free-solid-svg-icons'

import DefaultImage from '../assets/images/default.png'

export default function Webplayer() {
    const {spotifyApi} = useSpotifyApiContext()
    const accessToken = useAuthContext().accessToken
    const player = useRef(null)
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState();
    const [appDeviceId, setAppDeviceId] = useState()


    function disconnectPlayer() {
        player.current.removeListener('ready')
        player.current.removeListener('not_ready')
        player.current.removeListener('player_state_changed') 
        player.current.disconnect()
    }

    function renderWebplayerIfPlaying() {
        // IF the webplayback is current playing device, render controls and palybacks
        const webplayer = document.getElementById('webplayer')

        if(current_track) {

            // it keeps going back in forth
            if(webplayer.style.justifyContent === 'space-between') {
                webplayer.style.justifyContent = 'flex-end'
            } else {
                console.log("Switchin to space-between")
                webplayer.style.justifyContent = 'space-between'
            }
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
        if(appDeviceId) {
            return(
                <DevicesController spotifyApi={spotifyApi}/>
            )
        }
    }

    function initializeWebplayer() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            player.current = new window.Spotify.Player({
                name: 'SpotifyRecsPlayer',
                getOAuthToken: cb => { cb(accessToken); },
                volume: 0.5
            });

            player.current.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                setAppDeviceId(device_id)
            });
    
            player.current.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.current.addListener('player_state_changed', ( state => {
                if (!state) {
                    return;
                }
            
                setTrack(state.track_window.current_track);
                setPaused(state.paused); // pause on switch

            
                player.current.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });
            
            }));
            player.current.connect();
        };
    }
    
    useEffect(() => {
        const script = document.createElement("script");
        if(player.current) {
            disconnectPlayer()
        }

        if(accessToken) {
            script.src = "https://sdk.scdn.co/spotify-player.js"; 
            script.async = true;
            document.body.appendChild(script);
            initializeWebplayer()
        }

        return () => {
            const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]');
            const existingScript = document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"')
            if (iframe && existingScript) {
                document.body.removeChild(existingScript)
                document.body.removeChild(iframe) 
                console.log(existingScript) 
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
            <div id="webplayer" className="webplayer">
                {renderWebplayerIfPlaying()}
                {renderDevicesAvailable()}
            </div>
         </>
    )
}

function DevicesController({spotifyApi}) {

    // faTabletScreenButton, faDesktop, faLaptop, faMobileScreen
    // needs to be positioned to the right
    const [devices, setDevices] = useState()

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await spotifyApi.getAvailableDevices();
                // console.log("Devices", response);
                setDevices(response.devices); 
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        };
        fetchDevices();
    }, [])

    function transferPlayback(id) {
        // browser is one step behind when it gets to this.
        // console.log("Transfering to : ", id)
        // const fetchDevices = async () => {
        //     try {
        //         const response = await spotifyApi.getAvailableDevices();
                
        //         console.log("Devices", response);
        //     } catch (error) {
        //         console.error("Error fetching devices:", error);
        //     }
        // };
        // fetchDevices();//

        spotifyApi.transferPlayback(id)
    }

    function handleClick() {
        const deviceMenu = document.getElementsByClassName('device-menu')[0]
// 
        if(deviceMenu) {
            if(deviceMenu.style.display === 'flex') {
                deviceMenu.style.display = 'none'
            } else {
                deviceMenu.style.display = 'flex'   
            }
        }
    }
    return(
        <div>
            {/* Select device menu */}
            <div className="device-menu">
                {devices ? 
                <>
                    {devices.map((device, index) =>
                        <div key={index} className="flex gap-[10px]">
                            <FontAwesomeIcon 
                                icon={faTabletScreenButton} 
                                size="2x"
                                color={device.is_active ? "#1DB954" : "white"}
                                onClick={() => transferPlayback(device.id)}
                            />

                            <p>{device.name}</p>
                        </div>
                    )}
                </>
                :null
                }
            </div>
            <FontAwesomeIcon 
                icon={faTabletScreenButton} 
                size="2x"
                color="#1DB954"
                onClick={handleClick}
            />

        </div>
    )
}