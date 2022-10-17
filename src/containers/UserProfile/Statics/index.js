import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';
import {Header, Loader} from '../../../components';
import {Images, Metrix} from '../../../config';
import navigationService from '../../../config/navigationService';
import {connect} from 'react-redux';
import {AppAction} from '../../../store/actions';
class Statics extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    this.props.getProfileStats({
      id: this.props.user.id,
    });
  };
  render() {
    let {ProfileStats} = this.props;
    return (
      <View style={styles.container}>
        <Header.Standard
          leftIconName={'arrow-back'}
          onPressLeft={() => navigationService.goBack()}
          Heading={'Profile'}
          rightIconName={'notifications'}
          greenCircle={true}
        />
        {/* main body begin */}
        <View style={styles.statics}>
          <View style={styles.staticsWrapper}>
            <Text style={[styles.staticsWrapperHeading, {marginLeft: 20}]}>
              Profile Statics
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.staticsStatus}>
              <View
                style={{
                  height: Metrix.VerticalSize(60),
                  width: Metrix.HorizontalSize(60),
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: '100%', width: '100%'}}
                  source={Images.SuperLike}
                />
              </View>
              <Text style={styles.staticsStatusCount}>
                {ProfileStats?.likes}
              </Text>
              <Text style={styles.staticsStatusDesc}>like</Text>
              <Text style={styles.staticsStatusBorderH}></Text>
              <Text style={styles.staticsStatusBorderW}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.staticsStatus}>
              <View
                style={{
                  height: Metrix.VerticalSize(60),
                  width: Metrix.HorizontalSize(60),
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: '100%', width: '100%'}}
                  source={Images.Like}
                />
              </View>
              <Text style={styles.staticsStatusCount}>
                {ProfileStats?.superlikes}
              </Text>
              <Text style={styles.staticsStatusDesc}>super like</Text>
              <Text style={styles.staticsStatusBorderW}></Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.staticsStatus}>
              <View
                style={{
                  height: Metrix.VerticalSize(60),
                  width: Metrix.HorizontalSize(60),
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: '100%', width: '100%'}}
                  source={Images.SEye}
                />
              </View>
              <Text style={styles.staticsStatusCount}>
                {ProfileStats?.views}
              </Text>
              <Text style={styles.staticsStatusDesc}>view</Text>
              <Text style={styles.staticsStatusBorderH}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.staticsStatus}>
              <View
                style={{
                  height: Metrix.VerticalSize(60),
                  width: Metrix.HorizontalSize(60),
                }}>
                <Image
                  resizeMode="contain"
                  style={{height: '100%', width: '100%'}}
                  source={Images.Dislike}
                />
              </View>
              <Text style={styles.staticsStatusCount}>
                {ProfileStats?.dislikes}
              </Text>
              <Text style={styles.staticsStatusDesc}>dislike</Text>
              <Text style={styles.staticsStatusBorderH}></Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* main body end */}
        <Loader isModalLoader={this.props.loading} />
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getProfileStats: payload => {
      dispatch(AppAction.GetProfileStats(payload));
    },
  };
}
function mapStateToProps(state) {
  return {
    loading: state.AppReducer.loader,
    user: state.AppReducer.user,
    ProfileStats: state.AppReducer.ProfileStats,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Statics);
