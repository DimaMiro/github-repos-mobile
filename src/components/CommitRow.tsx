import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from "../res/colors";
import helpers from "../res/helpers";
import {GCommit} from "../interfaces/commit.interface";


interface Props {
    commit: GCommit
}

const CommitRow = (props: Props) => {
    return (
        <View
            style={styles.container}>
            <View style={{flexDirection: 'row', width:'100%', justifyContent: 'space-between'}}>
                <Text style={{maxWidth: 230, color: colors.darkColor, fontSize: helpers.fonSize.p, fontWeight: '500'}} numberOfLines={1}>{props.commit.message}</Text>
                <Text style={{marginLeft: helpers.margin.xs, color: colors.primaryOnLightTextColor, fontSize: helpers.fonSize.caption, fontWeight: '500'}} numberOfLines={1}>{props.commit.sha.substring(0,7)}</Text>
            </View>
            <Text style={{color: colors.secondaryOnLightTextColor, fontSize: helpers.fonSize.caption, fontWeight: '400', marginTop: helpers.margin.xs}}>{props.commit.authorName} committed on {props.commit.date}</Text>
        </View>
    )
};


export default CommitRow

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
