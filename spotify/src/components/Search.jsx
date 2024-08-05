import { useEffect } from 'react';
import useSearch from '../hooks/useSearch';

// This is just being used to TEST useSearch
// the idea is that you can plug useSearch where you need it to access its logic, in some apps that may mean putting it at the top level, and others it may mean putting it somehere lower, here I'll just test it with a esarch input

export default function SearchInput() {

    const search = useSearch()[0]

    function handleKeyPress(e) {
        // when pressing enter run the search function
        console.log(e.target.value)
        search(e.target.value)
    }

    useEffect(() => {
        // console.log("Search function? ", search)
    }, [])
    return(
        <>
            <input
                onKeyDown={(e) => handleKeyPress(e)}
                placeholder="Search for music"
            ></input>
        </>
    )
}

