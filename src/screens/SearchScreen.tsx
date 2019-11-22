import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import colors from '../res/colors';
import images from '../res/images';
import helpers from "../res/helpers";

import ApiService from '../services/api.service'

import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from "../components/PrimaryButton";

interface Props {
    navigation: any,
}
interface State {
    text: string,
}

export default class SearchScreen extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={images.logo}/>
                <CustomTextInput
                    placeholderText = "Enter a username"
                    additionalStyle={styles.textInput}
                    value={this.state.text}
                    onChangeText={(text) => this.setState({text})}/>
                <PrimaryButton
                    title={'Search User'}
                    additionalStyle={styles.button}
                    onPressAction={() => this.searchUserButtonPressed()}/>
            </View>
        );
    }
    searchUserButtonPressed(){
        return ApiService.getUserProfileAsync('DimaMiro')
            .then(res => {
                console.log(res)
                this.props.navigation.navigate('Home')
            })
            .catch(error => console.log(error))
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
