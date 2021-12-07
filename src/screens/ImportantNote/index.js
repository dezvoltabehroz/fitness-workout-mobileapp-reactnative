import React, { Component } from "react";
import { ImageBackground, ScrollView, StatusBar, Text, View } from "react-native"
import themeStyle from "../../assets/styles/theme.style";
import { ClearButton, Container } from "../../components";
import { screen, SCREEN_HEIGHT, SCREEN_WIDTH, route } from "../../lib/utils/constants";
import Focus from '../../assets/svg/focus-1.svg';
import Vie from '../../assets/svg/view.svg';

import styles from './style';
import { connect } from "react-redux";

class ChangeFocusArea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        console.log( this.props.user.userData.gender);
        return (
            <Container>
                <StatusBar backgroundColor={'#D6EFF7'} barStyle="dark-content" />
                <ImageBackground source={require("../../assets/images/bg1.png")} style={{ height: SCREEN_HEIGHT * 0.965, width: SCREEN_WIDTH }}>

                    <View style={styles.container}>
                        <ScrollView>
                            <View style={styles.svgContainer}>
                                <Focus />
                            </View>
                            <View style={styles.importantTextContainer}>
                                <Text style={styles.headingText}>IMPORTANT!</Text>
                                <Text style={styles.textStyle}>You will get to choose your focus areas on the next screen. It is important that you read the instructions to know how this works!</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle1}>1.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>Before each workout you need to set your focus areas so the app can design your workout
                                    (to do this click the  “?” on your home screen)</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle1}>2.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>This is how to combine your focus areas for optimum results: </Text>
                            </View>
                            <View style={{ alignItems: "center", marginTop: "5%" }}>
                                <Vie />
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle1}>3.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>You will get to choose your focus areas on the next screen. It is important that you read the instructions to know how this works!</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle1}>4.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>You will get to choose your focus areas on the next screen. It is important that you read the instructions to know how this works!</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle1}>5.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>You will get to choose your focus areas on the next screen. It is important that you read the instructions to know how this works!</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <ClearButton title={screen.NEXT} onPress={() => this.props.navigation.navigate(route.CHANGEFOCUSAREA, { gender: this.props.user.userData.gender })} />
                            </View>
                        </ScrollView>
                    </View>

                </ImageBackground>

            </Container>
        )
    }
}

const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(ChangeFocusArea);