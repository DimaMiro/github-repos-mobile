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
    user: GUser,
    repos: Array<GRepo>
}
interface State {
    isLoading: boolean,
}

class HomeScreen extends React.Component<Props, State> {
    state = {
        isLoading: false,
    };

    componentDidMount(): void {
        this.getReposFromApi();
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
                ReduxService.addReposToStore(repoArray);
                this.setState({isLoading: false});
            })
            .catch(error => console.log(error));
    }

    getNameBlock(){
        if (this.props.user.name !== null) {
            return(<View style={{marginLeft: helpers.margin.m}}>
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
                    return <RepoRow key={item.id} repo={item}/>
                })
            } else {
                return <Text>No repos here</Text>
            }
        }
    }

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
                        <Image source={{uri: this.props.user.avatar_url}} style={styles.avatarImage}/>
                        {this.getNameBlock()}
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.repoContainer}>
                    {this.getRepoBlock()}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userState,
        repos: state.repoState
    }
}

export default connect(mapStateToProps)(HomeScreen)

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
        backgroundColor: colors.lightGrey,
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
    },
    repoContainer: {
        paddingTop: helpers.padding.m,
        paddingHorizontal: helpers.padding.l,
        paddingBottom: helpers.padding.xl
    }
});
