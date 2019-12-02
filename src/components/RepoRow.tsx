import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from "../res/colors";
import helpers from "../res/helpers";
import images from "../res/images";
import {GRepo} from "../interfaces/repo.interface";
import LangColorService from "../services/langColor.service";


interface Props {
    onPressAction?: () => void,
    repo: GRepo
}

const RepoRow = (props: Props) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.onPressAction}>
            <View style={{flexDirection: 'row', width:'100%', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={images.repoIcon}/>
                    <Text style={{maxWidth: 220, marginLeft: helpers.margin.s, color: colors.primaryOnLightTextColor, fontSize: helpers.fonSize.p, fontWeight: '500'}} numberOfLines={1}>{props.repo.name}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={images.starIcon}/>
                    <Text style={{marginLeft: helpers.margin.xs, color: colors.secondaryOnLightTextColor, fontSize: helpers.fonSize.p, fontWeight: '500'}}>{props.repo.stargazers_count}</Text>
                </View>
            </View>
            <Text style={{color: colors.secondaryOnLightTextColor, fontSize: helpers.fonSize.caption, fontWeight: '400', marginTop: helpers.margin.xs}}>{props.repo.description}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: helpers.margin.xs}}>
                <View style={{backgroundColor: LangColorService.checkForLangColor(props.repo.language), width: 8, height: 8, borderRadius: 4}}/>
                <Text style={{marginLeft: 6, color: colors.secondaryOnLightTextColor, fontSize: helpers.fonSize.caption, fontWeight: '400'}}>{props.repo.language}</Text>
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
        marginBottom: helpers.margin.s
    }
});
