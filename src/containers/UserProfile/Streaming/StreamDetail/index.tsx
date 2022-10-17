import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  Dimensions,
  Share,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Header} from '../../../../components';
import {Colors, Metrix, Images} from '../../../../config';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../../../../config/navigationService';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
  ClientRole,
  ChannelProfile,
} from 'react-native-agora';
import requestCameraAndAudioPermission from './Permission';
import styles from './Style'
/**
 * @property appId Agora App ID
 * @property token Token for the channel;
 * @property channelName Channel Name for the current session
 */
const token = '007eJxTYPggttDbgks9tuq9Yssbn6mHXFlv57PtZGF4/e6cRnjg9m0KDImmxkmJJqmGiSYmZiYWJkaJZhZJhhZGqSYGlkAR49Rj/PzJrokCyTJ/vjIzMkAgiM/CUJJaXMLAAADTTx5N';
const appId = 'a53ba4e1a4464842a68b182e4094463e';
const channelName = 'test';
/**
 * @property isHost Boolean value to select between broadcaster and audience
 * @property joinSucceed State variable for storing success
 * @property peerIds Array for storing connected peers
 */
interface State {
  isHost: boolean;
  joinSucceed: boolean;
  peerIds: number[];
  iconsList,
}
export default class StreamDetail extends Component<null, State> {
  _engine?: RtcEngine;
  constructor(props) {
    super(props);
    this.state = {
      isHost: true,
      joinSucceed: false,
      peerIds: [],
      iconsList: [
        {
          id: 1,
          img: Images.SThumb,
          title: '2.5k Likes',
        },
        {
          id: 1,
          img: Images.SUser,
          title: '2.5k Likes',
        },
        {
          id: 1,
          img: Images.Dollar,
          title: '2.5k Likes',
        },
        {
          id: 1,
          img: Images.Diamond,
          title: '2.5k Likes',
        },
      ],
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }
  componentDidMount() {
    this.init();
  }
  /**
   * @name init
   * @description Function to initialize the Rtc Engine, attach event listeners and actions
   */
  init = async () => {
    this._engine = await RtcEngine.create(appId);
    await this._engine.enableVideo();
    await this._engine?.setChannelProfile(ChannelProfile.LiveBroadcasting);
    await this._engine?.setClientRole(
      this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience
    );
    this._engine.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });
    this._engine.addListener('Error', (err) => {
      console.log('Error', err);
    });
    this._engine.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // Get current peer IDs
      const { peerIds } = this.state;
      // If new user
      if (peerIds.indexOf(uid) === -1) {
        this.setState({
          // Add peer ID to state array
          peerIds: [...peerIds, uid],
        });
      }
    });
    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const { peerIds } = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter((id) => id !== uid),
      });
    });
    // If Local user joins RTC channel
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      // Set state variable to true
      this.setState({
        joinSucceed: true,
      });
    });
  };
  _leaveChannel = async () => {
    await this._engine?.leaveChannel()
    this.setState({peerIds: [], joinSucceed: false})
}
  /**
   * @name toggleRoll
   * @description Function to toggle the roll between broadcaster and audience
   */
  toggleRoll = async () => {
    // Join Channel using null token and channel name
    this.setState(
      {
        isHost: !this.state.isHost,
      },
      async () => {
        await this._engine?.setClientRole(
          this.state.isHost ? ClientRole.Broadcaster : ClientRole.Audience
        );
      }
    );
  };
  /**
   * @name startCall
   * @description Function to start the call
   */
  startCall = async () => {
    // Join Channel using null token and channel name
    await this._engine?.joinChannel(token, channelName, null, 0);
  };
  /**
   * @name endCall
   * @description Function to end the call
   */
  endCall = async () => {
    await this._engine?.leaveChannel();
    this.setState({ peerIds: [], joinSucceed: false });
  };
  render() {
    const {navigation, route} = this.props;
    return (
      <View style={styles.container}>
        <Header.Standard
          //   extraStyle={{backgroundColor: Colors.white}}
          leftIconName={'arrow-back'}
          onPressLeft={() => navigationService.goBack()}
          Heading={'Video Streaming'}
          bgColor={Colors.Black}
          iconColor={Colors.White}
          textColor={Colors.White}
        />
        <View style={[styles.streamDetailTop, {}]}>
          <View style={[styles.dummyFlex]}>
            <View style={styles.userDetail}>
              <Image
                style={styles.userDetailImage}
                source={{
                  uri: 'https://images.indianexpress.com/2022/07/srk.jpg',
                }}
              />
              <View style={{marginLeft: Metrix.HorizontalSize(10)}}>
                <Text style={styles.userDetailId}>M F</Text>
                <Text style={styles.userDetailId}>ID:836720807 </Text>
              </View>
            </View>
            <View
              style={[styles.dummyFlex, {width: Metrix.HorizontalSize(100)}]}>
              <Image source={Images.Dollar} />
              <Text style={styles.iconText}>250</Text>
              <Image source={Images.Diamond} />
              <View>
                <Text style={styles.iconText}>250</Text>
              </View>
              <View></View>
            </View>
          </View>
        </View>
        <View style={styles.streamDetailCenter}>
          <View
            style={{
              width: '100%',
              height: Metrix.VerticalSize(200),
              backgroundColor: 'red',
            }}>
            {/* <Image
              source={data.img}
              style={{width: '100%', borderRadius: 8, height: '100%'}}
            /> */}
        <View style={styles.max}>
          <Text style={styles.roleText}>
            You're {this.state.isHost ? 'a broadcaster' : 'the audience'}
          </Text>
          <View style={styles.buttonHolder}>
            <TouchableOpacity onPress={this.toggleRoll} style={styles.button}>
              <Text style={styles.buttonText}> Toggle Role </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.startCall} style={styles.button}>
              <Text style={styles.buttonText}> Start Call </Text>
            </TouchableOpacity>
          </View>
          {this._renderVideos()}
        </View>
          </View>
        </View>
        <View style={[styles.streamDetailBottom, {}]}>
          <View
            style={{
              height: Metrix.VerticalSize(350),
              flexDirection: 'row',
            }}>
            <View style={{width: '80%'}}></View>
            <View style={{width: '20%'}}>
              <View style={styles.streamDetailCoins}>
                {this.state.iconsList.map(i => (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <LinearGradient
                      colors={[
                        'rgba(112, 112, 112, .6)',
                        'rgba(112, 112, 112, .6)',
                      ]}
                      style={styles.streamDetailCoinsWrapper}>
                      <View style={styles.BottomInputLeftContainerInput}>
                        <Image source={i.img} />
                      </View>
                    </LinearGradient>
                    <Text
                      style={[
                        styles.iconText,
                        {fontSize: 10, marginVertical: 8},
                      ]}>
                      2.5k Likes
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.streamDetailBottomComment}>
            <TextInput
              style={styles.streamDetailBottomInput}
              placeholder="type comment"
              placeholderTextColor={'white'}
            />
            <View style={styles.streamDetailBottomSend}>
              <Text
               onPress={() => this._leaveChannel()}
                style={{color: Colors.White, fontWeight: 'bold', fontSize: 12}}>
                Send
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderVideos = () => {
    const { joinSucceed } = this.state;
    return joinSucceed ? (
      <View style={styles.fullView}>
        {this.state.isHost ? (
          <RtcLocalView.SurfaceView
            style={styles.max}
            channelId={channelName}
            renderMode={VideoRenderMode.Hidden}
          />
        ) : (
          <></>
        )}
        {this._renderRemoteVideos()}
      </View>
    ) : null;
  };
  _renderRemoteVideos = () => {
    const { peerIds } = this.state;
    return (
      <ScrollView
        style={styles.remoteContainer}
        // contentContainerStyle={styles.remoteContainerContent}
        horizontal={true}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              key={value}
              style={styles.remote}
              uid={value}
              channelId={channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
}
