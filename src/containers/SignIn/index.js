import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
  Pressable,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Button, Forminput, Loader } from '../../components';
import { Metrix, Images, Utils, Constants, showToast } from '../../config';
import { AppAction } from '../../store/actions';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// icons
import Icon1 from '../../assets/images/fb.png';
import Icon2 from '../../assets/images/google.png';
import styles from './styles';
import navigationService from '../../config/navigationService';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  Settings,
  LoginButton,
} from 'react-native-fbsdk-next';
Settings.initializeSDK();
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      emailErrMsg: '',
      passErrMsg: '',
      validEmail: true,
      validPass: true,
      fbAccessToken: '',
    };
  }

  signin = () => {
    const { signin } = this.props;
    const { email, password, userName } = this.state;
    if (userName == '' || password == '') {
      showToast('error', 'fields should not be empty');
    } else {
      signin({ userName, password });
    }
    // if (!email) this.setState({emailErrMsg: 'Email is a required field'});
    // if (!password) this.setState({passErrMsg: 'Password is a required field'});
    // else if (!validEmail)
    //   this.setState({emailErrMsg: 'Please enter valid email address.'});
    // else if (!validPass) this.setState({passErrMsg: 'Password is not valid'});
    // else signin({email, password});
  };

  validateEmail = email => {
    let validEmail = Utils.isEmailValid(email);
    this.setState({ email, validEmail, emailErrMsg: '' });
  };

  validatePass = password => {
    let validPass = Utils.isPasswordValid(password);
    this.setState({ password, validPass, passErrMsg: '' });
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
    const { email, password, emailErrMsg, passErrMsg } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          style={{ width: '100%' }}>
          <View style={styles.content}>
            <View style={styles.imageWrapper}>
              <Image
                source={Images.Logo}
                style={styles.image}
                resizeMode="contain"
              />
              <TouchableOpacity
                onPress={() => navigationService.navigate('Welcome')}>
                <Text style={styles.back}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.welcomeHeading}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.welcomeText}>Back</Text>
            </View>
            <View style={styles.socialIcons}>
              <Pressable
                onPress={() => this.faceBookSignIn()}
                style={styles.socialIconsWrapper}>
                <Image
                  source={Images.LFacebook}
                  style={styles.socialIconsImgFb}
                />
              </Pressable>
              <View style={styles.socialIconsWrapper}>
                <Image
                  source={Images.LApple}
                  style={styles.socialIconsImg}
                />
              </View>
              <Pressable
                onPress={() => this.googleSignIn()}
                style={styles.socialIconsWrapper}>
                <Image source={Icon2} style={styles.socialIconsImg} />
              </Pressable>
            </View>
            <View style={styles.or}>
              <Text style={styles.orLeft}></Text>
              <Text style={styles.OrText}>OR</Text>
              <Text style={styles.orRight}></Text>
            </View>
            {/* <Text style={styles.headingStyle}>Login</Text> */}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="User name"
                placeholderTextColor={'#A1A1A1'}
                onChangeText={userName => this.setState({ userName })}
                style={styles.inputContainerInput}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={'#A1A1A1'}
                onChangeText={password => this.setState({ password })}
                style={styles.inputContainerInput}
              />
            </View>
            {/* <Forminput.TextField
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={this.validateEmail}
              errMsg={emailErrMsg}
              value={email}
              blurOnSubmit={false}
              containerStyle={{ marginTop: Metrix.VerticalSize(25) }}
              onSubmitEditing={() => {
                this.passInputRef.focus();
              }}
            /> */}

            {/* <Button.Standard
              text="Login in With Email"
              isLoading={this.props.loading}
              disabled={this.props.loading}
              onPress={this.signin}
              containerStyle={{marginTop: Metrix.VerticalSize(17)}}
            /> */}
            <Pressable
              onPress={() => this.signin()}
              style={styles.loginWithEmail}>
              <Text style={styles.loginWithEmailText}>Log in with Email</Text>
            </Pressable>
            <Text
              style={styles.SignUpButton}
              onPress={() => {
                navigationService.navigate('Signup');
              }}>
              Sign up
            </Text>
            <Text
              style={styles.forgetPassText}
              onPress={() => navigationService.navigate('ForgetPassword')}>
              Forgot Password?
            </Text>
          </View>
        </ScrollView>
        <Loader isModalLoader={this.props.loading} />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signin: payload => {
      dispatch(AppAction.SignIn(payload));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
