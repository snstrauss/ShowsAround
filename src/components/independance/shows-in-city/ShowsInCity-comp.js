
import React, { Component } from 'react';

import { View, Text, ScrollView, Platform } from 'react-native';

import ShowsInCityStyles from './ShowsInCity-styles';
const { view, text } = ShowsInCityStyles;

import Header from '../../header/header-component';
import ShowIf from '../../../helper-components/show-if/ShowIf';
import WaitMsg from '../../../helper-components/wait-msg/WaitMsg';
import OnlyShows from '../../only-shows/OnlyShows-comp';
import MultiShow from '../../multi-show/MultiShow-comp';

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

    makePicsArray(stages){

        const takeFrom = (typeof stages === 'Array') ? stages[0] : stages;
        
        const defaultPics = this.props.navigation.state.params.defaultPictures;
        const showsArr = takeFrom.artist.split(', ');
        
        const picsArr = showsArr.map((artistName) => ({
            artist: artistName,
            pic: defaultPics[artistName] ? defaultPics[artistName].image : 'https://i1.wp.com/lenews.ch/wp-content/uploads/2015/12/The-turkey-bird-naming-confusion.jpg?resize=800%2C487'
        }))

        return picsArr;

    }

    render(){

        const allShows = this.props.navigation.state.params.showsInCity;
                
        return (
            <View>
                <Header title={this.props.navigation.state.params.cityName} 
                        goBack={this.props.navigation.goBack.bind(this)}/>
                <ScrollView>
                    {
                        allShows.map((show) => {
                            
                            return (
                                <View key={`stage-${show.location}`}>
                                    <MultiShow key={`city-${show.location}`}
                                            shows={show}
                                            pics={this.makePicsArray(show)} />
                                </View>
                            )
                        })
                    }
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


