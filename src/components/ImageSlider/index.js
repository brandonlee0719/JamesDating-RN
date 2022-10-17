import {
  View,
  Text,
  Image,
  ImageBackground,
  Pressable,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import data from './data';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppAction} from '../../store/actions';
import {Colors, Fonts, Images, Metrix, ApiCaller} from '../../config';
import navigationService from '../../config/navigationService';
import {useDispatch, useSelector} from 'react-redux';
import Star from '../../assets/svg/star.svg';
import Like from '../../assets/svg/like.svg';
// slider icons begin
import StartUp from '../../assets/svg/start-up.svg';
import SwipeTimeIcon from '../../assets/svg/time.svg';
import SwipeHeartIcon from '../../assets/svg/heart.svg';
import SwipeEyeIcon from '../../assets/svg/eye.svg';
import SwipeCloseIcon from '../../assets/svg/close.svg';
// slider icons end
import LinearGradient from 'react-native-linear-gradient';

import CustomButton from '../CustomButton';
const ImageSlider = props => {
  const dispatch = useDispatch();
  const {user, reportUserData} = useSelector(state => state.AppReducer);
  const [LLike, setLike] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [disLike, setDisLike] = useState(false);
  const [cardId, setCardId] = useState('');
  const [toggle, setToggle] = useState(false);
  const [reasonTitle, setResonsTitle] = useState('');
  const getReportData = () => {
    dispatch(AppAction.GetReportData());
  };
  useEffect(() => {
    getReportData();
  }, []);
  const updateList = () => {
    props.updateList();
  };
  const BaseUrl = `${ApiCaller.url}img/upload/`;
  const Card = ({card}) => {
    // const stateName = props.stateName
    return (
      <>
        <View style={styles.card}>
          <ImageBackground
            imageStyle={{borderRadius: 30}}
            resizeMode="cover"
            source={{
              uri:
                card?.photo == null ? data[0].image : `${BaseUrl}${card.photo}`,
            }}
            style={styles.cardImage}>
            <View style={styles.cardDesc}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <View style={styles.cardDescTop}>
                  <Ionicons name="location" size={19} color="white" />
                  <Text
                    style={{
                      color: Colors.White,
                      fontSize: 14,
                      paddingHorizontal: 10,
                      fontFamily: Fonts['Poppins-Black'],
                    }}>
                    {card?.distance == null ? 'N/A' : card.distance} KM
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    marginTop: Metrix.VerticalSize(20),
                  }}>
                  <View
                    style={[
                      styles.cardDescTopRight,
                      {backgroundColor: '#FFBB04'},
                    ]}>
                    <View
                      style={{
                        height: 18,
                        width: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      {/* <Image source={Images.Star} style={{ marginTop: -2, width: 20, height: 20 }} /> */}
                      <Star width={18} height={18} />
                    </View>
                    <Text
                      style={{
                        color: Colors.White,
                        marginHorizontal: 10,
                        fontSize: 14,
                      }}>
                      {card?.relation == null ? 'N/A' : card?.relation}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.cardDescTopRight,
                      {backgroundColor: '#0492FF'},
                    ]}>
                    <View
                      style={{
                        height: 18,
                        width: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Like width={18} height={18} />

                      {/* <Image source={Images.Thumb} style={{ marginTop: -2, width: 17, height: 17 }} /> */}
                    </View>
                    <Text
                      style={{
                        color: Colors.White,
                        marginHorizontal: 10,
                        fontSize: 14,
                      }}>
                      {card?.likes} Likes
                    </Text>
                  </View>
                </View>
              </View>
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,.7)']}
                // style={[styles.cardDescBottomDown]}

                style={styles.cardDescBottom}>
                <View style={styles.cardDescBottomUpper}>
                  <Text style={styles.cardDescBottomUpperName}>
                    {card?.name}, {card?.age == null ? 'N/A' : card.age}
                  </Text>
                  <View style={styles.cardDescBottomUpperDasignation}>
                    <View
                      style={{
                        width: Metrix.HorizontalSize(25),
                        height: Metrix.VerticalSize(25),
                      }}>
                      <Image
                        source={Images.Cap}
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <Text style={styles.cardDescBottomUpperDasignationText}>
                      University of Oxford
                    </Text>
                  </View>
                  <View style={styles.cardDescBottomUpperDasignation}>
                    <View
                      style={{
                        width: Metrix.HorizontalSize(25),
                        height: Metrix.VerticalSize(25),
                      }}>
                      <Image
                        source={Images.Bag}
                        style={{width: '100%', height: '100%'}}
                      />
                    </View>
                    <Text style={styles.cardDescBottomUpperDasignationText}>
                      {card?.profession == null ? 'N/A' : card.profession}
                    </Text>
                  </View>
                  {/* flex row vaccine*/}
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.cardDescBottomUpperDasignation}>
                      <View
                        style={{
                          width: Metrix.HorizontalSize(25),
                          height: Metrix.VerticalSize(25),
                        }}>
                        <Image
                          source={Images.Inject}
                          style={{width: '100%', height: '100%'}}
                        />
                      </View>
                      <Text style={styles.cardDescBottomUpperDasignationText}>
                        Vaccinated
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.cardDescBottomUpperDasignation,
                        {marginLeft: Metrix.HorizontalSize(-47)},
                      ]}>
                      <View
                        style={{
                          width: Metrix.HorizontalSize(20),
                          height: Metrix.VerticalSize(20),
                        }}>
                        <Image
                          source={Images.Star}
                          style={{width: '100%', height: '100%'}}
                        />
                      </View>
                      <Text
                        style={[
                          styles.cardDescBottomUpperDasignationText,
                          {
                            fontSize: 14,
                            paddingHorizontal: Metrix.HorizontalSize(7),
                          },
                        ]}>
                        {card?.rating} rating
                      </Text>
                      {/* report user begin */}

                      {/* <CustomModal isModalVisible={isModalVisible} ModalWhiteBoxCustomStyle={{ width: Metrix.HorizontalSize(320) }} /> */}

                      <TouchableOpacity
                        onPress={() => {
                          setIsModalVisible(true);
                          setCardId(card.id);
                        }}>
                        <ImageBackground
                          source={Images.Rectangle}
                          style={{
                            width: Metrix.HorizontalSize(30),
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: Metrix.VerticalSize(30),
                            marginHorizontal: Metrix.HorizontalSize(15),
                          }}>
                          <View
                            style={{
                              width: Metrix.HorizontalSize(15),
                              height: Metrix.VerticalSize(15),
                            }}>
                            <Image
                              source={Images.AlertIcons}
                              style={{width: '100%', height: '100%'}}
                            />
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                      {/* report user end*/}
                    </View>
                  </View>
                  {/* flex row vaccine*/}
                </View>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,1)']}
                  style={[styles.cardDescBottomDown]}>
                  <View style={styles.cardDescBottomDownWrapper}>
                    <View
                      style={{
                        // backgroundColor: Colors.Primary,
                        borderWidth: 1,
                        borderColor: Colors.Primary,
                        width: 30,
                        height: 30,
                        opacity: 0.8,
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: Metrix.HorizontalSize(20),
                          height: Metrix.VerticalSize(20),
                        }}>
                        <SwipeTimeIcon
                          width={'100%'}
                          fill="red"
                          height={'100%'}
                        />
                        {/* <Image

                        source={Images.RocketColor}
                        // style={styles.cardDescBottomDownWrapperImg}
                        style={{ width: '100%', height: '100%' }}
                      /> */}
                      </View>
                    </View>

                    <View
                      style={{
                        backgroundColor: LLike && Colors.Primary,
                        borderWidth: 1,
                        borderColor: Colors.Primary,
                        width: 40,
                        height: 40,
                        opacity: 0.8,
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: Metrix.HorizontalSize(20),
                          height: Metrix.VerticalSize(20),
                        }}>
                        <SwipeHeartIcon
                          width={'100%'}
                          fill="red"
                          height={'100%'}
                        />
                        {/* <Image

                        source={Images.RocketColor}
                        // style={styles.cardDescBottomDownWrapperImg}
                        style={{ width: '100%', height: '100%' }}
                      /> */}
                      </View>
                    </View>
                    <View
                      style={{
                        // backgroundColor: Colors.Primary,
                        borderWidth: 1,
                        borderColor: Colors.Primary,
                        width: 53,
                        height: 53,
                        opacity: 0.8,
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: Metrix.HorizontalSize(30),
                          height: Metrix.VerticalSize(30),
                        }}>
                        <StartUp width={'100%'} fill="red" height={'100%'} />
                        {/* <Image

                        source={Images.RocketColor}
                        // style={styles.cardDescBottomDownWrapperImg}
                        style={{ width: '100%', height: '100%' }}
                      /> */}
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: disLike && Colors.Primary,
                        borderWidth: 1,
                        borderColor: Colors.Primary,
                        width: 40,
                        height: 40,
                        opacity: 0.8,
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: Metrix.HorizontalSize(25),
                          height: Metrix.VerticalSize(25),
                        }}>
                        <SwipeCloseIcon
                          width={'100%'}
                          fill="red"
                          height={'100%'}
                        />
                        {/* <Image

                        source={Images.RocketColor}
                        // style={styles.cardDescBottomDownWrapperImg}
                        style={{ width: '100%', height: '100%' }}
                      /> */}
                      </View>
                    </View>
                    <Pressable
                      onPress={() => {
                        navigationService.navigate('Preview', {
                          id: card?.id,
                          isCardUser: true,
                        });
                      }}
                      style={{
                        // backgroundColor: Colors.Primary,
                        width: 30,
                        height: 30,
                        opacity: 0.8,
                        borderRadius: 6,
                        borderWidth: 1,
                        borderColor: Colors.Primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: Metrix.HorizontalSize(20),
                          height: Metrix.VerticalSize(20),
                        }}>
                        <SwipeEyeIcon
                          width={'100%'}
                          fill="red"
                          height={'100%'}
                        />
                        {/* <Image

                        source={Images.RocketColor}
                        // style={styles.cardDescBottomDownWrapperImg}
                        style={{ width: '100%', height: '100%' }}
                      /> */}
                      </View>
                    </Pressable>
                  </View>
                </LinearGradient>
              </LinearGradient>
            </View>
          </ImageBackground>
          {/* <Image resizeMode='contain' source={{ uri: card.image }} style={styles.cardImage} /> */}
        </View>
      </>
    );
  };
  const SwipeRight = card => {
    let {usersCards, userData} = props;
    let UpdateLike = {
      fromUserId: userData.id,
      toUserId: usersCards[card]?.id,
    };
    dispatch(AppAction.UpdateLIke(UpdateLike));
  };
  const SwipeLeft = card => {
    let {usersCards, userData} = props;
    let UpdateDisLike = {
      fromUserId: userData.id,
      toUserId: usersCards[card]?.id,
    };
    dispatch(AppAction.UpdateDisLIke(UpdateDisLike));
  };

  const [index, setIndex] = React.useState(0);
  return (
    <View style={styles.container}>
      <Swiper
        horizontalSwipe={() => console.log('okkk')}
        cards={props.usersCards}
        cardIndex={index}
        renderCard={card => <Card card={card} />}
        stackSize={2}
        stackScale={1}
        stackSeparation={1}
        disableBottomSwipe
        disableTopSwipe
        swipeDirection
        verticalSwipe={false}
        animateCardOpacity
        onSwipedRight={card => SwipeRight(card)}
        onSwipedLeft={card => SwipeLeft(card)}
        onSwipedBottom={true}
        overlayLabels={{
          left: {
            element: (
              <View
                style={{
                  height: '100%',
                  alignSelf: 'flex-end',
                  marginRight: Metrix.HorizontalSize(59),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image
                  style={{
                    marginRight: Metrix.HorizontalSize(6),
                    marginTop: Metrix.VerticalSize(70),
                  }}
                  source={Images.Nope}
                />
              </View>
            ),
            title: 'NOPE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                top: 0,
                height: '59.8%',
                flexDirection: 'column',
              },
            },
          },
          right: {
            element: (
              <View
                style={{
                  height: '100%',
                  alignSelf: 'flex-start',
                  marginLeft: Metrix.HorizontalSize(59),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Image
                  style={{
                    marginLeft: Metrix.HorizontalSize(6),
                    marginTop: Metrix.VerticalSize(70),
                  }}
                  source={Images.SLike}
                />
              </View>
            ),
            /* Optional */
            title: 'LIKE',
            style: {
              label: {
                backgroundColor: 'black',
                borderColor: 'black',
                color: 'white',
                borderWidth: 1,
              },
              wrapper: {
                top: 0,
                height: '52.8%',
                flexDirection: 'column',
              },
            },
          },
        }}
      />
      <Modal transparent={true} animationType={'none'} visible={isModalVisible}>
        <View style={styles.modalBackground}>
          <View style={[styles.modalWrapper]}>
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
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: Metrix.HorizontalSize(290),
                  marginVertical: Metrix.VerticalSize(10),
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: '100%',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Colors.Black,
                  }}>
                  User Report
                </Text>
                <Pressable
                  onPress={() => {
                    setIsModalVisible(false);
                    setToggle(false);
                  }}>
                  <Ionicons style={{marginLeft: -30}} name="close" size={18} />
                </Pressable>
              </View>
              {toggle ? (
                <View
                  style={{
                    height: 250,
                    width: Metrix.HorizontalSize(299),
                    alignItems: 'center',
                    justifyContent: 'center',
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
                    {reasonTitle}
                  </Text>
                  <View
                    style={{
                      width: Metrix.HorizontalSize(220),
                      height: Metrix.VerticalSize(50),
                      marginVertical: Metrix.VerticalSize(20),
                    }}>
                    <CustomButton
                      handleClick={() => {
                        setIsModalVisible(false);
                        setToggle(false);
                        updateList();
                      }}
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
                        onPress={() => {
                          const reason = item.name;
                          const fromUserId = user.id;
                          const toUserId = cardId;
                          const payload = {fromUserId, toUserId, reason};
                          setToggle(true);
                          setResonsTitle(item.name);
                          dispatch(AppAction.HandleReportData(payload));
                        }}
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
    </View>
  );
};

export default ImageSlider;
