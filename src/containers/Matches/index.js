import {FlatList, Pressable, ScrollView, Text, View, Image} from 'react-native';
import React, {Component} from 'react';
import styles from './styles';
import {Header, Loader} from '../../components';
import CustomCard from '../../components/CustomCard';
import {Metrix, Colors} from '../../config';
import {connect, Connect} from 'react-redux';
import {AppAction} from '../../store/actions';
import navigationService from '../../config/navigationService';
export class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      // console.log(this.props.SaveHomeDataReducer, 'reducer home filter data');
      this.props.getMatches({id: this.props.user.id});
    });
  }
  emptyComponet = () => {
    return (
      <View
        style={{
          height: 590,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{height: 120, width: 120}}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../../assets/images/NodataFound.png')}
          />
          <Text
            style={{marginTop: 10, color: Colors.Primary, textAlign: 'center'}}>
            No Record found
          </Text>
        </View>
      </View>
    );
  };
  render() {
    let {GetMatchesList, GetLikesList, GetLikeMeList} = this.props;
    const buttonList = [
      {
        id: 1,
        title: 'Matches',
      },
      {
        id: 2,
        title: 'Likes',
      },
      {
        id: 3,
        title: 'Who like me',
      },
    ];
    const matchesList = [
      {
        id: 1,
        title: 'Matches',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7IlmcNZ2jQew0qK3B3Vz1ubBySsLqGuc3w&usqp=CAU',
      },
      {
        id: 2,
        title: 'Likes',
        img: 'https://cdn1.vectorstock.com/i/1000x1000/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
      },
      {
        id: 3,
        title: 'Who like me',
        img: 'https://cdn1.vectorstock.com/i/1000x1000/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg',
      },
      {
        id: 4,
        title: 'Matches',
        img: 'https://media.glamour.com/photos/5904bde7d4bfc855b4ef8556/master/w_1080,h_1349,c_limit/allison-williams-no-makeup-insta.jpg',
      },
    ];
    return (
      <>
        <Header.Standard
          //   extraStyle={{backgroundColor: Colors.white}}
          leftIconName={'grid'}
          onPressLeft={() => navigationService.navigate('UserProfile')}
          Heading={'Matches'}
          rightIconName={'notifications'}
          greenCircle={true}
        />

        <View style={styles.container}>
          <View style={styles.matches}>
            <View style={styles.matchesTabs}>
              {/* tabs begin */}
              {buttonList.map(_i => (
                <Pressable
                  key={_i.id}
                  onPress={() => this.setState({active: _i.id})}>
                  <Text
                    style={
                      this.state.active === _i.id
                        ? styles.matchesTabsTitleActive
                        : styles.matchesTabsTitle
                    }>
                    {_i.title}
                  </Text>
                </Pressable>
              ))}
              {/* tabs end */}
            </View>
            {/* card begin */}
            {/* <CustomCard /> */}
            {/* card end */}

            <FlatList
              // contentContainerStyle={{
              //   justifyContent: 'center',
              //   alignItems: 'center',
              // }}
              height={590}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              ListEmptyComponent={this.emptyComponet}
              data={
                this.state.active === 1
                  ? GetMatchesList
                  : this.state.active === 2
                  ? GetLikesList
                  : GetLikeMeList
              }
              renderItem={({item}) => (
                <CustomCard item={item} dummyImage={matchesList[2].img} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
          <Loader isModalLoader={this.props.loading} />
        </View>
      </>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getMatches: payload => {
      dispatch(AppAction.GetMatches(payload));
    },
  };
}
function mapStateToProps(state) {
  console.log(state);
  return {
    loading: state.AppReducer.loader,
    user: state.AppReducer.user,
    GetMatchesList: state.AppReducer.GetMatchesList,
    GetLikesList: state.AppReducer.GetLikesList,
    GetLikeMeList: state.AppReducer.GetLikeMeList,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Matches);
