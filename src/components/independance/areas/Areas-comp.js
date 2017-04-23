
import React, { Component } from 'react';

import { View, Text, ScrollView, Platform } from 'react-native';

import AreasStyles from './Areas-styles';
const { view, text } = AreasStyles;

import Header from '../../header/header-component';
import ShowIf from '../../../helper-components/show-if/ShowIf';
import WaitMsg from '../../../helper-components/wait-msg/WaitMsg';
import NavButton from '../../../helper-components/nav-button/NavButton-comp';

class Areas extends Component {

    makeGoBack(){
        
    }

    static navigationOptions = ({ navigation }) => ({
        headerVisible: false,
        title: 'כל האיזורים',
        // headerRight: <GoBack title="אחורה" activate={this.makeGoBack.bind.this} />
    })

    state = {
        allAreas: [],
        gotAreas: false
    }

    

    componentWillMount(){

        let allAreas = {};
        let allShows = this.props.navigation.state.params.stateData;
        
        // create areas object
        allShows.forEach((show) => {

            // clean area names from stupid 'יום העצמאות'
            let area = show.area.replace('יום העצמאות', '').substr(3);

            // create array for specific area, if it doesnt exist
            if(!allAreas.hasOwnProperty(area)){
                allAreas[area] = []
            }
            
            // push show into area
            allAreas[area].push(show);
            
        })
        
        this.setState({
            allAreas: allAreas,
            gotAreas: true
        })
    }

    goToCities(areaName){
        this.props.navigation.navigate('Cities', { 
            areaName: areaName,  
            allCitiesShows: this.state.allAreas[areaName],
            defaultPictures: this.props.navigation.state.params.defaultPictures
        });
    }

    render(){
        
        const { goBack } = this.props.navigation;

        return (
            <View>
                <Header title="כל האיזורים" 
                        goBack={this.props.navigation.goBack.bind(this)} />    

                <ShowIf condition={this.state.gotAreas} else={<WaitMsg msg={'please wait...'}/>}>
                    <ScrollView>
                        {
                            Object.keys(this.state.allAreas).map((areaName) => (
                                <NavButton key={`area-${areaName}`}
                                           title={areaName} 
                                           titleColor="white"
                                           imageSrc={require("../../../assets/fireworks.jpg")}
                                           defaultPics={this.props.defaultPics}
                                           onPress={this.goToCities.bind(this, areaName)} />        
                            ))
                        }
                    </ScrollView>
                </ShowIf>
            </View>
        )
    }
}

export default Areas;