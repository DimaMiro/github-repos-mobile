import React from 'react';
import {Animated, View, Text, StyleSheet, Image, ScrollView, ActivityIndicator} from 'react-native';
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

import * as actions from "../redux/actions";


const HEADER_MAX_HEIGHT = 152 + getStatusBarHeight();
const HEADER_MIN_HEIGHT = 64 + getStatusBarHeight();
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

interface Props {
    navigation: any,
    user: GUser,
    repos: Array<GRepo>,
    addRepos: (repos: Array<GRepo>) => void
}
interface State {
    isLoading: boolean,
    scrollY: Animated.Value
}

class HomeScreen extends React.Component<Props, State> {

    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            scrollY: new Animated.Value(0),
        };
    }

    componentDidMount(): void {
        this.getReposFromApi();
    }

    render(){
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        const collapsedTopContainerInfoBoxOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
        });
        const logoOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        return(
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.repoContainer}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}>
                    <View style={styles.scrollViewContent}>
                        {this.getRepoBlock()}
                    </View>
                </ScrollView>
                <Animated.View style={[styles.headerContainer, {height: headerHeight}]}>
                    <View style={styles.topContainer}>
                        <View>
                            <Animated.Image source={images.logo} style={{width: 175, resizeMode: 'contain', opacity: logoOpacity}}/>
                            <Animated.View style={[styles.collapsedTopContainerInfoBox, {opacity: collapsedTopContainerInfoBoxOpacity}]}>
                                <Image source={{uri: this.props.user.avatar_url}} style={styles.collapsedAvatarImage}/>
                                <View style={styles.collapsedNameBlock}>
                                    <Text style={styles.collapsedUserFullName}>{this.props.user.name}</Text>
                                    <Text style={styles.collapsedUserName}>{this.props.user.login}</Text>
                                </View>
                            </Animated.View>
                        </View>
                        <TouchableIcon iconName={'searchIcon'}
                                       onPressAction={() => this.props.navigation.navigate('Search')}/>
                    </View>
                    <View style={styles.userInfoBox}>
                        <Image source={{uri: this.props.user.avatar_url}} style={styles.avatarImage}/>
                        {this.getNameBlock()}
                    </View>
                </Animated.View>
            </View>
        );
    }

    getReposFromApi() {
        this.setState({isLoading: true});
        ApiService.getReposAsync(this.props.user.login)
            .then(res => {
                let repoArray: Array<GRepo> = [];
                res.map(item => {
                    const repo = {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        language: item.language,
                        stargazers_count: item.stargazers_count
                    }
                    repoArray.push(repo)
                });
                this.props.addRepos(repoArray);
                this.setState({isLoading: false});
            })
            .catch(error => console.log(error));
    }

    getNameBlock(){
        if (this.props.user.name !== null) {
            return(
                <View style={{marginLeft: helpers.margin.m}}>
                    <Text style={styles.userFullName}>{this.props.user.name}</Text>
                    <Text style={styles.userName}>{this.props.user.login}</Text>
                </View>)
        } else {
            return(
                <View style={{marginLeft: helpers.margin.m}}>
                    <Text style={styles.userName}>{this.props.user.login}</Text>
                </View>
            )
        }
    }
    getRepoBlock() {
        if(this.state.isLoading) {
            return <ActivityIndicator/>
        } else {
            if (typeof this.props.repos !== 'undefined' && this.props.repos.length > 0) {
                return this.props.repos.map(item => {
                    return <RepoRow key={item.id} repo={item} onPressAction={() => this.repoRowPressed(item.name)}/>
                })
            } else {
                return <Text>No repos here</Text>
            }
        }
    }
    repoRowPressed(repoName: string){
        this.props.navigation.navigate('CommitList',{userName: this.props.user.login, repoName: repoName});
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userState,
        repos: state.repoState
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addRepos: repos => dispatch(actions.addRepos(repos))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.darkBgColor,
        width: '100%',
        paddingTop: getStatusBarHeight() + helpers.padding.s,
        paddingBottom: helpers.padding.xl,
        paddingHorizontal: helpers.padding.l,
        overflow: 'hidden'
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
        backgroundColor: colors.lightGrey,
        width: 64,
        height: 64,
        resizeMode: 'cover',
        borderRadius: helpers.radius.normal
    },
    collapsedAvatarImage: {
        width: 36,
        height: 36,
        borderRadius: helpers.radius.small,
    },
    collapsedTopContainerInfoBox: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        top: helpers.margin.xs,
    },
    collapsedNameBlock: {
        alignItems: 'baseline',
        flexDirection: 'row',
        marginLeft: helpers.margin.s,
    },
    collapsedUserFullName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: helpers.fonSize.subtitle,
    },
    collapsedUserName: {
        color: '#A7A9AB',
        fontSize: helpers.fonSize.caption,
        marginLeft: helpers.margin.xs,
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
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    repoContainer: {
        paddingTop: helpers.padding.m,
        paddingHorizontal: helpers.padding.l,
        paddingBottom: helpers.padding.xl,
    }
});
