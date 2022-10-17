import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import {Images, NavigationService} from '../../config';
import {AppAction} from '../../store/actions';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
// import messaging from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import navigationService from '../../config/navigationService';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: false,
    };
    this.createChennel();
    this.checkUser();
    this.GetData();
    this.requestUserPermission();
  }
  GetData = () => {
    this.props.GetDropDownData({});
  };
  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      this.getFCMToken();
    }
  };
  getFCMToken = async () => {
    tokenSave = await messaging().getToken();
    console.log(tokenSave, 'token');
    try {
      await AsyncStorage.setItem('tokenSave', tokenSave);
    } catch (error) {
      // Error saving data
    }
  };
  checkUser = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
        // console.log(remoteMessage),
      );
      // alert('on clicked');
      // NavigationService.navigate('Messages');
      // navigation.navigate(remoteMessage.data.type);
      // NavigationService.navigate('SignIn');
      // this.props.navigation.navigate('SignIn');
    });

    // Check whether an initial notification is available
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Your message was handled in background', remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          if (remoteMessage.data.MessageType == '1') {
            NavigationService.navigate('Messages', {
              data: {
                userId: remoteMessage.data.ReferenceID,
                isNotify: true,
                SenderPhoto: remoteMessage.data.SenderPhoto,
                SenderName: remoteMessage.data.SenderName,
                trigger: true,
              },
            });
          } else if (remoteMessage.data.MessageType == '3') {
            NavigationService.navigate('Calling', {
              data: {
                tokenData: JSON.parse(remoteMessage.data.agoraToken),
                title: remoteMessage.notification.title,
                senderName: remoteMessage.data.SenderName,
                senderPhoto: remoteMessage.data.SenderPhoto,
                trigger: true,
              },
            });
          } else if (remoteMessage.data.MessageType == '2') {
            NavigationService.navigate('Messages', {
              data: {
                userId: remoteMessage.data.ReferenceID,
                isNotify: true,
                SenderPhoto: remoteMessage.data.SenderPhoto,
                SenderName: remoteMessage.data.SenderName,
                trigger: true,
              },
            });
          }
          await this.setState({
            notification: true,
          });
          console.log(this.state.notification, 'flaggggggg');
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
    setTimeout(() => {
      AsyncStorage.getItem('user').then(user => {
        if (user) {
          const parsedData = JSON.parse(user);
          this.props.SignInSuccess(parsedData);
          if (this.state.notification == false) {
            NavigationService.replace('Home');
          }
        } else {
          if (this.state.notification == false) {
            NavigationService.replace('Animation');
          }
        }
      });
    }, 2000);
  };
  createChennel = () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.log('TOK:', token);
      },
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: async notification => {
        console.log('NOTIFICATION', notification);
        if (notification.data.isNotificationFlag == 'true') {
          if (notification.data.MessageType == '1') {
            try {
              const user = await AsyncStorage.getItem('user');
              if (user) {
                console.log('NOTIFICATION:', notification);
                const parsedData = JSON.parse(user);
                let userId1 = parsedData.id;
                let userId2 = notification.data.ReferenceID;
                let getMessageHistory = {
                  userId1,
                  userId2,
                };
                this.props.getMessageHistory(getMessageHistory);
              }
            } catch (error) {
              // Error retrieving data
              console.log(error, 'error');
            }
          } else if (notification.data.MessageType == '3') {
            PushNotification.localNotification(notification);
            let jsonData = JSON.parse(notification.data.agoraToken);
            if (jsonData.isVideo) {
              NavigationService.navigate('Calling', {
                data: {
                  tokenData: JSON.parse(notification.data.agoraToken),
                  title: notification.title,
                  senderName: notification.data.SenderName,
                  senderPhoto: notification.data.SenderPhoto,
                },
              });
            } else {
              NavigationService.navigate('Audio', {
                data: {
                  tokenData: JSON.parse(notification.data.agoraToken),
                  title: notification.title,
                  senderName: notification.data.SenderName,
                  senderPhoto: notification.data.SenderPhoto,
                },
              });
            }
          } else if (notification.data.MessageType == '7') {
            PushNotification.localNotification(notification);
            this.props.acceptCallIsActive({acceptCall: true});
          } else if (notification.data.MessageType == '8') {
            PushNotification.localNotification(notification);
            this.props.callEndedIsActive({endCall: true});
          } else if (notification.data.MessageType == '5') {
            PushNotification.localNotification(notification);
            this.props.rejectCallIsActive({rejectCall: true});
            // call rejected call api
          }
        } else {
          if (notification.data.MessageType == '2') {
            PushNotification.localNotification(notification);
            if (notification.userInteraction) {
              NavigationService.navigate('Messages', {
                data: {
                  userId: notification.data.ReferenceID,
                  isNotify: true,
                  SenderPhoto: notification.data.SenderPhoto,
                  SenderName: notification.data.SenderName,
                },
              });
            }
          } else if (notification.data.MessageType == '1') {
            PushNotification.localNotification(notification);
            if (notification.userInteraction) {
              NavigationService.navigate('Messages', {
                data: {
                  userId: notification.data.ReferenceID,
                  isNotify: true,
                  SenderPhoto: notification.data.SenderPhoto,
                  SenderName: notification.data.SenderName,
                },
              });
            }
          } else if (notification.data.MessageType == '3') {
            PushNotification.localNotification(notification);
            let jsonData = JSON.parse(notification.data.agoraToken);
            if (jsonData.isVideo) {
              NavigationService.navigate('Calling', {
                data: {
                  tokenData: JSON.parse(notification.data.agoraToken),
                  title: notification.title,
                  senderName: notification.data.SenderName,
                  senderPhoto: notification.data.SenderPhoto,
                },
              });
            } else {
              NavigationService.navigate('Audio', {
                data: {
                  tokenData: JSON.parse(notification.data.agoraToken),
                  title: notification.title,
                  senderName: notification.data.SenderName,
                  senderPhoto: notification.data.SenderPhoto,
                },
              });
            }
          } else if (notification.data.MessageType == '7') {
            PushNotification.localNotification(notification);
            this.props.acceptCallIsActive({acceptCall: true});
          } else if (notification.data.MessageType == '8') {
            PushNotification.localNotification(notification);
            this.props.callEndedIsActive({endCall: true});
          } else if (notification.data.MessageType == '5') {
            PushNotification.localNotification(notification);
            this.props.rejectCallIsActive({rejectCall: true});
            // call rejected call api
          }
        }
        // if (notification.data.isNotificationFlag == 'true') {
        //   try {
        //     const user = await AsyncStorage.getItem('user');
        //     if (user) {
        //       console.log('NOTIFICATION:', notification);
        //       const parsedData = JSON.parse(user);
        //       let userId1 = parsedData.id;
        //       let userId2 = notification.data.ReferenceID;
        //       let getMessageHistory = {
        //         userId1,
        //         userId2,
        //       };
        //       this.props.getMessageHistory(getMessageHistory);
        //     }
        //   } catch (error) {
        //     // Error retrieving data
        //     console.log(error, 'error');
        //   }
        // } else {
        //   if (notification.data.MessageType == '2') {
        //     PushNotification.localNotification(notification);
        //     NavigationService.navigate('Messages', {
        //       data: {userId: notification.data.ReferenceID, isNotify: true},
        //     });
        //   } else if (notification.data.MessageType == '1') {
        //     PushNotification.localNotification(notification);
        //     if (notification.userInteraction) {
        //       NavigationService.navigate('Messages', {
        //         data: {userId: notification.data.ReferenceID, isNotify: true},
        //       });
        //     }
        //   } else if (notification.data.MessageType == '3') {
        //     NavigationService.navigate('Calling');
        //     // call dial call api
        //   } else if (notification.data.MessageType == '4') {
        //     // call call ringing api
        //   } else if (notification.data.MessageType == '6') {
        //     // call i am busy api
        //   } else if (notification.data.MessageType == '7') {
        //     // call accepted call api
        //   } else if (notification.data.MessageType == '8') {
        //     // call ended call api
        //   } else if (notification.data.MessageType == '5') {
        //     // call rejected call api
        //   }
        // }
        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION: NOTIFICATION', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };
  componentDidMount = () => {};
  render() {
    return (
      <View style={styles.container}>
        <Image source={Images.Logo} style={styles.image} resizeMode="contain" />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    SignInSuccess: payload => {
      dispatch(AppAction.SignInSuccess(payload));
    },
    GetDropDownData: payload => {
      dispatch(AppAction.getDropDownData(payload));
    },
    getMessageHistory: payload => {
      dispatch(AppAction.GetMessageHistory(payload));
    },
    acceptCallIsActive: payload => {
      dispatch(AppAction.callAcceptIsActive(payload));
    },
    rejectCallIsActive: payload => {
      dispatch(AppAction.RejectCallIsActive(payload));
    },
    callEndedIsActive: payload => {
      dispatch(AppAction.CallEndedIsActive(payload));
    },
  };
}
function mapStateToProps(state) {
  console.log(state, 'skdjgdsb');
  return {
    InAppChat: state.AppReducer.InAppChat,
    MessagesHistory: state.AppReducer.MessagesHistory,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
