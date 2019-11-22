import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from "../res/colors";
import helpers from "../res/helpers";
import images from "../res/images";

export default class HomeScreen extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.topContainer}>
                        <Image source={images.logo} style={{width: 175, resizeMode: 'contain'}}/>
                        <Image source={images.searchIcon}/>
                    </View>
                    <View style={styles.userInfoBox}>
                        <Image source={images.avatarPlaceholder} style={{backgroundColor: 'grey', width: 64, height: 64, resizeMode: 'cover', borderRadius: helpers.radius.normal}}/>
                        <View style={{marginLeft: helpers.margin.m}}>
                            <Text style={{fontSize: helpers.fonSize.title, color: 'white', fontWeight: 'bold'}}>DimaMiro</Text>
                            <Text style={{fontSize: helpers.fonSize.subtitle, color: 'white', marginTop: helpers.margin.xs}}>DimaMiro</Text>
                        </View>
                    </View>
                </View>
                <Text>Homescreen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        backgroundColor: colors.darkBgColor,
        width: '100%',
        paddingTop: getStatusBarHeight() + helpers.padding.s,
        paddingBottom: helpers.padding.xl,
        paddingHorizontal: helpers.padding.l,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfoBox: {
        flexDirection: 'row',
        marginTop: helpers.margin.m,
        alignItems: 'center',
    }
});
