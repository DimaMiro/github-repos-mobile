import React from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native';
import colors from '../res/colors';
import images from '../res/images';
import helpers from "../res/helpers";

import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from "../components/PrimaryButton";

export default class SearchScreen extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Image source={images.logo}/>
                <CustomTextInput additionalStyle={styles.textInput} placeholderText = "Enter new list name" />
                <PrimaryButton title={'Search User'} additionalStyle={styles.button}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBgColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: helpers.padding.l
    },
    textInput: {
        marginTop: helpers.margin.xl,
    },
    button: {
        marginTop: helpers.margin.m,
    }
});
