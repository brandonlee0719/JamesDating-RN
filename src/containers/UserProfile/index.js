import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import styles from './styles';
import {Header} from '../../components';
import CustomButton from '../../components/CustomButton';
import {Images, Metrix, ApiCaller} from '../../config';
import navigationService from '../../config/navigationService';
import AsyncStorage from '@react-native-community/async-storage';
import {connect, Connect} from 'react-redux';
import {AppAction} from '../../store/actions';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
const BaseUrl = `${ApiCaller.url}img/upload/`;
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.props.getEditProfile({id: this.props.user.id});
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      this.props.getEditProfile({id: this.props.user.id});
    });
  };
  logout = async item => {
    if (item.title == 'Logout') {
      let deviceId = await getUniqueId();
      let removeToken = {
        userId: this.props.user.id,
        device: deviceId,
      };
      this.props.removeFcmToken(removeToken);
      await AsyncStorage.clear();
      AsyncStorage.removeItem('user');
      navigationService.reset_0('SignIn');
    } else if (item.title == 'Edit Profile') {
      navigationService.navigate('Signup', {isProfileTrue: true});
    } else if (item.title == 'Diary') {
      navigationService.navigate('Diary');
    } else if (item.title == 'Profile Statics') {
      navigationService.navigate('Statics');
    } else if (item.title == 'Block User') {
      navigationService.navigate('BlockUser');
    } else if (item.title == 'Streaming') {
      navigationService.navigate('Streaming');
    }
  };
  render() {
    const itemList = [
      {
        id: 1,
        title: 'VIP Account',
        icon: Images.Crown,
      },
      {
        id: 2,
        title: 'Single Service Packages',
        icon: Images.Hours,
      },
      {
        id: 3,
        title: 'Edit Profile',
        icon: Images.PenCil,
      },
      {
        id: 4,
        title: 'Profile Statics',
        icon: Images.Signal,
      },
      {
        id: 5,
        title: 'Boost your Profile',
        icon: Images.RocketP,
      },
      {
        id: 6,
        title: 'Setting',
        icon: Images.Setting,
      },
      {
        id: 7,
        title: 'Emoji' + "'s & Gifts",
        icon: Images.Tali,
      },
      {
        id: 8,
        title: 'Prize Draw',
        icon: Images.Giftbox,
      },
      {
        id: 9,
        title: 'Event',
        icon: Images.Event,
      },
      {
        id: 10,
        title: 'Diary',
        icon: Images.Diary,
        path: 'Diary',
      },
      {
        id: 11,
        title: 'About',
        icon: Images.Information,
      },
      {
        id: 12,
        title: 'Privacy Policy',
        icon: Images.Privacy,
      },
      {
        id: 13,
        title: 'Terms & Conditions',
        icon: Images.Terms,
      },
      {
        id: 14,
        title: 'Block User',
        icon: Images.BlockUser,
      },
      {
        id: 15,
        title: 'Hidden Album',
        icon: Images.Block,
      },
      {
        id: 16,
        title: 'Events',
        icon: Images.Calender,
      },
      {
        id: 17,
        title: 'Streaming',
        icon: Images.Live,
      },
      {
        id: 18,
        title: 'Logout',
        icon: Images.Logout,
      },
    ];
    let {user} = this.props;
    let {GetEditProfile} = this.props;
    return (
      <View style={styles.container}>
        <Header.Standard
          //   extraStyle={{backgroundColor: Colors.white}}
          leftIconName={'arrow-back'}
          onPressLeft={() => navigationService.goBack()}
          Heading={'Profile'}
          rightIconName={'notifications'}
          greenCircle={true}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* profile top section begin */}
          <View style={styles.profileUserDetails}>
            <Image
              style={styles.profileImage}
              source={{
                uri: `${BaseUrl}${GetEditProfile?.photo}`,
              }}
            />
            <View style={styles.profileNameId}>
              <Text style={styles.profileName}>
                {GetEditProfile?.name}, {GetEditProfile?.age}
              </Text>
              <Text style={styles.profileId}>James ID: 054103</Text>
            </View>
            <View style={styles.profileBtn}>
              <CustomButton
                handleClick={() =>
                  navigationService.navigate('Preview', {
                    id: this.props.user.id,
                  })
                }
                title="View your Profile"
              />
            </View>
          </View>
          {/* profile top section end */}

          {/* profile bottom section begin */}
          <View style={styles.ProfileBottomContent}>
            {itemList.map(_item => (
              <View style={styles.ProfileBottomContentWrapper}>
                <TouchableOpacity
                  onPress={() => this.logout(_item)}
                  style={styles.ProfileBottomContentWrapperItems}>
                  <View
                    style={{
                      height: Metrix.VerticalSize(30),
                      width: Metrix.HorizontalSize(30),
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{height: '100%', width: '100%'}}
                      source={_item.icon}
                    />
                  </View>
                  <Text
                    style={styles.ProfileBottomContentWrapperItemsRightItem}>
                    {_item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {/* profile bottom section end */}
        </ScrollView>
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getEditProfile: payload => {
      dispatch(AppAction.GetEditProfile(payload));
    },
    removeFcmToken: payload => {
      dispatch(AppAction.RemoveFcmToken(payload));
    },
  };
}
function mapStateToProps(state) {
  return {
    user: state.AppReducer.user,
    GetEditProfile: state.AppReducer.GetEditProfile,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
