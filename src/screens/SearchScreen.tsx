import React from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';

import colors from '../res/colors';
import images from '../res/images';
import helpers from "../res/helpers";

import ApiService from '../services/api.service'

import GUser from '../interfaces/user.interface'

import CustomTextInput from '../components/CustomTextInput';
import PrimaryButton from "../components/PrimaryButton";

interface Props {
    navigation: any,
}
interface State {
    inputText: string,
    isLoading: boolean,
}

export default class SearchScreen extends React.Component<Props, State> {
    state = {
        inputText: '',
        isLoading: false,
    };

    render(){
        return(
            <View style={styles.container}>
                <Image source={images.logo}/>
                <CustomTextInput
                    placeholderText = "Enter a username"
                    additionalStyle={styles.textInput}
                    value={this.state.inputText}
                    onChangeText={(text) => this.setState({inputText: text})}/>
                <PrimaryButton
                    title={'Search User'}
                    additionalStyle={styles.button}
                    onPressAction={() => this.searchUserButtonPressed()}
                    isLoading={this.state.isLoading}/>
            </View>
        );
    }
    searchUserButtonPressed(){
        if (this.state.inputText !== ''){
            this.setState({isLoading: true});
            ApiService.getUserProfileAsync(this.state.inputText)
                .then(res => {
                    if (res.login) {
                        const user: GUser =  {
                            avatar_url: res.avatar_url,
                            login: res.login,
                            name: res.name,
                        }
                        console.log(user)
                        this.props.navigation.navigate('Home')
                        this.setState({isLoading: false});
                        this.setState({inputText: ''});
                    } else {
                        Alert.alert(
                            'Error',
                            res.message,
                            [
                                {
                                    text: 'OK',
                                    onPress: () => this.setState({isLoading: false})},
                            ],
                            {cancelable: false},
                        );
                    }
                })
                .catch(error => console.log(error))
        } else {
            Alert.alert(
                'Empty input',
                'Please enter a username',
                [
                    {text: 'OK'},
                ],
                {cancelable: false},
            );
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBgColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: helpers.padding.l,
        paddingBottom: 100,
    },
    textInput: {
        marginTop: helpers.margin.xl,
    },
    button: {
        marginTop: helpers.margin.m,
    }
});
