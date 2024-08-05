
import './index.css'
import {getAuthUrl} from './utils/auth.js'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'


const code = new URLSearchParams(window.location.search).get('code')

const AUTH_URL = getAuthUrl()

// Context
import UserProvider from './context/UserContext.jsx'


function App() {
	return (
		<>
			{code ?
			<UserProvider code={code}>
				<Dashboard />
			</UserProvider>
			: <Login auth_url={AUTH_URL}/>
			}
		</>
	)
}

export default App
