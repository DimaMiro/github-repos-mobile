import React from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import colors from '../res/colors';
import helpers from '../res/helpers';
import TouchableIcon from '../components/TouchableIcon';
import CommitRow from '../components/CommitRow'
import ApiService from '../services/api.service';
import ReduxService from '../services/redux.service';
import {GCommit} from "../interfaces/commit.interface";
import { format, parseISO } from 'date-fns'

interface Props {
    navigation: any,
    userName: string,
    repoName: string,
    commits: Array<GCommit>
}
interface State {
    isLoading: boolean,
    userName: string,
    repoName: string,
}

class CommitListScreen extends React.Component<Props, State> {
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
                    {this.getCommitBlock()}
                </ScrollView>
            </View>
        );
    }

    getCommitBlock() {
        if(this.state.isLoading) {
            return <ActivityIndicator/>
        } else {
            if (typeof this.props.commits !== 'undefined' && this.props.commits.length > 0) {
                return this.props.commits.map(item => {
                    return <CommitRow key={item.sha} commit={item}/>
                })
            } else {
                return <Text>No repos here</Text>
            }
        }
    }

    getCommitListFromApi() {
        this.setState({isLoading: true});
        ApiService.getCommitListAsync(this.state.userName, this.state.repoName)
            .then(res => {
                console.log(res);
                let commitArray: Array<GCommit> = [];
                res.map(item => {
                    const formattedDate = format(new Date(item['commit']['author'].date), 'iii d');
                    const commit = {
                        sha: item.sha,
                        authorName: item['commit']['author'].name,
                        date: formattedDate,
                        message: item['commit'].message
                    }
                    console.log(commit)
                    commitArray.push(commit)
                });
                ReduxService.addCommitsToStore(commitArray);
                this.setState({isLoading: false});
            })
            .catch(error => console.log(error));
    }
}
const mapStateToProps = (state) => {
    return {
        commits: state.commitState
    }
}

export default connect(mapStateToProps)(CommitListScreen)

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
