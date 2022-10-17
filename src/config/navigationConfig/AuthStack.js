import {SignIn, Splash, Signup} from '../../containers';
import Welcome from '../../containers/Splash/Welcome';

export const AuthStack = [
  {
    name: 'Splash',
    component: Splash,
    key: 'Splash',
  },
  {
    name: 'Welcome',
    component: Welcome,
    key: 'Welcome',
  },
  {
    name: 'SignIn',
    component: SignIn,
    key: 'SignIn',
  },
  {
    name: 'Signup',
    component: Signup,
    key: 'Signup',
  },
];
