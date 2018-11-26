import SpotifyStore from "./SpotifyStore";

const Utility = {
    checkArtistsNumber: (artists:any[] = '') => {
        let artistsArray = artists;
        let artistToReturn = '';
        if (artistsArray.length > 0) {
            for (let i = 0; i < artistsArray.length; i++) {
                if (artistToReturn != '') {
                    artistToReturn = artistToReturn + ', ' + artistsArray[i].name;
                }
                else {
                    artistToReturn = artistsArray[i].name;
                }
            }
        }
        else {
            artistToReturn = artisartistsArrayts[0].name;
        }
        return artistToReturn;
    },

    checkSizeName: (name:string = '', size:number = '') => {
        return name.length < size ? name : name.substring(0, size) + '...';
    },

    checkDate: (release_date:string = '') => {
        let date = new Date(release_date);
        return date.getFullYear();
    },

    refreshToken: () => {
        SpotifyStore('user_data').then((userData) => {
            let url = 'https://accounts.spotify.com/api/token';
            let options = {
                method: 'POST',
                headers: {
                    Authorization: 'Basic ' + userData.client_code,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'grant_type=refresh_token&refresh_token=' + userData.refresh_token,
            };
            fetch(url, options)
            .then((response) => {
                if (response.status == '200') {
                    console.log("The token has been refreshed successfully !");
                    return response.json();
                } else {
                    console.error('Cannot refresh token, error ' + response.status);
                }
            }).then((responseJson) => {
                SpotifyStore('user_data').then((userData) => {
                    userData.access_token = responseJson.access_token;
                    userData.expires_in = responseJson.expires_in.toString();

                    SpotifyStore('user_data', userData);
                });
            });
        });
    }
};

export default Utility;