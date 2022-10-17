import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import styles from './styles';
import {Header, Loader} from '../../components';
import {Divider, Avatar} from 'react-native-paper';
import {Colors, Metrix, NavigationService, ApiCaller} from '../../config';
import navigationService from '../../config/navigationService';
import {connect} from 'react-redux';
import {AppAction} from '../../store/actions';
const BaseUrl = `${ApiCaller.url}img/upload/`;
export class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getChatList({id: this.props.user.id});
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      this.props.getChatList({id: this.props.user.id});
    });
  }
  emptyComponent = () => {
    return (
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
            No chats found
          </Text>
        </View>
      </View>
    );
  };
  render() {
    const chatList = [
      {
        id: 1,
        title: 'Matches',
        message: 2,
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7IlmcNZ2jQew0qK3B3Vz1ubBySsLqGuc3w&usqp=CAU',
      },
      {
        id: 2,
        message: 1,
        title: 'Likes',
        img: 'https://parade.com/.image/t_share/MTkwNTgxMDcwNzY3NzI4NTA4/cancer-super-survivors-instagram-jpg.jpg',
      },
      {
        id: 3,
        title: 'Who like me',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTE8fMQ2L7jGlH-6WaxgqWlKezBRkg9EomDw&usqp=CAU',
      },
      {
        id: 4,
        title: 'Matches',
        message: 2,
        img: 'https://media.glamour.com/photos/5904bde7d4bfc855b4ef8556/master/w_1080,h_1349,c_limit/allison-williams-no-makeup-insta.jpg',
      },
      {
        id: 5,
        message: 5,
        title: 'Likes',
        img: 'https://www.techgrama.in/wp-content/uploads/2021/06/best-dp-for-instagram.jpg',
      },
      {
        id: 6,
        title: 'Who like me',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFWr6uCYiXH-JLNPzcVkOoaD0Mkfx_C_yktg&usqp=CAU',
      },
      {
        id: 7,
        title: 'Matches',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7IlmcNZ2jQew0qK3B3Vz1ubBySsLqGuc3w&usqp=CAU',
      },
      {
        id: 8,
        title: 'Likes',
        img: 'https://parade.com/.image/t_share/MTkwNTgxMDcwNzY3NzI4NTA4/cancer-super-survivors-instagram-jpg.jpg',
      },
      {
        id: 9,
        title: 'Who like me',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTE8fMQ2L7jGlH-6WaxgqWlKezBRkg9EomDw&usqp=CAU',
      },
      {
        id: 10,
        title: 'Matches',
        img: 'https://media.glamour.com/photos/5904bde7d4bfc855b4ef8556/master/w_1080,h_1349,c_limit/allison-williams-no-makeup-insta.jpg',
      },
      {
        id: 11,
        title: 'Likes',
        img: 'https://www.techgrama.in/wp-content/uploads/2021/06/best-dp-for-instagram.jpg',
      },
      {
        id: 12,
        title: 'Who like me',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFWr6uCYiXH-JLNPzcVkOoaD0Mkfx_C_yktg&usqp=CAU',
      },
    ];
    let {ChatList} = this.props;
    return (
      <View style={styles.container}>
        {/* header begin*/}
        <Header.Standard
          //   extraStyle={{backgroundColor: Colors.white}}
          leftIconName={'arrow-back'}
          onPressLeft={() => NavigationService.goBack()}
          Heading={'Chats'}
          onPressRight={() => alert('clicked')}
          rightIconName={'notifications'}
          bgColor="transparent"
          iconColor="black"
        />
        {/* header end*/}
        {/* messages begin */}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.chats}>
          {ChatList.length == 0
            ? this.emptyComponent()
            : ChatList.map(item => (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigationService.navigate('Messages', {data: item})
                    }
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor:
                        item.unreadCount > 0 ? '#A7E9E9' : Colors.White,
                    }}>
                    <View style={styles.chatsWrapperMessages}>
                      <Avatar.Image
                        size={52}
                        source={{uri: `${BaseUrl}${item.photo}`}}
                      />
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={[
                            styles.chatsWrapperName,
                            item.message && {color: Colors.White},
                          ]}>
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.chatsWrapperMessage,
                            item.message && {color: Colors.White},
                          ]}>
                          {item.lastMessage}
                        </Text>
                        <Text
                          style={[
                            styles.chatsWrapperMessage,
                            item.message && {color: Colors.White},
                          ]}>
                          {item.timeStamp.slice(11, 16)}
                        </Text>
                      </View>
                    </View>
                    {item.unreadCount > 0 && (
                      <View
                        style={{marginHorizontal: Metrix.HorizontalSize(25)}}>
                        <Avatar.Text
                          size={35}
                          style={{backgroundColor: Colors.Primary}}
                          labelStyle={{fontWeight: '700', color: 'white'}}
                          label={item.unreadCount}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                  <View style={styles.chatsWrapperBottomBorder} />
                </>
              ))}
        </ScrollView>
        {/* messages end */}
        <Loader isModalLoader={this.props.loading} />
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getChatList: payload => {
      dispatch(AppAction.GetChatList(payload));
    },
  };
}
function mapStateToProps(state) {
  return {
    user: state.AppReducer.user,
    loading: state.AppReducer.loader,
    ChatList: state.AppReducer.ChatList,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
