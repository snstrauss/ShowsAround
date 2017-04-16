
import React, { Component } from 'react';

import { View, Text } from 'react-native';

import ShowsInCityStyles from './ShowsInCity-styles';
const { view, text } = ShowsInCityStyles;

import Header from '../../header/header-component';
import ShowIf from '../../../helper-components/show-if/ShowIf';
import WaitMsg from '../../../helper-components/wait-msg/WaitMsg';
import OnlyShows from '../../only-shows/OnlyShows-comp';

class ShowsInCity extends Component {

    static navigationOptions = {
        headerVisible: false
    }

    state = {
        gotShows: false
    }

    componentWillMount(){
        
        debugger;
        
        if(this.props.navigation.state.params.showsInCity.length > 0){
            this.setState({
                gotShows: true
            })
        }
    }

    render(){

        return (
            <View>
                <Header title={this.props.navigation.state.params.cityName} />
                <ShowIf condition={this.state.gotShows} else={<WaitMsg msg={'please wait...'}/>}>
                   <OnlyShows showsToShow={this.props.navigation.state.params.showsInCity} 
                       defaultPictures={this.props.navigation.state.params.defaultPictures} /> 
                </ShowIf>
            </View>
        )
    }
}

export default ShowsInCity;