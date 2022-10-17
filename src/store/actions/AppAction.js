import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  ADD_POST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  LOADER_FALSE,
  LOADER_TRUE,
  GET_DROPDOWN_DATA,
  GET_DROPDOWN_DATA_SUCCESS,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SOCIAL_LOGIN,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAIL,
  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  UPDATE_LIKE,
  UPDATE_DISLIKE,
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
  HOME_FILTER_FAIL,
  SAVE_HOME_DATA,
  STAR_RATING_SUCCESS,
  STAR_RATING_FAIL,
  STAR_RATING,
  DIARY_LIST,
  DIARY_LIST_SUCCESS,
  DIARY_LIST_FAIL,
  ADD_DIARY,
  ADD_DIARY_SUCCESS,
  SAVE_ALBUM,
  SAVE_ALBUM_SUCCESS,
  SAVE_ALBUM_FAIL,
  GET_ALBUM,
  GET_ALBUM_SUCCESS,
  GET_ALBUM_FAIL,
  ADD_FCM_TOKEN,
  REMOVE_FCM_TOKEN,
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
  ACCEPT_CALL,
  DECLINE_CALL,
  CALL_ACCEPT_IS_ACTIVE,
  CALL_REJECT_IS_ACTIVE,
  CALL_ENDED,
  CALL_ENDED_IS_ACTIVE,
  VALIDATE_EMAIL,
  VALIDATE_EMAIL_SUCCESS,
  READ_CHAT,
  GET_USER_REPORT_DATA,
  GET_USER_REPORT_DATA_SUCCESS,
  ADD_USER_REPORT_DATA,
  ADD_USER_REPORT_DATA_SUCCESS,
  ADD_STORY,
  ADD_STORY_SUCCESS,
  GET_STORY,
  GET_STORY_SUCCESS,
  UPDATE_ALBUM_ACTIVE,
  UPDATE_ALBUM_ACTIVE_SUCCESS,
  UPDATE_ALBUM_ACTIVE_FAIL,
  GENERATE_ALBUM_CODE,
  GENERATE_ALBUM_CODE_SUCCESS,
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
  END_STREAM,
  END_STREAM_SUCCESS,
} from '../constants';

export default class AppAction {
  static getDropDownData(payload) {
    return {
      type: GET_DROPDOWN_DATA,
      payload,
    };
  }
  static getDropDownDataSuccess(payload) {
    return {
      type: GET_DROPDOWN_DATA_SUCCESS,
      payload,
    };
  }
  static SignIn(payload) {
    return {
      type: SIGNIN,
      payload,
    };
  }
  static SignInSuccess(payload) {
    return {
      type: SIGNIN_SUCCESS,
      payload,
    };
  }
  static SignInFailure() {
    return {
      type: SIGNIN_FAILURE,
    };
  }
  static SignUp(payload) {
    return {
      type: SIGNUP,
      payload,
    };
  }
  static SignUpSuccess(payload) {
    return {
      type: SIGNUP_SUCCESS,
      payload,
    };
  }
  static SignUpFail() {
    return {
      type: SIGNUP_FAILURE,
    };
  }
  static GetAllUsers(payload) {
    return {
      type: GET_ALL_USERS,
      payload,
    };
  }
  static GetAllUsersSuccess(payload) {
    return {
      type: GET_ALL_USERS_SUCCESS,
      payload,
    };
  }
  static GetAllUsersFail() {
    return {
      type: GET_ALL_USERS_FAIL,
    };
  }
  static Logout() {
    return {
      type: LOGOUT,
    };
  }
  static LogoutSuccess() {
    return {
      type: LOGOUT_SUCCESS,
    };
  }
  static LogoutFailure() {
    return {
      type: LOGOUT_FAILURE,
    };
  }

  static AddPost(payload) {
    return {
      type: ADD_POST,
      payload,
    };
  }
  static AddPostSuccess(payload) {
    return {
      type: ADD_POST_SUCCESS,
      payload,
    };
  }
  static AddPostFailure() {
    return {
      type: ADD_POST_FAILURE,
    };
  }

