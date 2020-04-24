import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NativeModules, View } from "react-native";
import { RootStack } from "./Routes";
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'
import Config from "./Config";
const { UIManager } = NativeModules;


global.Storage = new Storage({
    storageBackend: AsyncStorage,
    defaultExpires: null,
    sync: {
        favorites: () => []
    }
});


class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
        this.configureLayoutAnimation()
    }

    configureLayoutAnimation() {
        if (Config.isAndroid) {
            UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <RootStack/>
            </View>
        )
    }
}

export default App