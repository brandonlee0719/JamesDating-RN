import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {Colors, ApiCaller} from '../../config';
import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import React, {Component} from 'react';
import navigationService from '../../config/navigationService';
import RNFS, {stat} from 'react-native-fs';
import {connect} from 'react-redux';
import {AppAction} from '../../store/actions';
export class Stories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getCurrentUser: false,
      resourcePath: {},
      base64Array: [],
    };
    this.getPermission();
  }

  componentDidMount = () => {
    this.getStories();
  };

  getStories = () => {
    this.props.getstorymethod();
  };

  getPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Truventorm Camera Permission',
          message:
            'Truventorm needs access to your camera ' +
            'to set profile picture.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };
  addStory = data => {
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
      if (res.didCancel) {
      } else if (res.error) {
      } else if (res.customButton) {
        alert(res.customButton);
      } else {
        var source = res.assets[0];

        this.setState({
          resourcePath: source,
        });

        ImageResizer.createResizedImage(source.uri, 720, 480, 'JPEG', 100).then(
          compression => {
            RNFS.readFile(compression.uri, 'base64').then(res => {
              let data = {
                userId: this.props.user.id,
                photos: [
                  {
                    content: 'dummy stories',
                    photo: res,
                  },
                ],
              };
              // api begin end

              this.props.addstorymethod(data);
              // this.getStories();
              this.state.base64Array.push(data);
            });
          },
        );
        // this.setState(o => this.state.data[0].storiesList.push(source.uri));
      }
    });
  };

  render() {
    const BaseUrl = `${ApiCaller.url}img/upload/`;

    let {getAllStories} = this.props;

    return (
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {this.props.isActiveUserStory ? (
            <View>
              <Pressable onPress={() => this.addStory()}>
                <Image
                  style={styles.img}
                  source={{
                    uri: `${BaseUrl}${this.props?.user?.photo}`,
                  }}
                />
                <Ionicons
                  style={styles.imgPlusIcon}
                  name="add"
                  color={Colors.White}
                  size={16}
                />
              </Pressable>
            </View>
          ) : (
            <View />
          )}

          <FlatList
            horizontal={true}
            renderItem={({item}) => {
              return (
                <Pressable
                  onPress={() =>
                    !item.photos.length > 0
                      ? this.addStory(item)
                      : navigationService.navigate('WatchStory', {
                          data: item.photos,
                          userId: item,
                          addMore: this.addStory,
                        })
                  }>
                  <Image
                    style={[
                      styles.img,
                      item.userId === this.props.user.id && styles.imgActive,
                    ]}
                    source={{
                      uri: `${ApiCaller.url}img/upload/${item.photos[0].photo}`,
                    }}
                  />
                  {item.userId === this.props.user.id && (
                    <View>
                      <Pressable onPress={() => this.addStory()}>
                        <Ionicons
                          style={styles.imgPlusIcon}
                          name="add"
                          color={Colors.White}
                          size={16}
                        />
                      </Pressable>
                    </View>
                  )}
                </Pressable>
              );
            }}
            data={getAllStories}
          />
          {/* {getAllStories?.map((item, index) => {
            return (
              
            );
          })} */}
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addstorymethod: payload => {
      dispatch(AppAction.AddStoryMethod(payload));
    },
    getstorymethod: payload => {
      dispatch(AppAction.GetStoryMethod(payload));
    },
  };
}
function mapStateToProps(state) {
  return {
    user: state.AppReducer.user,
    getAllStories: state.AppReducer.getAllStories,
    GetEditProfile: state.AppReducer.GetEditProfile,
    isActive: state.AppReducer.isActive,
    isActiveUserStory: state.AppReducer.isActiveUserStory,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
