// import react
import React, { Component } from 'react';

// import react-native
import { View, Text, Image, Button } from 'react-native';

// import stylesheet
import headerStyles from './header-styles.js';

// import helper components
import ShowIf from '../../helper-components/show-if/ShowIf.js';
import WaitMsg from '../../helper-components/wait-msg/WaitMsg.js';

class Header extends Component {
    
    state = {
        bigLogoUri: ''
    }
    
    iWillGoBack(){
        
        debugger;
        this.props.goBack();
        
    }

    render(){

        let imageUri = 'http://showsaround.s3-website-eu-west-1.amazonaws.com/img/FinalLogo512px.png';

        const { headerContainer,
                imageParentStyle, 
                imageStyle,
                textParentStyle,
                textStyle } = headerStyles;

        return (
            <ShowIf condition={imageUri}>
                <View style={headerContainer}>
                    <View style={imageParentStyle}>
                        <Image style={imageStyle} source={{uri: imageUri}} />
                    </View>
                    <View style={textParentStyle}>
                        <Text style={textStyle}>
                            {this.props.title}
                        </Text>
                    </View>
                </View>
                <ShowIf condition={this.props.goBack}>
                    <View>
                        <Button title="אחורה"
                                onPress={this.iWillGoBack.bind(this)}/>
                    </View>
                </ShowIf>
            </ShowIf>
        )
    }
};

export default Header;
