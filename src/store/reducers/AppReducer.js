import {Images} from '../../config';
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOADER_TRUE,
  LOADER_FALSE,
  GET_DROPDOWN_DATA,
  GET_DROPDOWN_DATA_SUCCESS,
  LOCAL_DATA,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SOCIAL_LOGIN,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAIL,
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_MATCHES,
  GET_MATCHES_SUCCESS,
  GET_MATCHES_FAIL,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_EDIT_PROFILE,
  GET_EDIT_PROFILE_SUCCESS,
  GET_EDIT_PROFILE_FAIL,
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  HOME_FILTER,
  HOME_FILTER_SUCCESS,
  HOME_FILTER_FAIL,
  SAVE_HOME_DATA,
  STAR_RATING_SUCCESS,
  STAR_RATING_FAIL,
  STAR_RATING,
  DIARY_LIST,
  DIARY_LIST_SUCCESS,
  DIARY_LIST_FAIL,
  SAVE_ALBUM_FAIL,
  SAVE_ALBUM_SUCCESS,
  SAVE_ALBUM,
  GET_ALBUM,
  GET_ALBUM_SUCCESS,
  GET_ALBUM_FAIL,
  ADD_FCM_TOKEN,
  GET_CHAT_LIST,
  GET_CHAT_LIST_SUCCESS,
  GET_CHAT_LIST_FAIL,
  GET_MESSAGE_HISTORY,
  GET_MESSAGE_HISTORY_SUCCESS,
  GET_MESSAGE_HISTORY_FAIL,
  ON_SEND_MEESSAGE,
  IN_APP_CHAT,
  GET_PROFILE_STATS,
  GET_PROFILE_STATS_SUCCESS,
  GET_PROFILE_STATS_FAIL,
  GET_VIDEO_CALL_TOKEN,
  GET_VIDEO_CALL_TOKEN_SUCCESS,
  CALL_ACCEPT_IS_ACTIVE,
  ACCEPT_CALL,
  CALL_REJECT_IS_ACTIVE,
  CALL_ENDED_IS_ACTIVE,
  VALIDATE_EMAIL,
  VALIDATE_EMAIL_SUCCESS,
  GET_USER_REPORT_DATA,
  GET_USER_REPORT_DATA_SUCCESS,
  GET_STORY,
  GET_STORY_SUCCESS,
  UPDATE_ALBUM_ACTIVE,
  UPDATE_ALBUM_ACTIVE_SUCCESS,
  UPDATE_ALBUM_ACTIVE_FAIL,
  GENERATE_ALBUM_CODE,
  GENERATE_ALBUM_CODE_SUCCESS,
  GENERATE_ALBUM_CODE_FAIL,
  APPLY_ALBUM_CODE,
  APPLY_ALBUM_CODE_SUCCESS,
  APPLY_ALBUM_CODE_FAIL,
  GET_LIVE_STREAM,
  GET_LIVE_STREAM_SUCCESS,
  CREATE_LIVE_STREAM,
  CREATE_LIVE_STREAM_SUCCESS,
  START_NEW_STREAM,
  START_NEW_STREAM_SUCCESS,
  JOIN_STREAM,
  JOIN_STREAM_SUCCESS,
} from '../constants';

const initialState = {
  user: {},
  loader: false,
  posts: [],
  diaryList: [],
  dropDownList: [],
  GetAllUsers: [],
  GetMatchesList: [],
  GetLikesList: [],
  GetLikeMeList: [],
  GetUserProfile: {},
  GetEditProfile: {},
  MultiSelectionIds: {
    lookingRelation: [],
    personalities: [],
    qualities: [],
    hobbies: [],
  },
  SaveHomeDataReducer: null,
  GetAlbumList: [],
  ChatList: [],
  MessagesHistory: [],
  InAppChat: false,
  ProfileStats: {},
  GetNotificationTokenData: {},
  // flags
  isCallAccActive: false,
  isCallRejActive: false,
  isCallEndedActive: false,
  validateEmail: '',
  // get user report data
  reportUserData: [],
  // get stories
  getAllStories: [],
  albumCode: '',
  isActive: false,
  isActiveUserStory: false,
  // live stream state
  GetStremsList: [],
};

