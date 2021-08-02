import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from "..";
import THEME from '../../assets/styles/theme.style';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/utils/constants';
import { HorizontalSpacer } from '../../lib/utils/global';
import Target from '../../assets/svg/target.svg';
import Dumbell from '../../assets/svg/dumbell.svg';

const CheckedBox = ({ data, onPress }) => {
    let array = [1, 2, 3, 4, 5]
    console.log(array)
    const handleRating = (value) => {
        let data;
        switch (value) {
            case 1:
                data = <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: SCREEN_WIDTH * 0.25 }}>
                    <Target height={15} width={15} />
                    <Dumbell height={15} width={15} />
                    <Dumbell height={15} width={15} />
                    <Dumbell height={15} width={15} />
                    <Dumbell height={15} width={15} />
                </View>
                break;

            default:
                break;
        }
        return data
    }
    const _renderItems = (item, index) => {

        return (
            <ImageBackground source={require('../../assets/images/rob.jpg')} style={styles.contentContainer}>
                <Text style={styles.whiteTextStyle1}>{item.title}</Text>
                {handleRating(item.rating)}
            </ImageBackground>
        )
    }
    return (

        <FlatList
            data={data}
            horizontal={true}
            contentContainerStyle={{ paddingHorizontal: "5%" }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => _renderItems(item, index)}
            ItemSeparatorComponent={(HorizontalSpacer)} />


    )
};


const styles = StyleSheet.create({
    whiteTextStyle1: {
        fontSize: 16,
        fontWeight: "bold",
        color: THEME.COLOR_WHITE,
        marginHorizontal: 5
    },
    contentContainer: { backgroundColor: THEME.DASH_LIGHT, borderRadius: 25, padding: 30, justifyContent: "space-between", overflow: "hidden", height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 0.7 }
})

export default CheckedBox;
