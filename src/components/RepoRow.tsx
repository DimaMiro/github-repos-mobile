import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from "../res/colors";
import helpers from "../res/helpers";
import images from "../res/images";

const RepoRow = (props) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPressAction}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={images.repoIcon}/>
                    <Text style={{marginLeft: helpers.margin.s, color: colors.primaryOnLightTextColor, fontSize: helpers.fonSize.p, fontWeight: '500'}}>Repo Name</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={images.starIcon}/>
                    <Text style={{marginLeft: helpers.margin.xs, color: colors.secondaryOnLightTextColor, fontSize: helpers.fonSize.p, fontWeight: '500'}}>10</Text>
                </View>
            </View>
            <Text style={{color: colors.secondaryOnLightTextColor, fontSize: helpers.fonSize.caption, fontWeight: '400', marginTop: helpers.margin.xs}}>React Native Recipe App</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: helpers.margin.xs}}>
                <View style={{backgroundColor: 'orange', width: 8, height: 8, borderRadius: 4}}/>
                <Text style={{marginLeft: 6, color: colors.secondaryOnLightTextColor, fontSize: helpers.fonSize.caption, fontWeight: '400'}}>Swift</Text>
            </View>
        </TouchableOpacity>
    )
};

export default RepoRow

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: helpers.radius.normal,
        borderWidth: 1,
        borderColor: colors.borderColor,
        padding: helpers.padding.m,
    }
});
