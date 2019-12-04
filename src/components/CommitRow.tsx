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
        <View style={styles.container}>
            <View style={styles.lineContainer}>
                <View style={styles.line}></View>
            </View>
            <View style={styles.cardContainer}>
                <View style={{position: 'relative', flexDirection: 'row', width:'100%', justifyContent: 'space-between'}}>
                    <Text style={{maxWidth:'70%', color: colors.darkColor, fontSize: helpers.fonSize.p, fontWeight: '500'}} numberOfLines={1}>{props.commit.message}</Text>
                    <Text style={{marginLeft: helpers.margin.xs, color: colors.primaryOnLightTextColor, fontSize: helpers.fonSize.caption, fontWeight: '500'}} numberOfLines={1}>{props.commit.sha.substring(0,7)}</Text>
                </View>
                <Text style={{color: colors.secondaryOnLightTextColor, fontSize: helpers.fonSize.caption, fontWeight: '400', marginTop: helpers.margin.xs}}>{props.commit.authorName} committed on {props.commit.date}</Text>
            </View>
        </View>
    )
};


export default CommitRow

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    lineContainer: {
        position: 'relative',
        width: 16,
        alignItems: 'center',
    },
    line: {
        backgroundColor: colors.lightGrey,
        height: '100%',
        width: 1,
    },
    cardContainer: {
        flex: 1,
        borderRadius: helpers.radius.normal,
        borderWidth: 1,
        borderColor: colors.borderColor,
        padding: helpers.padding.m,
        marginBottom: helpers.margin.s,
        marginLeft: helpers.margin.s
    }
});
