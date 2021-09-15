import React, { Component } from 'react';
import { Alert, FlatList, Text, View, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
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
            answers: [],
            submitEnabled: false,
            submitLoading: false
        }
    }

    componentDidMount = () => {
        const { user_id, token } = this.props.user.userData;
        SurveysServices.getQuestions(token)
            .then((res) => {
                let questionArray = [...res.data.data]
                questionArray.forEach((item, index) => {
                    let question_array = []
                    item.options_arr.forEach((element, i) => {
                        question_array.push({ ...element, is_check: 0 })
                    })
                    questionArray[index] = { ...questionArray[index], question_array: question_array }

                })
                this.setState({ data: questionArray, loading: false })
            })
            .catch((err) => console.log(err.response))
    }

    handleSubmitFunction = () => {
        const { user_id, token } = this.props.user.userData;
        const { answers } = this.state;
        let data = {
            "user_id": user_id,
            "answers_array": answers
        }
        SurveysServices.submitAnswers(data, token)
            .then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    this.props.navigation.goBack();
                }
                else {
                    this.setState({ submitLoading: false })
                }
            })
            .catch((err) => err.response)

    }

    render() {
        const { question, data, width, loading, answers, submitEnabled, submitLoading } = this.state;
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
                                <Text>Question {question == data.length ? data.length : question + 1}/{data.length}</Text>
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
                                                            <Text style={{ color: 'lightgray' }}>Select Answer</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.ques_statement}</Text>
                                                            <View>
                                                                {
                                                                    item.question_array.map((element, i) => {
                                                                        return (
                                                                            <TouchableOpacity onPress={() => {
                                                                                let array = [...data];
                                                                                let anwserArray = [...answers]
                                                                                array.forEach((itemData, itemIndex) => {
                                                                                    itemData.question_array.forEach((elementData, elementIndex) => {
                                                                                        array[itemIndex].question_array[elementIndex] = { ...array[itemIndex].question_array[elementIndex], is_check: 0 }
                                                                                    })
                                                                                })
                                                                                array[index].question_array[i] = { ...array[index].question_array[i], is_check: 1 }
                                                                                anwserArray.push({
                                                                                    is_skip: 0,
                                                                                    "question_id": array[index].ques_id,
                                                                                    "answer_id": array[index].question_array[i].id
                                                                                })
                                                                                this.setState({ data: array, answers: anwserArray })
                                                                            }}
                                                                                style={{ flexDirection: "row", marginTop: "5%" }}>
                                                                                <Icon.MaterialIcons name={element.is_check == 1 ? "radio-button-checked" : "radio-button-unchecked"} size={20} color={element.is_check == 1 ? themeStyle.BAR_COLOR : 'lightgray'} />
                                                                                <Text style={{ marginLeft: 10 }}>{element.options}</Text>
                                                                            </TouchableOpacity>
                                                                        )
                                                                    })
                                                                }
                                                            </View>
                                                        </View>
                                                        <View style={{ flex: 0.2, justifyContent: "flex-end" }}>
                                                            {submitEnabled ?
                                                                <Button loading={submitLoading} title={"Submit"} onPress={() => this.setState({ submitLoading: true }, () => this.handleSubmitFunction())} />
                                                                :
                                                                <>
                                                                    <Button title={"NEXT"} disabled={answers.length == 0 ? true : false} onPress={() => this.setState({ question: index + 1, width: width + SCREEN_WIDTH }, () => {
                                                                        if ((index + 1) == data.length) { this.setState({ submitEnabled: true }) }
                                                                        else { this.scroll.scrollTo({ x: (width + SCREEN_WIDTH) }) }
                                                                    })} />
                                                                    <View style={{ marginTop: "5%" }}>
                                                                        <Button title={"Skip"} onPress={() => { }} />
                                                                    </View>

                                                                </>}
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