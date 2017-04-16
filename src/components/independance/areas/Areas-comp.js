
import React, { Component } from 'react';

import { View, Text, ScrollView } from 'react-native';

import AreasStyles from './Areas-styles';
const { view, text } = AreasStyles;

import Header from '../../header/header-component';
import ShowIf from '../../../helper-components/show-if/ShowIf';
import WaitMsg from '../../../helper-components/wait-msg/WaitMsg';
import NavButton from '../../../helper-components/nav-button/NavButton-comp';

class Areas extends Component {

    static navigationOptions = {
        headerVisible: false
    }

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
        
        debugger;
        
        this.props.navigation.navigate('Cities', { 
            areaName: areaName,  
            allCitiesShows: this.state.allAreas[areaName] 
        });
    }

    render(){

        return (
            <View>
                <Header title="כל האיזורים" />
                <ShowIf condition={this.state.gotAreas} else={<WaitMsg msg={'please wait...'}/>}>
                    <ScrollView>
                        {
                            Object.keys(this.state.allAreas).map((areaName) => (
                                <NavButton key={`area-${areaName}`}
                                title={areaName} 
                                titleColor="white"
                                imageSrc={require("../../../assets/fireworks.jpg")}
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