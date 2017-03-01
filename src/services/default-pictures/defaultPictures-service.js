
let defaultPictures = {};

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){            
    
    if(xhr.responseText !== ''){
        populateDefaultPics(xhr.responseText);
    }
    
};

xhr.open('GET', 
        'http://showsaround.s3-website-eu-west-1.amazonaws.com/artists.json',
        true);
xhr.send(null);

function populateDefaultPics(data){
    
    if(xhr.status === 200){
        if(xhr.responseText){
            
            // when finally got data in the request,
            // start manipulationg it to make into a real object

            // TODO - continue manipulating the data.
            // make it into an object containing only the shows that
            // needs to be shown - 
            // their date hasn't happened yet, and they have data
            debugger;
            var rawShowsArray = xhr.responseText.replace(/updateArtists/g, '');
            rawShowsArray = rawShowsArray.substring(1);
            rawShowsArray = rawShowsArray.slice(0, -2);
            var fullArray = JSON.parse(rawShowsArray);
            
            defaultPictures = fullArray;
            debugger;
            
        }
    }
}

export default defaultPictures;
