import React from 'react';
import { View } from "react-native";

/**
 * Return APi configured header with bearer token for APi calls
 * @param token
 * @param type
 */
export const apiHeaderConfiguration = (token, type) => {
    switch (type) {
        case "token":
            return {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
            break;

        case "multipart":
            return {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            }
            break;

        default:
            return { headers: { 'Content-Type': 'application/json' } }
            break;

    }
}


/**
 * Return Object After Parsing
 *  @param data
 */

export const ParseTheData = (data) => {
    return JSON.parse(data);
}

/**
 * Return Vertical Space of 10 Px
 */
export const VerticalSpacer = () => {
    return (<View style={{ height: 10 }}></View>)
}
export const HorizontalSpacer = () => {
    return (<View style={{ width: 10 }}></View>)
}

/**
 * Return True if email enter is correct
 * @param count
 */
export const moneyFormat = (count) => {
    return Math.abs(Number(count)) >= 1.0e+9
        ? Math.abs(Number(count)) / 1.0e+9 + "B"
        : Math.abs(Number(count)) >= 1.0e+6
            ? Math.abs(Number(count)) / 1.0e+6 + "M"
            : Math.abs(Number(count)) >= 1.0e+3
                ? Math.abs(Number(count)) / 1.0e+3 + "K"
                : Math.abs(Number(count));
}

/**
 * Return True if email enter is correct
 * @param email
 */
export const isEmailValid = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
}
/**
 * Return True if password has one capital one lower one number and one special and length must greater or equal to 8
 * @param password
 */
export const isPasswordValid = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})/.test(password)
}

/**
 * Return True if email enter is correct
 * @param phone
 */
export const isPhoneValid = (phone) => {
    return /^\+(?:[0-9]●?){6,14}[0-9]$/.test(phone)
}