export default function AppReducer(state = initialState, action) {
  switch (action.type) {
    case LOCAL_DATA:
    case GET_DROPDOWN_DATA:
      state = {
        ...state,
      };
      break;
    case GET_DROPDOWN_DATA_SUCCESS:
      state = {
        ...state,
        dropDownList: action.payload,
      };
      break;
    case SIGNIN:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SIGNIN_SUCCESS:
      state = {
        ...state,
        user: action.payload,
        loader: false,
      };
      break;
    case SIGNIN_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SIGNUP:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SIGNUP_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SIGNUP_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case LOGOUT:
      state = {
        ...state,
        loader: true,
      };
      break;
    case LOGOUT_SUCCESS:
      state = {
        user: {},
        posts: [],
        loader: false,
      };
      break;
    case LOGOUT_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case ADD_POST:
      state = {
        ...state,
        loader: true,
      };
      break;
    case ADD_POST_SUCCESS:
      // state.posts.unshift(action.payload)
      state = {
        ...state,
        posts: [action.payload, ...state.posts],
        loader: false,
      };
      break;
    case ADD_POST_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case GET_POSTS:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_POSTS_SUCCESS:
      state = {
        ...state,
        posts: action.payload,
        loader: false,
      };
      break;
    case GET_POSTS_FAILURE:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SOCIAL_LOGIN:
      state = {
        ...state,
        loader: true,
      };
      break;
    case SOCIAL_LOGIN_SUCCESS:
      state = {
        ...state,
        loader: false,
        user: action.payload,
      };
      break;
    case SOCIAL_LOGIN_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_ALL_USERS:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_ALL_USERS_SUCCESS:
      state = {
        ...state,
        loader: false,
        GetAllUsers: action.payload,
      };
      break;
    case GET_ALL_USERS_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_MATCHES:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_MATCHES_SUCCESS:
      state = {
        ...state,
        loader: false,
        GetMatchesList: action.payload.matches,
        GetLikesList: action.payload.likes,
        GetLikeMeList: action.payload.likesMe,
      };
      break;
    case GET_MATCHES_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_PROFILE:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_PROFILE_SUCCESS:
      state = {
        ...state,
        loader: false,
        GetUserProfile: action.payload,
      };
      break;
    case GET_PROFILE_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_EDIT_PROFILE:
      state = {
        ...state,
        loader: true,
      };
      break;
    case GET_EDIT_PROFILE_SUCCESS:
      console.log(state.user, 'user state');
      if (action.payload.lookingRelation !== null) {
        let arr = action.payload.lookingRelations.concat(
          state.dropDownList.lookingRelation,
        );
        let arr2 = action.payload.lookingRelations.map(item => {
          return item.id;
        });
        state.MultiSelectionIds.lookingRelation = arr2;
        console.log(arr2, 'idssssss');
        const seen = new Set();
        const filteredArr = arr.filter(el => {
          const duplicate = seen.has(el.id);
          seen.add(el.id);
          return !duplicate;
        });
        action.payload.lookingRelations = filteredArr;
      }
      if (action.payload.personalities !== null) {
        let arr = action.payload.personalities.concat(
          state.dropDownList.personlity,
        );
        let arr2 = action.payload.personalities.map(item => {
          return item.id;
        });
        state.MultiSelectionIds.personalities = arr2;
        const seen = new Set();
        const filteredArr = arr.filter(el => {
          const duplicate = seen.has(el.id);
          seen.add(el.id);
          return !duplicate;
        });
        action.payload.personalities = filteredArr;
      }
      if (action.payload.qualities !== null) {
        let arr = action.payload.qualities.concat(state.dropDownList.qualities);
        let arr2 = action.payload.qualities.map(item => {
          return item.id;
        });
        state.MultiSelectionIds.qualities = arr2;
        const seen = new Set();
        const filteredArr = arr.filter(el => {
          const duplicate = seen.has(el.id);
          seen.add(el.id);
          return !duplicate;
        });
        action.payload.qualities = filteredArr;
      }
      if (action.payload.hobbies !== null) {
        let arr = action.payload.hobbies.concat(state.dropDownList.hobbies);
        let arr2 = action.payload.hobbies.map(item => {
          return item.id;
        });
        state.MultiSelectionIds.hobbies = arr2;
        const seen = new Set();
        const filteredArr = arr.filter(el => {
          const duplicate = seen.has(el.id);
          seen.add(el.id);
          return !duplicate;
        });
        action.payload.hobbies = filteredArr;
      }
      state = {
        ...state,
        user: {
          id: state.user.id,
          name: state.user.name,
          username: state.user.username,
          email: state.user.email,
          photo: action.payload.photo,
          source: state.user.source,
        },
        loader: false,
        GetEditProfile: action.payload,
        MultiSelectionIds: state.MultiSelectionIds,
        validateEmail: 'User available',
      };
      break;
    case GET_EDIT_PROFILE_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case HOME_FILTER:
      state = {
        ...state,
        loader: false,
        SaveHomeDataReducer: action.payload,
      };
      break;
    case HOME_FILTER_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    case HOME_FILTER_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case UPDATE_PROFILE:
      state = {
        ...state,
        loader: true,
      };
      break;
    case UPDATE_PROFILE_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    case UPDATE_PROFILE_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case LOADER_TRUE:
      state = {
        ...state,
        loader: true,
      };
      break;

    case LOADER_FALSE:
      state = {
        ...state,
        loader: false,
      };
      break;
    // star rating success
    case STAR_RATING:
      state = {
        ...state,
        loader: true,
      };
      break;
    // star rating success
    case STAR_RATING_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    // star rating fail
    case STAR_RATING_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;

    //  Diary
    case DIARY_LIST:
      state = {
        ...state,
        loader: true,
      };
      break;

    //  Diary success
    case DIARY_LIST_SUCCESS:
      state = {
        ...state,
        diaryList: action.payload,
        loader: false,
      };
      break;

    //  Diary fail
    case DIARY_LIST_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case SAVE_ALBUM:
      state = {
        ...state,
        loader: true,
      };
      break;

    case SAVE_ALBUM_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;

    case SAVE_ALBUM_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_ALBUM:
      state = {
        ...state,
        loader: true,
      };
      break;

    case GET_ALBUM_SUCCESS:
      state = {
        ...state,
        loader: false,
        GetAlbumList: action.payload,
      };
      break;

    case GET_ALBUM_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case ADD_FCM_TOKEN:
      state = {
        ...state,
      };
      break;
    case GET_CHAT_LIST:
      state = {
        ...state,
        loader: true,
      };
      break;

    case GET_CHAT_LIST_SUCCESS:
      state = {
        ...state,
        loader: false,
        ChatList: action.payload,
      };
      break;

    case GET_CHAT_LIST_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_MESSAGE_HISTORY:
      state = {
        ...state,
        loader: false,
      };
      break;

    case GET_MESSAGE_HISTORY_SUCCESS:
      state = {
        ...state,
        loader: false,
        MessagesHistory: action.payload,
      };
      break;

    case GET_MESSAGE_HISTORY_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;

    case ON_SEND_MEESSAGE:
      state = {
        ...state,
      };
      break;
    case IN_APP_CHAT:
      state = {
        ...state,
      };
    case GET_PROFILE_STATS:
      state = {
        ...state,
        loader: true,
      };
      break;

    case GET_PROFILE_STATS_SUCCESS:
      state = {
        ...state,
        loader: false,
        ProfileStats: action.payload,
      };
      break;

    case GET_PROFILE_STATS_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_VIDEO_CALL_TOKEN:
      state = {
        ...state,
      };
      break;
    case GET_VIDEO_CALL_TOKEN_SUCCESS:
      state = {
        ...state,
        GetNotificationTokenData: action.payload,
      };
      break;
    case CALL_ACCEPT_IS_ACTIVE:
      state = {
        ...state,
        isCallAccActive: action.payload.acceptCall,
      };
      break;
    case CALL_REJECT_IS_ACTIVE:
      state = {
        ...state,
        isCallRejActive: action.payload.rejectCall,
      };
      break;
    case CALL_ENDED_IS_ACTIVE:
      state = {
        ...state,
        isCallEndedActive: action.payload.endCall,
      };
      break;
    case VALIDATE_EMAIL:
      state = {
        ...state,
      };
      break;
    case VALIDATE_EMAIL_SUCCESS:
      state = {
        ...state,
        validateEmail: action.payload,
      };
    // get user report data begin
    case GET_USER_REPORT_DATA:
      state = {
        ...state,
      };
      break;
    case GET_USER_REPORT_DATA_SUCCESS:
      state = {
        ...state,
        reportUserData: action.payload,
      };
      break;
    // get user report data begin
    case ACCEPT_CALL:
      state = {
        ...state,
      };
    case GET_STORY:
      state = {
        ...state,
      };
    case GET_STORY_SUCCESS:
      var isActive;
      var uniqueArray;
      if (action.payload?.isActive) {
        let checkData = action.payload.story;
        let data = checkData.filter(item => item.userId == state.user.id);
        if (data.length == 0) {
          uniqueArray = action.payload.story;
          isActive = true;
        } else {
          action.payload.story.unshift(data[0]);
          uniqueArray = [
            ...new Map(action.payload.story.map(m => [m.userId, m])).values(),
          ];
          isActive = false;
        }
      }
      state = {
        ...state,
        getAllStories: uniqueArray,
        isActiveUserStory: isActive,
      };
    case UPDATE_ALBUM_ACTIVE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case UPDATE_ALBUM_ACTIVE_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;

    case UPDATE_ALBUM_ACTIVE_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GENERATE_ALBUM_CODE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case GENERATE_ALBUM_CODE_SUCCESS:
      state = {
        ...state,
        loader: false,
        albumCode: action.payload,
      };
      break;

    case GENERATE_ALBUM_CODE_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;
    case APPLY_ALBUM_CODE:
      state = {
        ...state,
        loader: false,
      };
      break;

    case APPLY_ALBUM_CODE_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;

    case APPLY_ALBUM_CODE_FAIL:
      state = {
        ...state,
        loader: false,
      };
      break;

    // Live streas Reducer
    case GET_LIVE_STREAM:
      state = {
        ...state,
        loader: false,
      };
      break;
    case GET_LIVE_STREAM_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;

    case CREATE_LIVE_STREAM:
      state = {
        ...state,
        loader: false,
      };
      break;
    case CREATE_LIVE_STREAM_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;

    case START_NEW_STREAM:
      state = {
        ...state,
        loader: false,
      };
      break;
    case START_NEW_STREAM_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;

    case JOIN_STREAM:
      state = {
        ...state,
        loader: false,
      };
      break;
    case JOIN_STREAM_SUCCESS:
      state = {
        ...state,
        loader: false,
      };
      break;
    default:
      break;
  }

  return state;
}