  static GetPosts() {
    return {
      type: GET_POSTS,
    };
  }
  static GetPostsSuccess(payload) {
    return {
      type: GET_POSTS_SUCCESS,
      payload,
    };
  }
  static GetPostsFailure() {
    return {
      type: GET_POSTS_FAILURE,
    };
  }
  static onSocialLogin(payload) {
    return {
      type: SOCIAL_LOGIN,
      payload,
    };
  }
  static onSocialLoginSuccess(payload) {
    return {
      type: SOCIAL_LOGIN_SUCCESS,
      payload,
    };
  }
  static onSocialLoginFailure() {
    return {
      type: SOCIAL_LOGIN_FAIL,
    };
  }
  static UpdateLIke(payload) {
    return {
      type: UPDATE_LIKE,
      payload,
    };
  }
  static UpdateDisLIke(payload) {
    return {
      type: UPDATE_DISLIKE,
      payload,
    };
  }
  static GetMatches(payload) {
    return {
      type: GET_MATCHES,
      payload,
    };
  }
  static GetMatchesSuccess(payload) {
    return {
      type: GET_MATCHES_SUCCESS,
      payload,
    };
  }
  static GetMatchesFail() {
    return {
      type: GET_MATCHES_FAIL,
    };
  }
  static GetProfile(payload) {
    return {
      type: GET_PROFILE,
      payload,
    };
  }
  static GetProfileSuccess(payload) {
    return {
      type: GET_PROFILE_SUCCESS,
      payload,
    };
  }
  static GetProfileFail() {
    return {
      type: GET_PROFILE_FAIL,
    };
  }
  static GetEditProfile(payload) {
    return {
      type: GET_EDIT_PROFILE,
      payload,
    };
  }
  static GetEditProfileSuccess(payload) {
    return {
      type: GET_EDIT_PROFILE_SUCCESS,
      payload,
    };
  }
  static GetEditProfileFail() {
    return {
      type: GET_EDIT_PROFILE_FAIL,
    };
  }
  static UpdateProfile(payload) {
    return {
      type: UPDATE_PROFILE,
      payload,
    };
  }
  static UpdateProfileSuccess(payload) {
    return {
      type: UPDATE_PROFILE_SUCCESS,
      payload,
    };
  }
  static UpdateProfileFail() {
    return {
      type: UPDATE_PROFILE_FAIL,
    };
  }
  static LoaderTrue() {
    return {
      type: LOADER_TRUE,
    };
  }
  static LoaderFalse() {
    return {
      type: LOADER_FALSE,
    };
  }
  static ForgetPassword(payload) {
    return {
      type: FORGET_PASSWORD,
      payload,
    };
  }
  static ForgetPasswordSuccess(payload) {
    return {
      type: FORGET_PASSWORD_SUCCESS,
    };
  }
  static ForgetPasswordFail() {
    return {
      type: FORGET_PASSWORD_FAIL,
    };
  }
  static HomeFilter(payload) {
    return {
      type: HOME_FILTER,
      payload,
    };
  }
  static HomeFilterSuccess(payload) {
    return {
      type: HOME_FILTER_SUCCESS,
      payload,
    };
  }
  static HomeFilterFail() {
    return {
      type: HOME_FILTER_FAIL,
    };
  }
  // star rating begin
  static HandleStarRating(payload) {
    return {
      type: STAR_RATING,
      payload,
    };
  }
  // success
  static HandleStarRatingSuccess() {
    return {
      type: STAR_RATING_SUCCESS,
    };
  }
  // fail
  static HandleStarRatingFail() {
    return {
      type: STAR_RATING_FAIL,
    };
  }
  // star rating end

  // start diary list
  static HandleDiaryList(payload) {
    return {
      type: DIARY_LIST,
      payload,
    };
  }

  // start diary list success
  static HandleDiaryListSuccess(payload) {
    return {
      type: DIARY_LIST_SUCCESS,
      payload,
    };
  }
  // start diary list fail
  static HandleDiaryListFail() {
    return {
      type: DIARY_LIST_FAIL,
    };
  }

