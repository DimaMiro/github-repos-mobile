import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import colors from '../res/colors';
import images from '../res/images';
import helpers from "../res/helpers";

import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from "../components/PrimaryButton";

interface Props {
    navigation: any,
}

export default class SearchScreen extends React.Component<Props> {
    render(){
        return(
            <View style={styles.container}>
                <Image source={images.logo}/>
                <CustomTextInput
                    placeholderText = "Enter a username"
                    additionalStyle={styles.textInput} />
                <PrimaryButton
                    title={'Search User'}
                    additionalStyle={styles.button}
                    onPressAction={() => this.props.navigation.navigate('Home')}/>
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
