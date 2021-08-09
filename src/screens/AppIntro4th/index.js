import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

import { ClearButton, ColorContainer } from '../../components';
import { route, screen } from '../../lib/utils/constants';

import HeaderView from './components/headerView';
import Gender from '../../assets/svg/gender.svg';
import Male from '../../assets/svg/male.svg';
import SelectedMale from '../../assets/svg/male-active.svg';
import Female from '../../assets/svg/female.svg';
import SelectedFemale from '../../assets/svg/female-active.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';

const SVG_HEIGHT = 100;
const SVG_WIDTH = 100;

class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            male: false,
            female: false
        };
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { male, female } = this.state;
        return (
            <ColorContainer>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                <HeaderView goBack={() => goBack()} />
                <View style={styles.container}>
                    <View style={styles.targetContainer}>
                        <Gender />
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_4}</Text>
                        <Text style={[styles.decsTextStyle, { textAlign: "center" }]}>{screen.APP_INTRO_DESCRIPTION_4}</Text>
                    </View>
                    <View style={styles.rowContainer1}>
                        <TouchableOpacity onPress={() => this.setState({ male: true, female: false })} >
                            <View>
                                {
                                    male
                                        ?
                                        <SelectedMale height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        :
                                        <Male height={SVG_HEIGHT} width={SVG_WIDTH} />
                                }
                            </View>
                            <Text style={{ textAlign: "center", color: male ? themeStyle.BAR_COLOR : themeStyle.PRIMARY_TEXT_COLOR }}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ male: false, female: true })}>
                            <View>
                                {
                                    female ?
                                        <SelectedFemale height={SVG_HEIGHT} width={SVG_WIDTH} />
                                        :
                                        <Female height={SVG_HEIGHT} width={SVG_WIDTH} />
                                }
                            </View>
                            <Text style={{ textAlign: "center", color: female ? themeStyle.BAR_COLOR : themeStyle.PRIMARY_TEXT_COLOR }}>Female</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <ClearButton title={screen.NEXT} disabled={male || female ? false : true} onPress={() => navigate(route.APPINTRO5th, { gender: male ? 'male' : 'female' })} />
                </View>
            </ColorContainer>
        )
    }
}
export default AppIntro;