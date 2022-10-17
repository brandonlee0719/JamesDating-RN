import {
  ImageBackground,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';
import {Metrix, Images, Colors, ApiCaller} from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import {AppAction} from '../../store/actions';
import AgoraUIKit, {VideoRenderMode, PropsInterface} from 'agora-rn-uikit';
import navigationService from '../../config/navigationService';
import LinearGradient from 'react-native-linear-gradient';
const BaseUrl = `${ApiCaller.url}img/upload/`;

export class Calling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCall: false,
      reciveCall: false,
      videoCall: false,
      connectionData: {
        appId: '8df2d5e17baf42a08a104d646603bcc3',
        channel: '',
        token: '',
        rejectFlag: false,
        acceptFlag: false,
        endFlag: false,
      },
    };
    this.checkProps();
  }
  checkProps = () => {
    if (this.state.acceptFlag) {
      // alert('tru hogya');
      this.callRejectedDone();
      this.props.rejectCallIsActive({rejectCall: false});
      this.props.callEndedIsActive({endCall: false});
    } else {
      setTimeout(async () => {
        if (this.props.isCallAccActive) {
          // alert('ab tmhen chalna hai');
          this.callAcceptedDone();
          this.props.acceptCallIsActive({acceptCall: false});
        }
        if (this.props.isCallRejActive) {
          // this.callRejectedDone();
          await this.setState({
            acceptFlag: true,
          });
        }
        if (this.props.isCallEndedActive) {
          await this.setState({
            acceptFlag: true,
          });
        }
        this.checkProps();
      }, 3000);
    }
  };
  componentDidMount = async () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      // this.props.acceptCallIsActive({acceptCall: false});
      let data = this.props.route.params.data;
      console.log(data, 'data, data');
      if (data.title == 'Call new person') {
        this.setState({
          newCall: true,
        });
      } else if (data.title == 'Receive New Call') {
        this.setState({
          reciveCall: true,
        });
      }
    });
  };
  endCall = () => {
    navigationService.goBack();
  };
  accept = () => {
    let callId = this.props.route.params.data.tokenData.callId;
    this.props.acceptCall({
      myId: this.props.user.id,
      callId: callId,
    });
    this.callAcceptedDone();
  };
  decline = () => {
    let callId = this.props.route.params.data.tokenData.callId;
    this.props.declineCall({
      myId: this.props.user.id,
      callId: callId,
    });
    if (this.props.route.params.data.trigger) {
      navigationService.reset_0('Home');
    } else {
      navigationService.goBack();
    }
  };
  callRejectedDone = () => {
    navigationService.goBack();
  };
  callAcceptedDone = () => {
    let connectionData = {
      appId: this.state.connectionData.appId,
      channel: this.props.route.params.data.tokenData.channel,
      token: this.props.route.params.data.tokenData.token,
    };
    console.log(connectionData);
    this.setState({
      videoCall: true,
      connectionData: connectionData,
    });
  };
  callEnded = () => {
    let callId = this.props.route.params.data.tokenData.callId;
    this.props.callEndedFinish({
      myId: this.props.user.id,
      callId: callId,
    });
    this.setState({
      videoCall: false,
    });
    if (this.props.route.params.data.trigger) {
      navigationService.reset_0('Home');
    } else {
      navigationService.goBack();
    }
  };
  render() {
    let data = {
      EndCall: () => this.callEnded(),
    };
    return (
      <>
        <StatusBar backgroundColor={Colors.PrimaryLight} />
        {this.state.videoCall ? (
          <AgoraUIKit
            rtcCallbacks={data}
            connectionData={this.state.connectionData}
            styleProps={{
              iconSize: 30,
              theme: '#ffffffee',
              videoMode: {
                max: VideoRenderMode.Hidden,
                min: VideoRenderMode.Hidden,
              },
            }}
          />
        ) : (
          <ImageBackground
            source={{
              uri: `${BaseUrl}${this.props.route.params.data.senderPhoto}`,
            }}
            style={styles.container}>
            <View
              style={{
                height: '65%',
                width: '100%',
              }}></View>
            <View
              style={{
                height: '35%',
                width: '100%',
              }}>
              <LinearGradient
                style={{width: '100%', height: '100%'}}
                colors={['transparent', 'rgba(0,0,0,1)']}>
                <Text
                  style={{
                    color: Colors.White,
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: Metrix.VerticalSize(15),
                  }}>
                  {this.props.route.params.data.senderName}
                </Text>
                <Text
                  style={{
                    color: Colors.White,
                    fontSize: 22,
                    fontWeight: 'normal',
                    textAlign: 'center',
                    marginTop: Metrix.VerticalSize(15),
                  }}>
                  {this.state.newCall
                    ? 'Ringing'
                    : this.state.reciveCall
                    ? 'Incomming'
                    : ''}
                </Text>
                <View
                  style={{
                    marginTop: Metrix.VerticalSize(25),
                    height: 2,
                    width: 50,
                    backgroundColor: Colors.White,
                    alignSelf: 'center',
                  }}
                />
                {this.state.reciveCall && (
                  <View
                    style={{
                      marginTop: Metrix.VerticalSize(35),
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      alignSelf: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => this.decline()}
                      style={{
                        height: Metrix.VerticalSize(60),
                        width: Metrix.HorizontalSize(60),
                        alignSelf: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{height: '100%', width: '100%'}}
                        source={require('../../assets/images/reject.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.accept()}
                      style={{
                        height: Metrix.VerticalSize(60),
                        width: Metrix.HorizontalSize(60),
                        alignSelf: 'center',
                      }}>
                      <Image
                        resizeMode="contain"
                        style={{height: '100%', width: '100%'}}
                        source={require('../../assets/images/recive.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {this.state.newCall && (
                  <TouchableOpacity
                    onPress={() => this.decline()}
                    style={{
                      marginTop: Metrix.VerticalSize(35),
                      height: Metrix.VerticalSize(60),
                      width: Metrix.HorizontalSize(60),
                      alignSelf: 'center',
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{height: '100%', width: '100%'}}
                      source={require('../../assets/images/dial.png')}
                    />
                  </TouchableOpacity>
                )}
              </LinearGradient>
            </View>
          </ImageBackground>
        )}
      </>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    acceptCall: payload => {
      dispatch(AppAction.AcceptCall(payload));
    },
    declineCall: payload => {
      dispatch(AppAction.DeclineCall(payload));
    },
    callEndedFinish: payload => {
      dispatch(AppAction.CallEnded(payload));
    },
    rejectCallIsActive: payload => {
      dispatch(AppAction.RejectCallIsActive(payload));
    },
    acceptCallIsActive: payload => {
      dispatch(AppAction.callAcceptIsActive(payload));
    },
    callEndedIsActive: payload => {
      dispatch(AppAction.CallEndedIsActive(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    // loading: state.AppReducer.loader,
    user: state.AppReducer.user,
    GetNotificationTokenData: state.AppReducer.GetNotificationTokenData,
    isCallAccActive: state.AppReducer.isCallAccActive,
    isCallRejActive: state.AppReducer.isCallRejActive,
    isCallEndedActive: state.AppReducer.isCallEndedActive,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calling);
