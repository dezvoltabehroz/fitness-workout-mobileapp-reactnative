import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomMarker from '../CustomMarker';
import { Item } from './item';
import moment from 'moment';

export default class CustomSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            multiSliderValue: [this.props.min, this.props.max],
            first: this.props.min,
            second: this.props.max,
            value: [this.props.array]
        }
    }

    componentDidMount = () => {
        this.props.resetValue(this.handleResetValues)
    }


    render() {
        return (
            <View>
                <View style={[styles.column, { marginLeft: 0, marginRight: 0 }]}>
                    {this.renderScale()}
                </View>
                <View style={styles.container}>

                    <MultiSlider
                        trackStyle={{ backgroundColor: 'transparent' }}
                        selectedStyle={{ backgroundColor: "transparent" }}
                        values={this.props.single ? [this.state.multiSliderValue[1]] : [this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                        sliderLength={Dimensions.get('window').width * 0.7}
                        onValuesChange={this.multiSliderValuesChange}
                        min={this.props.min}
                        max={this.props.max}
                        step={1}
                        allowOverlap={false}
                        customMarker={CustomMarker}
                        snapped={true}
                    />
                </View>
            </View>
        );
    }

    handleResetValues = () => {
        this.setState({
            multiSliderValue: [this.props.min, this.props.max],
            first: this.props.min,
            second: this.props.max
        });
    }


    multiSliderValuesChange = values => {
        if (this.props.single) {
            this.setState({
                second: values[0],
            })
        } else {
            this.setState({
                multiSliderValue: values,
                first: values[0],
                second: values[1],
            })
        }
        this.props.callback(this.props.single?values[0]:values)
    }

    renderScale = () => {

        const items = [];
        for (let i = this.props.min; i < this.props.max + 1; i++) {
            items.push(
                <Item
                    value={i}
                    first={this.state.first}
                    second={this.state.second}
                />
            );
        }
        return items;
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "5%"
    },
    column: {
        flex: 1,
        width: Dimensions.get('window').width * 0.8,
        flexDirection: 'row',
        flexWrap: "wrap",
        alignSelf:"center",
        // alignItems: 'center',
        justifyContent: 'space-between',
        // bottom: -10,

    },
    active: {
        textAlign: 'center',
        fontSize: 20,
        color: '#5e5e5e',
    },
    inactive: {
        textAlign: 'center',
        fontWeight: 'normal',
        color: '#bdc3c7',
    },
    line: {
        textAlign: 'center',
    }
});