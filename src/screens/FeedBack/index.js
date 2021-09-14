import React, { Component } from 'react';
import { Alert, FlatList, Text, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import themeStyle from '../../assets/styles/theme.style';
import { Button, Container, Icon } from '../../components';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
import { authActions } from '../../redux/actions/auth';
import { SurveysServices } from '../../services';

import styles from './style';

class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            question: 0,
            width: 0,
        }
    }

    componentDidMount = () => {
        const { user_id, token } = this.props.user.userData;
        SurveysServices.getQuestions(token)
            .then((res) => {
                console.log(res.data)
                this.setState({ data: res.data.data, loading: false })
            })
            .catch((err) => console.log(err.response))
    }

    render() {
        const { question, data, width, loading } = this.state;
        const progressCustomStyles = {
            borderRadius: 10,
            borderWidth: 0,
            justifyContent: "center",
            backgroundColor: themeStyle.BAR_COLOR
        };
        return (
            <Container>
                {
                    loading ?
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={'#44BDE8'} />
                        </View>
                        :
                        <View style={styles.container}>
                            <View style={{ marginVertical: "5%", marginHorizontal: "5%" }}>
                                <Text>Question {question + 1}/{data.length}</Text>
                                <View style={{ alignItems: "center", marginTop: "2.5%" }}>
                                    <View style={{ backgroundColor: "lightgray", width: SCREEN_WIDTH * 0.9, borderRadius: 5 }}>
                                        <ProgressBarAnimated
                                            width={SCREEN_WIDTH * 0.9}
                                            height={10}
                                            value={((question + 1) / data.length) * 100}
                                            {...progressCustomStyles}
                                            onComplete={() => { Alert.alert('Hey!', 'onComplete event fired!'); }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <ScrollView
                                horizontal={true}
                                scrollEventThrottle={16}
                                scrollEnabled={false}
                                pagingEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                ref={(node) => (this.scroll = node)}
                                style={{ flex: 0.8 }} >
                                {
                                    data.map((item, index) => {
                                        return (
                                            <View style={{ width: SCREEN_WIDTH, }}>
                                                <View style={{ backgroundColor: "white", padding: "5%", borderRadius: 20, height: SCREEN_HEIGHT * 0.6, marginHorizontal: "5%" }}>
                                                    <View style={{ flex: 1, }}>
                                                        <View style={{ flex: 0.8 }}>
                                                            <Text>Select Answer</Text>
                                                            <Text style={{ fontWeight: "bold" }}>{item.ques_statement}</Text>
                                                            <View>
                                                                {
                                                                    item.options_arr.map((element, i) => {
                                                                        return (
                                                                            <View style={{ flexDirection: "row", marginTop: "5%" }}>
                                                                                <Icon.MaterialIcons name={"radio-button-unchecked"} size={20} color={'lightgray'} />
                                                                                <Text style={{ marginLeft: 10 }}>{element.options}</Text>
                                                                            </View>
                                                                        )
                                                                    })
                                                                }
                                                            </View>
                                                        </View>
                                                        <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
                                                            <Button title={"NEXT"} onPress={() => this.setState({ question: index + 1, width: width + SCREEN_WIDTH }, () => this.scroll.scrollTo({ x: (width + SCREEN_WIDTH) }))} />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                }
            </Container>
        )
    }

}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
const mapDispatchToProps = dispatch => { return { authActions: bindActionCreators(authActions, dispatch) }; };
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);