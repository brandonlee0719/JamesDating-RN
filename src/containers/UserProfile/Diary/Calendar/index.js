import {
  Image,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableHighlight,
  Modal,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {styles} from './styles';
import {Colors, Images, Metrix, showToast} from '../../../../config';
import {Forminput, Header, Loader} from '../../../../components';
import CustomButton from '../../../../components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-styled-datepicker';
import MyDatePicker from './ModernDatePicker';
import RNFS, {stat} from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {AppAction} from '../../../../store/actions';
import navigationService from '../../../../config/navigationService';

// modalVisible: false,
// resourcePath: {},
// title: '',
// content: '',
// selectedDate: '',

const Calendar = () => {
  // time begin
  const time = new Date();
  const time2 = time.toISOString();
  const dispatch = useDispatch();
  const {user, loader} = useSelector(state => state.AppReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [resourcePath, setResourcePath] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // const currentTime = `T13:${time2.slice(11, 19)}5Z`
  // alert(time2)
  // alert(selectedDate)
  let mySeletedDate = `${selectedDate.slice(0, 4)}-${selectedDate.slice(
    5,
    7,
  )}-${selectedDate.slice(8, 10)}`;
  let mySelectedFormate = time2.slice(10, 27);
  let mySeletedFinalFormate = `${mySeletedDate}${mySelectedFormate}`;

  // "2022-08-05T12:31:16.482Z"
  let selectedDate1 = `${selectedDate.slice(0, 4)}-${selectedDate.slice(
    5,
    7,
  )}-${selectedDate.slice(8, 10)}`;

  // selected time date

  const selectedTimeDate = `${selectedDate1.slice(5, 7)}-${selectedDate1.slice(
    8,
    10,
  )}-${selectedDate1.slice(0, 4)}`;

  // current time
  // const currentTimeDate = `${time2.slice(0, 1)}-${time2.slice(2, 3)}-${time2.slice(4, 8)}`

  const handleSave = async () => {
    const userId = user.id;
    const data = {
      title,
      content,
      date: time2 ? time2 : mySeletedFinalFormate,
      photo: profilePicture,
      userId,
    };
    if (!data.title || !data.content || !data.photo || !data.userId) {
      showToast('error', 'All fields are required');
    } else {
      dispatch(AppAction.AddDiaryList(data));
    }
  };
  const pickImage = () => {
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
        setResourcePath({
          resourcePath: source,
        });
        ImageResizer.createResizedImage(source.uri, 720, 480, 'JPEG', 30).then(
          compression => {
            RNFS.readFile(compression.uri, 'base64').then(res => {
              setProfilePicture(res);
            });
          },
        );
        SheetManager.hide('BottomSheetStatus');
        // let source = res.assets[0];
      }
    });
  };
  const pickImageGallery = () => {
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
    ImagePicker.launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        let source = res.assets[0];
        setResourcePath({
          resourcePath: source,
        });
        ImageResizer.createResizedImage(source.uri, 720, 480, 'JPEG', 80).then(
          compression => {
            RNFS.readFile(compression.uri, 'base64').then(res => {
              setProfilePicture(res);
            });
          },
        );
        SheetManager.hide('BottomSheetStatus');
        // let source = res.assets[0];
      }
    });
  };

  const openActionSheet = () => {
    SheetManager.show('BottomSheetStatus');
  };

  const myCurrentDate = time2.slice(0, 10);
  const myCurrentDates = mySeletedFinalFormate.slice(0, 10);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.calendarTopContainer}>
          <Text style={styles.calendarTopContainerWrapperDate}>
            {myCurrentDates.includes('--') ? myCurrentDate : myCurrentDates}
          </Text>
          <View style={styles.calendarTopContainerWrapper}>
            <Pressable
              onPress={() => openActionSheet()}
              style={styles.calendarTopContainerWrapperText}>
              <Image source={Images.Camera} />
            </Pressable>
            <Pressable
              style={styles.calendarTopContainerWrapperText}
              onPress={() => setModalVisible(true)}>
              <Image source={Images.Cal} />
            </Pressable>
          </View>
        </View>
        <View style={styles.calendarBottomContainer}>
          <View style={{width: '100%'}}>
            <Text style={styles.calendarBottomContainerTitle}>
              Add to Title:
            </Text>
            <TextInput
              onChangeText={e => setTitle(e)}
              placeholder="Add to Title"
              style={styles.calendarBottomContainerInput}
            />
          </View>
          <View style={{width: '100%'}}>
            <Text style={styles.calendarBottomContainerTitle}>
              Description:
            </Text>
            <TextInput
              onChangeText={e => setContent(e)}
              multiline={true}
              numberOfLines={13}
              placeholder="Writte a text"
              style={styles.calendarBottomContainerTextArea}
            />
          </View>
          <View style={{width: '100%', height: 50}}>
            <CustomButton title="Save" handleClick={() => handleSave()} />
          </View>
          <View style={styles.cancel}>
            <CustomButton
              handleClick={() => navigationService.goBack()}
              textColor={Colors.Primary}
              title="Cancel"
              bgColor={Colors.White}
              onPress={() => alert('Save')}
            />
          </View>
        </View>
        <ActionSheet id="BottomSheetStatus">
          <View>
            <View
              style={{
                padding: 10,
                height: Metrix.VerticalSize(120),
                // flexDirection: 'row',
                // alignItems: 'center',
                // justifyContent: 'space-evenly',
              }}>
              <Pressable
                onPress={() => pickImage('camera')}
                style={{
                  marginLeft: 15,
                  flexDirection: 'row',
                  marginBottom: 15,
                }}>
                <Feather
                  style={{}}
                  name={'camera'}
                  color={Colors.Black}
                  size={40}
                />
                <Text
                  style={{
                    color: Colors.Black,
                    fontSize: 20,
                    marginLeft: 20,
                    marginTop: 5,
                  }}>
                  Camera
                </Text>
              </Pressable>
              <Pressable
                onPress={() => pickImageGallery('Gallery')}
                style={{marginLeft: 15, flexDirection: 'row'}}>
                <MaterialCommunityIcons
                  style={{}}
                  name={'view-gallery-outline'}
                  color={Colors.Black}
                  size={40}
                />
                <Text
                  style={{
                    color: Colors.Black,
                    fontSize: 20,
                    marginLeft: 20,
                    marginTop: 5,
                  }}>
                  Gallery
                </Text>
              </Pressable>
            </View>
          </View>
        </ActionSheet>
        {modalVisible && (
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}>
            <View style={styles.modal}>
              <MyDatePicker
                handleClose={() => setModalVisible(!modalVisible)}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                setSelectedDate={setSelectedDate}
                selectedDate={selectedDate}
              />
            </View>
          </Modal>
        )}
      </View>
      <Loader isModalLoader={loader} />
    </>
  );
};

export default Calendar;
