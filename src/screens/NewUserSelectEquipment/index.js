import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, FlatList } from 'react-native';

import { ColorContainer, ClearButton, Icon } from '../../components';
import { route, screen } from '../../lib/utils/constants';

import HeaderView from './components/headerView';
import Target from '../../assets/svg/dumbell.svg';
import Fit from '../../assets/svg/1029.svg';
import Muscles from '../../assets/svg/dumbell-weight.svg';
import Weight from '../../assets/svg/all-equipments.svg';
import Band from '../../assets/svg/band.svg';

import styles from './style';
import themeStyle from '../../assets/styles/theme.style';
import { getLocalData, LOCAL_STORAGE_KEYS, storeLocalData } from '../../lib/utils/localstorage';
import { SwitchIOS } from 'react-native';

const SVG_HEIGHT = 36;
const SVG_WIDTH = 36;

class AppIntro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: false,
            value: 0,
            fitnessEquipment: [{
                title: screen.APP_INTRO_Button_1_3,
                description: screen.APP_INTRO_Button_DESCRIPTION_1_3,
                svg: <Fit height={SVG_HEIGHT} width={SVG_WIDTH} />,
                selected: false
            },
            {
                title: screen.APP_INTRO_Button_2_3,
                description: screen.APP_INTRO_Button_DESCRIPTION_2_3,
                svg: <Muscles height={SVG_HEIGHT} width={SVG_WIDTH} />,
                selected: false
            },
            {
                title: screen.APP_INTRO_Button_3_3,
                description: screen.APP_INTRO_Button_DESCRIPTION_3_3,
                svg: <Band height={SVG_HEIGHT} width={SVG_WIDTH} />,
                selected: false
            },
            {
                title: screen.APP_INTRO_Button_4_3,
                description: screen.APP_INTRO_Button_DESCRIPTION_4_3,
                svg: <Weight height={SVG_HEIGHT} width={SVG_WIDTH} />,
                selected: false
            }],
            selectedEquipment: [],
        };
    }

    componentDidMount = async () => {
        // storeLocalData(LOCAL_STORAGE_KEYS.fitnessEquipment, JSON.stringify(screen.APP_INTRO_Button_1_3))
    }

    style_Func_1 = () => {
        let style = {};
        switch (this.state.value) {
            case 0:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    style_Func_2 = () => {
        let style = {};
        switch (this.state.value) {
            case 1:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    style_Func_3 = () => {
        let style = {};
        switch (this.state.value) {
            case 2:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    style_Func_4 = () => {
        let style = {};
        switch (this.state.value) {
            case 3:
                style = styles.selectedButtonStyle;
                break;
            default:
                style = styles.unSelectedButtonStyle
                break;
        }
        return style
    }

    setValue = async (value) => {
        this.setState({ value })
        switch (value) {
            case 0:
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessEquipment, JSON.stringify(screen.APP_INTRO_Button_1_3))
                break;
            case 1:
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessEquipment, JSON.stringify(screen.APP_INTRO_Button_2_3))
                break;
            case 2:
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessEquipment, JSON.stringify(screen.APP_INTRO_Button_3_3))
                break;
            case 3:
                storeLocalData(LOCAL_STORAGE_KEYS.fitnessEquipment, JSON.stringify(screen.APP_INTRO_Button_4_3))
                let equipment = await getLocalData(LOCAL_STORAGE_KEYS.fitnessEquipment)
                console.log(equipment)
                break;
        }
    }

    handleSelectEquipment = (item, index) => {
        let fitnessEquipment = [...this.state.fitnessEquipment]
        let selectedEquipment = [...this.state.selectedEquipment];

        if (item.title == 'Mixed equipment') {
            selectedEquipment = [];
            fitnessEquipment.map((item, i) => { fitnessEquipment[i] = { ...fitnessEquipment[i], selected: false } })
            fitnessEquipment[index] = { ...fitnessEquipment[index], selected: true }
            selectedEquipment.push(item.title)
            this.setState({ fitnessEquipment, selectedEquipment })

        } else if (item.title != 'Mixed equipment' && selectedEquipment.length < 2) {
            const valueIndex = selectedEquipment.indexOf('Mixed equipment');
            const equipmentIndex = fitnessEquipment.findIndex((obj) => obj.title == 'Mixed equipment');
            if (valueIndex !== -1) {
                selectedEquipment.splice(valueIndex, 1);
                fitnessEquipment[equipmentIndex] = { ...fitnessEquipment[equipmentIndex], selected: false }
            }
            if (fitnessEquipment[index].selected) {
                const objIndex = selectedEquipment.indexOf(item.title);
                selectedEquipment.splice(objIndex, 1);
                fitnessEquipment[index] = { ...fitnessEquipment[index], selected: false }
            } else {
                fitnessEquipment[index] = { ...fitnessEquipment[index], selected: true }
                selectedEquipment.push(item.title)
            }
            this.setState({ fitnessEquipment, selectedEquipment })
        }
    }

    render() {
        const { navigate, goBack, } = this.props.navigation;
        return (
            <ColorContainer>
                <StatusBar backgroundColor={themeStyle.PRIMARY_BACKGROUND_COLOR} barStyle={"dark-content"} />
                <HeaderView goBack={() => goBack()} />

                <View style={styles.container}>
                    <View style={styles.targetContainer}>
                        <Target />
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={styles.headingTextStyle}>{screen.APP_INTRO_Heading_3}</Text>
                        <Text style={[styles.decsTextStyle, { textAlign: "center" }]}>{screen.APP_INTRO_DESCRIPTION_3}</Text>
                    </View>
                    {
                        this.state.fitnessEquipment?.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    if (item.selected) {

                                        let fitnessEquipment = [...this.state.fitnessEquipment]
                                        let selectedEquipment = [...this.state.selectedEquipment];
                                        const objIndex = selectedEquipment.indexOf(item.title);
                                        selectedEquipment.splice(objIndex, 1);
                                        fitnessEquipment[index] = { ...fitnessEquipment[index], selected: false }
                                        console.log(selectedEquipment)
                                        this.setState({ fitnessEquipment: fitnessEquipment, selectedEquipment: selectedEquipment })
                                        console.log(selectedEquipment)
                                    } else { this.handleSelectEquipment(item, index) }
                                }} style={item.selected ? styles.selectedButtonStyle : styles.unSelectedButtonStyle}>
                                    <View style={styles.marginHorizontal1}>
                                        {item.svg}
                                    </View>
                                    <View style={styles.marginHorizontal}>
                                        <Text style={styles.decsHeading}>{item.title}</Text>
                                        <Text style={styles.decsTextStyle}>{item.description}</Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <ClearButton title={screen.NEXT} onPress={() => {
                        let equipmentString = "";
                        let selectedArray = [...this.state.selectedEquipment];
                        selectedArray.map((item, index) => { equipmentString = equipmentString.concat(`${item}${index == (selectedArray.length - 1) ? "" : ","}`) })
                        storeLocalData(LOCAL_STORAGE_KEYS.fitnessEquipment, JSON.stringify(equipmentString))
                        navigate(route.APPINTRO4th)
                    }} />
                </View>
            </ColorContainer>

        )
    }
}
export default AppIntro;