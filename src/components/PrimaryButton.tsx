import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from "../res/colors";
import helpers from "../res/helpers";

const PrimaryButton = (props) => {
    return (
        <TouchableOpacity
            style={[styles.primaryButton, props.additionalStyle]}
            onPress={props.onPressAction}>
            <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton


const styles = StyleSheet.create({
    primaryButton: {
        justifyContent: 'center',
        height: helpers.size.xxl,
        width: '100%',
        backgroundColor: colors.primaryColor,
        borderRadius: helpers.radius.normal,
        paddingHorizontal: helpers.padding.m,
    },
    title: {
        color: 'white',
        fontSize: helpers.fonSize.p,
        textAlign: 'center',
    }
})
