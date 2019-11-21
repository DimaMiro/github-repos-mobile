import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class SearchScreen extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>Search Screen</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
