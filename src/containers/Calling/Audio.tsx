import React, { Component } from 'react'
import { Platform, Button, TextInput, View, Text, PermissionsAndroid,StyleSheet,ImageBackground, Image,TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import RtcEngine from 'react-native-agora'
import {connect} from 'react-redux';
import { Metrix,Colors,ApiCaller } from '../../config';
import { AppAction } from '../../store/actions';
import navigationService from '../../config/navigationService';
import Feather from 'react-native-vector-icons/Feather';

const BaseUrl = `${ApiCaller.url}img/upload/`
const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ])
    if (
      granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the mic')
    } else {
      console.log('Permission denied')
    }
  } catch (err) {
    console.warn(err)
  }
}
// Define a Props interface.
interface Props {
}
// Define a State interface.
interface State {
  appId: 'a53ba4e1a4464842a68b182e4094463e',
  token: '007eJxTYDhr2iH8bfeOoN26C28G5L3wv8Lyj0Uz9/qa7acP1rUpndmkwJBoapyUaJJqmGhiYmZiYWKUaGaRZGhhlGpiYAkUMU69u4c3OYaPP3muIysTIwMEgvgsDCWpxSUMDADEZiBj',
  channelName: "test",
  joinSucceed: boolean,
  audioCallTimeFLag: boolean,
  openMicrophone: boolean,
  enableSpeakerphone: boolean,
  newCall: boolean,
  reciveCall: boolean
  peerIds: number[],
  acceptFlag: boolean,
}
// Create an App component, which extends the properties of the Pros and State interfaces.
export default class Audio extends Component<Props, State> {
  _engine?: RtcEngine
  // Add a constructor，and initialize this.state. You need:
  // Replace yourAppId with the App ID of your Agora project.
  // Replace yourChannel with the channel name that you want to join.
  // Replace yourToken with the token that you generated using the App ID and channel name above.
  constructor(props) {
    super(props)
    this.state = {
      appId: 'a53ba4e1a4464842a68b182e4094463e',
      token: '007eJxTYDhr2iH8bfeOoN26C28G5L3wv8Lyj0Uz9/qa7acP1rUpndmkwJBoapyUaJJqmGhiYmZiYWKUaGaRZGhhlGpiYAkUMU69u4c3OYaPP3muIysTIwMEgvgsDCWpxSUMDADEZiBj',
      channelName: "test",
      openMicrophone: true,
      enableSpeakerphone: true,
      joinSucceed: false,
      reciveCall: false,
      audioCallTimeFLag: false,
      newCall: false,
      peerIds: [],
      acceptFlag: false
    }
    this.checkProps();
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!')
      })
    }
  }
  checkProps = async() => {
    if (this.state.acceptFlag) {
      // alert('tru hogya');
    this._leaveChannel()
     navigationService.goBack()
      this.props.rejectCallIsActive({rejectCall: false});
      this.props.callEndedIsActive({endCall: false});
    } else {
      setTimeout(async () => {
        if (this.props.isCallAccActive) {
          // alert('ab tmhen chalna hai');
          await this.setState({
            audioCallTimeFLag : true,
            reciveCall : false,
            newCall: true
          })
        this._joinChannel()
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
  // Other code. See step 5 to step 9.
  // Mount the App component into the DOM.
  componentDidMount() {
    this.init()
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
  }
  // Pass in your App ID through this.state, create and initialize an RtcEngine object.
  init = async () => {
    const { appId } = this.state
    this._engine = await RtcEngine.create(appId)
    // Enable the audio module.
    await this._engine.enableAudio()
    await this._engine.destroy()
    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed)
      const { peerIds } = this.state
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          peerIds: [...peerIds, uid]
        })
      }
    })
    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason)
      const { peerIds } = this.state
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid)
      })
    })
    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed)
      this.setState({
        joinSucceed: true
      })
    })
  }
  // Pass in your token and channel name through this.state.token and this.state.channelName.
  // Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
  // the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.
  _joinChannel = async () => {
    await this._engine?.joinChannel(this.props.route.params.data.tokenData.token, this.props.route.params.data.tokenData.channel, null, 0)
  }
  _leaveChannel = async () => {
    await this._engine?.leaveChannel()
    this.setState({peerIds: [], joinSucceed: false})
}
  // Turn the microphone on or off.
  _switchMicrophone = () => {
    const { openMicrophone } = this.state
    this._engine?.enableLocalAudio(!openMicrophone).then(() => {
      this.setState({ openMicrophone: !openMicrophone })
    }).catch((err) => {
      console.warn('enableLocalAudio', err)
    })
  }
  // Switch the audio playback device.
  _switchSpeakerphone = () => {
    const { enableSpeakerphone } = this.state
    this._engine?.setEnableSpeakerphone(!enableSpeakerphone).then(() => {
      this.setState({ enableSpeakerphone: !enableSpeakerphone })
    }).catch((err) => {
      console.warn('setEnableSpeakerphone', err)
    })
  }
  accept = () => {
    let callId = this.props.route.params.data.tokenData.callId;
    this.props.acceptCall({
      myId: this.props.user.id,
      callId: callId,
    });
    this.setState({
      audioCallTimeFLag : true,
      reciveCall : false,
      newCall: true
    })
    this._joinChannel()
  }
  decline = () => {
    let callId = this.props.route.params.data.tokenData.callId;
    this.props.declineCall({
      myId: this.props.user.id,
      callId: callId,
    });
    this._leaveChannel()
    if (this.props.route.params.data.trigger) {
      navigationService.reset_0('Home');
    } else {
      navigationService.goBack();
    }
  }
  render() {
    const {
      channelName,
      joinSucceed,
      openMicrophone,
      enableSpeakerphone,
    } = this.state;
    return (
      <View style={styles.container}>
        <View 
            style={[styles.container,{backgroundColor:Colors.Black}]}>
            <View
              style={{
                height: '65%',
                width: '100%',
              }}>
                <View style={{height: Metrix.VerticalSize(130), width: Metrix.HorizontalSize(110),borderRadius:60, backgroundColor:"red",alignSelf:"center",marginTop: Metrix.VerticalSize(70)}}>
                 <Image    source={{
              uri: `${BaseUrl}${this.props.route.params.data.senderPhoto}`,
            }} style={{height:"100%", width:"100%",borderRadius:59}} />
                </View>
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
                {
                  this.state.audioCallTimeFLag &&
                  <Text style={{color: Colors.White,textAlign:"center",marginTop:15}}>00.00</Text>
                }
              </View>
            <View
              style={{
                height: '35%',
                width: '100%',
              }}>
              <View
                // style={{width: '100%', height: '100%'}}
                // colors={['transparent', 'rgba(0,0,0,1)']}
                >
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
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                {
                  this.state.audioCallTimeFLag &&
                  <TouchableOpacity
                  onPress={() => this._switchSpeakerphone()}
                  style={{
                    marginTop: Metrix.VerticalSize(35),
                    height: Metrix.VerticalSize(60),
                    width: Metrix.HorizontalSize(60),
                    alignSelf: 'center',
                    backgroundColor: "gray",
                    alignItems:"center",justifyContent:"center",
                    borderRadius:50,
                  }}>
                  {/* <Image
                    resizeMode="contain"
                    style={{height: '100%', width: '100%'}}
                    source={require('../../assets/images/dial.png')}
                  /> */}
                  <Feather
                  name={'speaker'}
                  color={Colors.White}
                  size={25}
                  // style={styles.picPlusIcon}
                />
                </TouchableOpacity>
                }
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
                </View>
              </View>
            </View>
          </View>
        {/* <View style={styles.top}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ channelName: text })}
            placeholder={'Channel Name'}
            value={channelName}
          />
          <Button
            onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
            title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
          />
        </View>
        <View style={styles.float}>
          <Button
            onPress={this._switchMicrophone}
            title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
          />
          <Button
            onPress={this._switchSpeakerphone}
            title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
          />
        </View> */}
      </View>
    )
  }
}
function mapDispatchToProps (dispatch) {
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
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(Audio);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    float: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    top: {
        width: '100%',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
    },
});
