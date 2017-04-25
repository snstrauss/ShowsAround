
import { Platform } from 'react-native';

function makePicsArray(stages, isMultiShow, defaultPictures){
        
        const platform = Platform.OS;
        
        // check if stages is array
        if (stages.hasOwnProperty('0')){
            return;
        }
        
        const defaultPics = defaultPictures;
        const showsArr = stages.artist.split(', ');
        
        const picsArr = showsArr.map((artistName) => {

            return {
                artist: artistName,
                pic: getCorrectPic(artistName)
            }            
        })

        return picsArr;

        function getCorrectPic(artistName){

            let artistObj = defaultPics[artistName];

            if(artistObj){
                // if image url exists
                if(artistObj.image.length > 0){
                    // if image url is https, or from showsaround database

                    // http images should be shown on android...
                    // https requirement is an iOS issue
                    if(
                        (platform === 'android') ||
                        (artistObj.image.substring(0, 5) === 'https' ) || 
                        (artistObj.image.includes('showsaround.s3-website-eu-west-1.amazonaws.com'))
                    ){
                        return artistObj.image;
                    }
                }
            }


            // default: return turkey image
            return ('https://i1.wp.com/lenews.ch/wp-content/uploads/2015/12/The-turkey-bird-naming-confusion.jpg?resize=800%2C487');

        }

    }

    const picsArray = {
        make: makePicsArray
    }

    export default picsArray;