
import React, { Component } from 'react';

import { View, Text, ScrollView, Platform } from 'react-native';

import CitiesStyles from './Cities-styles';
const { view, text } = CitiesStyles;

import Header from '../../header/header-component';
import ShowIf from '../../../helper-components/show-if/ShowIf';
import WaitMsg from '../../../helper-components/wait-msg/WaitMsg';
import NavButton from '../../../helper-components//nav-button/NavButton-comp';

class Cities extends Component {

    isIos = Platform.OS === 'ios';
    
    static navigationOptions = ({ navigation }) => ({
        headerVisible: this.isIos,
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

            if(!allCities.hasOwnProperty(show.location)){
                allCities[show.location] = [];
            }

            allCities[show.location].push(show);
        })

        this.setState({
            allCities: allCities,
            gotCities: true
        })
    }

    goToShowsInCity(cityName){
        this.props.navigation.navigate('ShowsInCity', {
            cityName: cityName,
            showsInCity: this.state.allCities[cityName],
            defaultPictures: this.props.navigation.state.params.defaultPictures
        })
    }

    render(){

        return (
          <View>
                <ShowIf condition={!this.isIos}>
                    <Header title={this.props.navigation.state.params.areaName} />
                </ShowIf>
    
                <ShowIf condition={this.state.gotCities} else={<WaitMsg msg={'please wait...'}/>}>
                    <ScrollView>
                        {
                            Object.keys(this.state.allCities).map((cityName) => (
                                <NavButton key={`city-${cityName}`}
                                title={cityName} 
                                titleColor="white"
                                imageSrc={require("../../../assets/fireworks.jpg")}
                                onPress={this.goToShowsInCity.bind(this, cityName)} />        
                            ))
                        }
                    </ScrollView>
                </ShowIf>
            </View>
        )
    }
}

export default Cities;