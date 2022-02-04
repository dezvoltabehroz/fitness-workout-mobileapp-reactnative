import React from 'react';
import { Button as BT } from 'react-native-elements';
import styles from './style';
const ClearButton = (props) => {

    const {
        disabled = false,
        loading = false,
        disabledStyle = {},
        buttonStyle = {},
        disabledTitleStyle = {},
        titleStyle = {},
        loadingProps = { color: '#44BDE8' },
        loadingStyle = {},
        icon = {},
        iconRight = false,
        onPress = () => { },
        type = "solid",
        title = "",
        raised = false,
        containerStyle = {},
        iconContainerStyle = {}
    } = props;
    return (
        <BT
            buttonStyle={{ ...buttonStyle && styles.clearBtnPrimary }}
            containerStyle={containerStyle}
            disabled={disabled}
            disabledStyle={disabledStyle}
            disabledTitleStyle={disabledTitleStyle}
            loading={loading}
            load
            onPress={onPress}
            loadingProps={loadingProps}
            loadingStyle={loadingStyle}
            raised={raised}
            title={title}
            type={type}
            icon={icon}
            iconRight={iconRight}
            iconContainerStyle={{ ...iconContainerStyle && styles.iconContainerStyle }}
            titleStyle={{ ...titleStyle && styles.clearBtnPrimaryText }}
        />
    )
};
export default ClearButton;