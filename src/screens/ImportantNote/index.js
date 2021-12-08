import React, { Component } from "react";
import { ImageBackground, ScrollView, StatusBar, Text, View } from "react-native"
import themeStyle from "../../assets/styles/theme.style";
import { ClearButton, Container } from "../../components";
import { screen, SCREEN_HEIGHT, SCREEN_WIDTH, route } from "../../lib/utils/constants";
import Focus from '../../assets/svg/focus-1.svg';
import Vie from '../../assets/svg/view.svg';
import HeaderView from './components/headerView';
import styles from './style';
import { connect } from "react-redux";

class ChangeFocusArea extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <StatusBar backgroundColor={'#D6EFF7'} barStyle="dark-content" />
                <ImageBackground source={require("../../assets/images/bg1.png")} style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}>
                    {this.props.route.params.newUser == null ?
                        null
                        :
                        <HeaderView goBack={() => goBack()} />}
                    <View style={{ ...styles.container, marginTop: this.props.route.params.newUser == null ? "15%" : 0 }}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <View style={styles.svgContainer}>
                                <Focus />
                            </View>
                            <View style={styles.importantTextContainer}>
                                <Text style={styles.headingText}>IMPORTANT!</Text>
                                <Text style={styles.textStyle}>You will get to choose your focus areas on the next screen. It is important that you read the instructions to know how this works!</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle}>1.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>Before each workout you need to set your focus areas so the app can design your workout
                                    (to do this click the  “?” on your home screen)</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle}>2.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>This is how to combine your focus areas for optimum results: </Text>
                            </View>
                            <View style={{ alignItems: "center", marginTop: "5%" }}>
                                <Vie />
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle}>3.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>You will get to choose your focus areas on the next screen. It is important that you read the instructions to know how this works!</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle}>4.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>You will get to choose your focus areas on the next screen. It is important that you read the instructions to know how this works!</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.textStyle}>5.</Text>
                                <View style={styles.gap} />
                                <Text style={styles.textStyle1}>You will get to choose your focus areas on the next screen. It is important that you read the instructions to know how this works!</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <ClearButton title={screen.NEXT} onPress={() => {
                                    if (this.props.route.params.newUser == null) {
                                        this.props.navigation.navigate(route.CHANGEFOCUSAREA, { gender: this.props.user.userData.gender })
                                    } else if (this.props.route.params.newUser && this.props.route.params.newUser != undefined) {
                                        this.props.navigation.navigate(route.APPINTRO5th, { gender: this.props.route.params.gender })
                                    } else if (!this.props.route.params.newUser && this.props.route.params.newUser != undefined) {
                                        this.props.navigation.navigate(route.FOCUSAREA, { gender: this.props.route.params.gender })
                                    }
                                }} />
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