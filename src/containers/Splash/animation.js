import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import styles from './styles';
import Logo from '../../assets/svg/logo.svg';
import {Images} from '../../config';
import Swiper from 'react-native-swiper';
import navigationService from '../../config/navigationService';
import {Loader} from '../../components';
import {connect} from 'react-redux';
import {AppAction} from '../../store/actions';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  Settings,
  LoginButton,
} from 'react-native-fbsdk-next';
Settings.initializeSDK();
export class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bg1: true,
      bg2: false,
      bg3: false,
      bg4: false,
      bg5: false,
      bg6: false,
    };
    this.imageSlider();
  }
  // bg1 true
  imageSliderInitial() {
    setTimeout(() => {
      this.setState({
        bg1: true,
        bg2: false,
        bg3: false,
        bg4: false,
        bg5: false,
      });
      // this.imageSlider()
      this.imageSlider();
    }, 4000);
  }
  // bg2 true
  imageSlider() {
    setTimeout(() => {
      this.setState({
        bg1: false,
        bg2: true,
      });
      // this.imageSlider()
      this.imageSlider2();
    }, 4000);
  }
  // bg3 true
  imageSlider2 = () => {
    setTimeout(() => {
      this.setState({
        bg1: false,
        bg2: false,
        bg3: true,
      });
      this.imageSlider3();
    }, 4000);
  };
  // bg4 true

  imageSlider3 = () => {
    setTimeout(() => {
      this.setState({
        bg1: false,
        bg2: false,
        bg3: false,
        bg4: true,
      });
      this.imageSlider4();
    }, 4000);
  };
  // bg5 true

  imageSlider4 = () => {
    setTimeout(() => {
      this.setState({
        bg1: false,
        bg2: false,
        bg3: false,
        bg4: false,
        bg5: true,
      });
      this.imageSlider5();
    }, 4000);
  };
  // bg6 true

  imageSlider5 = () => {
    setTimeout(() => {
      this.setState({
        bg1: false,
        bg2: false,
        bg3: false,
        bg4: false,
        bg5: false,
        bg6: true,
      });
      this.imageSliderInitial();
    }, 4000);
  };
  faceBookSignIn = async () => {
    // Settings.initializeSDK();
    Settings.setAppID('1285799015584207');
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          const _responseInfoCallback = (error, result) => {
            if (error) {
              alert('Error fetching data: ' + error.toString());
            } else {
              // alert('Success fetching data: ' + result.toString());
              let data = {
                name: result.first_name,
                token: this.state.fbAccessToken,
                id: result.id,
                email: result.email,
                photo: null,
                source: 2,
              };
              // onSocialLogin(data);
              this.props.socialLogin(data);
            }
          };
          const infoRequest = new GraphRequest(
            '/me?fields=email,name,first_name,middle_name,last_name',
            null,
            _responseInfoCallback,
          );
          new GraphRequestManager().addRequest(infoRequest).start();
          AccessToken.getCurrentAccessToken().then(data => {
            this.setState({
              fbAccessToken: data.accessToken,
            });
          });
        }
      })
      .catch(error => {
        console.log('Login fail with error: ' + error);
      });
  };
  googleSignIn = async () => {
    // for ios
    // GoogleSignin.configure({
    //   webClientId:
    //     '174505714981-324hrqscq878agh0506updkvn0nivseb.apps.googleusercontent.com',
    //   scopes: ['profile', 'email'],
    // });
    // for android
    GoogleSignin.configure({
      androidClientId:
        '174505714981-os830seophl6uhu6cpgkbb1pm74bbkh1.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
    try {
      let hasPlayServices = await GoogleSignin.hasPlayServices();
      console.log('hasPlayServices', hasPlayServices);
      const userInfo = await GoogleSignin.signIn();
      let token = (await GoogleSignin.getTokens()).accessToken;
      console.log('signIn', userInfo);
      if (userInfo) {
        let user = userInfo.user;
        let data = {
          name: `${user.givenName} ${user.familyName}`,
          token: token,
          id: userInfo.user.id,
          email: userInfo.user.email,
          photo: userInfo.user.photo,
          source: 3,
        };
        // onSocialLogin(data);
        this.props.socialLogin(data);
      }
    } catch (error) {
      console.log('Error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  render() {
    const data = this.state;

    return (
      // <Swiper
      //     autoplay={true}
      //     minDistanceForAction={0.1}
      //     showsPagination={false}
      //     autoplayTimeout={2.5}
      //     style={styles.wrapper} showsButtons={false}>
      <ImageBackground
        source={
          data.bg1
            ? Images.Bg1
            : data.bg2
            ? Images.Bg2
            : data.bg3
            ? Images.Bg3
            : data.bg4
            ? Images.Bg4
            : data.bg5
            ? Images.Bg5
            : Images.Bg6
        }
        style={styles.slide1}>
        <View style={styles.animationTopContainer}>
          {/* header begin */}
          <View style={styles.header}>
            {/* <Logo width={90} height={90} /> */}
            <Text
              onPress={() => navigationService.navigate('SignIn')}
              style={styles.headerSignIn}>
              SIGN IN
            </Text>
          </View>
          {/* header end */}
          <Text style={styles.text}>
            Meet your match with your same purpose
          </Text>
        </View>
        <View style={styles.animationBottomContainer}>
          <TouchableOpacity onPress={() => this.googleSignIn()}>
            <Image source={Images.FB} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.faceBookSignIn()}>
            <Image style={styles.animationLoginIcons} source={Images.Google} />
          </TouchableOpacity>
          <Image source={Images.Apple} />
        </View>
        <Loader isModalLoader={this.props.loading} />
      </ImageBackground>
      // </Swiper>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    socialLogin: payload => {
      dispatch(AppAction.onSocialLogin(payload));
    },
  };
}

function mapStateToProps(state) {
  return {
    loading: state.AppReducer.loader,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Animation);
