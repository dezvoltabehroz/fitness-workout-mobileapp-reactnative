import moment from 'moment';
import React, { Component } from 'react';
import { Alert, FlatList, Text, View, ActivityIndicator, TouchableOpacity, ScrollView, ImageBackground, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import themeStyle from '../../assets/styles/theme.style';
import { Button, Container, Icon, ImageStyleModal, Input, UploadingModal } from '../../components';
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
            submitLoading: false,
            uploading: false,
            calf: "",
            tummy: "",
            waist: "",
            hip: "",
            thigh: "",
            shoulder: "",
            arm: "",
            chest: "",
            frontImage: "",
            backImage: "",
            rightImage: "",
            leftImage: "",
            imageModal: false,
            imageType: ""
        }
    }

    componentDidMount = () => {
        const { user_id, token } = this.props.user.userData;
        SurveysServices.getQuestions(token)
            .then((res) => {
                console.log(res)
                let questionArray = [...res.data.data]
                questionArray.forEach((item, index) => {
                    let options_array = []
                    item.options_arr.forEach((element, i) => {
                        options_array.push({ ...element, is_check: 0 })
                    })
                    questionArray[index] = { ...questionArray[index], options_array: options_array }
                })
                console.log('questionArray : ', questionArray)
                this.setState({ data: questionArray, loading: false })
            })
            .catch((err) => console.log("err.response : ", err.response))
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
        if (Platform.OS == 'android')
            this.setState({ imageModal: false })
        try {
            ImagePicker.openCamera({
                width: 300,
                height: 400,
                includeBase64: false,
                compressImageQuality: 0.1
            }).then(photos => {
                const { token } = this.props.user.userData;
                console.log(photos)
                let formData = new FormData();
                formData.append('survey_images', {
                    uri: photos.path,
                    name: `${new Date().getTime().toString()}.jpg`,
                    filename: new Date().getTime().toString() + '.jpg',
                    type: photos.mime
                })
                this.setState({ uploading: true });
                switch (item) {
                    case 'frontImage':
                        SurveysServices.uploadSurveyImages(formData, token)
                            .then((res) => {
                                console.log(res.data)
                                this.setState({ uploading: false, frontImage: res.data.data })
                            })
                            .catch((err) => { console.log(err); console.log(err.response) })
                        break;
                    case 'backImage':
                        SurveysServices.uploadSurveyImages(formData, token)
                            .then((res) => {
                                console.log(res.data)
                                this.setState({ uploading: false, backImage: res.data.data })
                            })
                            .catch((err) => { console.log(err); console.log(err.response) })
                        break;
                    case 'rightImage':
                        SurveysServices.uploadSurveyImages(formData, token)
                            .then((res) => {
                                console.log(res.data)
                                this.setState({ uploading: false, rightImage: res.data.data })
                            })
                            .catch((err) => { console.log(err); console.log(err.response) })
                        break;
                    case 'leftImage':
                        SurveysServices.uploadSurveyImages(formData, token)
                            .then((res) => {
                                console.log(res.data)
                                this.setState({ uploading: false, leftImage: res.data.data })
                            })
                            .catch((err) => { console.log(err); console.log(err.response) })
                        break;
                }
            }).catch(err => {
                console.log(err)
            });
        } catch (error) {
            console.log(error)
        }
    };

    handleAnswerFunction = (text, index) => {
        let array = [...this.state.data];
        let anwserArray = [...this.state.answers]
        let ansObjIndex = anwserArray.findIndex((ansObj) => ansObj.question == array[index].ques_statement)
        if (ansObjIndex !== -1) {
            anwserArray[ansObjIndex] = { ...anwserArray[ansObjIndex], answer: text }
        } else {
            anwserArray.push({
                "question": `${array[index].ques_statement}`,
                "answer": `${text}`
            })
        }
        this.setState({ data: array, answers: anwserArray, answer: text })
    }

    handleUpdateAnswers = (i) => {
        const { data, width } = this.state;
        const { user_id, token, old_workout_user_id, diet_user_id } = this.props.user.userData;
        this.setState({ uploading: true });
        let surveysAnswer = [...this.state.answers];
        let surveyData = {
            "user_id": parseInt(user_id),
            "workout_user_id": parseInt(old_workout_user_id),
            "diet_user_id": 0,
            "survey_answer": surveysAnswer
        }
        console.log(surveyData)
        SurveysServices.updateSurveyAnswers(surveyData, token)
            .then((res) => {
                console.log(res.data)
                this.setState({ uploading: false })
                if (res.data.success) {
                    this.props.authActions.getUserProfile({ user_id: user_id, token: token })
                    if ((i + 1) == data.length) { this.setState({ submitEnabled: true }) }
                    else {
                        this.setState({ question: i + 1, width: width + SCREEN_WIDTH })
                        this.scroll.scrollTo({ x: this.state.width }); this.setState({ answer: "" })

                    }
                } else {
                    Alert.alert(`${res.data.message}`)
                }
                // if ((i + 1) == data.length) { this.setState({ submitEnabled: true }) }
                // else {
                //     this.setState({ question: i + 1, width: width + SCREEN_WIDTH })
                //     this.scroll.scrollTo({ x: this.state.width }); this.setState({ answer: "" })
                // }
            })
            .catch((err) => console.log(err.response))

    }

    handleAnswerOfMeasurements = (text, index) => {
        const { data, width } = this.state;
        console.log(text, index)
        console.log(parseFloat(text))
        console.log(this.state.data[index].ques_statement)
        this.setState({ answer: text })
        switch (this.state.data[index].ques_statement) {
            case "What is your arm measurement?":
                this.setState({ arm: text })
                break;
            case "What is your shoulder measurement?":
                this.setState({ shoulder: text })
                break;
            case "What is your chest measurement?":
                this.setState({ chest: text })
                break;
            case "What is your waist measurement?":
                this.setState({ waist: text })
                break;
            case "What is your tummy measurement?":
                this.setState({ tummy: text })
                break;
            case "What is your hip measurement? (Optional)":
                this.setState({ hip: text })
                if (text == '0.0')
                    if ((index + 1) == data.length) { this.setState({ submitEnabled: true }) }
                    else {
                        this.setState({ question: index + 1, width: width + SCREEN_WIDTH })
                        this.scroll.scrollTo({ x: (width + SCREEN_WIDTH) }); this.setState({ answer: "" })
                    }
                break;
            case "What is your thigh measurement?":
                this.setState({ thigh: text })
                break;
            case "What is your calf measurement?":
                this.setState({ calf: text })
                break;
        }

    }

    handleUpdateMeasurement = (i) => {
        const { calf, tummy, waist, hip, thigh, shoulder, arm, chest, } = this.state;
        const { user_id, token, old_workout_user_id, diet_user_id } = this.props.user.userData;
        this.setState({ uploading: true });
        let surveysAnswer = [...this.state.answers];
        console.log("surveysAnswer : ", surveysAnswer);
        console.log("this.state.data : ", this.state.data);
        let data = {
            "user_id": parseInt(user_id),
            "workout_user_id": parseInt(old_workout_user_id),
            "diet_user_id": 0,
            "arm_size": parseFloat(arm),
            "chest_size": parseFloat(chest),
            "shoulder_size": parseFloat(shoulder),
            "waist_size": parseFloat(waist),
            "tummy_size": parseFloat(tummy),
            "hip_size": parseFloat(hip),
            "thigh_size": parseFloat(thigh),
            "calf_size": parseFloat(calf),
        }
        console.log(data)
        SurveysServices.updateSurveyMeasurements(data, token)
            .then((res) => {
                console.log(res.data)
                this.setState({ uploading: false })
                if (res.data.success) {
                    if ((i + 1) == this.state.data.length) { this.setState({ submitEnabled: true }) }
                    else {
                        this.setState({ question: i + 1, width: this.state.width + SCREEN_WIDTH })
                        this.scroll.scrollTo({ x: (this.state.width + SCREEN_WIDTH) }); this.setState({ answer: "" })
                    }
                } else {
                    Alert.alert(`${res.data.message}`)
                }
                // if ((i + 1) == this.state.data.length) { this.setState({ submitEnabled: true }) }
                // else {
                //     this.setState({ question: i + 1, width: this.state.width + SCREEN_WIDTH })
                //     this.scroll.scrollTo({ x: (this.state.width + SCREEN_WIDTH) }); this.setState({ answer: "" })
                // }
            })
            .catch((err) => console.log(err.response))

    }

    handleUploadImages = (i) => {
        const { user_id, token, old_workout_user_id, diet_user_id } = this.props.user.userData;
        const { frontImage, backImage, rightImage, leftImage } = this.state;
        if (frontImage && backImage && rightImage && leftImage) {
            this.setState({ uploading: true })
            let imagesArray = [];
            imagesArray.push(frontImage);
            imagesArray.push(backImage);
            imagesArray.push(rightImage);
            imagesArray.push(leftImage);

            let formData = {
                "user_id": parseInt(user_id),
                "workout_user_id": parseInt(old_workout_user_id),
                "diet_user_id": 0,
                "files": imagesArray
            }
            SurveysServices.updateSurveyImages(formData, token)
                .then((res) => {
                    console.log(res.data)
                    this.setState({ uploading: false })
                    this.props.navigation.goBack();
                })
                .catch((err) => { console.log(err); console.log(err.response) })
        } else {
            Alert.alert("Please select all images")
        }
    }


    render() {
        const { question, data, width, imageType, imageModal, loading, answers, submitEnabled, hip, submitLoading, answer, frontImage, backImage, rightImage, leftImage } = this.state;
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
                                                                                    <View style={{ alignItems: "flex-end" }}>
                                                                                        <TouchableOpacity onPress={() => this.setState({ frontImage: "" })} style={{ height: 30, width: 30, backgroundColor: themeStyle.DASH_DARK, margin: 5, borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                                                                                            <Icon.Entypo name="cross" size={15} color={"white"} />
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                                :
                                                                                <TouchableOpacity onPress={() => this.setState({ imageType: "", imageModal: true })} style={{ backgroundColor: "lightgray", borderRadius: 20, width: SCREEN_WIDTH * 0.35, marginHorizontal: "2.5%", justifyContent: "center", alignItems: "center", height: 125 }}>
                                                                                    <Icon.FontAwesome name="camera" color="gray" size={40} />
                                                                                    <Text style={styles.grayText}>Front Picture</Text>
                                                                                </TouchableOpacity>}
                                                                            {backImage ?
                                                                                <ImageBackground source={{ uri: backImage }} imageStyle={{ borderRadius: 20 }} style={{ marginHorizontal: "2.5%", width: SCREEN_WIDTH * 0.35, height: 125 }}>
                                                                                    <View style={{ alignItems: "flex-end" }}>
                                                                                        <TouchableOpacity onPress={() => this.setState({ backImage: "" })} style={{ height: 30, width: 30, backgroundColor: themeStyle.DASH_DARK, margin: 5, borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                                                                                            <Icon.Entypo name="cross" size={15} color={"white"} />
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                                :
                                                                                <TouchableOpacity onPress={() => this.chooseFile('backImage')} style={{ backgroundColor: "lightgray", borderRadius: 20, width: SCREEN_WIDTH * 0.35, marginHorizontal: "2.5%", justifyContent: "center", alignItems: "center", height: 125 }}>
                                                                                    <Icon.FontAwesome name="camera" color="gray" size={40} />
                                                                                    <Text style={styles.grayText}>Back Picture</Text>
                                                                                </TouchableOpacity>}
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", marginTop: "5%" }}>
                                                                            {rightImage ?
                                                                                <ImageBackground source={{ uri: rightImage }} imageStyle={{ borderRadius: 20 }} style={{ marginHorizontal: "2.5%", width: SCREEN_WIDTH * 0.35, height: 125 }}>
                                                                                    <View style={{ alignItems: "flex-end" }}>
                                                                                        <TouchableOpacity onPress={() => this.setState({ rightImage: "" })} style={{ height: 30, width: 30, backgroundColor: themeStyle.DASH_DARK, margin: 5, borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                                                                                            <Icon.Entypo name="cross" size={15} color={"white"} />
                                                                                        </TouchableOpacity>
                                                                                    </View>
                                                                                </ImageBackground>
                                                                                :
                                                                                <TouchableOpacity onPress={() => this.chooseFile('rightImage')} style={{ backgroundColor: "lightgray", borderRadius: 20, width: SCREEN_WIDTH * 0.35, marginHorizontal: "2.5%", justifyContent: "center", alignItems: "center", height: 125 }}>
                                                                                    <Icon.FontAwesome name="camera" color="gray" size={40} />
                                                                                    <Text style={styles.grayText}>Right side Picture</Text>
                                                                                </TouchableOpacity>}
                                                                            {leftImage ?
                                                                                <ImageBackground source={{ uri: leftImage }} imageStyle={{ borderRadius: 20 }} style={{ marginHorizontal: "2.5%", width: SCREEN_WIDTH * 0.35, height: 125 }}>
                                                                                    <View style={{ alignItems: "flex-end" }}>
                                                                                        <TouchableOpacity onPress={() => this.setState({ leftImage: "" })} style={{ height: 30, width: 30, backgroundColor: themeStyle.DASH_DARK, margin: 5, borderRadius: 15, justifyContent: "center", alignItems: "center" }}>
                                                                                            <Icon.Entypo name="cross" size={15} color={"white"} />
                                                                                        </TouchableOpacity>
                                                                                    </View>
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
                                                                            <Input value={answer} keyboardType={index >= 7 ? "decimal-pad" : "default"} placeholder={index == 12 ? "0.0" : "Enter your answer"} onChangeText={(text) => { if (index <= 14 && index >= 7) { this.handleAnswerOfMeasurements(text, index) } else { this.handleAnswerFunction(text, index) } }} />
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
                                                                                    anwserArray = anwserArray.filter((elemnet) => item.ques_statement != elemnet.question)
                                                                                    array[index].options_array[i] = { ...array[index].options_array[i], is_check: 1 }
                                                                                    anwserArray.push({
                                                                                        "question": `${array[index].ques_statement}`,
                                                                                        "answer": `${array[index].options_array[i].options}`
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
                                                                    <Button title={"NEXT"} disabled={index == 12 ? false : data[index].options_array.length == 0 && data[index].ques_id == 16 ? false : answers.length - index == 0 && index <= 6 ? true : data[index].options_array.length == 0 && !answer ? true : false} onPress={() => {
                                                                        if (index <= 6) {
                                                                            if (index == 6) {
                                                                                this.handleUpdateAnswers(index);
                                                                            } else {
                                                                                if ((index + 1) == data.length) { this.setState({ submitEnabled: true }) }
                                                                                else {
                                                                                    this.setState({ question: index + 1, width: width + SCREEN_WIDTH })
                                                                                    this.scroll.scrollTo({ x: (width + SCREEN_WIDTH) }); this.setState({ answer: "" })
                                                                                }
                                                                            }
                                                                        } else if (index <= 14 && index >= 7) {
                                                                            if (index == 12 && hip == '') {
                                                                                this.handleAnswerOfMeasurements('0.0', index);

                                                                            } else if (index == 14) {
                                                                                this.handleUpdateMeasurement(index);
                                                                            } else if (index >= 7) {
                                                                                if ((index + 1) == data.length) { this.setState({ submitEnabled: true }) }
                                                                                else {
                                                                                    this.setState({ question: index + 1, width: width + SCREEN_WIDTH })
                                                                                    this.scroll.scrollTo({ x: (width + SCREEN_WIDTH) }); this.setState({ answer: "" })
                                                                                }
                                                                            }
                                                                        } else if (index == 15) {
                                                                            this.handleUploadImages(index);
                                                                        }
                                                                    }} />
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
                <UploadingModal visible={this.state.uploading} />
                <ImageStyleModal
                    visible={this.state.imageModal}
                    frontImage={imageType == 'frontImage' ? true : false}
                    backImage={imageType == 'backImage' ? true : false}
                    rightImage={imageType == 'rightImage' ? true : false}
                    leftImage={imageType == 'leftImage' ? true : false}
                    openCamera={(type) => this.chooseFile(type)}
                />
            </Container >
        )
    }

}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
const mapDispatchToProps = dispatch => { return { authActions: bindActionCreators(authActions, dispatch) }; };
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);