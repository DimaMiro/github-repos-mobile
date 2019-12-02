import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from "../res/colors";
import helpers from "../res/helpers";
import images from "../res/images";
import TouchableIcon from "../components/TouchableIcon";
import RepoRow from "../components/RepoRow";
import GUser from "../interfaces/user.interface";
import {GRepo} from "../interfaces/repo.interface";
import ApiService from "../services/api.service";
import ReduxService from "../services/redux.service";

interface Props {
    navigation: any,
    userName: string,
    repoName: string
}
interface State {
    isLoading: boolean,
    userName: string,
    repoName: string,
}

export default class CommitListScreen extends React.Component<Props, State> {
    state = {
        isLoading: false,
        userName: this.props.navigation.state.params.userName,
        repoName: this.props.navigation.state.params.repoName,
    }
    componentDidMount(): void {
        this.getCommitListFromApi()
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableIcon iconName={'backIcon'}
                                   onPressAction={() => this.props.navigation.goBack()}/>
                    <Text style={styles.headerTitle} numberOfLines={1}>{this.state.userName}/{this.state.repoName}</Text>
                </View>
                <ScrollView contentContainerStyle={styles.commitContainer}>
                    <Text>Commits</Text>
                </ScrollView>
            </View>
        );
    }

    getCommitListFromApi() {
        ApiService.getCommitListAsync(this.state.userName, this.state.repoName)
            .then(res => {
                console.log(res);
            })
            .catch(error => console.log(error));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: colors.darkBgColor,
        width: '100%',
        paddingTop: getStatusBarHeight() + helpers.padding.m,
        paddingBottom: helpers.padding.xl,
        paddingHorizontal: helpers.padding.l,
    },
    headerTitle: {
        color: 'white',
        fontSize: helpers.fonSize.p,
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingRight: 24,
        paddingLeft: 12,
    },
    commitContainer: {
        paddingTop: helpers.padding.m,
        paddingHorizontal: helpers.padding.l,
        paddingBottom: helpers.padding.xl
    }
});
