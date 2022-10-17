import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Clipboard,
} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {Header, Loader} from '../../../components';
import navigationService from '../../../config/navigationService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  Colors,
  Images,
  Metrix,
  NavigationService,
  showToast,
  ApiCaller,
} from '../../../config';
import {connect} from 'react-redux';
import {AppAction} from '../../../store/actions';
import StarRating from 'react-native-star-rating';
import CustomButton from '../../../components/CustomButton';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS, {stat} from 'react-native-fs';

const BaseUrl = `${ApiCaller.url}img/upload/`;
export class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      starCount: 0,
      // user review
      review: '',
      addAlbumModalVisible: false,
      albumName: '',
      albumPictureArray: [
        {
          id: '1746',
          icon: 'icon',
        },
      ],
      albumUriBaseArr: [],
      stateAlbumsList: [],
      isModalSender: false,
      isModalReciver: false,
      defaultValueSender: '',
      reciverCode: '',
      check: false,
    };
  }
  componentDidMount() {
    let id = this.props.route.params.id;
    this.props.getProfile({id: id, myId: this.props.user.id});
    this.props.getAlbum({id: id, myId: this.props.user.id});
  }
  componentDidUpdate = (prevProps, prevState) => {
    // if (prevProps.GetAlbumList !== this.state.stateAlbumsList) {
    //   this.setState({
    //     stateAlbumsList: prevProps.GetAlbumList,
    //   });
    // }
    if (prevProps.albumCode !== this.state.defaultValueSender) {
      this.setState({
        defaultValueSender: prevProps.albumCode,
      });
    }
  };
  // set rating on state
  onStarRatingPressModal = async rating => {
    await this.setState({
      starCount: rating,
    });
  };

  // clean data & modal of rating

  cleanData = () => {
    this.setState({starCount: 0});
    this.setState({review: ''});
    this.setState({modalVisible: false});
    let id = this.props.route.params.id;
    this.props.getProfile({id: id, myId: this.props.user.id});
    this.props.getAlbum({id: id, myId: this.props.user.id});
  };

  // handle rating api
  handleStarRating = () => {
    const {id} = this.props.GetUserProfile;
    const fromUserId = this.props.user.id;
    const rate = this.state.starCount;
    const review = this.state.review;

    const data = {fromUserId, toUserId: id, rate, review};
    if (!rate || !review) {
      showToast('error', `Rating shold not be empty`);
    } else {
      this.props.handleRating({data: data, clean: this.cleanData});
    }
  };
  addAlbum = () => {
    this.setState({
      addAlbumModalVisible: true,
    });
  };
  emptyComponent = () => {
    return (
      <View
        style={{
          height: Metrix.VerticalSize(200),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: 120, width: 120}}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../../assets/images/NodataFound.png')}
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
    );
  };
  addPictures = () => {
    let {albumName} = this.state;
    if (albumName == '') {
      showToast('error', 'Album name is a required field');
    } else {
      var options = {
        title: 'Select Image',
        customButtons: [
          {
            name: 'customOptionKey',
            title: 'Choose file from Custom Option',
          },
        ],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchCamera(options, res => {
        // this.setState({});
        console.log('Response = ', res);
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        } else {
          let source = res.assets[0];
          let pushImage = {
            image: res.assets[0].uri,
          };
          this.state.albumPictureArray.unshift(pushImage);
          // this.setState({
          //   resourcePath: source,
          // });
          ImageResizer.createResizedImage(
            source.uri,
            720,
            480,
            'JPEG',
            30,
          ).then(compression => {
            RNFS.readFile(compression.uri, 'base64').then(res => {
              this.setState({
                // profilePicture: res,
                addAlbumModalVisible: false,
              });
              // console.log(res, 'ajfgifuyguW');
              this.state.albumUriBaseArr.push(res);
            });
          });
          // let source = res.assets[0];
          // console.log('maiaj', this.state.resourcePath.uri);
        }
      });
    }
  };
  clearAlbum = () => {
    this.setState({
      albumName: '',
      albumPictureArray: [
        {
          id: '1746',
          icon: 'icon',
        },
      ],
      albumUriBaseArr: [],
    });
  };
  saveAlbum = async () => {
    await this.setState({
      check: false,
    });
    let data = {
      id: 0,
      userId: this.props.user.id,
      name: this.state.albumName,
      images: this.state.albumUriBaseArr,
    };
    let GetAlbum = {
      id: this.props.user.id,
      myId: this.props.user.id,
    };
    let addAlbumData = {
      payload: data,
      clearAlbum: this.clearAlbum(),
      payloadGetAlbum: GetAlbum,
    };
    this.props.saveAlbumPictures(addAlbumData);
  };
  updateComponent = async () => {
    // alert('update karo modal open karwao');
    await this.setState({
      isModalSender: true,
    });
  };
  updateAlbumsList = () => {
    let id = this.props.route.params.id;
    this.props.getAlbum({id: id, myId: this.props.user.id});
  };
  GenerateCode = item => {
    this.props.generateAlbumCode({
      userId: this.props.user.id,
      id: item.id,
      updateComponent: this.updateComponent,
    });
  };
  senderModalClose = () => {
    this.setState({
      isModalSender: false,
    });
    Clipboard.setString(this.state.defaultValueSender);
  };
  reciverModalClose = () => {
    this.setState({
      isModalReciver: false,
    });
    this.props.applyAlbumCode({
      myUserId: this.props.user.id,
      userId: this.props.GetUserProfile.id,
      code: this.state.reciverCode,
      updateComponent: this.updateAlbumsList,
    });
    console.log(this.state.reciverCode, 'reciverCodereciverCode');
  };
  checkPrivate = async (item, index) => {
    let albumsList = this.props.GetAlbumList;
    await this.setState({
      check: true,
    });
    if (item.isPrivate) {
      delete albumsList[index].isPrivate;
      this.setState({
        stateAlbumsList: albumsList,
      });
    } else {
      Object.assign(albumsList[index], {isPrivate: true});
      this.setState({
        stateAlbumsList: albumsList,
      });
    }
    if (item.isPrivate) {
      this.props.updateAlbumisPrivate({
        id: item.id,
        isPrivate: true,
        updateComponent: this.updateComponent,
      });
    } else {
      this.props.updateAlbumisPrivate({id: item.id, isPrivate: false});
    }
    console.log(this.state.stateAlbumsList, 'stateAlbumsList');
  };
  showHiddenAlbum = () => {
    this.setState({
      isModalReciver: true,
    });
  };
  render() {
    let {GetUserProfile} = this.props;
    const sRating = this.state.starCount;
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <ImageBackground
          style={styles.PreviewBackground}
          source={{
            uri:
              GetUserProfile?.photo == null
                ? 'https://cdn1.vectorstock.com/i/1000x1000/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg'
                : `${BaseUrl}${GetUserProfile?.photo}`,
          }}>
          {/* header begin*/}
          <Header.Standard
            //   extraStyle={{backgroundColor: Colors.white}}
            leftIconName={'arrow-back'}
            onPressLeft={() => navigationService.goBack()}
            rightIconName={'ellipsis-vertical'}
            bgColor="transparent"
            iconColor="white"
          />
          {/* header end*/}
        </ImageBackground>
        <View style={styles.PreviewBackgroundDesc}>
          <View style={styles.VacineStatus}>
            <LinearGradient
              colors={['rgba(89, 214, 214, .6)', 'rgba(89, 214, 214, .6)']}
              style={styles.VacineStatus}>
              <View style={styles.VacineStatusLeftContainer}>
                <View style={styles.VacineStatusLeftContainerIcon}>
                  <Image
                    style={styles.VacineStatusLeftContainerIconWrapper}
                    source={Images.syring1}
                  />
                </View>
                <View style={styles.VacineStatusLeftContainerText}>
                  <Text
                    style={{fontSize: 17, fontWeight: '700', marginBottom: 10}}>
                    Vaccine status
                  </Text>
                  <Text style={{fontWeight: '600', fontSize: 15}}>
                    {GetUserProfile?.vaccine == null
                      ? 'N/A'
                      : GetUserProfile.vaccine}
                  </Text>
                </View>
              </View>
              <View style={styles.VacineStatusRightContainer}>
                <View style={styles.VacineStatusRightContainerWrapper}>
                  <Image source={Images.Thumb} />
                </View>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.VacineStatus}>
            <View style={[styles.userDetails, {}]}>
              <View
                style={{
                  width: '33.3%',
                  // backgroundColor: 'gray',
                  // height: 150,
                }}>
                <View style={{marginLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',
                      color: Colors.Black,
                    }}>
                    {GetUserProfile?.name}, {GetUserProfile?.age}
                  </Text>
                  <Text style={{marginVertical: 10, fontSize: 15}}>
                    {/* {GetUserProfile?.myProfession} */}
                    N/A
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      // alignItems: 'center',
                      // justifyContent: 'space-around',
                    }}>
                    <View
                      style={[
                        styles.status,
                        {marginRight: 10, marginTop: 5},
                      ]}></View>
                    <Text style={{color: '#14B82F', marginBottom: 10}}>
                      Now online
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // alignItems: 'center',
                      // justifyContent: 'space-around',
                    }}>
                    <View style={{marginRight: 10}}>
                      <Image source={Images.Home} />
                    </View>
                    <Text>
                      {GetUserProfile?.city == null
                        ? 'N/A'
                        : GetUserProfile.city}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '33.3%',
                  // backgroundColor: 'blue',
                  // height: 150,
                }}>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 14, marginTop: 5, marginBottom: 8}}>
                    65 Likes Recives
                  </Text>
                  <View style={styles.rowData}>
                    <View style={styles.statusNewMember}></View>
                    <Text
                      style={{
                        color: Colors.Primary,
                        marginVertical: 5,
                        marginRight: 5,
                      }}>
                      New Member{' '}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{marginRight: 10}}
                      source={Images.DetailLocation}
                    />
                    <Text style={{}}>
                      {GetUserProfile?.distance == null
                        ? 'N/A'
                        : GetUserProfile.distance}{' '}
                      KM
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '33.3%',
                  // backgroundColor: 'green',
                  // height: 150,
                }}>
                <View style={{marginLeft: 10}}>
                  <View style={[styles.rowData, styles.datingStar]}>
                    <Ionicons name="star" color={'white'} />
                    <Text style={styles.datingStarTitle}>
                      {GetUserProfile?.lookingRelations == undefined
                        ? 'N/A'
                        : GetUserProfile.lookingRelations[0]}
                    </Text>
                  </View>
                  <View style={styles.rating}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // width: 50,
                        // marginLeft: 50,
                      }}>
                      <Text style={[styles.ratingText, {marginRight: 10}]}>
                        {GetUserProfile?.rating == null
                          ? 'N/A'
                          : GetUserProfile.rating}
                      </Text>
                      {this.props.route.params.isCardUser ? (
                        <Pressable
                          onPress={() => this.setState({modalVisible: true})}>
                          {/* <Image
                            source={Images.PenCil}
                            style={{ width: 17, height: 17 }}
                          /> */}
                          <Feather name="edit" size={17} />
                        </Pressable>
                      ) : (
                        <View />
                      )}
                      {this.state.modalVisible && (
                        <View style={styles.centeredView}>
                          <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {
                              Alert.alert('Modal has been closed.');
                              this.setState({modalVisible: false});
                            }}>
                            <View style={styles.centeredView}>
                              <View style={styles.modalView}>
                                <View
                                  style={{
                                    alignSelf: 'flex-end',
                                    marginTop: 20,
                                  }}>
                                  <Ionicons
                                    onPress={() =>
                                      this.setState({modalVisible: false})
                                    }
                                    name="close"
                                    size={19}
                                  />
                                </View>
                                <Text
                                  style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: Colors.Black,
                                  }}>
                                  Feedback
                                </Text>
                                <View style={styles.ratingContainer}>
                                  <TextInput
                                    style={styles.ratingTextArea}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholder="Test"
                                    onChangeText={e =>
                                      this.setState({review: e})
                                    }
                                  />
                                </View>
                                <View style={styles.rowData}>
                                  <StarRating
                                    starSize={30}
                                    starStyle={{color: '#FFDC00'}}
                                    disabled={false}
                                    maxStars={5}
                                    halfStarEnabled={true}
                                    rating={this.state.starCount}
                                    selectedStar={rating =>
                                      this.onStarRatingPressModal(rating)
                                    }
                                  />
                                </View>
                                <View style={styles.addRating}>
                                  <CustomButton
                                    handleClick={() => this.handleStarRating()}
                                    title="Add"
                                  />
                                </View>
                              </View>
                            </View>
                          </Modal>
                        </View>
                      )}
                    </View>
                    <View style={styles.rowData}>
                      <StarRating
                        starSize={20}
                        starStyle={{color: '#FFDC00'}}
                        disabled={true}
                        maxStars={5}
                        rating={
                          GetUserProfile?.rating == null
                            ? 0
                            : GetUserProfile.rating
                        }
                        selectedStar={rating => this.onStarRatingPress(rating)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {GetUserProfile?.ismatch ? (
          <View style={[styles.GlobalPadding, styles.messageVideoButton]}>
            <Pressable
              onPress={() =>
                NavigationService.navigate('Messages', {
                  data: {
                    userId: GetUserProfile?.id,
                    photo: GetUserProfile?.photo,
                    name: GetUserProfile?.name,
                  },
                })
              }
              style={styles.messageVideoButtonMessage}>
              <Text style={styles.messageVideoButtonMessageText}>Message</Text>
            </Pressable>
            <Pressable style={styles.messageVideoButtonVideoCall}>
              <Text style={styles.messageVideoButtonMessageText}>
                Video Call
              </Text>
            </Pressable>
          </View>
        ) : (
          <View />
        )}
        <View style={styles.GlobalPadding}>
          <Text style={{fontSize: 17, color: Colors.Black}}>
            ANGELA WAS RECENTLY NEAR
          </Text>
        </View>
        {/* map begin */}
        <View style={styles.mapContaienr}>
          {/* <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          /> */}
          <Text style={{fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>
            Map
          </Text>
        </View>
        {/* map end */}
        <View style={styles.GlobalPadding}>
          <Text style={{fontSize: 17, color: Colors.Black}}>Bio:</Text>
          <Text
            style={{
              fontSize: 16,
              paddingVertical: Metrix.VerticalSize(10),
              opacity: 0.9,
            }}>
            {GetUserProfile?.aboutMe == null ? 'N/A' : GetUserProfile.aboutMe}
          </Text>
        </View>
        <View style={styles.GlobalPadding}>
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontSize: 15, marginLeft: 7}}>Religion</Text>
                <View style={styles.lookingForButtonWrapper}>
                  <Text style={styles.lookingForButtonWrapperText}>
                    {GetUserProfile?.religion == null
                      ? 'N/A'
                      : GetUserProfile.religion}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{fontSize: 15, marginLeft: 7}}>Sexual</Text>
                <View style={styles.lookingForButtonWrapper}>
                  <Text style={styles.lookingForButtonWrapperText}>
                    {GetUserProfile?.sexualOrientation == null
                      ? 'N/A'
                      : GetUserProfile.sexualOrientation}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{fontSize: 15, marginLeft: 7}}>Prefession</Text>
                <View style={styles.lookingForButtonWrapper}>
                  <Text style={styles.lookingForButtonWrapperText}>
                    {GetUserProfile?.myProfession == null
                      ? 'N/A'
                      : GetUserProfile.myProfession}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontSize: 15, marginLeft: 7}}>Sign</Text>
                <View style={styles.lookingForButtonWrapper}>
                  <Text style={styles.lookingForButtonWrapperText}>
                    {GetUserProfile?.sign == null ? 'N/A' : GetUserProfile.sign}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{fontSize: 15, marginLeft: 7}}>Smoking</Text>
                <View style={styles.lookingForButtonWrapper}>
                  <Text style={styles.lookingForButtonWrapperText}>
                    {GetUserProfile?.smoke == null
                      ? 'N/A'
                      : GetUserProfile.smoke}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{fontSize: 15, marginLeft: 7}}>Body Art</Text>
                <View style={styles.lookingForButtonWrapper}>
                  <Text style={styles.lookingForButtonWrapperText}>
                    {GetUserProfile?.physicalType == null
                      ? 'N/A'
                      : GetUserProfile.physicalType}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontSize: 15, marginLeft: 7}}>Child</Text>
                <View style={styles.lookingForButtonWrapper}>
                  <Text style={styles.lookingForButtonWrapperText}>
                    {GetUserProfile?.children == null
                      ? 'N/A'
                      : GetUserProfile.children}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{fontSize: 15, marginLeft: 7}}>Relationship</Text>
                <View style={styles.lookingForButtonWrapper}>
                  <Text style={styles.lookingForButtonWrapperText}>
                    {GetUserProfile?.last_relationship == null
                      ? 'N/A'
                      : GetUserProfile.last_relationship}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{fontSize: 15, marginLeft: 7}}>Education</Text>
                <View style={styles.lookingForButtonWrapper}>
                  <Text style={styles.lookingForButtonWrapperText}>
                    {GetUserProfile?.eduction == null
                      ? 'N/A'
                      : GetUserProfile.eduction}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* buttons end */}
        </View>
        {/* hobbies begin */}
        <View style={styles.GlobalPadding}>
          {/* buttons begin */}
          <Text style={{fontSize: 17, color: Colors.Black}}>Hobbies:</Text>
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={3}
              data={GetUserProfile?.hobbies}
              renderItem={({item}) => {
                return (
                  <View>
                    <View style={styles.lookingForButtonWrapper}>
                      <Text style={styles.lookingForButtonWrapperText}>
                        {item}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          {/* buttons end */}
        </View>
        {/* hobbies end */}
        {/* Personality begin */}
        <View style={styles.GlobalPadding}>
          {/* buttons begin */}
          <Text style={{fontSize: 17, color: Colors.Black}}>
            My Personality:
          </Text>
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={3}
              data={GetUserProfile?.personalities}
              renderItem={({item}) => {
                return (
                  <View>
                    <View style={styles.lookingForButtonWrapper}>
                      <Text style={styles.lookingForButtonWrapperText}>
                        {item}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          {/* buttons end */}
        </View>
        {/* Personality end */}
        {/* Qualities begin */}
        <View style={styles.GlobalPadding}>
          {/* buttons begin */}
          <Text style={{fontSize: 17, color: Colors.Black}}>Qualities:</Text>
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={3}
              data={GetUserProfile?.qualities}
              renderItem={({item}) => {
                return (
                  <View>
                    <View style={styles.lookingForButtonWrapper}>
                      <Text style={styles.lookingForButtonWrapperText}>
                        {item}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          {/* buttons end */}
        </View>
        <View style={styles.GlobalPadding}>
          <Text
            style={{
              fontSize: 17,
              color: Colors.Black,
              marginBottom: 10,
            }}>
            Albums:
          </Text>
          <View style={styles.lookingForButton}>
            {this.props.GetAlbumList.length == 0 ? (
              <View
                style={{
                  height: Metrix.VerticalSize(200),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{height: 120, width: 120}}>
                  <Image
                    style={{height: '100%', width: '100%'}}
                    source={require('../../../assets/images/NodataFound.png')}
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
              <FlatList
                data={
                  this.state.check
                    ? this.state.stateAlbumsList
                    : this.props.GetAlbumList
                }
                ListEmptyComponent={this.emptyComponent}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            fontSize: 17,
                            color: Colors.Black,
                            marginRight: 10,
                          }}>
                          {item.name}
                        </Text>
                        {this.props.route.params.isCardUser == undefined ? (
                          <Text
                            style={{
                              fontSize: 14,
                              color: Colors.Black,
                              marginTop: 3,
                              marginRight: 10,
                            }}>
                            Private
                          </Text>
                        ) : (
                          <View />
                        )}
                        {this.props.route.params.isCardUser == undefined ? (
                          <TouchableOpacity
                            onPress={() => this.checkPrivate(item, index)}
                            style={{
                              height: 20,
                              width: 20,
                              borderRadius: 5,
                              backgroundColor: Colors.White,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: 1,
                              borderColor: Colors.Primary,
                              marginRight: 10,
                              marginTop: 3,
                            }}>
                            <Feather
                              name="check"
                              color={
                                item.isPrivate ? Colors.Primary : Colors.White
                              }
                              size={17}
                            />
                          </TouchableOpacity>
                        ) : (
                          <View />
                        )}
                        {this.props.route.params.isCardUser == undefined ? (
                          item.isPrivate && (
                            <TouchableOpacity
                              onPress={() => this.GenerateCode(item)}
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: Metrix.VerticalSize(30),
                                width: Metrix.HorizontalSize(120),
                                backgroundColor: Colors.Primary,
                                borderRadius: 5,
                                marginBottom: 5,
                              }}>
                              <Text style={{color: Colors.White}}>
                                Generate Code
                              </Text>
                            </TouchableOpacity>
                          )
                        ) : (
                          <View />
                        )}
                      </View>
                      <FlatList
                        numColumns={3}
                        data={item.images}
                        renderItem={({item}) => {
                          return (
                            <View style={styles.favourite}>
                              <Image
                                resizeMode="cover"
                                style={{
                                  width: 100,
                                  height: 100,
                                  borderRadius: 8,
                                }}
                                source={{uri: `${BaseUrl}${item}`}}
                              />
                            </View>
                          );
                        }}
                        keyExtractor={item => item.id}
                      />
                    </View>
                  );
                }}
              />
            )}
            {/* <FlatList
              numColumns={3}
              data={this.props.GetAlbumList}
              renderItem={({item}) => {
                return (
                  <View style={styles.favourite}>
                     <Image
                        resizeMode="cover"
                        style={{width: 100, height: 100, borderRadius: 8}}
                        source={{uri: item.image}}
                      />
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            /> */}
          </View>
        </View>
        {this.props.route.params.isCardUser ? (
          <View />
        ) : (
          <View style={styles.GlobalPadding}>
            <Text
              style={{
                fontSize: 17,
                color: Colors.Black,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {this.state.albumName == '' ? 'Add Album' : this.state.albumName}
            </Text>
            <View style={styles.lookingForButton}>
              <FlatList
                numColumns={3}
                data={this.state.albumPictureArray}
                renderItem={({item}) => {
                  return (
                    <View style={styles.favourite}>
                      {item.image ? (
                        <Image
                          resizeMode="cover"
                          style={{width: 100, height: 100, borderRadius: 8}}
                          source={{uri: item.image}}
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            this.state.albumPictureArray.length > 1
                              ? this.addPictures()
                              : this.addAlbum()
                          }
                          style={styles.addPic}>
                          <Ionicons name="add" size={45} color={'white'} />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
                keyExtractor={item => item.id}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.saveAlbum()}
              disabled={this.state.albumPictureArray.length <= 1 ? true : false}
              style={{
                height: Metrix.VerticalSize(50),
                width: Metrix.HorizontalSize(120),
                borderRadius: 10,
                borderWidth: 2,
                borderColor:
                  this.state.albumPictureArray.length <= 1
                    ? Colors.Gray
                    : Colors.Primary,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  color:
                    this.state.albumPictureArray.length <= 1
                      ? Colors.Gray
                      : Colors.Black,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Save Album
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* FAMILY pic end */}
        {this.props.route.params.isCardUser && (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: Metrix.VerticalSize(30),
            }}>
            <TouchableOpacity
              onPress={() => this.showHiddenAlbum()}
              style={styles.showHiddenPhotos}>
              <Text
                style={{color: Colors.White, fontWeight: '700', fontSize: 17}}>
                SHOW HIDDEN PHOTOS
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Loader isModalLoader={this.props.loading} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.addAlbumModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setState({addAlbumModalVisible: false});
          }}>
          <View style={styles.centeredView}>
            <View
              style={{
                height: Metrix.VerticalSize(180),
                width: Metrix.HorizontalSize(310),
                paddingHorizontal: Metrix.HorizontalSize(30),
                alignItems: 'center',
                backgroundColor: Colors.White,
                shadowColor: '#000',
                borderRadius: 10,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View
                style={{
                  position: 'absolute',
                  right: 0,
                  marginRight: 15,
                  marginTop: 10,
                }}>
                <Ionicons
                  onPress={() => this.setState({addAlbumModalVisible: false})}
                  name="close"
                  size={19}
                />
              </View>
              <Text
                style={{
                  color: Colors.Black,
                  fontSize: 15,
                  fontWeight: 'bold',
                  paddingVertical: 15,
                }}>
                Enter Album Name
              </Text>
              <View
                style={{
                  width: '90%',
                  height: 40,
                  borderRadius: 10,
                  borderColor: Colors.Primary,
                  borderWidth: 1,
                }}>
                <TextInput
                  onChangeText={albumName => this.setState({albumName})}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.addPictures()}
                style={{
                  height: 30,
                  width: 130,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: Colors.Primary,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    color: Colors.Black,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Add Photos
                </Text>
                <Feather
                  onPress={() => this.setState({addAlbumModalVisible: false})}
                  name="plus"
                  color={Colors.Black}
                  size={19}
                />
              </TouchableOpacity>
              {/* <Text style={{ fontSize: 20, fontWeight: 'bold', color: sRating === .5 ||  sRating === 1 ||  sRating === 1.5 || sRating === 2 || sRating === 2.5 ? 'red' : sRating === 3 || sRating === 3.5 ? 'yellow' : sRating === 4 || sRating === 4.5 || sRating === 5 && 'green', paddingVertical: 10 }}>Good</Text> */}
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalSender}
          onRequestClose={() => {
            this.setState({isModalSender: false});
          }}>
          <View style={styles.centeredView}>
            <View
              style={{
                height: Metrix.VerticalSize(350),
                width: Metrix.HorizontalSize(310),
                paddingHorizontal: Metrix.HorizontalSize(30),
                alignItems: 'center',
                backgroundColor: Colors.White,
                shadowColor: '#000',
                borderRadius: 10,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View
                style={{
                  marginTop: Metrix.VerticalSize(15),
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: Colors.Black,
                  }}>
                  Genertae Code
                </Text>
                {/* <Text
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => this.setState({isModalBoth: false})}>
                  Close
                </Text> */}
              </View>
              <View
                style={{
                  height: Metrix.VerticalSize(80),
                  width: Metrix.HorizontalSize(80),
                  marginTop: Metrix.VerticalSize(15),
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: '100%', width: '100%'}}
                  source={Images.Block}
                />
              </View>
              <View
                style={{
                  marginTop: Metrix.VerticalSize(20),
                  height: Metrix.VerticalSize(50),
                  width: Metrix.HorizontalSize(260),
                  backgroundColor: '#DCDCDC',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  secureTextEntry={true}
                  editable={false}
                  defaultValue={this.state.defaultValueSender}
                  style={{
                    fontSize: 30,
                    height: '100%',
                    marginTop: 10,
                  }}
                  onChangeText={() => this.setState({})}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.senderModalClose()}
                style={{
                  marginTop: Metrix.VerticalSize(25),
                  height: Metrix.VerticalSize(40),
                  width: Metrix.HorizontalSize(260),
                  backgroundColor: Colors.Primary,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: Colors.White, fontSize: 15}}>
                  Copy Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.isModalReciver}
          onRequestClose={() => {
            this.setState({isModalReciver: false});
          }}>
          <View style={styles.centeredView}>
            <View
              style={{
                height: Metrix.VerticalSize(350),
                width: Metrix.HorizontalSize(310),
                paddingHorizontal: Metrix.HorizontalSize(30),
                alignItems: 'center',
                backgroundColor: Colors.White,
                shadowColor: '#000',
                borderRadius: 10,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View
                style={{
                  marginTop: Metrix.VerticalSize(15),
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: Colors.Black,
                  }}>
                  See Hidden Album
                </Text>
                {/* <Text
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => this.setState({isModalBoth: false})}>
                  Close
                </Text> */}
              </View>
              <View
                style={{
                  height: Metrix.VerticalSize(80),
                  width: Metrix.HorizontalSize(80),
                  marginTop: Metrix.VerticalSize(15),
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: '100%', width: '100%'}}
                  source={Images.Block}
                />
              </View>
              <View
                style={{
                  marginTop: Metrix.VerticalSize(20),
                  height: Metrix.VerticalSize(50),
                  width: Metrix.HorizontalSize(260),
                  backgroundColor: '#DCDCDC',
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  secureTextEntry={true}
                  style={{
                    width: '100%',
                    fontSize: 30,
                    paddingVertical: 3,
                    height: '100%',
                    marginTop: 10,
                    textAlign: 'center',
                  }}
                  onChangeText={reciverCode => this.setState({reciverCode})}
                />
              </View>
              <TouchableOpacity
                onPress={() => this.reciverModalClose()}
                style={{
                  marginTop: Metrix.VerticalSize(25),
                  height: Metrix.VerticalSize(40),
                  width: Metrix.HorizontalSize(260),
                  backgroundColor: Colors.Primary,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: Colors.White, fontSize: 15}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getProfile: payload => {
      dispatch(AppAction.GetProfile(payload));
    },
    // star rating
    handleRating: payload => {
      dispatch(AppAction.HandleStarRating(payload));
    },
    saveAlbumPictures: payload => {
      dispatch(AppAction.SaveAlbumPictures(payload));
    },
    getAlbum: payload => {
      dispatch(AppAction.GetAlbum(payload));
    },
    updateAlbumisPrivate: payload => {
      dispatch(AppAction.UpdateAlbumisPrivate(payload));
    },
    generateAlbumCode: payload => {
      dispatch(AppAction.GenerateAlbumCode(payload));
    },
    applyAlbumCode: payload => {
      dispatch(AppAction.ApplyAlbumCode(payload));
    },
    getAlbumSuccess: payload => {
      dispatch(AppAction.GetAlbumSuccess(payload));
    },
  };
}

function mapStateToProps(state) {
  console.log(state, 'state');
  return {
    loading: state.AppReducer.loader,
    GetUserProfile: state.AppReducer.GetUserProfile,
    user: state.AppReducer.user,
    GetAlbumList: state.AppReducer.GetAlbumList,
    albumCode: state.AppReducer.albumCode,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
