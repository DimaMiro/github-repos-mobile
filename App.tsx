import React, {useState} from 'react';
import {AppLoading} from 'expo';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {NavigationProvider} from "react-navigation";

export default function App(props){
  const [isLoadingComplete, setLoadingComplete] = useState(false);


  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
        <AppLoading
            startAsync={loadResourcesAsync}
            onError={handleLoadingError}
            onFinish={() => handleFinishLoading(setLoadingComplete)}
        />
    );
  } else {
    return (
        <View style={{ flex: 1 }}>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          <AppNavigator/>
        </View>

    );
  }
}
async function loadResourcesAsync() {
  //: TODO
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}
