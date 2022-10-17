import {AppAction} from '../actions';
import Store from '..';
import {NavigationService, ApiCaller, Constants, showToast} from '../../config';
import {actionChannel, put} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import navigationService from '../../config/navigationService';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';
export default class AppMiddleware {
  static *getDropDownData(payload) {
    let res = yield ApiCaller.Get(`api/Default/GetDDLS`);
    try {
      if (res.status == '200') {
        let dropDownData = res.data.data[0];
        yield put(AppAction.getDropDownDataSuccess(dropDownData));
      }
      console.log('response drop down data', res);
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *InAppChat({payload}) {
    try {
      let res = yield ApiCaller.Post(
        `api/Default/UpdateNotificationFlag`,
        payload,
      );
      console.log(res, 'res notification chat active');
    } catch (err) {}
  }
  static *addFcmToken({payload}) {
    try {
      let res = yield ApiCaller.Post(`api/Default/AddFirebaseToken`, payload);
      console.log(res, 'res add fcm token');
    } catch (err) {}
  }
  static *RemoveFcmToken({payload}) {
    try {
      let res = yield ApiCaller.Post(
        `api/Default/RemoveFirebaseToken?userId=${payload.userId}&device=${payload.device}`,
        payload,
      );
      console.log(res, 'res remove fcm token');
    } catch (err) {}
  }
  static *onSocialLogin({payload}) {
    console.log('social data', payload);
    const {reset_0} = NavigationService;
    let deviceId = yield getUniqueId();
    try {
      let res = yield ApiCaller.Post(`api/Default/SocialLogin`, payload);
      if (res.status == '200') {
        if (res.data.status == '2') {
          showToast('error', `${res.data.message}`);
          yield put(AppAction.onSocialLoginFailure());
        } else if (res.data.status == '1') {
          let fcmToken = yield AsyncStorage.getItem('tokenSave');
          let addFireBaseToken = {
            userId: res.data.data[0].id,
            token: fcmToken,
            device: deviceId,
            os: Platform.OS == 'android' ? 'android' : 'ios',
          };
          yield put(AppAction.addFcmToken(addFireBaseToken));
          AsyncStorage.setItem('user', JSON.stringify(res.data.data[0]));
          showToast('success', `${res.data.message}`);
          yield put(AppAction.onSocialLoginSuccess(res.data.data[0]));
          reset_0('Welcome');
        }
      }
      console.log('social login', res);
    } catch (err) {
      yield put(AppAction.onSocialLoginFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *SignIn({payload}) {
    const {reset_0} = NavigationService;
    console.log(payload);
    let deviceId = yield getUniqueId();
    try {
      let res = yield ApiCaller.Post(
        `api/Default/Login?username=${payload.userName}&password=${payload.password}`,
        {},
      );
      console.log('login', res);
      if (res.status == '200') {
        if (res.data.status == '2') {
          showToast('error', `${res.data.message}`);
          yield put(AppAction.SignInFailure());
        } else if (res.data.status == '1') {
          let fcmToken = yield AsyncStorage.getItem('tokenSave');
          let addFireBaseToken = {
            userId: res.data.data[0].id,
            token: fcmToken,
            device: deviceId,
            os: Platform.OS == 'android' ? 'android' : 'ios',
          };
          yield put(AppAction.addFcmToken(addFireBaseToken));
          AsyncStorage.setItem('user', JSON.stringify(res.data.data[0]));
          showToast('success', `${res.data.message}`);
          yield put(AppAction.SignInSuccess(res.data.data[0]));
          reset_0('Welcome');
        }
      }
    } catch (err) {
      yield put(AppAction.SignInFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *SignUp({payload}) {
    console.log('Sign up', payload);
    const {reset_0} = NavigationService;
    try {
      let res = yield ApiCaller.Post(`api/Default/Signup`, payload);
      if (res.status == '200') {
        if (res.data.status == '1') {
          showToast('success', `${res.data.message}`);
          yield put(AppAction.SignUpSuccess());
          reset_0('SignIn');
        } else if (res.data.status == '2') {
          yield put(AppAction.SignUpFail());
          showToast('error', `${res.data.message}`);
        }
      }
      console.log('res sign up', res);
    } catch (err) {
      yield put(AppAction.SignUpFail());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *Logout() {
    const {reset_0} = NavigationService;
    try {
      yield AsyncStorage.removeItem('user');
      yield put(AppAction.LogoutSuccess());
      reset_0('SignIn');

      // reset_0({
      //     screen: 'SignIn'
      // })
      // reset_0("SignIn")
    } catch (err) {
      yield put(AppAction.LogoutFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *GetAllUsers({payload}) {
    try {
      let res = yield ApiCaller.Post(`api/Default/GetUsers`, payload);
      if (res.status == '200') {
        if (res.data.status == '1') {
          // showToast('success', `${res.data.message}`);
          yield put(AppAction.GetAllUsersSuccess(res.data.data));
        } else {
          yield put(AppAction.SignUpFail());
          showToast('error', `${res.data.message}`);
        }
      }
      console.log('res all users', res);
    } catch (err) {
      yield put(AppAction.GetAllUsersFail());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *UpdateLIke({payload}) {
    console.log('like user action', payload);
    try {
      let res = yield ApiCaller.Post(
        `api/Default/UpdateLike?fromUserId=${payload.fromUserId}&toUserId=${payload.toUserId}`,
        {},
      );
      if (res.status == '200') {
        if (res.data.status == '1') {
          showToast('success', `${res.data.message}`);
        } else {
          showToast('success', `${res.data.message}`);
        }
      }
      console.log('res like', res);
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *UpdateDisLIke({payload}) {
    console.log('dislike user action', payload);
    try {
      let res = yield ApiCaller.Post(
        `api/Default/UpdateDisLike?fromUserId=${payload.fromUserId}&toUserId=${payload.toUserId}`,
        {},
      );
      if (res.status == '200') {
        if (res.data.status == '1') {
          showToast('success', `${res.data.message}`);
        } else {
          showToast('success', `${res.data.message}`);
        }
      }
      console.log('res dislike', res);
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *GetMatches({payload}) {
    try {
      let res = yield ApiCaller.Get(
        `api/Default/GetMatches?userId=${payload.id}`,
      );
      console.log('Get Matches', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          // showToast('success', `${res.data.message}`);
          yield put(AppAction.GetMatchesSuccess(res.data.data[0]));
        } else {
          showToast('success', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *GetProfile({payload}) {
    try {
      let res = yield ApiCaller.Get(
        `api/Default/GetProfile?myId=${payload.myId}&id=${payload.id}&otherProfile=false`,
      );
      console.log('Get Profile', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          // showToast('success', `${res.data.message}`);
          yield put(AppAction.GetProfileSuccess(res.data.data[0]));
        } else {
          showToast('success', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *GetEditProfile({payload}) {
    try {
      let res = yield ApiCaller.Post(
        `api/Default/GetEditProfile?id=${payload.id}`,
        {},
      );
      console.log('Get edit profile Profile', res);
      var apiData = res.data.data[0];
      if (apiData.lookingRelations !== null) {
        apiData.lookingRelations.map(v =>
          Object.assign(v, {isSelectRelation: true}),
        );
      }
      if (apiData.personalities !== null) {
        apiData.personalities.map(v => Object.assign(v, {isSelectPer: true}));
      }
      if (apiData.qualities !== null) {
        apiData.qualities.map(v => Object.assign(v, {isSelectQua: true}));
      }
      if (apiData.hobbies !== null) {
        apiData.hobbies.map(v => Object.assign(v, {isSelectHobby: true}));
      }
      // console.log(apiData);
      if (res.status == '200') {
        if (res.data.status == '1') {
          // showToast('success', `${res.data.message}`);
          yield put(AppAction.GetEditProfileSuccess(res.data.data[0]));
        } else {
          yield put(AppAction.GetEditProfileFail());
          showToast('error', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *UpdateProfile({payload}) {
    try {
      let res = yield ApiCaller.Post(`api/Default/UpdateProfile`, payload);
      console.log('update Profile', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          showToast('success', `${res.data.message}`);
          NavigationService.navigate('Home');
          yield put(AppAction.UpdateProfileSuccess());
        } else {
          showToast('success', `${res.data.message}`);
          yield put(AppAction.UpdateProfileFail());
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *HomeFilter({payload}) {
    console.log('filter home list', payload);
    NavigationService.navigate('Home');
    // try {
    //   let res = yield ApiCaller.Post(`api/Default/UpdateProfile`, payload);
    //   console.log('update Profile', res);
    //   if (res.status == '200') {
    //     if (res.data.status == '1') {
    //       showToast('success', `${res.data.message}`);
    //       // yield put(AppAction.UpdateProfileSuccess(res.data.data[0]));
    //     } else {
    //       showToast('success', `${res.data.message}`);
    //     }
    //   }
    // } catch (err) {
    //   console.log(`%c${err.name}`, 'color: red', ' => ', err);
    // }
  }
  static *AddPost({payload}) {
    const {userId} = Store.getState().AppReducer?.user;
    payload['userId'] = userId;
    try {
      let res = yield ApiCaller.Post(Constants.ENDPOINTS.POST, payload);
      if (res.status == 201) {
        console.log('%cAddPost Response', 'color: green', ' => ', res);
        res.data['id'] = new Date().getTime();
        yield put(AppAction.AddPostSuccess(res.data));
        NavigationService.goBack();
      } else {
        console.log('%cAddPost Response', 'color: red', ' => ', res);
        yield put(AppAction.AddPostFailure());
      }
    } catch (err) {
      yield put(AppAction.AddPostFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  static *GetPosts() {
    try {
      let res = yield ApiCaller.Get(Constants.ENDPOINTS.POST);
      console.log(res);
      if (res.status == 200) {
        console.log('%cGetPosts Response', 'color: green', ' => ', res);
        yield put(AppAction.GetPostsSuccess(res.data));
      } else {
        console.log('%cGetPosts Response', 'color: red', ' => ', res);
        yield put(AppAction.GetPostsFailure());
      }
    } catch (err) {
      yield put(AppAction.GetPostsFailure());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *ForgetPassword({payload}) {
    try {
      payload.setLoading(true);
      let res = yield ApiCaller.Post(
        `api/Default/ForgotPassword?email=${payload.email}`,
      );
      showToast('success', res.data.message);
      res.data.status === 1 && payload.abc();
      payload.setLoading(false);
      return res;
    } catch (error) {
      console.log({error});
    }
  }
  // star rating
  static *HandleStarRating({payload}) {
    console.log('lastApi', payload);
    try {
      let res = yield ApiCaller.Post('api/Default/AddRating', payload.data);
      if (res.status == '404') {
        showToast('error', `error`);
        yield put(AppAction.HandleStarRatingFail());
      } else if (res.status == '200') {
        payload.clean();
        if (res.data.status == '1') {
          // showToast('success', `${res.data.message}`);
          yield put(AppAction.HandleStarRatingSuccess());
        } else {
          yield put(AppAction.HandleStarRatingFail());
          showToast('error', `${res.data.message}`);
        }
      }
      console.log('Add rating', res);
      // yield put(AppAction.HandleStarRatingSuccess());
    } catch (error) {
      console.log({error});
    }
  }

  // diary list
  static *HandleDiaryList({payload}) {
    const {userId} = Store.getState().AppReducer?.user;
    try {
      let res = yield ApiCaller.Get(`api/Default/GetDiary?userId=${payload}`);
      console.log('res diary ist ', res.data.data);
      if (res.status == 200) {
        yield put(AppAction.HandleDiaryListSuccess(res.data.data));
      } else {
        console.log('%cAddPost Response', 'color: red', ' => ', res);
        yield put(AppAction.HandleDiaryListFail());
      }
    } catch (err) {
      yield put(AppAction.HandleDiaryListFail());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  // Add diary list
  static *HandleAddDiary({payload}) {
    console.log('*****', payload);
    try {
      let res = yield ApiCaller.Post(`api/Default/AddDiary`, payload);
      console.log('**************fgggg**********', res);
      if (res.status == 200) {
        // showToast('success', `${res.data.message}`);
        yield put(AppAction.AddDiarySuccess(res.data));
        navigationService.navigate('Diary');
      } else {
        console.log('%cAddPost Response', 'color: red', ' => ', res);
        yield put(AppAction.AddDiaryFail());
      }
    } catch (err) {
      yield put(AppAction.AddDiaryFail());
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  static *SaveAlbumPictures({payload}) {
    try {
      let res = yield ApiCaller.Post(`api/Default/AddAlbum`, payload.payload);
      console.log('Add album res', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          // showToast('success', `${res.data.message}`);
          yield put(AppAction.SaveAlbumPicturesSuccess());
          yield put(AppAction.GetAlbum(payload.payloadGetAlbum));
          payload.clearAlbum;
        } else {
          showToast('success', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *GetAlbum({payload}) {
    try {
      let res = yield ApiCaller.Get(
        `api/Default/GetAlbum?myId=${payload.myId}&userId=${payload.id}`,
      );
      console.log('Get album res', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          // showToast('success', `${res.data.message}`);
          yield put(AppAction.GetAlbumSuccess(res.data.data));
          payload.clearAlbum;
        } else {
          showToast('success', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *GetChatList({payload}) {
    try {
      let res = yield ApiCaller.Get(
        `api/Default/GetChatList?userId=${payload.id}`,
      );
      console.log('Get chat list', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          yield put(AppAction.GetChatListSuccess(res.data.data));
        } else {
          showToast('success', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *GetMessageHistory({payload}) {
    try {
      let res = yield ApiCaller.Get(
        `api/Default/GetMessageList?userId1=${payload.userId1}&userId2=${payload.userId2}`,
      );
      console.log('Get messages', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          yield put(AppAction.GetMessageHistorySuccess(res.data.data));
        } else {
          showToast('error', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *ReadChat({payload}) {
    try {
      let res = yield ApiCaller.Post(
        `api/Default/ReadChat?fromUserId=${payload.userId1}&toUserId=${payload.userId2}`,
        {},
      );
      console.log('read chat', res);
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *OnSendMessage({payload}) {
    try {
      let res = yield ApiCaller.Post(`api/Default/AddChatMessage`, payload);
      console.log('on send message', res);
      // if (res.status == '200') {
      //   if (res.data.status == '1') {
      //     yield put(AppAction.GetMessageHistorySuccess(res.data.data));
      //   } else {
      //     showToast('success', `${res.data.message}`);
      //   }
      // }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *GetProfileStats({payload}) {
    try {
      let res = yield ApiCaller.Get(
        `api/Default/GetProfileStats?userId=${payload.id}`,
      );
      console.log('profile stats', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          yield put(AppAction.GetProfileStatsSuccess(res.data.data[0]));
          // showToast('success', `${res.data.message}`);
        } else {
          showToast('error', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  // VIdeo call Implementation
  static *GetVideoCallToken({payload}) {
    console.log(payload, 'GetVideoCallToken');
    try {
      let res = yield ApiCaller.Post(
        `api/Default/CallDial?fromUserId=${payload.userId1}&toUserId=${payload.userId2}&isVideo=${payload.isVideo}`,
        {},
      );
      console.log('GetVideoCallToken', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          yield put(AppAction.GetVideoCallTokenSuccess(res.data.data[0]));
          if (payload.isVideo) {
            NavigationService.navigate('Calling', {
              data: {
                tokenData: res.data.data[0],
                title: 'Call new person',
                senderName: payload.user2Name,
                senderPhoto: payload.userPhoto,
              },
            });
          } else {
            NavigationService.navigate('Audio', {
              data: {
                tokenData: res.data.data[0],
                title: 'Call new person',
                senderName: payload.user2Name,
                senderPhoto: payload.userPhoto,
              },
            });
          }
        } else {
          showToast('error', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *AcceptCall({payload}) {
    console.log('accept payload', payload);
    try {
      let res = yield ApiCaller.Post(
        `api/Default/CallAccepted?myId=${payload.myId}&callId=${payload.callId}`,
        {},
      );
      console.log('accept call', res);
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *DeclineCall({payload}) {
    try {
      let res = yield ApiCaller.Post(
        `api/Default/CallRejected?myId=${payload.myId}&callId=${payload.callId}`,
        {},
      );
      console.log('reject call', res);
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *CallEnded({payload}) {
    try {
      let res = yield ApiCaller.Post(
        `api/Default/CallEnded?myId=${payload.myId}&callId=${payload.callId}`,
        {},
      );
      console.log('call ended', res);
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *ValidateEmail({payload}) {
    try {
      let res = yield ApiCaller.Get(
        `api/Default/CheckUserAvailability?username=${payload.username}&email=${payload.email}`,
      );
      if (res.status == '200') {
        yield put(AppAction.ValidateEmailSuccess(res.data.message));
        // if (res.data.message == 'User available') {
        // } else {
        //   showToast('error', `${res.data.message}`);
        // }
      }
      console.log('validate email', res);
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  // get user report detail
  static *GetReportData({payload}) {
    try {
      let res = yield ApiCaller.Get('api/Default/GetReportUserList');
      console.log('profile statskajdkasjkdj', res.data.data);
      if (res.status == '200') {
        if (res.data.status == '1') {
          yield put(AppAction.GetReportDataSuccess(res.data.data));
          // showToast('success', `${res.data.message}`);
        } else {
          showToast('error', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  // get user report detail
  static *AddReportData({payload}) {
    try {
      let res = yield ApiCaller.Post('api/Default/AddReportUser', payload);
      console.log('Actionprofile statskajdkasjkdj', res);
      if (res.status == '200') {
        if (res.data.status == '1') {
          // yield put(AppAction.GetReportDataSuccess(res.data.data));
          // showToast('success', `${res.data.message}`);
        } else {
          showToast('error', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  // add story
  static *AddStory({payload}) {
    console.log('action', payload);
    try {
      let res = yield ApiCaller.Post('api/Default/AddStory', payload);
      console.log('add story res', res);
      try {
        let res = yield ApiCaller.Get('api/Default/GetStories');
        console.log('get story', res);
        if (res.status == '200') {
          yield put(
            AppAction.GetStoryMethodSuccess({
              story: res.data.data,
              isActive: true,
            }),
          );
          if (res.data.status == '1') {
            // showToast('success', `${res.data.message}`);
          } else {
            showToast('error', `${res.data.message}`);
          }
        }
      } catch (err) {
        console.log(`%c${err.name}`, 'color: red', ' => ', err);
      }
      // if (res.status == '200') {
      //   if (res.data.status == '1') {
      //     // yield put(AppAction.GetReportDataSuccess(res.data.data));
      //     showToast('success', `${res.data.message}`);
      //   } else {
      //     showToast('success', `${res.data.message}`);
      //   }
      // }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }

  // get Stories
  static *GetStory({payload}) {
    try {
      let res = yield ApiCaller.Get('api/Default/GetStories');
      console.log('get story', res);
      if (res.status == '200') {
        yield put(
          AppAction.GetStoryMethodSuccess({
            story: res.data.data,
            isActive: true,
          }),
        );
        if (res.data.status == '1') {
          // showToast('success', `${res.data.message}`);
        } else {
          showToast('error', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *UpdateAlbumisPrivate({payload}) {
    console.log();
    try {
      let res = yield ApiCaller.Post(
        `api/Default/UpdateAlbumIsPrivate?id=${payload.id}&isPrivate=${payload.isPrivate}`,
        {},
      );
      console.log('update album ', res);
      if (res.status == '200') {
        if (res.data.status == 1) {
          if (payload.isPrivate) {
            // payload.updateComponent();
          }
          yield put(AppAction.UpdateAlbumisPrivateSuccess());
        }
        // yield put(AppAction.GetStoryMethodSuccess(res.data.data));
        // if (res.data.status == '1') {
        //   showToast('success', `${res.data.message}`);
        // } else {
        //   showToast('error', `${res.data.message}`);
        // }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
    ``;
  }
  static *GenerateAlbumCode({payload}) {
    console.log();
    try {
      let res = yield ApiCaller.Get(
        `api/Default/GenerateAlbumCode?userId=${payload.userId}&id=${payload.id}`,
      );
      console.log('Generate code ', res);
      if (res.status == '200') {
        if (res.data.status == 1) {
          yield put(AppAction.GenerateAlbumCodeSuccess(res.data.data));
          payload.updateComponent();
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  static *ApplyAlbumCode({payload}) {
    console.log(payload, 'ApplyAlbumCode');
    try {
      let res = yield ApiCaller.Post(
        `api/Default/ApplyAlbumCode?myUserId=${payload.myUserId}&userId=${payload.userId}&code=${payload.code}`,
        {},
      );
      console.log('app for code code ', res);
      if (res.status == '200') {
        if (res.data.status == 1) {
          yield put(AppAction.ApplyAlbumCodeSuccess());
          payload.updateComponent();
        } else {
          showToast('error', `${res.data.message}`);
          yield put(AppAction.ApplyAlbumCodeFail());
          // showToast('success', `${res.data.message}`);
        }
      }
    } catch (err) {
      console.log(`%c${err.name}`, 'color: red', ' => ', err);
    }
  }
  // Live stream sagas
  static *GetLiveStreams({payload}) {
    // try {
    //   let res = yield ApiCaller.Get(
    //     `api/Default/GetStreams?userId=${payload.userId}`,
    //   );
    //   console.log('Get live stream', res);
    // } catch (err) {
    //   console.log(`%c${err.name}`, 'color: red', ' => ', err);
    // }
  }
  static *CreateLiveStream({payload}) {
    // try {
    //   let res = yield ApiCaller.Post(
    //     `api/Default/CreateStreaming`,payload,
    //   );
    //   console.log('create live stream', res);
    // } catch (err) {
    //   console.log(`%c${err.name}`, 'color: red', ' => ', err);
    // }
  }
  static *StartNewStream({payload}) {
    // try {
    //   let res = yield ApiCaller.Post(
    //     `api/Default/StartStream?id=${payload.id}`
    //   );
    //   console.log('start new stream', res);
    // } catch (err) {
    //   console.log(`%c${err.name}`, 'color: red', ' => ', err);
    // }
  }
  static *JoinStream({payload}) {
    // try {
    //   let res = yield ApiCaller.Post(
    //     `api/Default/JoinStream?id=${payload.id}&userId=${payload.userId}`
    //   );
    //   console.log('join stream', res);
    // } catch (err) {
    //   console.log(`%c${err.name}`, 'color: red', ' => ', err);
    // }
  }
  static *EndStream({payload}) {
    // try {
    //   let res = yield ApiCaller.Post(
    //     `api/Default/EndStream?id=${payload.id}`
    //   );
    //   console.log('end stream', res);
    // } catch (err) {
    //   console.log(`%c${err.name}`, 'color: red', ' => ', err);
    // }
  }
}
