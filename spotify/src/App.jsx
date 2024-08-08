
import PropTypes from 'prop-types';
import {getAuthUrl} from './utils/auth.js'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'


const code = new URLSearchParams(window.location.search).get('code')

const AUTH_URL = getAuthUrl()

// Context
import UserProvider from './context/UserContext.jsx'
import AuthProvider from './context/AuthContext.jsx'
import SpotifyApiProvider from './context/SpotifyApiContext.jsx'

function Providers({code}) {

	return (
		<AuthProvider code={code}>
			<SpotifyApiProvider>
				<UserProvider>
					<Dashboard />
				</UserProvider>
			</SpotifyApiProvider>
		</AuthProvider>
	)
}

function App() {

	return (
		<>
			{code ?
			<Providers code={code} />
			: <Login auth_url={AUTH_URL}/>
			}
		</>
	)
}

export default App

Providers.propTypes = {
	code: PropTypes.string.isRequired
}