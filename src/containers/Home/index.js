import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import styles from './styles';
import ImageSlider from '../../components/ImageSlider';
import {Header, Loader} from '../../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Images, Metrix, Colors} from '../../config';
import Stories from '../../components/Stories';
import navigationService from '../../config/navigationService';
import {AppAction} from '../../store/actions';
import {connect} from 'react-redux';
import CustomModal from '../../components/CustomModal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
    };
  }

  popup = () => {
    this.setState({
      like: true,
    });
  };
  popi = async () => {
    await this.setState({
      like: false,
    });
    console.log(this.state.like, 'like');
  };
  updateListUser = () => {
    let {id} = this.props.user;
    let GetUserPaylod = {
      myId: id,
      lat: '24.8698312',
      lng: '67.0783529',
    };
    if (this.props.SaveHomeDataReducer !== null) {
      this.props.getAllUsers(this.props.SaveHomeDataReducer);
    } else {
      this.props.getAllUsers(GetUserPaylod);
    }
  };
  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      // console.log(this.props.SaveHomeDataReducer, 'reducer home filter data');
      let {id} = this.props.user;
      let GetUserPaylod = {
        myId: id,
        lat: '24.8698312',
        lng: '67.0783529',
      };
      if (this.props.SaveHomeDataReducer !== null) {
        this.props.getAllUsers(this.props.SaveHomeDataReducer);
      } else {
        this.props.getAllUsers(GetUserPaylod);
      }
    });
  };
  render() {
    let {user, GetAllUsers} = this.props;
    return (
      <>
        <View style={styles.container}>
          <View style={{marginHorizontal: 10}}>
            <Header.Standard
              //   extraStyle={{backgroundColor: Colors.white}}
              leftIconName={'grid'}
              onPressLeft={() => navigationService.navigate('UserProfile')}
              Heading={'Discover'}
              // onPressRight={() => navigationService.navigate('Calling')}
              rightIconName={'notifications'}
              greenCircle={true}
            />
            {/* search begin */}
          </View>
          <View style={styles.search}>
            <Ionicons
              style={styles.searchIcon}
              color="#A5A5A5"
              name="search"
              size={23}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Find partner"
              placeholderTextColor={'#A5A5A5'}
            />
            <Pressable
              onPress={() => navigationService.navigate('Filter')}
              style={styles.searchImg}>
              <View
                style={{
                  width: Metrix.HorizontalSize(25),
                  height: Metrix.VerticalSize(25),
                }}>
                <Image
                  style={{width: '100%', height: '100%'}}
                  resizeMode="contain"
                  source={Images.Options}
                />
              </View>
            </Pressable>
          </View>
          {/* search end */}

          {/* <CustomModal user={this.props.user} handleTest={() => this.toggleModal()} isModalVisible={this.state.isModalVisible} ModalWhiteBoxCustomStyle={{ width: Metrix.HorizontalSize(320) }} /> */}
          {/* Stories */}
          <Stories  data={this.props.user.id} />

          {/* Stories */}
          {GetAllUsers.length == 0 ? (
            <View
              style={{
                height: Metrix.VerticalSize(400),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{height: 120, width: 120}}>
                <Image
                  style={{height: '100%', width: '100%'}}
                  source={require('../../assets/images/NodataFound.png')}
                />
                <Text
                  style={{
                    marginTop: 10,
                    color: Colors.Primary,
                    textAlign: 'center',
                  }}>
                  No Record found
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <ImageSlider
                updateList={this.updateListUser}
                mairaj={this.mairaj}
                toggleModal={() => this.toggleModal()}
                notUpdate={() => this.popi()}
                update={() => this.popup()}
                likeState={this.state.like}
                userData={user}
                usersCards={GetAllUsers}
              />
              <Loader isModalLoader={this.props.loading} />
            </View>
          )}
        </View>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllUsers: payload => {
      dispatch(AppAction.GetAllUsers(payload));
    },
  };
}

function mapStateToProps(state) {
  console.log(state);
  return {
    loading: state.AppReducer.loader,
    user: state.AppReducer.user,
    GetAllUsers: state.AppReducer.GetAllUsers,
    SaveHomeDataReducer: state.AppReducer.SaveHomeDataReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
