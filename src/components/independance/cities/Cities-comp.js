
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
        
        debugger;
        
        // create the allCities object
        allShows.forEach((show) => {

            if (!allCities.hasOwnProperty(show.location_eng)) {
                allCities[show.location_eng] = [];
            }

            allCities[show.location_eng].push(show);
        })
        
        debugger;
        
        this.setState({
            allCities: allCities,
            gotCities: true
        })
    }

    goToShowsInCity(cityName) {
        this.props.navigation.navigate('ShowsInCity', {
            cityName: cityName,
            showsInCity: this.state.allCities[cityName],
            defaultPictures: this.props.navigation.state.params.defaultPictures
        })
    }

    render() {
        
        console.log('gotCities??');
        console.log(this.state.gotCities + '\n');
        debugger;
        
        return (
            <View>

                <Header title={this.props.navigation.state.params.areaName}
                    goBack={this.props.navigation.goBack.bind(this)} />


                <ShowIf condition={this.state.gotCities} else={<WaitMsg msg={'please wait...'} />}>
                    <ScrollView>
                        {Object.keys(this.state.allCities).map((cityName) => {

                            if(Object.keys(this.state.allCities[cityName]).length > 1){
                                return (
                                    <NavButton key={`city-${cityName}`}
                                               title={cityName} 
                                               titleColor="white"
                                               imageSrc={require("../../../assets/fireworks.jpg")}
                                               onPress={this.goToShowsInCity.bind(this, cityName)} 
                                               showsInStage={this.state.allCities[cityName]}/>  
                                )
                            } else {
                                return (
                                    <MultiShow key={`city-${cityName}`}
                                               shows={this.state.allCities[cityName]}
                                               pics={makePicsArray(this.state.allCities[cityName])}/>
                                )
                            }

                        })}
                    </ScrollView>
                </ShowIf>
            </View>
        )
    }
}

function makePicsArray(showsArr){
    
    debugger;
    
    
}

export default Cities;