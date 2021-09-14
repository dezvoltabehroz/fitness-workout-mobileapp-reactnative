import moment from 'moment';
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import themeStyle from '../../assets/styles/theme.style';

import { Container, UploadingModal } from '../../components';
import { getLocalData, LOCAL_STORAGE_KEYS } from '../../lib/utils/localstorage';
import { authActions } from '../../redux/actions/auth';
import { ProfileServices } from '../../services';

import styles from './style';

class ProgressPics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            loading: true,
            data: []
        }
    }

    componentDidMount = () => {
        const { user_id, token } = this.props.user.userData;
        ProfileServices.getAllProgressPhoto({ user_id: user_id }, token)
            .then((res) => {
                console.log(res.data)
                this.setState({ data: res.data.data, loading: false })
            })
            .catch((err) => console.log(err.response))

    }

    _renderItem = (item, index) => {
        console.log(item)
        return (
            <ImageBackground source={{ uri: item.pic_path }} style={styles.imageStyle} >
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{moment().format('ll')}</Text>
                </View>
            </ImageBackground>
        )
    }

    chooseFile = async () => {
        const user_id = await getLocalData(LOCAL_STORAGE_KEYS.user_id);
        const userToken = await getLocalData(LOCAL_STORAGE_KEYS.userToken);
        var options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            if (response.didCancel) {
            } else {
                this.setState({ uploading: true });
                let source = response;
                console.log(response)
                let formData = new FormData();
                formData.append('user_id', JSON.parse(user_id));
                formData.append('image', {
                    uri: Platform.OS === 'android' ? response.assets[0].uri : response.uri,
                    name: `${new Date().getTime().toString()}.jpg`,
                    filename: new Date().getTime().toString() + '.jpg',
                    type: 'image/jpg'
                });
                console.log("formData : ", formData)

                ProfileServices.updateProgressPhoto1(formData, JSON.parse(userToken))
                    .then((response) => {
                        console.log(response.data)
                        if (response.data.success) {
                            this.setState({ uploading: false });
                            this.componentDidMount()
                        }
                    })
                    .catch((err) => {
                        this.setState({ uploading: false });
                        console.log(err.response)
                    })
            }
        });
    };

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    {

                        this.state.loading ?
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator size={"small"} color={themeStyle.BAR_COLOR} />
                            </View>
                            :
                            this.state.data.length == 0 ?
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>No record found!</Text>
                                </View>
                                :
                                <FlatList data={this.state.data} renderItem={({ item, index }) => this._renderItem(item, index)} />
                    }

                    <TouchableOpacity onPress={this.chooseFile} style={styles.buttonContainer}>
                        <Text style={styles.btnText}>TAKE PIC</Text>
                    </TouchableOpacity>
                </View>
                <UploadingModal visible={this.state.uploading} />
            </Container>
        )
    }

}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
const mapDispatchToProps = dispatch => { return { authActions: bindActionCreators(authActions, dispatch) }; };
export default connect(mapStateToProps, mapDispatchToProps)(ProgressPics);