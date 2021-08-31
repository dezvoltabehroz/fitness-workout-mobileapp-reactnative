import React, { Component } from 'react';
import { View, Text, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';

import { Button, ColorContainer, CustomSlider, Icon } from '../../components';
import { route, screen, SCREEN_WIDTH } from '../../lib/utils/constants';

import HeaderView from './components/headerView';
import Volume from '../../assets/svg/volume.svg';
import Bar from '../../assets/svg/Lines.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';

class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 5,
            currentPage: 0
        };
    }

    multiSliderValueCallback = (values) => {
        // console.log(values)

    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { currentPage } = this.state;
        return (
            <ColorContainer>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                <HeaderView goBack={() => goBack()} />

                <View style={styles.container}>
                    <View style={[styles.networkContainer, { flex: 0.1 }]}>
                        <Volume />
                    </View>
                    <View style={[styles.headingContainer, { flex: 0.2 }]}>
                        <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_2}</Text>
                        <Text style={styles.decsTextStyle}>{screen.APP_INTRO_DESCRIPTION_2}</Text>
                    </View>
                    <View style={[styles.secondHeadingContainer, { flex: 0.1 }]} >
                        <Text style={styles.secondHeadingStyle}>
                            Oh, trust me, I'm really fit
                        </Text>
                    </View>
                    <View style={{ flex: 0.5 }} >
                        <View style={{ position: "absolute", top: 30 }}>
                            <Image resizeMode={"contain"} style={styles.imageStyle} source={require('../../assets/images/outfit.png')} />
                        </View>
                        <View style={{ position: "absolute", top: 18 }}>
                            <Bar />
                        </View>
                        <CustomSlider
                            min={0}
                            max={3}
                            resetValue={(reset) => this.resetSlider = reset}
                            LRpadding={40}
                            callback={this.multiSliderValueCallback}
                            single={true}
                        />

                    </View>

                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigate(route.APPINTRO3rd)}  style={styles.buttonStyle}>
                        <Icon.AntDesign name="right" size={25} color={themeStyle.BAR_COLOR} />
                    </TouchableOpacity>
                </View>
            </ColorContainer>

        )
    }
}
export default AppIntro;