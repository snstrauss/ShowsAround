
import React, { Component } from 'react';

import { View, Text, Platform } from 'react-native';

import ShowsInCityStyles from './ShowsInCity-styles';
const { view, text } = ShowsInCityStyles;

import Header from '../../header/header-component';
import ShowIf from '../../../helper-components/show-if/ShowIf';
import WaitMsg from '../../../helper-components/wait-msg/WaitMsg';
import OnlyShows from '../../only-shows/OnlyShows-comp';

class ShowsInCity extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerVisible: false,
        title: navigation.state.params.cityName
    })

    state = {
        gotShows: false
    }

    componentWillMount(){
        if(this.props.navigation.state.params.showsInCity.length > 0){
            this.setState({
                gotShows: true
            })
        }
    }

    render(){

        return (
            <View>
                <Header title={this.props.navigation.state.params.cityName} 
                        goBack={this.props.navigation.goBack.bind(this)}/>
                
                <ShowIf condition={this.state.gotShows} else={<WaitMsg msg={'please wait...'}/>}>
                   <OnlyShows showsToShow={this.props.navigation.state.params.showsInCity} 
                       defaultPictures={this.props.navigation.state.params.defaultPictures} /> 
                </ShowIf>
            </View>
        )
    }
}

export default ShowsInCity;