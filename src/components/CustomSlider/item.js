import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import themeStyle from '../../assets/styles/theme.style';

export class Item extends Component {
    style_Func = () => {
        let style;
        switch (this.props.value) {
            case 0:
                style = 'Not Fit';
                break;
            case 1:
                style = 'Average Fit';
                break;
            case 2:
                style = 'Good Fit';
                break;
            case 3:
                style = 'Very Fit';
                break;
            default:
                style = ''
                break;
        }
        return style
    }
    render() {
        return (
            <View style={{ marginTop: '15%' ,justifyContent:"center"}}>
                <Text style={this.checkActive() ? [styles.lineStyle, styles.active] : [styles.line, styles.inactive, { backgroundColor: "#D3D3D3", }]}> {`${this.style_Func()}`}</Text>
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
        fontSize: 10,
        color: '#5e5e5e',
    },
    inactive: {
        fontSize: 0,
        fontWeight: 'normal',
        color: '#bdc3c7',
    },
    line: {
        top: 10,
        height: 5, width: 5,
        borderRadius: 5,
    },
    lineStyle: { backgroundColor: themeStyle.DASH_DARK, borderRadius: 15, top: 10, padding: 5,textAlign:"center", height: 25, }
});