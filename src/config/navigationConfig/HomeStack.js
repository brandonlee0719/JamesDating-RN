import {
  Calendar,
  Diary,
  Verification,
  Preview,
  Statics,
  Filter,
  Animation,
  BlockUser,
  Streaming,
  StreamDetail,
  Calling,
  Chat,
  WatchStory,
  Audio,
} from '../../containers';
import Messages from '../../containers/Chat/Messages';
import ForgetOtp from '../../containers/ForgetPassword/ForgetOtp';
import ForgetPassword from '../../containers/ForgetPassword/ForgetPassword';
import UserProfile from '../../containers/UserProfile';
import MyTabs from './BottomNavigation';

export const HomeStack = [
  {
    name: 'Home',
    component: MyTabs,
    key: 'Home',
  },
  {
    name: 'Preview',
    component: Preview,
    key: 'Preview',
  },
  {
    name: 'UserProfile',
    component: UserProfile,
    key: 'UserProfile',
  },
  {
    name: 'Diary',
    component: Diary,
    key: 'UserProfile',
  },
  {
    name: 'Statics',
    component: Statics,
    key: 'Statics',
  },
  {
    name: 'Calendar',
    component: Calendar,
    key: 'Calendar',
  },
  {
    name: 'Messages',
    component: Messages,
    key: 'Messages',
  },
  {
    name: 'Verification',
    component: Verification,
    key: 'Verification',
  },
  {
    name: 'ForgetPassword',
    component: ForgetPassword,
    key: 'ForgetPassword',
  },
  {
    name: 'ForgetOtp',
    component: ForgetOtp,
    key: 'ForgetOtp',
  },
  {
    name: 'Filter',
    component: Filter,
    key: 'Filter',
  },
  {
    name: 'Animation',
    component: Animation,
    key: 'Animation',
  },
  {
    name: 'Chat',
    component: Chat,
    key: 'Chat',
  },
  {
    name: 'BlockUser',
    component: BlockUser,
    key: 'BlockUser',
  },
  {
    name: 'Streaming',
    component: Streaming,
    key: 'Streaming',
  },
  {
    name: 'StreamDetail',
    component: StreamDetail,
    key: 'StreamDetail',
  },
  {
    name: 'Calling',
    component: Calling,
    key: 'Calling',
  },
  {
    name: 'WatchStory',
    component: WatchStory,
    key: 'WatchStory',
  },
  {
    name: 'Audio',
    component: Audio,
    key: 'Audio',
  },
];
