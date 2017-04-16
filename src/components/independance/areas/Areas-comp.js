
import React, { Component } from 'react';

import { View, Text } from 'react-native';

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

                console.log('before area name clean');
                console.log(allShows);
                console.log('');

        // create areas object
        allShows.forEach((show) => {

            // clean area names from stupid 'יום העצמאות'
            show.area = show.area.replace('יום העצמאות', '').substr(3);

            // create array for specific area, if it doesnt exist
            if(!allAreas.hasOwnProperty(show.area)){
                allAreas[show.area] = []
            }
            
            // push show into area
            allAreas[show.area].push(show);

            this.setState({
                allAreas: allAreas,
                gotAreas: true
            })
            
        })
        
                console.log('after area name clean');
                console.log(allShows);

        let areas = {};

    }

    goToCities(cityName){
        
        console.log(cityName);
        debugger;
    }

    render(){

        return (
            <View>
                <Header title="כל האיזורים" />
                <ShowIf condition={this.state.gotAreas} else={<WaitMsg msg={'please wait...'}/>}>
                    {
                        Object.keys(this.state.allAreas).map((areaName) => (
                            <NavButton key={`area-${areaName}`}
                               title={areaName} 
                               titleColor="white"
                               imageSrc={require("../../../assets/fireworks.jpg")}
                               onPress={this.goToCities.bind(this, areaName)} />        
                        ))
                    }
                    {/*<NavButton title="לאירועי יום העצמאות" 
                               titleColor="gold"
                               imageSrc={require("../../assets/fireworks.jpg")}
                               onPress={this.goToAreas.bind(this)} />*/}
                    {/*<ScrollView ref="scrolly">
                        <Accordion

                            ref="accord"

                            sections={theArray}

                            renderHeader={(show, idx) => {
                                
                                let thisArtist = this.state.defaultPictures[show.artist.split(',')[0]] || defaultArtist;
                                
                                return (
                                    <View>
                                        <ShowHeader key={show.artist + idx} 
                                            idx={idx} 
                                            isLast={idx === theArray.length - 1} 
                                            show={show} 
                                            artist={thisArtist} 
                                            parent={this} />
                                    </View>
                                )
                            }}

                            renderContent={(show, idx) => {
                                
                                let thisArtist = this.state.defaultPictures[show.artist.split(',')[0]] || defaultArtist;
                                
                                return (
                                    <View>
                                        <ShowContent key={show.artist + idx} 
                                            idx={idx} 
                                            isLast={idx === theArray.length - 1} 
                                            show={show} 
                                            artist={thisArtist} 
                                            parent={this} />
                                    </View>
                                )
                            }}
                            
                            parentman={self}

                            self={this.refs.accord}

                            onChange={(idx) => {
                                
                                debugger;
                                
                                if (idx === theArray.length - 1){
                                    console.log(this.parentman.state.goDown());
                                }
                            }}>
                        </Accordion>
                        <EndItem></EndItem>
                    </ScrollView>*/}
                </ShowIf>
            </View>
        )
    }
}

export default Areas;