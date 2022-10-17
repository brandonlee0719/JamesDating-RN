import React, {Component} from 'react';
import {
  AppRegistry,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Colors, Constants} from './src/config';
import {Provider} from 'react-redux';
import Store from './src/store';
import AsyncStorage from '@react-native-community/async-storage';

class AppView extends Component {
  componentDidMount() {
    // To add temprory user to be logged in with same credintials
    AsyncStorage.setItem('TempUser', JSON.stringify(Constants.TempUser));
  }

  render() {
    return Platform.OS == 'ios' ? (
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.Secondary}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <Provider store={Store}>
            <App />
          </Provider>
        </KeyboardAvoidingView>
      </SafeAreaView>
    ) : (
      <Provider store={Store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppView);
