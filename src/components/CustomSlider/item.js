import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

export class Item extends Component {
    style_Func = () => {
        let style;
        switch (this.props.value) {
            case 0:
                style = 'Not Fit ';
                break;
            case 1:
                style = 'Average Fit ';
                break;
            case 2:
                style = 'Good Fit ';
                break;
            case 3:
                style = 'Very Fit ';
                break;
            default:
                style = ''
                break;
        }
        return style
    }
    render() {
        return (
            <View style={{ marginTop: '15%', justifyContent: "center", alignItems: "center" }}>
                <View style={this.checkActive() ? styles.lineStyle : styles.line}>
                    <Text style={this.checkActive() ? styles.active : styles.inactive}> {`${this.style_Func()}`}</Text>
                </View>
            </View>
        );
    }

    checkActive = () => {
        if (this.props.value == this.props.second)
            return true
        else
            return false
    }

}

const styles = StyleSheet.create({
    active: {
        fontSize: 13,
        color: '#5e5e5e',

        textAlign: "center"
    },
    inactive: {
        fontSize: 0,
        fontWeight: 'normal',
        color: '#bdc3c7',
    },
    line: {
        top: 15,
        height: 7.5, width: 7.5,
        borderRadius: 5,
        backgroundColor: "#797B7B",
    },
    lineStyle: {
        backgroundColor: themeStyle.DASH_DARK,
        borderRadius: 15,
        top: 15,
        padding: 5,
        height: 30,
        width: "110%",
    }
});