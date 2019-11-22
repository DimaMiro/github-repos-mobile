import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from "../res/colors";
import helpers from "../res/helpers";
import images from "../res/images";
import TouchableIcon from "../components/TouchableIcon";

interface Props {
    navigation: any,
}

export default class HomeScreen extends React.Component<Props> {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.topContainer}>
                        <Image source={images.logo} style={{width: 175, resizeMode: 'contain'}}/>
                        <TouchableIcon iconName={'searchIcon'}
                                       onPressAction={() => this.props.navigation.navigate('Search')}/>
                    </View>
                    <View style={styles.userInfoBox}>
                        <Image source={images.avatarPlaceholder} style={styles.avatarImage}/>
                        <View style={{marginLeft: helpers.margin.m}}>
                            <Text style={styles.userFullName}>Dima Miro</Text>
                            <Text style={styles.userName}>DimaMiro</Text>
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
    },
    avatarImage: {
        width: 64,
        height: 64,
        resizeMode: 'cover',
        borderRadius: helpers.radius.normal
    },
    userFullName: {
        fontSize: helpers.fonSize.title,
        color: 'white',
        fontWeight: 'bold'
    },
    userName: {
        fontSize: helpers.fonSize.subtitle,
        color: 'white',
        marginTop: helpers.margin.xs
    }
});
