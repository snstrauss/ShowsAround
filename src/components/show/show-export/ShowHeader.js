// import react
import React, { Component } from 'react';

// import react-native
import { View, Text, Image, TouchableHighlight, ScrollView, Animated } from 'react-native';

import Accordion from 'react-native-accordion';

// import stylesheet
import ShowStyles from '../Show-styles.js';

// import services
import Color from '../../../services/random-color/randomColor';

class ShowHeader extends Component {
    constructor() {
        super();

        this.state = {
            showDetails: false,
            borderColor: Color.getRandom()
        };
    }

    imageHeight = 200;

    toggleDetails() {
        // this.setState({
        //     showDetails: !this.state.showDetails
        // });

        if (this.props.isLast) {
            this.props.parent.scrollDown(this.state.showDetails);
        }
    }

    render() {
        const { showBox,
                imageParent,
                imageStyle,
                textParent,
                titleStyle,
                priceParent,
                detailsParent,
                detailsStyle,
                priceStyle } = ShowStyles;
        
        const thisShow = this.props.show;

        const thisShowDefaultPicUri = this.props.artist.image;        

        let thisPrice = eval(thisShow.price) ? thisShow.price : 'חינם';        

        return (
            <TouchableHighlight style={showBox} onPress={this.props.onPress}>  
                <View>
                    <View style={textParent}>
                        <Text style={titleStyle}>{thisShow.artist}</Text>    
                    </View>
                    <View style={[imageParent, {borderColor: this.state.borderColor}]}>
                        <Image resizeMode="stretch" style={{height: this.imageHeight}} source={{ uri: thisShowDefaultPicUri }}></Image>
                        <View style={priceParent}>
                            <Text style={priceStyle}>{thisPrice}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
};

export default ShowHeader;
/*<TouchableHighlight onPress={this.toggleDetails.bind(this, this.props.idx)}>
    <View style={showBox}>  
        <View style={textParent}>
            <Text style={titleStyle}>{thisShow.artist}</Text>    
        </View>
        <View style={[imageParent, {borderColor: this.state.borderColor}]}>
            <Image resizeMode="stretch" style={{height: this.imageHeight}} source={{ uri: thisShowDefaultPicUri }}></Image>
            <View style={priceParent}>
                <Text style={priceStyle}>{thisPrice}</Text>
            </View>
        </View>

        <ShowIf condition={this.state.showDetails}>
            <View style={[detailsParent, {borderColor: this.state.borderColor}]}>
                <Text style={detailsStyle}>{thisShow.details}</Text>
            </View>
        </ShowIf>
    </View>
</TouchableHighlight>*/


{/*<Accordion 
    header={(
        <View style={showBox}>  
            <View style={textParent}>
                <Text style={titleStyle}>{thisShow.artist}</Text>    
            </View>
            <View style={[imageParent, {borderColor: this.state.borderColor}]}>
                <Image resizeMode="stretch" style={{height: this.imageHeight}} source={{ uri: thisShowDefaultPicUri }}></Image>
                <View style={priceParent}>
                    <Text style={priceStyle}>{thisPrice}</Text>
                </View>
            </View>
        </View>
    )}

    content={(
        <View style={[detailsParent, {borderColor: this.state.borderColor}]}>
            <Text style={detailsStyle}>{thisShow.details}</Text>
        </View>
    )}

    easing="linear"

    onPress={this.toggleDetails.bind(this, this.props.idx)}
/>*/}