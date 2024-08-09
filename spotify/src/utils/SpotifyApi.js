
export default class SpotifyApi {

    constructor(accessToken, userID) {
        this.accessToken = accessToken
        this.userID = userID
        this.apiUrl = 'https://api.spotify.com/v1/'
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