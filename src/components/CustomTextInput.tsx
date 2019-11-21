import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import colors from "../res/colors";
import helpers from "../res/helpers";

const CustomTextInput = (props) => {
    return <TextInput style={[styles.textInput, props.additionalStyle]} placeholder={props.placeholderText} placeholderTextColor={'rgba(255, 255, 255, 0.5)'}/>
}

export default CustomTextInput

const styles = StyleSheet.create({
    textInput: {
        height: helpers.size.xxl,
        width: '100%',
        backgroundColor: colors.inputBgColor,
        color: 'white',
        borderRadius: helpers.radius.normal,
        paddingHorizontal: helpers.padding.m,
        fontSize: helpers.fonSize.p,
    }
})
