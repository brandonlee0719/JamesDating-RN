import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, Images, Metrix} from '../../config';
import metrix from '../../config/metrix';
import {AppAction} from '../../store/actions';
import CustomButton from '../CustomButton';
import styles from './styles';

const CustomModal = props => {
  const dispatch = useDispatch();
  const {reportUserData} = useSelector(state => state.AppReducer);
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState('');

  const handleState = async data => {
    setToggle(prev => (prev = !toggle));
    setTitle(data.name);
  };
  //   const closeModal = () => {
  //     setToggle(false)
  //   }
  useEffect(() => {
    if (toggle) {
      handleReportData();
    }
  }, [toggle]);

  const handleReportData = () => {
    const payload = {fromUserId: props.user.id, toUserId: 64, reason: title};
    dispatch(AppAction.HandleReportData(payload));
  };

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={props.isModalVisible}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalWrapper, props.ModalWhiteBoxCustomStyle]}>
          <View
            style={{
              paddingVertical: Metrix.VerticalSize(18),
              paddingHorizontal: Metrix.HorizontalSize(10),
              width: '100%',
              borderRadius: 50,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                marginVertical: Metrix.VerticalSize(30),
                justifyContent: 'center',
                width: '100%',
              }}>
              <Text
                style={{
                  fontSize: metrix.FontLarge,
                  fontWeight: 'bold',
                  color: Colors.Black,
                }}
                onPress={props.handleTest}>
                {toggle ? 'Profile Reported' : 'Report User'}
              </Text>
            </View>
            {toggle ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 220,
                }}>
                <View
                  style={{
                    width: Metrix.HorizontalSize(100),
                    height: Metrix.VerticalSize(100),
                  }}>
                  <Image
                    source={Images.Warning}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </View>
                <Text style={{paddingVertical: Metrix.VerticalSize(10)}}>
                  {title}
                </Text>
                <View
                  style={{
                    width: Metrix.HorizontalSize(220),
                    height: Metrix.VerticalSize(50),
                    marginVertical: Metrix.VerticalSize(20),
                  }}>
                  <CustomButton
                    handleClick={props.handleTest}
                    customStyle={true}
                    title="Back to Home"
                  />
                </View>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                width={Metrix.HorizontalSize(299)}
                data={reportUserData}
                height={500}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleState(item)}
                      style={{
                        borderWidth: 1,
                        justifyContent: 'center',
                        borderColor: Colors.Primary,
                        borderRadius: 8,
                        width: '100%',
                        height: Metrix.VerticalSize(45),
                        paddingHorizontal: Metrix.HorizontalSize(10),
                        marginVertical: Metrix.VerticalSize(10),
                      }}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
