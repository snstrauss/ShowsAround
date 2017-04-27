
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

import picsArray from '../../../services/default-pictures/makePicsArray';

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

    defaultPictures = this.props.navigation.state.params.defaultPictures;

    goToShowsInCity(cityName, event) {
        this.props.navigation.navigate('ShowsInCity', {
            cityName: cityName,
            showsInCity: this.state.allCities[cityName],
            defaultPictures: this.defaultPictures
        })
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
                    <ScrollView scrollEnabled={Object.keys(theCities).length >= 4}>
                        {
                            Object.keys(theCities).map((cityName) => {
        
                                let isSingleStage = (!theCities[cityName].length);
                                
                                let picsArr = picsArray.make(theCities[cityName], isSingleStage, this.defaultPictures);

                                return (
                                    <ShowIf condition={isSingleStage} key={cityName} 
                                        else={
                                                <NavButton title={cityName}
                                                        titleColor="white"
                                                        imageSrc={require('../../../assets/genericCity.jpg')}
                                                        onPress={this.goToShowsInCity.bind(this, cityName)} />
                                                }>
                                        <MultiShow shows={theCities[cityName]}
                                                    cityName={cityName}
                                                    pics={picsArr} />
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

