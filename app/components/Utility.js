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
    }
};

export default Utility;