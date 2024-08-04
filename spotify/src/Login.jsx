import PropTypes from 'prop-types';

import SpotifyLogoGreen from './assets/logos/Spotify_Logo_RGB_Green.png'

export default function Login({auth_url}) {
    return(
        <>
            <div className="viewport-centered">
                <img className="logo-med" src={SpotifyLogoGreen}/>
                <h1>Spotify Starter Kit</h1>
                <a className="button green" href={auth_url}>Login</a>
            </div>
        </>
    )
}

Login.propTypes = {
    auth_url: PropTypes.string.isRequired
}