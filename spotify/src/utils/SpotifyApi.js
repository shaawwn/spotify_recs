
export default class SpotifyApi {

    constructor(accessToken, userID) {
        this.accessToken = accessToken
        this.userID = userID
        this.apiUrl = 'https://api.spotify.com/v1/'
    }

    addTracksToPlaylist(playlistID, tracks) {

        fetch(this.apiUrl + `playlists/${playlistID}/tracks`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            },
            body: JSON.stringify({
                uris: tracks
            })
        }).then((response) => {
            if(!response.ok) {
                throw new Error('Error adding items to playlist')
            }
            return response.json()
        }).then((data) => {
            console.log("successfully added items to playlist")
        })
    }

    saveAsPlaylist(tracks) {
        // create and add items to playlist
        fetch(this.apiUrl + `users/${this.userID}/playlists`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.accessToken}`
            },
            body: JSON.stringify({
                name: "My new recommended playlist"
            })
        }).then((response) => {
            if(!response.ok) {
                throw new Error("Error creating new playlist")
            }
            return response.json()
        }).then((data) => {
            // returns a playlist, make calls to add items to this playlist here? Add items ([items])

            // delay in spotify's servers
            // this.addTracksToPlaylist(data.id, tracks)
            // console.log("playlist", data)
            // this.addTracksToPlaylist(data.id, tracks)
            setTimeout(() => {
                this.addTracksToPlaylist(data.id, tracks)
            }, 1000)
        })
    }

    getCurrentUser() {
        return fetch(this.apiUrl + `me`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error('Error getting related artists')
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("err: ", err)
        })
    }
    getRelatedArtists(id) {
        // spotify artist id
        return fetch(this.apiUrl + `artists/${id}/related-artists`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if(!response.ok) {
                throw new Error('Error getting related artists')
            }
            return response.json()
        }).then((data) => {
            return data
        }).catch((err) => {
            console.log("err: ", err)
        })
    }

    getUserTopItems(types) {
        // types = 'tracks' or 'artists'
        return fetch(this.apiUrl + `me/top/${types}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error("Error getting users top items")
            }
            return response.json()
        }).then((data) => {
            return data
        })
    }

    getTrackRecommendations(artists, tracks, genres) {
        // artists, tracks, genres comma seperated list of spotify IDs and genres (see spotify docs for list of seed genres)
        return fetch(`${this.apiUrl}recommendations?seed_artists=${artists}&seed_tracks=${tracks}&seed_genres=${genres}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Error getting track recommendations");
            }
            return response.json();
        }).then((data) => {
            return data;
        });
    }
    

}