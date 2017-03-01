// import react
import React, { Component } from 'react';

// import react-native
import { ScrollView, View, Text } from 'react-native';

// import stylesheet
import showListStyles from './ShowsList-styles.js';

// import custom components
import Show from '../show/Show.js';
import Header from '../header/header-component.js';

// import helper components
import ShowIf from '../../helper-components/show-if/ShowIf.js';
import WaitMsg from '../../helper-components/wait-msg/WaitMsg.js';
import EndItem from '../../helper-components/end-item/EndItem.js';

// import services
import Color from '../../services/random-color/randomColor.js';

class ShowsList extends Component {
    
    state = {
        showsArray: [],
        gotShows: false,
        defaultPictures: {},
        gotArtists: false
    }

    componentWillMount(){
        
        // a holder for 'this', so it can be passed easily to callbacks with their own 'this'
        var thisShowsList = this;

        // XMLHttpRequest for default pictures
        var defaultsXhr = new XMLHttpRequest();
        defaultsXhr.onreadystatechange = function(){            
            if(defaultsXhr.responseText !== ''){
                populateDefaultPics(defaultsXhr, thisShowsList);
            }
        };
        defaultsXhr.open('GET', 
                'http://showsaround.s3-website-eu-west-1.amazonaws.com/artists.json',
                true);
        defaultsXhr.send(null);

        
        // XMLHttpRequest for the shows
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(those){            
            if(xhr.responseText !== ''){
                showsStateChanged(thisShowsList);
            }
        };
        xhr.open('GET', 
                 'http://showsaround.s3-website-eu-west-1.amazonaws.com/shows.json',
                 true);
        xhr.send(null);

        // when shows request gets a result - activate this function
        function showsStateChanged(that){
            // TODO - add check if status === 0,
            // and responseText is "no connection"
            if(xhr.status === 200){
                if(xhr.responseText){
                    
                    // when finally got data in the request,
                    // start manipulationg it to make into a real object

                    // TODO - continue manipulating the data.
                    // make it into an object containing only the shows that
                    // needs to be shown - 
                    // their date hasn't happened yet, and they have data
                    
                    // debugger;
                    
                    var rawShowsArray = xhr.responseText.replace(/updateShows/g, '');
                    
                    // debugger;
                    
                    rawShowsArray = rawShowsArray.replace(/\r?\n|\r/g, '');
                    
                    // debugger;
                    
                    rawShowsArray = rawShowsArray.substring(1);
                    rawShowsArray = rawShowsArray.slice(0, -2);
                    // rawShowsArray = rawShowsArray.replace(/\\/g, '\\');
                    
                    // debugger;
                    
                    
                    var fullArray = JSON.parse(rawShowsArray);
                    const now = new Date();

                    onlyDataArray = fullArray.filter(function(show){
                        return show.artist !== '';
                    })

                    filteredArray = fullArray.filter(findAfterToday.bind(null, now));

                    that.setState({
                        showsArray: filteredArray,
                        gotShows: true
                    });
                }
            }
        }

        // this function is used to filter the shows list 
        // for only shows that hasn't happened yet
        function findAfterToday(now, show){
                        
            const showDate = new Date(show.date);
            
            // console.log('showDate: ' + showDate);
            // console.log(showDate > now);
        
            if(show.date){
                return showDate > now;
            } else {
                return false;
            }
        }

        // when default pictutes request gets a result - activate this function
        function populateDefaultPics(result, that){
    
            if(result.status === 200){
                if(result.responseText){
                    
                    // when finally got data in the request,
                    // start manipulationg it to make into a real object

                    // TODO - continue manipulating the data.
                    // make it into an object containing only the shows that
                    // needs to be shown - 
                    // their date hasn't happened yet, and they have data
                    
                    // debugger;
                    
                    var rawShowsArray = result.responseText.replace(/updateArtists/g, '');
                    
                    // debugger;
                    
                    rawShowsArray = rawShowsArray.replace(/\r?\n|\r/g, '');

                    // debugger;
                    
                    rawShowsArray = rawShowsArray.substring(1);
                        
                    // debugger;
                        
                    rawShowsArray = rawShowsArray.slice(0, -2);
                    
                    // debugger;
                    
                    rawShowsArray = rawShowsArray.replace(/'/g, "`");
                    rawShowsArray = rawShowsArray.replace(/\s\s+/g, ' ');
                    
                    debugger;
                    
                    var j = 0;
                    for (var i = 100; i < rawShowsArray.length; i += 100){
                        
                        debugger;
                        
                        console.log(rawShowsArray.substr(j, i));

                        j = i;
                    }

                    debugger;
                    
                    var fullArray = JSON.parse(rawShowsArray);
                    
                    defaultPictures = fullArray;
                    that.setState({
                        defaultPictures: fullArray,
                        gotArtists: true
                    })
                    
                }
            }
        }
    }

    scrollDown() {
        setTimeout(() => { this.view.scrollToEnd(); }, 1)
    }

    render(){

        let theArray = [];
        if(this.state.showsArray.length){
            theArray = this.state.showsArray;
        }

        const defaultArtist = {
            Indie: '',
            details: '',
            english: '',
            genres: '',
            image: 'https://www.chicagoentertainmentagency.com/blog/wp-content/uploads/2014/02/Live-Music.jpg'
        }

        return (
            <ShowIf condition={this.state.gotShows && this.state.gotArtists} else={<WaitMsg msg={'please wait...'}/>}>
                <ScrollView ref={view => this.view = view} >
                    {theArray.map((show, idx) => {

                        let thisArtist = this.state.defaultPictures[show.artist.split(',')[0]] || defaultArtist;

                        return (
                            <View key={`${show.artist} - ${show.date} - ${idx}`}>
                                {/* 
                                    this will render before the first item, and will 
                                    serve as buffer before header    
                                 */}
                                <ShowIf condition={idx === 0}>
                                    <View style={{borderTopWidth: 2, borderColor: Color.getRandom()}}></View>
                                </ShowIf>
                                
                                {/* 
                                    this is the actual item
                                 */}
                                <Show key={show.artist + idx} idx={idx} isLast={idx === theArray.length - 1} show={show} artist={thisArtist} parent={this}></Show>

                                {/* 
                                    this will render after the last item, and will be used 
                                    as a buffer for the ScrollView glitch
                                    (the actual last item will be fully visible)    
                                 */}
                                <ShowIf condition={idx === theArray.length - 1}>
                                    <EndItem></EndItem>
                                </ShowIf>

                            </View>
                        )
                    })}
                </ScrollView>
            </ShowIf>
        )
    }
};

export default ShowsList;
