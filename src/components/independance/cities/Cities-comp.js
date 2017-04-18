
import React, { Component } from 'react';

import { View, Text, ScrollView, Platform } from 'react-native';

import CitiesStyles from './Cities-styles';
const { view, text } = CitiesStyles;

import Header from '../../header/header-component';
import ShowIf from '../../../helper-components/show-if/ShowIf';
import WaitMsg from '../../../helper-components/wait-msg/WaitMsg';
import NavButton from '../../../helper-components//nav-button/NavButton-comp';
import MultiShow from '../../multi-show/MultiShow-comp';

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

            if (!allCities.hasOwnProperty(show.location_eng)) {
                allCities[show.location_eng] = [];
            }

            allCities[show.location_eng].push(show);
        })
        
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

    render() {
        
        const self = this;

        return (
            <View>

                <Header title={this.props.navigation.state.params.areaName}
                    goBack={this.props.navigation.goBack.bind(this)} />


                <ShowIf condition={this.state.gotCities} else={<WaitMsg msg={'please wait...'} />}>
                    <ScrollView>
                        {Object.keys(this.state.allCities).map((cityName) => {
                            
                            if(Object.keys(self.state.allCities[cityName]).length > 1){
                                return (
                                    <NavButton key={`city-${cityName}`}
                                               title={cityName} 
                                               titleColor="white"
                                               imageSrc={require("../../../assets/fireworks.jpg")}
                                               onPress={self.goToShowsInCity.bind(this, cityName)} 
                                               showsInStage={self.state.allCities[cityName]}/>  
                                )
                            } else {
                                return (
                                    <MultiShow key={`city-${cityName}`}
                                               shows={self.state.allCities[cityName]}
                                               pics={this.makePicsArray(this.state.allCities[cityName])}/>
                                )
                            }

                        })}
                    </ScrollView>
                </ShowIf>
            </View>
        )
    }
}



export default Cities;