  // start add diary
  static AddDiaryList(payload) {
    return {
      type: ADD_DIARY,
      payload,
    };
  }

  // start diary list success
  static AddDiarySuccess(payload) {
    return {
      type: ADD_DIARY_SUCCESS,
      payload,
    };
  }
  // start diary list fail
  static AddDiaryFail() {
    return {
      type: DIARY_LIST_FAIL,
    };
  }
  static SaveAlbumPictures(payload) {
    return {
      type: SAVE_ALBUM,
      payload,
    };
  }
  static SaveAlbumPicturesSuccess(payload) {
    return {
      type: SAVE_ALBUM_SUCCESS,
      payload,
    };
  }
  static SaveAlbumPicturesFail() {
    return {
      type: SAVE_ALBUM_FAIL,
    };
  }
  static GetAlbum(payload) {
    return {
      type: GET_ALBUM,
      payload,
    };
  }
  static GetAlbumSuccess(payload) {
    return {
      type: GET_ALBUM_SUCCESS,
      payload,
    };
  }
  static GetAlbumFail() {
    return {
      type: GET_ALBUM_FAIL,
    };
  }
  static addFcmToken(payload) {
    return {
      type: ADD_FCM_TOKEN,
      payload,
    };
  }
  static RemoveFcmToken(payload) {
    return {
      type: REMOVE_FCM_TOKEN,
      payload,
    };
  }
  static GetChatList(payload) {
    return {
      type: GET_CHAT_LIST,
      payload,
    };
  }
  static GetChatListSuccess(payload) {
    return {
      type: GET_CHAT_LIST_SUCCESS,
      payload,
    };
  }
  static GetChatListFail() {
    return {
      type: GET_CHAT_LIST_FAIL,
    };
  }
  static GetMessageHistory(payload) {
    return {
      type: GET_MESSAGE_HISTORY,
      payload,
    };
  }
  static GetMessageHistorySuccess(payload) {
    return {
      type: GET_MESSAGE_HISTORY_SUCCESS,
      payload,
    };
  }
  static GetMessageHistoryFail() {
    return {
      type: GET_MESSAGE_HISTORY_FAIL,
    };
  }
  static OnSendMessage(payload) {
    return {
      type: ON_SEND_MEESSAGE,
      payload,
    };
  }
  static InAppChat(payload) {
    return {
      type: IN_APP_CHAT,
      payload,
    };
  }
  static GetProfileStats(payload) {
    return {
      type: GET_PROFILE_STATS,
      payload,
    };
  }
  static GetProfileStatsSuccess(payload) {
    return {
      type: GET_PROFILE_STATS_SUCCESS,
      payload,
    };
  }
  static GetProfileStatsFail() {
    return {
      type: GET_PROFILE_STATS_FAIL,
    };
  }
  static GetVideoCallToken(payload) {
    return {
      type: GET_VIDEO_CALL_TOKEN,
      payload,
    };
  }
  static GetVideoCallTokenSuccess(payload) {
    return {
      type: GET_VIDEO_CALL_TOKEN_SUCCESS,
      payload,
    };
  }
  static AcceptCall(payload) {
    return {
      type: ACCEPT_CALL,
      payload,
    };
  }
  static DeclineCall(payload) {
    return {
      type: DECLINE_CALL,
      payload,
    };
  }

