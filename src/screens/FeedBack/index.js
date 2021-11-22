import moment from 'moment';
import React, { Component } from 'react';
import { Alert, FlatList, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import themeStyle from '../../assets/styles/theme.style';
import { Button, Container, Icon, Input } from '../../components';
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
            answer: "",
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
                    let options_array = []
                    item.options_arr.forEach((element, i) => {
                        options_array.push({ ...element, is_check: 0 })
                    })
                    questionArray[index] = { ...questionArray[index], options_array: options_array }

                })
                this.setState({ data: questionArray, loading: false })
            })
            .catch((err) => console.log(err.response))
    }

    handleSubmitFunction = () => {
        const { user_id, token, workout_user_id, diet_user_id } = this.props.user.userData;
        const { answers } = this.state;
        let data = {
            "user_id": user_id,
            "answers_array": answers
        }
        SurveysServices.submitAnswers(data, token)
            .then((res) => {
                console.log(res.data)
                if (res.data.success) {
                    let serveyData = {
                        "user_id": user_id,
                        "submitted_date": moment().format('YYYY-MM-DD'),
                        "workout_user_id": workout_user_id,
                        // "diet_user_id": diet_user_id
                    }
                    SurveysServices.updateSurveySubmitDate(serveyData, token)
                        .then((response) => { if (response.data.success) { this.props.navigation.goBack(); } })
                        .catch((error) => console.log(error.response))
                }
                else { this.setState({ submitLoading: false }) }
            })
            .catch((err) => err.response)
    }

    chooseFile = async (item) => {
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else {
                this.setState({ uploading: true });
                switch (item) {
                    case 'frontImage':
                        this.setState({ frontImage: response.assets[0].uri })
                        break;
                    case 'backImage':
                        this.setState({ backImage: response.assets[0].uri })
                        break;
                    case 'rightImage':
                        this.setState({ rightImage: response.assets[0].uri })
                        break;
                    case 'leftImage':
                        this.setState({ leftImage: response.assets[0].uri })
                        break;
                }
            }
        });
    };

    handleAnswerFunction = (text, index) => {
        let array = [...this.state.data];
        let anwserArray = [...this.state.answers]
        let ansObjIndex = anwserArray.findIndex((ansObj) => ansObj.question_id == array[index].ques_id)
        if (ansObjIndex !== -1) {
            anwserArray[ansObjIndex] = { ...anwserArray[ansObjIndex], answer: text }
        } else {
            anwserArray.push({
                is_skip: 0,
                "question_id": array[index].ques_id,
                "answer": text
            })
        }
        this.setState({ data: array, answers: anwserArray, answer: text })
    }

    render() {
        const { question, data, width, loading, answers, submitEnabled, submitLoading, answer, frontImage, backImage, rightImage, leftImage } = this.state;
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
                                            onComplete={() => { }}
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
                                            <View style={{ width: SCREEN_WIDTH, flex: 1, }}>
                                                <View style={{ backgroundColor: "white", padding: "5%", borderRadius: 20, marginHorizontal: "5%" }}>
                                                    <ScrollView showsVerticalScrollIndicator={false}>
                                                        <View style={{ flex: 0.8 }}>
                                                            <Text style={{ color: 'lightgray' }}>{item.ques_id == 16 && item.options_array.length == 0 ? "Capture Image" : item.options_array.length == 0 ? "Type Answer" : "Select Answer"}</Text>
                                                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{item.ques_statement}</Text>

                                                            <View>
                                                                {item.options_array.length == 0 && item.ques_id == 16 ?
                                                                    <View>
                                                                        <View style={{ flexDirection: "row", marginTop: "5%" }}>
                                                                            {frontImage ?
                                                                                <ImageBackground source={{ uri: frontImage }} imageStyle={{ borderRadius: 20 }} style={{ marginHorizontal: "2.5%", width: SCREEN_WIDTH * 0.35, height: 125 }}>
                                                                                </ImageBackground>
                                                                                :
                                                                                <TouchableOpacity onPress={() => this.chooseFile('frontImage')} style={{ backgroundColor: "lightgray", borderRadius: 20, width: SCREEN_WIDTH * 0.35, marginHorizontal: "2.5%", justifyContent: "center", alignItems: "center", height: 125 }}>
                                                                                    <Icon.FontAwesome name="camera" color="gray" size={40} />
                                                                                    <Text style={styles.grayText}>Front Picture</Text>
                                                                                </TouchableOpacity>}
                                                                            {backImage ?
                                                                                <ImageBackground source={{ uri: frontImage }} imageStyle={{ borderRadius: 20 }} style={{ marginHorizontal: "2.5%", width: SCREEN_WIDTH * 0.35, height: 125 }}>
                                                                                </ImageBackground>
                                                                                :
                                                                                <TouchableOpacity onPress={() => this.chooseFile('backImage')} style={{ backgroundColor: "lightgray", borderRadius: 20, width: SCREEN_WIDTH * 0.35, marginHorizontal: "2.5%", justifyContent: "center", alignItems: "center", height: 125 }}>
                                                                                    <Icon.FontAwesome name="camera" color="gray" size={40} />
                                                                                    <Text style={styles.grayText}>Back Picture</Text>
                                                                                </TouchableOpacity>}
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", marginTop: "5%" }}>
                                                                            {rightImage ?
                                                                                <ImageBackground source={{ uri: frontImage }} imageStyle={{ borderRadius: 20 }} style={{ marginHorizontal: "2.5%", width: SCREEN_WIDTH * 0.35, height: 125 }}>
                                                                                </ImageBackground>
                                                                                :
                                                                                <TouchableOpacity onPress={() => this.chooseFile('rightImage')} style={{ backgroundColor: "lightgray", borderRadius: 20, width: SCREEN_WIDTH * 0.35, marginHorizontal: "2.5%", justifyContent: "center", alignItems: "center", height: 125 }}>
                                                                                    <Icon.FontAwesome name="camera" color="gray" size={40} />
                                                                                    <Text style={styles.grayText}>Right side Picture</Text>
                                                                                </TouchableOpacity>}
                                                                            {leftImage ?
                                                                                <ImageBackground source={{ uri: frontImage }} imageStyle={{ borderRadius: 20 }} style={{ marginHorizontal: "2.5%", width: SCREEN_WIDTH * 0.35, height: 125 }}>
                                                                                </ImageBackground>
                                                                                :
                                                                                <TouchableOpacity onPress={() => this.chooseFile('leftImage')} style={{ backgroundColor: "lightgray", borderRadius: 20, width: SCREEN_WIDTH * 0.35, marginHorizontal: "2.5%", justifyContent: "center", alignItems: "center", height: 125 }}>
                                                                                    <Icon.FontAwesome name="camera" color="gray" size={40} />
                                                                                    <Text style={styles.grayText}>Left side Picture</Text>
                                                                                </TouchableOpacity>}
                                                                        </View>
                                                                    </View>
                                                                    :

                                                                    item.options_array.length == 0 ?
                                                                        <View>
                                                                            <Input value={answer} placeholder="Enter your answer" onChangeText={(text) => this.handleAnswerFunction(text, index)} />
                                                                        </View>
                                                                        :
                                                                        item.options_array.map((element, i) => {
                                                                            return (
                                                                                <TouchableOpacity onPress={() => {
                                                                                    let array = [...data];
                                                                                    let anwserArray = [...answers]
                                                                                    array.forEach((itemData, itemIndex) => {
                                                                                        itemData.options_array.forEach((elementData, elementIndex) => {
                                                                                            array[itemIndex].options_array[elementIndex] = { ...array[itemIndex].options_array[elementIndex], is_check: 0 }
                                                                                        })
                                                                                    })
                                                                                    array[index].options_array[i] = { ...array[index].options_array[i], is_check: 1 }
                                                                                    anwserArray.push({
                                                                                        is_skip: 0,
                                                                                        "question_id": array[index].ques_id,
                                                                                        "answer_id": array[index].options_array[i].id
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
                                                        <View style={{ marginTop: "30%" }}>
                                                            {submitEnabled ?
                                                                <Button loading={submitLoading} title={"Submit"} onPress={() => this.setState({ submitLoading: true }, () => this.handleSubmitFunction())} />
                                                                :
                                                                <>
                                                                    <Button title={"NEXT"} disabled={answers.length == 0 || data[index].options_array.length == 0 && !answer ? true : false} onPress={() => this.setState({ question: index + 1, width: width + SCREEN_WIDTH }, () => {
                                                                        if ((index + 1) == data.length) { this.setState({ submitEnabled: true }) }
                                                                        else { this.scroll.scrollTo({ x: (width + SCREEN_WIDTH) }); this.setState({ answer: "" }) }
                                                                    })} />
                                                                    {/* <View style={{ marginTop: "5%" }}>
                                                                        <Button title={"Skip"} onPress={() => { }} />
                                                                    </View> */}

                                                                </>}
                                                        </View>
                                                    </ScrollView>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView >
                        </View >
                }
            </Container >
        )
    }

}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
const mapDispatchToProps = dispatch => { return { authActions: bindActionCreators(authActions, dispatch) }; };
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);