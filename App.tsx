import React from 'react';
import {Platform, StatusBar, View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

import { Provider } from 'react-redux';
import store from "./src/redux/store";

export default function App(){
    return (
        <Provider store = {store}>
            <View style={{ flex: 1 }}>
                {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
                <AppNavigator/>
            </View>
        </Provider>
    );
}
