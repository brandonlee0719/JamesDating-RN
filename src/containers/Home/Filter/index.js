import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {Component} from 'react';
import {styles} from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormInput from '../../../components/FormInput';
import CustomButton from '../../../components/CustomButton';
import {Colors, Images, Metrix, NavigationService} from '../../../config';
import DropDown from '../../../components/DropDown';
import {Forminput} from '../../../components';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {connect, Connect} from 'react-redux';
import {AppAction} from '../../../store/actions';
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      name: '',
      location: '',
      lookingForArray: props.dropDownList.lookingRelation,
      lookingIds: [],
      RelatioshipStatus: props.dropDownList.relationshipStatus,
      RelatioshipStatusIds: [],
      LookingGender: props.dropDownList.lookingGender,
      LookingGenderId: null,
      profession: '',
      selectedChildren: 'Select',
      selectedChildrenId: null,
      selectedSmoke: 'Select',
      selectedSmokeId: null,
      selectedSexual: 'Select',
      selectedSexualid: null,
      selectedBodyArt: 'Select',
      selectedBodyArtId: null,
      selectedReligion: 'Select',
      selectedReligionId: null,
      lat: '24.8698312',
      lng: '67.0783529',
      value: 0,
      startAge: 20,
      endAge: 40,
    };
    this.update = this.update.bind(this);
  }
  update(nextState) {
    this.setState(nextState);
  }
  CustomLabel(lable) {
    return <Text style={styles.FilterNameLabel}>{lable}</Text>;
  }
  SelectLookinRelationShip = async (item, index) => {
    let RelationArray = this.state.lookingForArray;
    if (item.isSelectRelation) {
      delete RelationArray[index].isSelectRelation;
      this.setState({
        lookingForArray: RelationArray,
      });
    } else {
      Object.assign(RelationArray[index], {isSelectRelation: true});
      this.setState({
        lookingForArray: RelationArray,
      });
    }
    let filterSelected = this.state.lookingForArray.filter(
      item => item.isSelectRelation == true,
    );
    let filterId = filterSelected.map(item => item.id);
    await this.setState({
      lookingIds: filterId,
    });
  };
  relationshipStatus = item => {
    this.setState({
      RelatioshipStatusIds: item.id,
    });
  };
  LookingForSomeOne = item => {
    this.setState({
      LookingGenderId: item.id,
    });
  };
  filterData = () => {
    let filterPayload = {
      myId: this.props.user.id,
      lat: this.state.lat,
      lng: this.state.lng,
      name: this.state.name,
      startAge: this.state.value == 0 ? 20 : this.state.value[0],
      endAge: this.state.value == 0 ? 40 : this.state.value[1],
      subscribedProfile: true,
      lookingforRelation: this.state.lookingIds,
      relationStatus:
        this.state.RelatioshipStatusIds.length == 0
          ? []
          : [this.state.RelatioshipStatusIds],
      lookingForGender: this.state.LookingGenderId,
      profession: this.state.profession,
      location: this.state.location,
      children: this.state.selectedChildrenId,
      smoke: this.state.selectedSmokeId,
      sexualOrientation: this.state.selectedSexualid,
      bodyArt: this.state.selectedBodyArtId,
      religion: this.state.selectedReligionId,
    };
    console.log(filterPayload);
    this.props.homeFilter(filterPayload);
  };
  enableScroll = () => this.setState({scrollEnabled: true});
  disableScroll = () => this.setState({scrollEnabled: false});
  render() {
    const CustomSliderMarkerLeft = e => {
      console.log('as', e);
      return (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: Metrix.HorizontalSize(50),
            height: Metrix.VerticalSize(80),
          }}>
          <Text
            style={{fontWeight: 'bold', color: Colors.Primary, fontSize: 17}}>
            {e.currentValue}
          </Text>
        </View>
      );
    };
    const CustomSliderMarkerRight = e => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: Metrix.HorizontalSize(50),
          height: Metrix.VerticalSize(80),
        }}>
        <Text style={{fontWeight: 'bold', color: Colors.Primary, fontSize: 17}}>
          {e.currentValue}
        </Text>
      </View>
    );
    let {dropDownList} = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.Filter} showsVerticalScrollIndicator={false}>
          <Pressable
            onPress={() => NavigationService.navigate('Home')}
            style={styles.FilterClose}>
            <Ionicons name="close" size={26} color={'black'} />
          </Pressable>
          <View style={styles.FilterNameContainer}>
            {this.CustomLabel('Name:')}
            <TextInput
              onChangeText={name => this.setState({name})}
              style={styles.FilterNameInput}
            />
          </View>
          {/* age between begin */}
          <View>
            {this.CustomLabel('Age Between:')}
            <MultiSlider
              markerStyle={{
                ...Platform.select({
                  ios: {
                    height: 30,
                    width: 30,
                    // shadowColor: '#000000',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowRadius: 1,
                    shadowOpacity: 0.1,
                  },
                  android: {
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    backgroundColor: '#1792E8',
                  },
                }),
              }}
              pressedMarkerStyle={{
                ...Platform.select({
                  android: {
                    height: 30,
                    width: 30,
                    borderRadius: 20,
                    backgroundColor: Colors.PrimaryLight,
                  },
                }),
              }}
              selectedStyle={{
                backgroundColor: Colors.Primary,
                borderWidth: 5,
                // borderRadius: 20,
                borderColor: Colors.Primary,
              }}
              trackStyle={{
                backgroundColor: Colors.PrimaryLight,
                borderWidth: 5,
                borderRadius: 7,
                borderColor: Colors.PrimaryLight,
              }}
              isMarkersSeparated={true}
              touchDimensions={{
                height: 40,
                width: 40,
                borderRadius: 20,
                slipDisplacement: 40,
              }}
              values={[this.state.startAge, this.state.endAge]}
              // sliderLength={280}
              onValuesChange={value => this.setState({value})}
              min={0}
              max={60}
              allowOverlap={false}
              containerStyle={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              markerContainerStyle={{
                backgroundColor: Colors.Primary,
                width: 20,
                height: 20,
                marginTop: 18,
                marginHorizontal: 10,
                borderRadius: 100,
              }}
              enableLabel={false}
              minMarkerOverlapDistance={10}
              customMarkerLeft={e => {
                return <CustomSliderMarkerLeft currentValue={e.currentValue} />;
              }}
              customMarkerRight={e => {
                return (
                  <CustomSliderMarkerRight currentValue={e.currentValue} />
                );
              }}
            />
            <View style={styles.filterByDefaultValue}>
              <Text
                style={{
                  color: Colors.Primary,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                18
              </Text>
              <Text
                style={{
                  color: Colors.Primary,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                60
              </Text>
            </View>
            {/* <MultiSlider
              isMarkersSeparated={true}
              selectedStyle={{
                backgroundColor: Colors.PrimaryLight,
                borderWidth: 3,
                borderColor: Colors.PrimaryLight,
              }}
              enabledTwo={true}
              showSteps={true}
              smoothSnapped={true}
              markerOffsetX={14}
              markerOffsetY={10}
              containerStyle={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              allowOverlap={true}
              markerSize={10}
              minMarkerOverlapDistance={130}
              enabledOne={true}
              max={50}
              enableLabel={true}
              markerContainerStyle={{
                backgroundColor: Colors.Primary,
                width: 30,
                height: 30,
                borderRadius: 100,
              }}
              min={0}
              step={1}
              customMarkerLeft={e => {
                this.getMarkerValue(e.currentValue);
                return <CustomSliderMarkerLeft currentValue={e.currentValue} />;
              }}
              customMarkerRight={e => {
                return (
                  <CustomSliderMarkerRight currentValue={e.currentValue} />
                );
              }}
            /> */}
          </View>
          {/* age between end */}

          {/* looking for begin */}
          <View>
            {this.CustomLabel('I' + "'" + 'm Looking for:')}
            {/* buttons begin */}
            <View style={styles.lookingForButton}>
              <FlatList
                numColumns={2}
                data={this.state.lookingForArray}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.SelectLookinRelationShip(item, index)}
                      style={[
                        styles.lookingForButtonWrapper,
                        {
                          backgroundColor: item.isSelectRelation
                            ? Colors.Primary
                            : Colors.White,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.lookingForButtonWrapperText,
                          {
                            color: item.isSelectRelation
                              ? Colors.White
                              : Colors.Black,
                          },
                        ]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item.id}
              />
            </View>
            {/* buttons end */}
          </View>
          {/* looking for end */}
          <View style={{height: 60, marginVertical: Metrix.VerticalSize(16)}}>
            <CustomButton
              customStyle={true}
              title="Discover Subscribe Profiles"
            />
          </View>
          {/* relationship status begin */}
          {this.CustomLabel('Relationship Status:')}
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={this.state.RelatioshipStatus}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.relationshipStatus(item)}
                    style={[
                      styles.lookingForButtonWrapper,
                      {
                        backgroundColor:
                          this.state.RelatioshipStatusIds == item.id
                            ? Colors.Primary
                            : Colors.White,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.lookingForButtonWrapperText,
                        {
                          color:
                            this.state.RelatioshipStatusIds == item.id
                              ? Colors.White
                              : Colors.Black,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          {/* buttons end */}
          {/* relationship status end */}

          {/* Looking for begin */}
          {this.CustomLabel('I' + "'" + 'm Looking for:')}
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={this.state.LookingGender}
              renderItem={({item, index}) => {
                return (
                  <Pressable
                    onPress={() => this.LookingForSomeOne(item)}
                    key={index}>
                    <View
                      style={[
                        styles.lookingForButtonWrapper,
                        item.id === this.state.LookingGenderId &&
                          styles.seleted,
                      ]}>
                      <Text
                        style={[
                          styles.lookingForButtonWrapperText,
                          item.id === this.state.LookingGenderId &&
                            styles.seletedText,
                        ]}>
                        {item.name}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          {/* buttons end */}
          {/* Looking for */}

          {/* profession begin */}
          <View>
            {this.CustomLabel('Profession:')}
            <Forminput.TextField
              onChangeText={profession => this.setState({profession})}
              placeholder="Enter your Profession"
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.userImage}
              containerStyle={{}}
            />
          </View>
          {/* profession end */}

          {/* Location begin */}
          <View>
            {this.CustomLabel('Location:')}
            <Forminput.TextField
              onChangeText={location => this.setState({location})}
              placeholder="Pakistan"
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.Location1}
              containerStyle={{}}
            />
          </View>
          {/* Location end */}

          {/* Children begin */}
          <View>
            {this.CustomLabel('Children:')}
            {/* <DropDown props={{IconName: Images.userImage}} /> */}
            <DropDown
              id={'selectedChildrenId'}
              stateValue={this.state.selectedChildren}
              stateName={'selectedChildren'}
              updateParent={this.update}
              props={{
                IconName: Images.userImage,
                DropDownData: dropDownList.children,
              }}
            />
          </View>
          {/* Location end */}

          {/* Smokes begin */}
          <View>
            {this.CustomLabel('Smokes:')}
            <DropDown
              id={'selectedSmokeId'}
              stateValue={this.state.selectedSmoke}
              stateName={'selectedSmoke'}
              updateParent={this.update}
              props={{
                IconName: Images.FSmoke,
                DropDownData: dropDownList.smokes,
              }}
            />
          </View>
          {/* Smokes end */}

          {/* Sexual Orientaion begin */}
          <View>
            {this.CustomLabel('Sexual Orientaion:')}
            <DropDown
              id={'selectedSexualid'}
              stateValue={this.state.selectedSexual}
              stateName={'selectedSexual'}
              updateParent={this.update}
              props={{
                IconName: Images.Sexual,
                DropDownData: dropDownList.sexualOrientation,
              }}
            />
          </View>
          {/* Sexual Orientaion end */}

          {/* Body Art begin */}
          <View>
            {this.CustomLabel('Body Art:')}
            <DropDown
              id={'selectedBodyArtId'}
              stateValue={this.state.selectedBodyArt}
              stateName={'selectedBodyArt'}
              updateParent={this.update}
              props={{
                IconName: Images.FIdea,
                DropDownData: dropDownList.physicalType,
              }}
            />
          </View>
          {/* Body Art end */}

          {/* Relationship Status begin */}
          {/* <View>
            {this.CustomLabel('Relationship Status:')}
            <DropDown props={{IconName: Images.FHeart}} />
          </View> */}
          {/* Relationship Status end */}

          {/* Religion begin */}
          <View>
            {this.CustomLabel('Religion:')}
            <DropDown
              id={'selectedReligionId'}
              stateValue={this.state.selectedReligion}
              stateName={'selectedReligion'}
              updateParent={this.update}
              props={{
                IconName: Images.Pray,
                DropDownData: dropDownList.religon,
              }}
            />
          </View>
          {/* Religion end */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 50,
            }}>
            <View
              style={{
                height: Metrix.VerticalSize(55),
                width: Metrix.HorizontalSize(140),
                elevation: 3,
                backgroundColor: '#fff',
                borderRadius: 10,
                marginLeft: Metrix.HorizontalSize(5),
              }}>
              <CustomButton
                bgColor="white"
                customStyle={true}
                textColor={Colors.Primary}
                title="Cancel"
                handleClick={() => NavigationService.navigate('Home')}
              />
            </View>
            <View style={{height: 55, width: '45%'}}>
              <CustomButton
                handleClick={() => this.filterData()}
                title="Update"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    loading: state.AppReducer.loader,
    dropDownList: state.AppReducer.dropDownList,
    user: state.AppReducer.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    homeFilter: payload => {
      dispatch(AppAction.HomeFilter(payload));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
