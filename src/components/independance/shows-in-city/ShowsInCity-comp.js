
import React, { Component } from 'react';

import { View, Text, ScrollView, Platform } from 'react-native';

import ShowsInCityStyles from './ShowsInCity-styles';
const { view, text } = ShowsInCityStyles;

import Header from '../../header/header-component';
import ShowIf from '../../../helper-components/show-if/ShowIf';
import WaitMsg from '../../../helper-components/wait-msg/WaitMsg';
import OnlyShows from '../../only-shows/OnlyShows-comp';
import MultiShow from '../../multi-show/MultiShow-comp';
import EndItem from '../../../helper-components/end-item/EndItem';

import picsArray from '../../../services/default-pictures/makePicsArray';

class ShowsInCity extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerVisible: false
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

        const defaultPics = this.props.navigation.state.params.defaultPictures;

        const allShows = this.props.navigation.state.params.showsInCity;
            
        const calcHeight = allShows.length > 4 ? 85 : 700;
        
        let picsArrayProxy = picsArray;
        
        return (
            <View>
                <Header title={this.props.navigation.state.params.cityName} 
                        goBack={this.props.navigation.goBack.bind(this)}/>
                <ScrollView scrollEnabled={allShows.length >= 4}>
                    {
                        allShows.map((show) => {
                            
                            let isMultiShow = show.artist.includes(',')
                            let picsArr = picsArrayProxy.make(show, isMultiShow, defaultPics);

                            return (
                                <View key={`stage-${show.location}`}>
                                    <MultiShow key={`city-${show.location}`}
                                            shows={show}
                                            pics={picsArr} />
                                </View>
                            )
                        })
                    }
                <EndItem height={calcHeight} />
                </ScrollView>
                
            </View>
        )
    }
}

export default ShowsInCity;

{/*<ShowIf condition={this.state.gotShows} else={<WaitMsg msg={'please wait...'}/>}>
    <OnlyShows showsToShow={this.props.navigation.state.params.showsInCity} 
        defaultPictures={this.props.navigation.state.params.defaultPictures} /> 
</ShowIf>*/}


