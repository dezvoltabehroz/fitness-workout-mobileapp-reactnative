import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import themeStyle from '../../assets/styles/theme.style';

const Container = ({ children }) => {
    let colors = [
        themeStyle.PRIMARY_BACKGROUND_COLOR,
        themeStyle.PRIMARY_BACKGROUND_COLOR,
        themeStyle.PRIMARY_BACKGROUND_COLOR,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_DARK,
        themeStyle.DASH_DARK,
        themeStyle.DASH_DARK,
        themeStyle.DASH_DARK,
        themeStyle.DASH_DARK,
        themeStyle.DASH_DARK,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        themeStyle.DASH_LIGHT,
        // themeStyle.BAR_COLOR,
        // themeStyle.BAR_COLOR,
        // themeStyle.BAR_COLOR,
        // themeStyle.BAR_COLOR,
        '#44BDE8',
        '#44BDE8',
        '#44BDE8',
        '#44BDE8',
        '#44BDE8',
        '#44BDE8',
        '#44BDE8',
        '#44BDE8',
        '#44BDE8',
        '#44BDE8',
        // '#44BDE8',
        // '#44BDE8',
        // '#44BDE8',
        // '#44BDE8',
        // '#44BDE8',
        // '#44BDE8',
        // '#44BDE8',
        // '#44BDE8',
        // '#44BDE8',
        // '#44BDE8',
    ];
    return (
        <LinearGradient   start={{ x: 0.5, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{flex:1}}
        colors={[ themeStyle.PRIMARY_BACKGROUND_COLOR, themeStyle.DASH_LIGHT, themeStyle.DASH_DARK, themeStyle.BAR_COLOR]}>
            {children}
        </LinearGradient>
    )
};

export default Container;