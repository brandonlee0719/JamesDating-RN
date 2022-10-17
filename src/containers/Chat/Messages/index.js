import {
  Image,
  Pressable,
  TextInput,
  Text,
  View,
  ScrollView,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';
import {Avatar} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images, Metrix, ApiCaller} from '../../../config';
import {Loader} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {connect} from 'react-redux';
import {AppAction} from '../../../store/actions';
import AsyncStorage from '@react-native-community/async-storage';
import navigationService from '../../../config/navigationService';
import PushNotification from 'react-native-push-notification';
import {getUniqueId, getManufacturer} from 'react-native-device-info';

const BaseUrl = `${ApiCaller.url}img/upload/`;
export class Messages extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(0);
    this.state = {
      senderMessage: '',
      MessagesList: [],
      messages: [
        {
          user: 1,
          content: 'What plans for today?',
          sender: true,
        },
        {
          user: 1,
          content: 'Nothing much. How about you?',
          receiver: true,
        },
        {
          user: 0,
          content: 'Planning to go to a movie. Wanna come?',
          sender: true,
        },
        {
          user: 0,
          content: 'Sure why not.',
          receiver: true,
        },
        {
          user: 1,
          content: 'Great. see you then.',
          receiver: true,
        },
        {
          user: 1,
          content: 'I would like to know more about your product.',
          sender: true,
        },
        {
          user: 0,
          content:
            'Sure. I will send you an email with details on our product.',
          receiver: true,
        },
        {
          user: 0,
          content: 'Let me know if you have any doubts.',
          receiver: true,
        },
        {
          user: 0,
          content: 'Great. Thanks!',
          receiver: true,
        },
      ],
    };
    this.onSend = this.onSend.bind(this);
  }
  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevProps.MessagesHistory !== this.state.MessagesList) {
  //     this.setState({
  //       MessagesList: prevProps.MessagesHistory,
  //     });
  //   }
  // };
  backAction = () => {
    if (this.props.route.params.data.trigger) {
      navigationService.reset_0('Home');
    }
    this.activeChat(false);
  };
  componentWillUnmount() {
    this.backHandler.remove();
  }
  activeChat = async params => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedData = JSON.parse(user);
        let deviceId = await getUniqueId();
        let isActiveChatPayload = {
          userId: parsedData.id,
          device: deviceId,
          isNotificationFlag: params,
        };
        this.props.inAppChat(isActiveChatPayload);
      }
    } catch (err) {
      console.log(error, 'error');
    }
  };
  componentDidMount = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedData = JSON.parse(user);
        let userId1 = parsedData.id;
        let userId2 = this.props.route.params.data.userId;
        let getMessageHistory = {
          userId1,
          userId2,
        };
        this.props.getMessageHistory(getMessageHistory);
        this.props.readChat(getMessageHistory);
        this.activeChat(true);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error, 'error');
    }
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  };
  goBack = () => {
    if (this.props.route.params.data.trigger) {
      navigationService.reset_0('Home');
    } else {
      navigationService.goBack('Chat');
    }
    this.activeChat(false);
  };
  videoCall = params => {
    console.log(params, 'params');
    let data = {
      userId1: this.props.user.id,
      userId2: params.userId,
      user2Name: params.name,
      userPhoto: params.photo,
      isVideo: true,
    };
    this.props.getVideoCallToken(data);
  };
  audioCall = params => {
    // navigationService.navigate('Audio');
    console.log(params, 'params');
    let data = {
      userId1: this.props.user.id,
      userId2: params.userId,
      user2Name: params.name,
      userPhoto: params.photo,
      isVideo: false,
    };
    this.props.getVideoCallToken(data);
  };
  Header = () => {
    let {data} = this.props.route.params;
    return (
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <View style={[styles.headerWrapperLeftContainer, styles.dummyFlex]}>
            <Pressable onPress={() => this.goBack()}>
              <Ionicons name="arrow-back" color={'black'} size={20} />
            </Pressable>
            {data.isNotify == undefined ? (
              <Avatar.Image
                size={35}
                style={{marginRight: 10}}
                source={{uri: `${BaseUrl}${data.photo}`}}
              />
            ) : (
              <Avatar.Image
                size={35}
                style={{marginRight: 10}}
                source={{uri: `${BaseUrl}${data.SenderPhoto}`}}
              />
            )}
            <View style={{marginTop: Metrix.VerticalSize(15)}}>
              <Text style={styles.headerWrapperTitle}>
                {data.isNotify == undefined ? data.name : data.SenderName}
              </Text>
              <Text style={styles.headerWrapperStatus}>
                {data.isNotify == undefined ? data.isOnline : 'online'}
              </Text>
            </View>
          </View>
          <View style={[styles.headerWrapperRightContainer, styles.dummyFlex]}>
            <TouchableOpacity onPress={() => this.videoCall(data)}>
              <Image source={Images.Video} />
            </TouchableOpacity>
            <Pressable>
              <Image source={Images.Phone} />
            </Pressable>
            <Pressable>
              <Image source={Images.I} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  AllMessages = () => {
    let {MessagesList} = this.state;
    let {data} = this.props.route.params;
    return (
      <View style={styles.AllMessages}>
        {this.props.MessagesHistory?.map((i, index) => (
          <View style={styles.AllMessagesWrapper} key={index}>
            <View
              style={{
                width: Metrix.HorizontalSize(289),
                justifyContent: 'center',
                alignItems:
                  i.senderId == this.props.user.id ? 'flex-end' : 'flex-start',
              }}>
              <View style={styles.dummyFlex}>
                {i.senderId !== this.props.user.id ? (
                  <>
                    <Avatar.Image
                      size={40}
                      source={{
                        uri: `${BaseUrl}${i.senderhoto}`,
                      }}
                    />
                    <Text style={styles.message}>{i.message}</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.message}>{i.message}</Text>
                    <Avatar.Image
                      size={40}
                      source={{
                        uri: `${BaseUrl}${i.senderhoto}`,
                      }}
                    />
                  </>
                )}
              </View>
              <View style={styles.time}>
                {/* <Text style={styles.timeText}>{i.timeStamp.slice(11, 16)}</Text> */}
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };
  sendMessage = async () => {
    let {data} = this.props.route.params;
    let {senderMessage} = this.state;
    let messagePayload = {
      id: 0,
      fromId: this.props.user.id,
      toId: data.userId,
      message: senderMessage,
      type: 1,
    };
    if (senderMessage !== '') {
      let uniqueId = this.props.MessagesHistory.length + 1;
      let appendData = {
        id: uniqueId,
        senderId: this.props.user.id,
        senderName: this.props.user.name,
        senderhoto: this.props.user.photo,
        timeStamp: null,
        message: senderMessage,
        messageType: 1,
        attachment: null,
        duration: null,
      };
      this.props.onSendMessage(messagePayload);
      let MessagesList = this.props.MessagesHistory;
      MessagesList.push(appendData);
      // this.props.getMessageHistorySuccess(MessagesList);
      // this.state.MessagesList.push(appendData);
      this.textInput.clear();
      await this.setState({
        senderMessage: '',
      });
    }
  };
  BottomInput = () => (
    <View style={styles.BottomInput}>
      <View style={[styles.dummyFlex, styles.BottomInputWrapper]}>
        <LinearGradient
          colors={['rgba(112, 112, 112, .6)', 'rgba(112, 112, 112, .6)']}
          style={styles.BottomInputLeftContainer}>
          <View style={styles.BottomInputLeftContainerInput}>
            <Image source={Images.Emoji} />
            <TextInput
              ref={input => {
                this.textInput = input;
              }}
              onChangeText={senderMessage => this.setState({senderMessage})}
              style={styles.BottomInputLeftContainerInputText}
              placeholderTextColor="white"
              // placeholder="Type Message"
            />
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['rgba(112, 112, 112, .4)', 'rgba(112, 112, 112, .4)']}
          style={styles.BottomInputRightContainer}>
          <Pressable onPress={() => this.sendMessage()}>
            <Image source={Images.Send} style={{marginLeft: -10}} />
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );

  onSend(messages = []) {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  customtInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopColor: 'red',
          borderTopWidth: 1,
          marginLeft: 15,
          marginRight: 15,
          marginVertical: 5,
          borderWidth: 0.5,
          borderColor: 'grey',
          borderRadius: 7,
        }}
      />
    );
  };

  renderSend = sendProps => {
    if (sendProps.text.trim().length > 0) {
      return (
        <Pressable>
          <Image source={Images.Send} />
        </Pressable>
      );
    }
    return null;
  };

  render() {
    return (
      <ImageBackground
        resizeMode="cover"
        source={Images.ChatBg}
        style={styles.container}>
        {/* <Header /> */}
        {this.Header()}
        {/* <GiftedChat
                    BottomInputLeftContainer={{ backgroundColor: 'red' }}
                    messages={this.state.messages}
                    onSend={this.onSend}
                    alwaysShowSend={true}
                    renderInputToolbar={props =>
                        this.customtInputToolbar(props)}
                    user={{
                        _id: 1,
                    }}
                    renderSend={this.renderSend}
                /> */}
        <ScrollView
          ref={ref => {
            this.scrollView = ref;
          }}
          onContentSizeChange={() =>
            this.scrollView.scrollToEnd({animated: true})
          }
          showsVerticalScrollIndicator={false}>
          {this.AllMessages()}
        </ScrollView>
        {this.BottomInput()}
        {/* <AllMessages  /> */}
        {/* <BottomInput /> */}
        {/* <Loader isModalLoader={this.props.loading} /> */}
      </ImageBackground>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMessageHistory: payload => {
      dispatch(AppAction.GetMessageHistory(payload));
    },
    onSendMessage: payload => {
      dispatch(AppAction.OnSendMessage(payload));
    },
    inAppChat: payload => {
      dispatch(AppAction.InAppChat(payload));
    },
    getMessageHistorySuccess: payload => {
      dispatch(AppAction.GetMessageHistorySuccess(payload));
    },
    getVideoCallToken: payload => {
      dispatch(AppAction.GetVideoCallToken(payload));
    },
    readChat: payload => {
      dispatch(AppAction.ReadChat(payload));
    },
  };
}
function mapStateToProps(state) {
  return {
    user: state.AppReducer.user,
    MessagesHistory: state.AppReducer.MessagesHistory,
    GetNotificationTokenData: state.AppReducer.GetNotificationTokenData,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
