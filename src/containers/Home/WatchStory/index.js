import {Pressable, Text, View} from 'react-native';
import React, {Component} from 'react';
import {StoryContainer} from 'react-native-stories-view';
import navigationService from '../../../config/navigationService';
import {Colors, Images, Metrix, ApiCaller} from '../../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native-svg';
import {connect} from 'react-redux';
import {AppAction} from '../../../store/actions';

export class WatchStory extends Component {
  constructor() {
    super();
  }

  componentDidMount = () => {
    this.getStories();
  };
  getStories = () => {
    this.props.getstorymethod();
  };

  render() {
    const {navigation, route} = this.props;
    const data = route.params.data;
    const userId = route.params.userId;
    const addMore = route.params.addMore;
    return (
      <StoryContainer
        visible={true}
        enableProgress={true}
        progressIndex
        imageStyle={{
          width: Metrix.HorizontalSize(376),
          height: Metrix.VerticalSize(675),
        }}
        images={data.map(_i => `${ApiCaller.url}img/upload/${_i.photo}`)}
        duration={10}
        onComplete={() => navigationService.goBack()}
        footerComponent={
          userId.userId === this.props.user.id && (
            <Pressable
              onPress={() => addMore()}
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: Metrix.HorizontalSize(30),
                justifyContent: 'center',
                height: Metrix.VerticalSize(100),
              }}>
              <Ionicons
                name="camera-outline"
                color={'white'}
                size={30}
                style={{
                  backgroundColor: Colors.Primary,
                  padding: 17,
                  borderRadius: 100,
                }}
              />
            </Pressable>
          )
        }
        // replyView={{
        //     isShowReply: true,
        //     onReplyTextChange: (textReply, progressIndex) => {
        //         console.log(`Text : ${textReply} , position : ${progressIndex}`);
        //     },
        //     onReplyButtonClick: (buttonType, progressIndex) => {
        //         switch (buttonType) {
        //             case 'send':
        //                 console.log(`Send button tapped for position : ${progressIndex}`);
        //                 break;

        //             case 'smiley':
        //                 userId.userId === this.props.user.id && addMore()
        //                 break;
        //         }
        //     },
        // }}
        userProfile={{
          userImage: Images.Bg1,
          userName: userId.name,
          userMessage: 'Work hard & success will follow !!',
          imageArrow: Images.ArrowBack,
          onImageClick: () => {
            navigationService.goBack();
          },
        }}
        barStyle={{
          barActiveColor: Colors.Gray,
          barInActiveColor: Colors.DarkGray,
          barWidth: 100,
          barHeight: 4,
        }}
        containerStyle={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getstorymethod: payload => {
      dispatch(AppAction.GetStoryMethod(payload));
    },
  };
}

function mapStateToProps(state) {
  console.log(state, 'statete');
  return {
    user: state.AppReducer.user,
    getAllStories: state.AppReducer.getAllStories,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchStory);
