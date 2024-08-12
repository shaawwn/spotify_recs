import {useEffect, useState} from 'react'
import {useAuthContext} from '../context/AuthContext'

import DefaultImage from '../assets/images/default.png'

export default function Webplayer() {

    const accessToken = useAuthContext().accessToken
    const [player, setPlayer] = useState(undefined)
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState();

    useEffect(() => {

        if(accessToken) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
        
            document.body.appendChild(script);
            window.onSpotifyWebPlaybackSDKReady = () => {
    
                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: cb => { cb(accessToken); },
                    volume: 0.5
                });
        
                setPlayer(player);
        
                player.addListener('ready', ({ device_id }) => {
                    console.log('Ready with Device ID', device_id);
                });
        
                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });
    
                player.addListener('player_state_changed', ( state => {
                    console.log("Player state", state)
                    if (!state) {
                        return;
                    }
                
                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);
                
                
                    player.getCurrentState().then( state => { 
                        (!state)? setActive(false) : setActive(true) 
                    });
                
                }));
        
                  
                player.connect();
        
            };
        }

    
    }, [accessToken]);



    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <h1>Player here</h1>
                    {current_track ?
                    <img  src={current_track.album.images[0].url} 
                    className="grid__item" alt="" /> 
                    :<img className="grid__item" src={DefaultImage}></img>
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
                </div>
            </div>
         </>
    )
    
}