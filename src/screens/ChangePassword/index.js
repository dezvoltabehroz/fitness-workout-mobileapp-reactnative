import React, { Component } from 'react';
import { View,Text } from 'react-native';
import { connect } from 'react-redux';

import { Button, Container, Input } from '../../components';
import { isPasswordValid } from '../../lib/utils/global';
import { route } from '../../lib/utils/constants';
import { AuthServices } from '../../services';
import styles from './style';
import themeStyle1 from '../../assets/styles/common.style';
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submit: false,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            loading: false
        }
    }

    handleChangePasswordFunction = () => {
        const { currentPassword, newPassword, submit, confirmPassword } = this.state;
        if (currentPassword && newPassword && newPassword == confirmPassword && submit && isPasswordValid(newPassword)) {
            let userData = {
                "user_id": this.props.user.userData.user_id,
                "current_password": currentPassword,
                "new_password": newPassword
            }
            AuthServices.changePassword(userData, this.props.user.userData.token)
                .then(async (res) => {
                    if (res.data.success) {
                        this.props.navigation.replace(route.MAIN)
                        this.setState({ loading: false })
                    }
                })
                .catch((err) => {
                    console.log(err.response)
                })

        } else {
            this.setState({ submit: true, loading: false })
        }
    }

    render() {
        const { submit, currentPassword, newPassword, confirmPassword, loading } = this.state;
        return (
            <Container>
                <View style={styles.container}>
                    <View style={styles.outLineContainer}>

                    </View>
                    <View style={{ flex: 0.8, marginTop: "10%" }}>
                        <View style={{ marginHorizontal: "5%" }}>
                            <Input value={currentPassword} label="Enter your current password" onChangeText={(e) => this.setState({ currentPassword: e })} />
                            {
                                submit && !currentPassword ? <Text style={[themeStyle1.errorText, { marginBottom: 10 }]}>Please fill this field</Text> : null
                            }
                        </View>
                        <View style={{ marginHorizontal: "5%", marginTop: "5%" }}>
                            <Input value={newPassword} secureTextEntry={true} label="Enter your new password" onChangeText={(e) => this.setState({ newPassword: e })} />
                            {
                                submit && !newPassword ? <Text style={[themeStyle1.errorText,]}>Please fill this field</Text> : null
                            }
                            {
                                submit && newPassword.length && !isPasswordValid(newPassword) ? <Text style={[themeStyle1.errorText,]}>Email is invalid</Text> : null
                            }

                        </View>
                        <View style={{ marginHorizontal: "5%", marginTop: "5%" }}>
                            <Input value={confirmPassword} secureTextEntry={true} label="Re-Type your new password" onChangeText={(e) => this.setState({ confirmPassword: e })} />
                            {
                                submit && !confirmPassword ? <Text style={[themeStyle1.errorText,]}>Please fill this field</Text> :
                                    submit && newPassword != confirmPassword ? <Text style={[themeStyle1.errorText,]}>Password Mismatch</Text> : null
                            }
                        </View>
                        <View style={{ marginHorizontal: "15%", marginTop: "10%" }}>
                            <Button loading={loading} title="Change Password" onPress={() => this.setState({ submit: true, loading: true }, () => this.handleChangePasswordFunction())} />
                        </View>
                    </View>
                </View>
            </Container>
        )
    }
}
const mapStateToProps = (state) => { return { user: state.authReducer || {} }; };
export default connect(mapStateToProps)(ChangePassword);