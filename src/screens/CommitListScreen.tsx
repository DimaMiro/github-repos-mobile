import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator, SectionList, Image} from 'react-native';
import { connect } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import colors from '../res/colors';
import helpers from '../res/helpers';
import images from "../res/images";

import TouchableIcon from '../components/TouchableIcon';
import CommitRow from '../components/CommitRow'
import ApiService from '../services/api.service';

import {GCommit} from "../interfaces/commit.interface";
import { format } from 'date-fns'
import * as actions from "../redux/actions";

interface Props {
    navigation: any,
    userName: string,
    repoName: string,
    commits: Array<GCommit>,
    addCommits: (commits: Array<GCommit>) => void
}
interface State {
    isLoading: boolean,
    userName: string,
    repoName: string
}

class CommitListScreen extends React.Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            userName: this.props.navigation.state.params.userName,
            repoName: this.props.navigation.state.params.repoName
        }
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
                {this.getCommitBlock()}
            </View>
        );
    }

    sortByDate(array: Array<GCommit>) {
        let sortedObj = {};
        if (array.length === 1){
            let sectionArray = [];
            sectionArray.push(array[0]);
            sortedObj[array[0]['date']] = sectionArray
        } else {
            for (let i = 0; i < array.length - 1; i++) {
                let sectionArray = [];
                for (let j = i++; j < array.length ; j++) {
                    if (array[i]['date'] === array[j]['date']) {
                        sectionArray.push(array[j])
                    }
                    sortedObj[array[i]['date']] = sectionArray
                }
            }
        }
        return sortedObj
    }

    getCommitBlock() {
        if(this.state.isLoading) {
            return <ActivityIndicator style={{marginTop: helpers.margin.m}}/>
        } else {
            if (this.props.commits !== undefined && this.props.commits.length > 0) {
                let sectionArray = [];
                const obj = this.sortByDate(this.props.commits);
                Object.keys(obj).forEach(key => {
                    sectionArray.push(
                        {title: key, data: obj[key]}
                    )
                });
                return <SectionList
                    contentContainerStyle={styles.commitContainer}
                    sections={sectionArray}
                    renderSectionHeader={({ section }) => (
                        <View style={styles.sectionHeader}>
                            <Image source={images.commitIcon}/>
                            <Text style={styles.sectionHeaderTitle}>Commits on {section.title}</Text>
                        </View>

                    )}
                    renderItem={({ item }) => (
                        <CommitRow key={item.sha} commit={item}/>
                    )}
                    keyExtractor={(item) => item.sha}
                />
            } else {
                return <Text>No commits here</Text>
            }
        }
    }

    getCommitListFromApi() {
        this.setState({isLoading: true});
        ApiService.getCommitListAsync(this.state.userName, this.state.repoName)
            .then(res => {
                let commitArray: Array<GCommit> = [];
                res.map(item => {
                    const formattedDate = format(new Date(item['commit']['author'].date), 'MMM d');
                    const commit = {
                        sha: item.sha,
                        authorName: item['commit']['author'].name,
                        date: formattedDate,
                        message: item['commit'].message
                    };
                    commitArray.push(commit)
                });
                this.props.addCommits(commitArray);
                this.setState({isLoading: false});
            })
            .catch(error => console.log(error));
    }
}
const mapStateToProps = (state) => {
    return {
        commits: state.commitState
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addCommits: commits => dispatch(actions.addCommits(commits))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitListScreen)

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
    },
    sectionHeader: {
        flexDirection: 'row',
        paddingBottom: helpers.padding.s,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    sectionHeaderTitle: {
        fontSize: helpers.fonSize.caption,
        color: colors.secondaryOnLightTextColor,
        marginLeft: helpers.margin.s
    }
});
