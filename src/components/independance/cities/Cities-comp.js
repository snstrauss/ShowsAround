
import React, { Component } from 'react';

import { View, Text, ScrollView, Platform } from 'react-native';

import CitiesStyles from './Cities-styles';
const { view, text } = CitiesStyles;

import Accordion from 'react-native-collapsible/Accordion';

import Header from '../../header/header-component';
import MultiShow from '../../multi-show/MultiShow-comp';

import ShowIf from '../../../helper-components/show-if/ShowIf';
import WaitMsg from '../../../helper-components/wait-msg/WaitMsg';
import NavButton from '../../../helper-components//nav-button/NavButton-comp';
import EndItem from '../../../helper-components/end-item/EndItem';


class Cities extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerVisible: false,
        title: navigation.state.params.areaName
    })

    state = {
        allCities: {},
        gotCities: false
    }

    componentWillMount() {

        let allCities = {};
        let allShows = this.props.navigation.state.params.allCitiesShows;
        
        // create the allCities object
        allShows.forEach((show) => {

            let propName = show.location_eng || show.location;

            if (!allCities.hasOwnProperty(propName)) {
                allCities[propName] = [];
            }

            allCities[propName].push(show);
        })
        
        for (let cityName in allCities){
            if(allCities[cityName].length === 1){
                allCities[allCities[cityName][0].location] = allCities[cityName][0];
                delete allCities[cityName];
            }
        }
        
        this.setState({
            allCities: allCities,
            gotCities: true
        })
    }

    makePicsArray(stages){
   
        const defaultPics = this.props.navigation.state.params.defaultPictures;
        const showsArr = stages[0].artist.split(', ');
        
        const picsArr = showsArr.map((artistName) => ({
            artist: artistName,
            pic: defaultPics[artistName] ? defaultPics[artistName].image : 'https://i1.wp.com/lenews.ch/wp-content/uploads/2015/12/The-turkey-bird-naming-confusion.jpg?resize=800%2C487'
        }))

        return picsArr;

    }

    goToShowsInCity(cityName) {
        this.props.navigation.navigate('ShowsInCity', {
            cityName: cityName,
            showsInCity: this.state.allCities[cityName],
            defaultPictures: this.props.navigation.state.params.defaultPictures
        })
    }

    navButtonPressed(){
        console.warn('i was pressed : ) ');
    }

    multiShowPressed(){
        alert('multi pulti');
    }

    makePicsArray(stages, isSingleStage){
        
        const platform = Platform.OS;

        if (!isSingleStage){
            return;
        }
        
        const takeFrom = (typeof stages === 'object') ? stages[0] : stages;
        
        const defaultPics = this.props.navigation.state.params.defaultPictures;
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

    

    render() {
        
        const self = this;

        const theCities = this.state.allCities || {};
        
        const calcHeight = Object.keys(theCities).length > 4 ? 170 : 650;
        
        return (
            <View>

                <Header title={this.props.navigation.state.params.areaName}
                    goBack={this.props.navigation.goBack.bind(this)} />


                <ShowIf condition={this.state.gotCities} else={<WaitMsg msg={'please wait...'} />}>
                    <ScrollView>
                        {
                            Object.keys(theCities).map((cityName) => {
        
                                let isSingleStage = (!theCities[cityName].length);
                                
                                return (
                                    <ShowIf condition={isSingleStage} key={cityName} 
                                        else={
                                                <NavButton title={cityName}
                                                        titleColor="white"
                                                        imageSrc={require('../../../assets/genericCity.jpg')}
                                                        onPress={this.navButtonPressed.bind(this)} />
                                                }>
                                        <MultiShow shows={theCities[cityName]}
                                                    cityName={cityName}
                                                    pics={this.makePicsArray(theCities[cityName], isSingleStage)}
                                                    onPress={this.multiShowPressed.bind(this)}/>
                                    </ShowIf>
                                )
                            })
                        }
                        <EndItem height={calcHeight}/>
                    </ScrollView>
                </ShowIf>
            </View>
        )
    }
}



export default Cities;

/*{
    Object.keys(theCities).map((cityName) => {
        
        let isSingleStage = (!theCities[cityName].length);
        
        return (
            <ShowIf condition={isSingleStage} key={cityName} 
                else={
                        <NavButton title={cityName}
                                titleColor="white"
                                imageSrc={require('../../../assets/genericCity.jpg')}
                                onPress={this.navButtonPressed.bind(this)} />
                        }>
                <MultiShow shows={theCities[cityName]}
                            cityName={cityName}
                            pics={this.makePicsArray(theCities[cityName], isSingleStage)}
                            onPress={this.multiShowPressed.bind(this)}/>
            </ShowIf>
        )
    })
    
    
}*/