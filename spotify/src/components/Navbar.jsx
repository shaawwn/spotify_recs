

import SearchInput from './Search'
import {useUserContext} from '../context/UserContext'


export default function Navbar() {
    const user = useUserContext().user
    const redirectUri = import.meta.env.VITE_REDIRECT_URI
    function handleLogout() {
        window.location.href="https://accounts.spotify.com/en/logout"
    }
    
    return(
        <nav className="navbar">
            <h2 className="text-[16px] xl:text-2xl">Hello, {user.display_name} </h2>
            <SearchInput />
            <div className="flex gap-[10px]">
                <a className="button green" onClick={handleLogout}>Logout</a>
                <a className="button green" href={redirectUri}>Back</a>
            </div>
        </nav>
    )
}