  // Flags video call
  static callAcceptIsActive(payload) {
    return {
      type: CALL_ACCEPT_IS_ACTIVE,
      payload,
    };
  }
  static RejectCallIsActive(payload) {
    return {
      type: CALL_REJECT_IS_ACTIVE,
      payload,
    };
  }
  static CallEndedIsActive(payload) {
    return {
      type: CALL_ENDED_IS_ACTIVE,
      payload,
    };
  }
  static CallEnded(payload) {
    return {
      type: CALL_ENDED,
      payload,
    };
  }
  static ValidateEmail(payload) {
    return {
      type: VALIDATE_EMAIL,
      payload,
    };
  }
  static ValidateEmailSuccess(payload) {
    return {
      type: VALIDATE_EMAIL_SUCCESS,
      payload,
    };
  }
  static ReadChat(payload) {
    return {
      type: READ_CHAT,
      payload,
    };
  }
  // get report user list
  static GetReportData(payload) {
    return {
      type: GET_USER_REPORT_DATA,
      payload,
    };
  }
  static GetReportDataSuccess(payload) {
    return {
      type: GET_USER_REPORT_DATA_SUCCESS,
      payload,
    };
  }
  // add user report
  static HandleReportData(payload) {
    return {
      type: ADD_USER_REPORT_DATA,
      payload,
    };
  }
  static HandleReportDataSuccess(payload) {
    return {
      type: ADD_USER_REPORT_DATA_SUCCESS,
      payload,
    };
  }
  // add story
  static AddStoryMethod(payload) {
    return {
      type: ADD_STORY,
      payload,
    };
  }

  static AddStoryMethodSuccess(payload) {
    return {
      type: ADD_STORY_SUCCESS,
      payload,
    };
  }

  // get stories
  static GetStoryMethod(payload) {
    return {
      type: GET_STORY,
      payload,
    };
  }
  static GetStoryMethodSuccess(payload) {
    return {
      type: GET_STORY_SUCCESS,
      payload,
    };
  }
  static UpdateAlbumisPrivate(payload) {
    return {
      type: UPDATE_ALBUM_ACTIVE,
      payload,
    };
  }
  static UpdateAlbumisPrivateSuccess(payload) {
    return {
      type: UPDATE_ALBUM_ACTIVE_SUCCESS,
      payload,
    };
  }
  static UpdateAlbumisPrivateFail() {
    return {
      type: UPDATE_ALBUM_ACTIVE_FAIL,
      payload,
    };
  }
  static GenerateAlbumCode(payload) {
    return {
      type: GENERATE_ALBUM_CODE,
      payload,
    };
  }
  static GenerateAlbumCodeSuccess(payload) {
    return {
      type: GENERATE_ALBUM_CODE_SUCCESS,
      payload,
    };
  }
  static GenerateAlbumCodeFail() {
    return {
      type: GET_EDIT_PROFILE_FAIL,
    };
  }
  static ApplyAlbumCode(payload) {
    return {
      type: APPLY_ALBUM_CODE,
      payload,
    };
  }
  static ApplyAlbumCodeSuccess(payload) {
    return {
      type: APPLY_ALBUM_CODE_SUCCESS,
      payload,
    };
  }
  static ApplyAlbumCodeFail() {
    return {
      type: APPLY_ALBUM_CODE_FAIL,
    };
  }
  // Live streams actions
  static GetLiveStreams(payload) {
    return {
      type: GET_LIVE_STREAM,
      payload,
    };
  }
  static GetLiveStreamsSuccess(payload) {
    return {
      type: GET_LIVE_STREAM_SUCCESS,
      payload,
    };
  }

  static CreateLiveStream(payload) {
    return {
      type: CREATE_LIVE_STREAM,
      payload,
    };
  }
  static CreateLiveStreamSuccess(payload) {
    return {
      type: CREATE_LIVE_STREAM_SUCCESS,
      payload,
    };
  }

  static StartNewStream(payload) {
    return {
      type: START_NEW_STREAM,
      payload,
    };
  }
  static StartNewStreamSuccess(payload) {
    return {
      type: START_NEW_STREAM_SUCCESS,
      payload,
    };
  }

  static JoinStream(payload) {
    return {
      type: JOIN_STREAM,
      payload,
    };
  }
  static JoinStreamSuccess(payload) {
    return {
      type: JOIN_STREAM_SUCCESS,
      payload,
    };
  }

  static EndStream(payload) {
    return {
      type: END_STREAM,
      payload,
    };
  }
  static EndStreamSuccess(payload) {
    return {
      type: END_STREAM_SUCCESS,
      payload,
    };
  }
}
