import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';
import {Header} from '../../../components';
import {Colors, Images, Metrix} from '../../../config';
import PlayButton from '../../../assets/images/streaming/play.svg';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../../../config/navigationService';
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {connect} from 'react-redux';
import {AppAction} from '../../../store/actions';
export class Streaming extends Component {
  constructor(props) {
    super(props);
    // Streaming data begin
    this.state = {
      items: [
        {
          category: [
            {
              status: 'Trending Categories',
              trending: [
                {
                  id: 1,
                  name: 'Romaguera-Crona',
                  icon: true,
                  img: Images.StreamCard2,
                },
                {
                  id: 2,
                  name: 'Romaguera-Crona2',
                  icon: true,
                  img: Images.StreamCard1,
                },
                {
                  id: 2,
                  name: 'Romaguera-Crona2',
                  icon: true,
                  img: Images.StreamCard4,
                },
              ],
            },
          ],
        },
        {
          category: [
            {
              status: 'Game Live',
              trending: [
                {
                  id: 1,
                  name: 'Romaguera-Crona',
                  icon: false,
                  img: Images.StreamCard1,
                },
                {
                  id: 2,
                  name: 'Romaguera-Crona2',
                  icon: false,
                  img: Images.StreamCard2,
                },
                {
                  id: 3,
                  name: 'Romaguera-Crona2',
                  icon: false,
                  img: Images.StreamCard3,
                },
                {
                  id: 4,
                  name: 'Romaguera-Crona2',
                  icon: false,
                  img: Images.StreamCard4,
                },
              ],
            },
          ],
        },
        {
          category: [
            {
              status: 'Trending Categories',
              trending: [
                {
                  id: 1,
                  name: 'Romaguera-Crona',
                  icon: true,
                  img: Images.StreamCard2,
                  hot: true,
                },
                {
                  id: 2,
                  name: 'Romaguera-Crona2',
                  icon: true,
                  img: Images.StreamCard1,
                  hot: true,
                },
                {
                  id: 2,
                  name: 'Romaguera-Crona2',
                  icon: true,
                  img: Images.StreamCard4,
                  hot: true,
                },
              ],
            },
          ],
        },
      ],
    };
    // Streaming data end
  }
  goToLiveStremDetail = params => {
    // navigationService.navigate('StreamDetail', {type: params});
    // join stream
    // this.props.joinStream({
    //   // stream id and user id
    //   id : id,
    //   userId : this.props.user.id
    // })
    // navigationService.navigate('StreamDetail', {
    //   type: 'create',
    //   channel: uuid(),
    // });
  };
  componentDidMount = () => {
    // get live stremas
    // this.props.getLiveStreams({
    //   userId : this.props.user.id
    // })
  };
  // after create stream update component for start stream
  //satrt stream
  startStream = params => {
    navigationService.navigate('StreamDetail', {type: params});
    // this.props.startNewStream({
    //   // stream id
    //   id : id
    // })
  };
  // create stream
  createStream = () => {
    let streamData = {
      title: 'New stream test 1',
      banner: 'base 64',
      category: 'N/A',
      userId: this.props.user.id,
    };
    this.props.createLiveStream(streamData);
  };

  render() {
    const data = this.state.items;
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.Streaming}>
          <Header.Standard
            //   extraStyle={{backgroundColor: Colors.white}}
            leftIconName={'arrow-back'}
            onPressLeft={() => navigationService.goBack()}
            Heading={'Video Streaming'}
            bgColor="transparent"
            iconColor="black"
            greenCircle={true}
          />
          <Text
            onPress={() => this.startStream('Host')}
            style={{marginBottom: 20}}>
            Start strem
          </Text>
          {data.map(i => {
            const cdata = i.category;
            const category = i.category[0].status;
            console.log(category);
            return (
              <>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.StreamingWrapper}>
                  {cdata[0].trending.map(c => (
                    <Pressable
                      onPress={() => this.goToLiveStremDetail('audience')}>
                      <View>
                        <ImageBackground
                          imageStyle={{borderRadius: 10}}
                          source={c.img}
                          style={[
                            styles.StreamingVideo,
                            c.icon === false && styles.StreamingGames,
                          ]}>
                          {c.icon === true && (
                            <LinearGradient
                              colors={['rgba(0,0,0,.4)', 'rgba(0,0,0,.5)']}
                              style={styles.linearGradient}>
                              {c.hot && (
                                <View style={styles.StreamingVideoHot}>
                                  <Text style={styles.StreamingVideoHotText}>
                                    Hot
                                  </Text>
                                </View>
                              )}
                            </LinearGradient>
                          )}
                        </ImageBackground>
                        {c.icon === true && (
                          <View style={styles.StreamingVideoIcon}>
                            <PlayButton height={41} width={48} />
                          </View>
                        )}
                        {/* play button end */}
                      </View>
                    </Pressable>
                  ))}
                </ScrollView>
                <Text style={styles.categoryTitle}>{category}</Text>
              </>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getLiveStreams: payload => {
      dispatch(AppAction.GetLiveStreams(payload));
    },
    createLiveStream: payload => {
      dispatch(AppAction.CreateLiveStream(payload));
    },
    startNewStream: payload => {
      dispatch(AppAction.StartNewStream(payload));
    },
    joinStream: payload => {
      dispatch(AppAction.JoinStream(payload));
    },
  };
}
function mapStateToProps(state) {
  return {
    user: state.AppReducer.user,
    loading: state.AppReducer.loader,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Streaming);
