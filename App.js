import React, {Component} from 'react';
import {View, StatusBar, AppState} from 'react-native';
import {Colors, NavigationService} from './src/config';
import Route from './src';
import {ToastComponent, NoInternetComponent, Loader} from './src/components';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

Icon.loadFont();
Feather.loadFont();
AntIcon.loadFont();
Fontisto.loadFont();
Ionicons.loadFont();
class App extends Component {
  NetInfoSubscription = null;
  AppStateListener = null;

  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      isInternetReachable: false,
    };
  }
  componentDidMount() {
    this.NetInfoSubscription = NetInfo.addEventListener(
      this._handleConnectivityChange,
    );

    this.AppStateListener = AppState.addEventListener(
      'change',
      this._handleConnectivityChange,
    );
  }

  _handleConnectivityChange = state => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected || !state.isInternetReachable) {
        this.setState({
          isConnected: state.isConnected,
          isInternetReachable: state.isInternetReachable,
        });
      } else if (state.isConnected && state.isInternetReachable) {
        if (!this.state.isConnected || !this.state.isInternetReachable) {
          this.setState({
            isConnected: state.isConnected,
            isInternetReachable: state.isInternetReachable,
          });
        }
      }
    });
  };
  componentWillUnmount() {
    this?.NetInfoSubscription && this.NetInfoSubscription();
    this.AppStateListener?.remove();
  }

  render() {
    const {isConnected, isInternetReachable} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.Secondary}}>
        <StatusBar backgroundColor={Colors.White} barStyle="dark-content" />
        <Loader />
        <Route />
        {/* <NoInternetComponent isConnected={isConnected} isInternetReachable={isInternetReachable}/> */}
        <ToastComponent />
      </View>
    );
  }
}

export default App;
