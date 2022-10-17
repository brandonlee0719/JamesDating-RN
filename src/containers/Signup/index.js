import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {connect} from 'react-redux';
import {
  Button,
  Header,
  Forminput,
  ToastComponent,
  Loader,
} from '../../components';
import {Colors, Images, Metrix, showToast, ApiCaller} from '../../config';
import {AppAction} from '../../store/actions';
import styles from './styles';
import Feather from 'react-native-vector-icons/Feather';
import DropDown from '../../components/DropDown';
import RNFS, {stat} from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';
import navigationService from '../../config/navigationService';
const BaseUrl = `${ApiCaller.url}img/upload/`;
const whereImNow = [
  {id: 1, name: 'YES'},
  {id: 0, name: 'NO'},
];
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath:
        props.route.params !== undefined
          ? {uri: `${BaseUrl}${props.GetEditProfile.photo}`}
          : {},
      // Forms flags
      isAboutYourself: true,
      isPurpuseInApp: false,
      isEducationalBack: false,
      isAboutMe: false,
      isAlcoholeConsuption: false,
      isSexualeOrientation: false,
      isVaccine: false,
      isChildren: false,
      isQualityYouHave: false,
      isMyProfession: false,
      isPhysicalAppearence: false,
      isMyRelatioship: false,
      isChildren1: false,
      isAlcoholeConsuption1: false,
      isQualityYouHave1: false,
      isHobbies: false,
      isPersonality: false,
      isSign: false,
      // AboutYourSelf state
      userName:
        props.route.params !== undefined ? props.GetEditProfile.username : '',
      password:
        props.route.params !== undefined ? props.GetEditProfile.password : '',
      securePassowrd: true,
      email: props.route.params !== undefined ? props.GetEditProfile.email : '',
      profilePicture: null,
      name: props.route.params !== undefined ? props.GetEditProfile.name : '',
      age:
        props.route.params !== undefined ? `${props.GetEditProfile.age}` : '',
      selectedGender:
        props.GetEditProfile.gender == undefined
          ? ''
          : props.GetEditProfile.gender.name,
      selectedGenderId:
        props.GetEditProfile.gender == undefined
          ? null
          : props.GetEditProfile.gender.id,
      // purpose in app state
      lookingId:
        props.GetEditProfile.lookingGender == undefined
          ? null
          : props.GetEditProfile.lookingGender.id,
      lookingRelationShipArray:
        props.route.params !== undefined
          ? props.GetEditProfile.lookingRelations == null
            ? props.dropDownList.lookingRelation
            : props.GetEditProfile.lookingRelations
          : props.dropDownList.lookingRelation,
      lookingRelationIds:
        props.route.params !== undefined
          ? props.MultiSelectionIds.lookingRelation == null
            ? []
            : props.MultiSelectionIds.lookingRelation
          : [],
      // educational back state
      education: props.GetEditProfile.eduction,
      profession: props.GetEditProfile.profession,
      selectedAnuualIncome:
        props.GetEditProfile.annualIncome == undefined
          ? ''
          : props.GetEditProfile.annualIncome.name,
      selectedAnuualIncomeId:
        props.GetEditProfile.annualIncome == undefined
          ? null
          : props.GetEditProfile.annualIncome.id,
      // about me state
      aboutMe: props.GetEditProfile.aboutMe,
      aboutMeRelationship: props.GetEditProfile.last_relationship,
      // alchohole consuption state
      selectedAlcohole:
        props.GetEditProfile.alcoholConsumption == undefined
          ? null
          : props.GetEditProfile.alcoholConsumption.id,
      selectedSmoke:
        props.GetEditProfile.smoke == undefined
          ? ''
          : props.GetEditProfile.smoke.name,
      selectedSmokeId:
        props.GetEditProfile.smoke == undefined
          ? null
          : props.GetEditProfile.smoke.id,
      selectedFestiche:
        props.GetEditProfile.fetiches == undefined
          ? ''
          : props.GetEditProfile.fetiches.name,
      selectedFesticheId:
        props.GetEditProfile.fetiches == undefined
          ? null
          : props.GetEditProfile.fetiches.id,
      // sexual orientation state
      sexualId:
        props.GetEditProfile.sexualOrientation == undefined
          ? null
          : props.GetEditProfile.sexualOrientation.id,
      relationshipStatusId:
        props.GetEditProfile.relationshipStatus == undefined
          ? null
          : props.GetEditProfile.relationshipStatus.id,
      // vaccine state
      selectedVaccine:
        props.GetEditProfile.vaccine == undefined
          ? ''
          : props.GetEditProfile.vaccine.name,
      selectedVaccineId:
        props.GetEditProfile.vaccine == undefined
          ? null
          : props.GetEditProfile.vaccine.id,
      // children state
      selectedChildren:
        props.GetEditProfile.children == undefined
          ? null
          : props.GetEditProfile.children.id,
      // quality you have state
      selectedPersonality: '',
      selectedPersonalityArray:
        props.route.params !== undefined
          ? props.GetEditProfile.personalities == null
            ? props.dropDownList.personlity
            : props.GetEditProfile.personalities
          : props.dropDownList.personlity,
      personalityIds:
        props.route.params !== undefined
          ? props.MultiSelectionIds.personalities == null
            ? []
            : props.MultiSelectionIds.personalities
          : [],
      selectedQualitiesArray:
        props.route.params !== undefined
          ? props.GetEditProfile.qualities == null
            ? props.dropDownList.qualities
            : props.GetEditProfile.qualities
          : props.dropDownList.qualities,
      qualityIds:
        props.route.params !== undefined
          ? props.MultiSelectionIds.qualities == null
            ? []
            : props.MultiSelectionIds.qualities
          : [],
      // my profession state
      selectedProfessionId:
        props.GetEditProfile.myProfession == undefined
          ? null
          : props.GetEditProfile.myProfession.id,
      // physical appearance state
      height: props.GetEditProfile.height,
      selectedPhysicalTypeId:
        props.GetEditProfile.physicalType == undefined
          ? null
          : props.GetEditProfile.physicalType.id,
      selectedReligionId:
        props.GetEditProfile.religion == undefined
          ? null
          : props.GetEditProfile.religion.id,
      // hobbies state
      selectedHobbyArray:
        props.route.params !== undefined
          ? props.GetEditProfile.hobbies == null
            ? props.dropDownList.hobbies
            : props.GetEditProfile.hobbies
          : props.dropDownList.hobbies,
      selectedHobbyIds:
        props.route.params !== undefined
          ? props.MultiSelectionIds.hobbies == null
            ? []
            : props.MultiSelectionIds.hobbies
          : [],
      // personality state
      // sign state
      selectedSign:
        props.GetEditProfile.sign == undefined
          ? ''
          : props.GetEditProfile.sign.name,
      selectedSignId:
        props.GetEditProfile.sign == undefined
          ? null
          : props.GetEditProfile.sign.id,
      selectedGeoLocByDis:
        props.GetEditProfile.gelocationBydistance == undefined
          ? ''
          : props.GetEditProfile.gelocationBydistance.name,
      selectedGeoLocByDisId:
        props.GetEditProfile.gelocationBydistance == undefined
          ? null
          : props.GetEditProfile.gelocationBydistance.id,
      selectedLocation:
        props.GetEditProfile.whereamiknow == undefined
          ? ''
          : props.GetEditProfile.whereamiknow.name,
      selectedLocationId:
        props.GetEditProfile.whereamiknow == undefined
          ? null
          : props.GetEditProfile.whereamiknow.id,
      zipCode: props.GetEditProfile.zipcode,
      ageToggle: props.GetEditProfile.hideage,
    };
    this.update = this.update.bind(this);
  }
  componentDidMount = () => {
    // if (this.props.route.params !== undefined) {
    // }
  };
  update(nextState) {
    this.setState(nextState);
  }
  goBack = () => {
    navigationService.goBack();
  };
  selectFile = () => {
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
        alert(res.customButton);
      } else {
        let source = res.assets[0];
        this.setState({
          resourcePath: source,
        });
        ImageResizer.createResizedImage(source.uri, 720, 480, 'JPEG', 80).then(
          compression => {
            RNFS.readFile(compression.uri, 'base64').then(res => {
              this.setState({
                profilePicture: res,
              });
            });
          },
        );
        // let source = res.assets[0];
        // console.log('maiaj', this.state.resourcePath.uri);
      }
    });
  };
  checkValidateEmail = () => {
    this.props.validateEmail({
      username: this.state.userName,
      email: this.state.email,
    });
  };
  AboutYourSelf = () => {
    let {dropDownList} = this.props;
    return (
      <View>
        <ScrollView
          style={{marginBottom: Metrix.VerticalSize(60)}}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive">
          <Pressable onPress={this.selectFile} style={styles.imgView}>
            {this.state.resourcePath.uri ? (
              <View>
                <Image
                  source={{uri: this.state.resourcePath.uri}}
                  style={{width: 80, height: 80, borderRadius: 100}}
                />
                <Feather
                  name={'plus'}
                  color={Colors.White}
                  size={15}
                  style={styles.picPlusIcon}
                />
              </View>
            ) : (
              <>
                <Feather name={'camera'} color={Colors.White} size={26} />
                <View
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 50,
                    backgroundColor: Colors.Primary,
                    position: 'absolute',
                    right: 0,
                    bottom: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Feather name={'plus'} color={Colors.White} size={15} />
                </View>
              </>
            )}
          </Pressable>
          <View
            style={{
              marginTop: Metrix.VerticalSize(15),
              marginBottom: Metrix.VerticalSize(20),
            }}>
            <Text
              style={[
                styles.textStyle,
                {textAlign: 'center', marginBottom: Metrix.VerticalSize(30)},
              ]}>
              Profile Photo
            </Text>
            <Text style={styles.registerHeading}>About YourSelf</Text>
          </View>
          <View style={{marginBottom: Metrix.VerticalSize(15)}}>
            <Text style={styles.lookingFor}>User Name:</Text>
            <Forminput.TextField
              defaultValue={this.state.userName}
              placeholder="Enter your User name"
              keyboardType="email-address"
              returnKeyType="next"
              onChangeText={userName =>
                this.setState({userName}, () => this.checkValidateEmail())
              }
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.userImage}
              containerStyle={{}}
            />
          </View>
          <View style={{marginBottom: Metrix.VerticalSize(15)}}>
            <Text style={styles.lookingFor}>Password:</Text>
            <View
              style={{
                width: Metrix.HorizontalSize(300),
                height: Metrix.VerticalSize(45),
                borderWidth: Metrix.VerticalSize(1),
                borderColor: Colors.Primary,
                borderRadius: Metrix.LightRadius,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name={'lock'} color={'#949494'} size={15} />
              </View>
              <View style={{width: '70%'}}>
                <TextInput
                  defaultValue={this.state.password}
                  placeholder="Enter you password"
                  placeholderTextColor={Colors.PlaceColor}
                  onChangeText={password => this.setState({password})}
                  secureTextEntry={this.state.securePassowrd}
                  style={{}}
                />
              </View>
              <View
                style={{
                  width: '15%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Pressable
                  onPress={() =>
                    this.setState({securePassowrd: !this.state.securePassowrd})
                  }>
                  <Feather
                    name={this.state.securePassowrd ? 'eye-off' : 'eye'}
                    color={'#949494'}
                    size={15}
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <View style={{marginBottom: Metrix.VerticalSize(15)}}>
            <Text style={styles.lookingFor}>Email:</Text>
            <Forminput.TextField
              placeholder="Enter your Email"
              keyboardType="email-address"
              defaultValue={this.state.email}
              returnKeyType="next"
              onChangeText={email =>
                this.setState({email}, () => this.checkValidateEmail())
              }
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.userImage}
              containerStyle={{}}
            />
          </View>
          <View style={{marginBottom: Metrix.VerticalSize(15)}}>
            <Text style={styles.lookingFor}>Names for the James:</Text>

            <Forminput.TextField
              placeholder="Enter your name"
              keyboardType="email-address"
              defaultValue={this.state.name}
              onChangeText={name => this.setState({name})}
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.userImage}
              containerStyle={{}}
            />
          </View>
          <View style={{marginBottom: Metrix.VerticalSize(20)}}>
            <Text style={styles.lookingFor}>Age:</Text>

            <Forminput.TextField
              defaultValue={this.state.age}
              placeholder="Enter your Age"
              onChangeText={age => this.setState({age})}
              keyboardType="number-pad"
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.Gender}
              containerStyle={{}}
            />
          </View>
          <View style={{marginBottom: Metrix.VerticalSize(20)}}>
            <Text
              style={[
                styles.textStyle,
                {
                  color: Colors.Text,
                  fontSize: Metrix.FontSmall,
                  fontWeight: '700',
                  marginBottom: 15,
                },
              ]}>
              Gender:
            </Text>
            <DropDown
              id={'selectedGenderId'}
              stateValue={this.state.selectedGender}
              stateName={'selectedGender'}
              updateParent={this.update}
              props={{
                IconName: Images.GenderIcon,
                DropDownData: dropDownList.gender,
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  };
  // PurpuseInApp Logic
  LookingForSomeOne = item => {
    this.setState({
      lookingId: item.id,
    });
  };
  SelectLookinRelationShip = async (item, index) => {
    let RelationArray = this.state.lookingRelationShipArray;
    if (item.isSelectRelation) {
      delete RelationArray[index].isSelectRelation;
      this.setState({
        lookingRelationShipArray: RelationArray,
      });
    } else {
      Object.assign(RelationArray[index], {isSelectRelation: true});
      this.setState({
        lookingRelationShipArray: RelationArray,
      });
    }
    let filterSelected = this.state.lookingRelationShipArray.filter(
      item => item.isSelectRelation == true,
    );
    let filterId = filterSelected.map(item => item.id);
    await this.setState({
      lookingRelationIds: filterId,
    });
  };
  PurpuseInApp = () => {
    let {dropDownList} = this.props;
    return (
      <View style={styles.registerHeading}>
        <Text style={styles.registerHeading}>What is your purpose</Text>
        <Text style={styles.registerHeading}>in the app?</Text>
        <Text style={styles.lookingFor}>I'm Looking for :</Text>
        {/* buttons begin */}
        <View style={[styles.lookingForButton, {}]}>
          <FlatList
            numColumns={2}
            data={this.state.lookingRelationShipArray}
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
        <Text style={styles.lookingFor}>I'm Looking for :</Text>
        {/* select men & women begin  */}
        <FlatList
          numColumns={2}
          data={dropDownList.lookingGender}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => this.LookingForSomeOne(item)}
                style={styles.menWomen}>
                {/* <View style={styles.men}>
              <Text style={{fontWeight: 'bold', color: '#fff'}}>Men</Text>
            </View> */}
                <View
                  style={[
                    this.state.lookingId == item.id ? styles.men : styles.women,
                    {marginBottom: Metrix.VerticalSize(15)},
                  ]}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: this.state.lookingId == item.id ? '#fff' : '#000',
                    }}>
                    {item.name}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
        {/* select men & women end */}
      </View>
    );
  };
  EducationalBack = () => {
    let {dropDownList} = this.props;
    return (
      <View>
        <ScrollView>
          <Text style={styles.registerHeading}>Educational Background:</Text>
          <View style={{marginBottom: Metrix.VerticalSize(20), marginTop: 30}}>
            <Text style={styles.lookingFor}>Education:</Text>
            <Forminput.TextField
              placeholder="Enter your Qualification"
              keyboardType="email-address"
              defaultValue={this.state.education}
              onChangeText={education => this.setState({education})}
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.Education}
              containerStyle={{}}
            />
          </View>
          <View style={{marginBottom: Metrix.VerticalSize(20)}}>
            <Text style={styles.lookingFor}>Profession:</Text>
            <Forminput.TextField
              placeholder="Enter your Profession"
              keyboardType="email-address"
              defaultValue={this.state.profession}
              onChangeText={profession => this.setState({profession})}
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.userImage}
              containerStyle={{}}
            />
          </View>
          <View>
            <Text style={styles.lookingFor}>Annual Income:</Text>
            <DropDown
              id={'selectedAnuualIncomeId'}
              stateValue={this.state.selectedAnuualIncome}
              stateName={'selectedAnuualIncome'}
              updateParent={this.update}
              props={{
                DropDownData: dropDownList.annualIncome,
                IconName: Images.Income,
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  };
  AboutMe = () => {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.registerHeading}>About me:</Text>
          <View style={{marginBottom: Metrix.VerticalSize(20), marginTop: 30}}>
            <Text style={styles.lookingFor}>About me:</Text>
            <Forminput.TextArea
              placeholder="Write about you....."
              defaultValue={this.state.aboutMe}
              keyboardType="email-address"
              onChangeText={aboutMe => this.setState({aboutMe})}
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.About}
              containerStyle={{}}
            />
          </View>
          <View style={{marginBottom: Metrix.VerticalSize(20)}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: Colors.Black,
                marginBottom: 15,
              }}>
              what did'nt you like about your last relatioship?
            </Text>
            <Forminput.TextField
              // placeholder="Enter your Qualification"
              keyboardType="email-address"
              onChangeText={aboutMeRelationship =>
                this.setState({aboutMeRelationship})
              }
              defaultValue={this.state.aboutMeRelationship}
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.Relationship}
              containerStyle={{}}
            />
          </View>
        </ScrollView>
      </View>
    );
  };
  // Alcohole logic
  Alcohole = item => {
    this.setState({
      selectedAlcohole: item.id,
    });
  };
  AlcoholeConsuption = () => {
    let {dropDownList} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.AlcoholeConsuption}>
          <Text style={styles.registerHeading}>Alcohol Consuption:</Text>
          <View style={{marginTop: Metrix.VerticalSize(60)}}>
            {/* buttons begin */}
            <View style={styles.lookingForButton}>
              <FlatList
                numColumns={2}
                data={dropDownList.alcohol}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.Alcohole(item)}
                      style={[
                        styles.lookingForButtonWrapper,
                        {
                          backgroundColor:
                            this.state.selectedAlcohole == item.id
                              ? Colors.Primary
                              : Colors.White,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.lookingForButtonWrapperText,
                          {
                            color:
                              this.state.selectedAlcohole == item.id
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
          <Text style={styles.lookingFor}>Smokes:</Text>
          <DropDown
            id={'selectedSmokeId'}
            stateValue={this.state.selectedSmoke}
            stateName={'selectedSmoke'}
            updateParent={this.update}
            props={{
              IconName: Images.GenderIcon,
              DropDownData: dropDownList.smokes,
            }}
          />
          <View style={{marginBottom: 20}}>
            <Text style={styles.lookingFor}>Festiches:</Text>
            <DropDown
              id={'selectedFesticheId'}
              stateValue={this.state.selectedFestiche}
              stateName={'selectedFestiche'}
              updateParent={this.update}
              props={{
                IconName: Images.Festiches,
                DropDownData: dropDownList.fetches,
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  };
  // SexualeOrientation Logic
  sexualOrien = item => {
    this.setState({
      sexualId: item.id,
    });
  };
  relationshipStatus = item => {
    this.setState({
      relationshipStatusId: item.id,
    });
  };
  SexualeOrientation = () => {
    let {dropDownList} = this.props;
    return (
      <View>
        <Text style={styles.registerHeading}>SEXUAL ORIENTATION:</Text>
        <View style={{marginTop: Metrix.VerticalSize(26)}}>
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={dropDownList.sexualOrientation}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.sexualOrien(item)}
                    style={[
                      styles.lookingForButtonWrapper,
                      {
                        backgroundColor:
                          this.state.sexualId == item.id
                            ? Colors.Primary
                            : Colors.White,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.lookingForButtonWrapperText,
                        {
                          color:
                            this.state.sexualId == item.id
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
        <View style={{marginTop: Metrix.VerticalSize(26)}}>
          <Text style={styles.lookingFor}>Relationship Status:</Text>
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={dropDownList.relationshipStatus}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.relationshipStatus(item)}
                    style={[
                      styles.lookingForButtonWrapper,
                      {
                        backgroundColor:
                          this.state.relationshipStatusId == item.id
                            ? Colors.Primary
                            : Colors.White,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.lookingForButtonWrapperText,
                        {
                          color:
                            this.state.relationshipStatusId == item.id
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
      </View>
    );
  };
  Vaccine = () => {
    let {dropDownList} = this.props;
    return (
      <View>
        <Text style={styles.registerHeading}>Vaccine:</Text>
        <View style={{marginTop: Metrix.VerticalSize(10)}}>
          <Text style={styles.lookingFor}>Vaccine:</Text>
          <View style={{height: Metrix.VerticalSize(300)}}>
            <DropDown
              id={'selectedVaccineId'}
              stateValue={this.state.selectedVaccine}
              stateName={'selectedVaccine'}
              updateParent={this.update}
              props={{
                IconName: Images.syringe,
                DropDownData: dropDownList.vacine,
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  // children login
  child = item => {
    this.setState({
      selectedChildren: item.id,
    });
  };
  Children = () => {
    let {dropDownList} = this.props;
    return (
      <View>
        <Text style={styles.registerHeading}>Children?</Text>
        <Text style={styles.lookingFor}>Childrens:</Text>
        <FlatList
          numColumns={2}
          data={dropDownList.children}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[
                  styles.childrenBts,
                  {
                    backgroundColor:
                      this.state.selectedChildren == item.id
                        ? Colors.Primary
                        : Colors.White,
                    marginBottom: 10,
                  },
                ]}>
                <Pressable
                  onPress={() => this.child(item)}
                  style={[styles.childrenBtsText, {marginRight: 10}]}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color:
                        this.state.selectedChildren == item.id
                          ? Colors.White
                          : Colors.Black,
                    }}>
                    {item.name}
                  </Text>
                </Pressable>
              </TouchableOpacity>
            );
          }}
        />
        {/* <Pressable style={styles.childrenBtsTextNo}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>No</Text>
          </Pressable> */}
      </View>
    );
  };
  // Quality you have logic
  selectPersonality = async (item, index) => {
    let PerArray = this.state.selectedPersonalityArray;
    if (item.isSelectPer) {
      delete PerArray[index].isSelectPer;
      this.setState({
        selectedPersonalityArray: PerArray,
      });
    } else {
      Object.assign(PerArray[index], {isSelectPer: true});
      this.setState({
        selectedPersonalityArray: PerArray,
      });
    }
    let filterSelected = this.state.selectedPersonalityArray.filter(
      item => item.isSelectPer == true,
    );
    let filterId = filterSelected.map(item => item.id);
    await this.setState({
      personalityIds: filterId,
    });
  };
  selectQuality = async (item, index) => {
    let QuaArray = this.state.selectedQualitiesArray;
    if (item.isSelectQua) {
      delete QuaArray[index].isSelectQua;
      this.setState({
        selectedQualitiesArray: QuaArray,
      });
    } else {
      Object.assign(QuaArray[index], {isSelectQua: true});
      this.setState({
        selectedQualitiesArray: QuaArray,
      });
    }
    let filterSelected = this.state.selectedQualitiesArray.filter(
      item => item.isSelectQua == true,
    );
    let filterId = filterSelected.map(item => item.id);
    await this.setState({
      qualityIds: filterId,
    });
  };
  QualityYouHave = () => {
    let {dropDownList} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.registerHeading}>Qualities You Have</Text>
        <View style={styles.QualityYouHave}>
          <Text style={styles.lookingFor}>Personality:</Text>
          {/* <DropDown
            stateName={'selectedPersonality'}
            updateParent={this.update}
            props={{
              IconName: Images.Personalities,
              DropDownData: dropDownList.personlity,
            }}
          /> */}
          <View>
            <View style={{marginTop: Metrix.VerticalSize(10)}}>
              {/* buttons begin */}
              <View style={styles.lookingForButton}>
                <FlatList
                  numColumns={2}
                  data={this.state.selectedPersonalityArray}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.selectPersonality(item, index)}
                        style={[
                          styles.lookingForButtonWrapper,
                          {
                            backgroundColor: item.isSelectPer
                              ? Colors.Primary
                              : Colors.White,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.lookingForButtonWrapperText,
                            {
                              color: item.isSelectPer
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
          </View>
        </View>
        <Text style={styles.lookingFor}>Qualities:</Text>
        <View>
          <View style={{marginTop: Metrix.VerticalSize(10)}}>
            {/* buttons begin */}
            <View style={styles.lookingForButton}>
              <FlatList
                numColumns={2}
                data={this.state.selectedQualitiesArray}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.selectQuality(item, index)}
                      style={[
                        styles.lookingForButtonWrapper,
                        {
                          backgroundColor: item.isSelectQua
                            ? Colors.Primary
                            : Colors.White,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.lookingForButtonWrapperText,
                          {
                            color: item.isSelectQua
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
        </View>
      </ScrollView>
    );
  };
  // MyProfession Logic
  profession = item => {
    this.setState({
      selectedProfessionId: item.id,
    });
  };
  // My profession logib end
  MyProfession = () => {
    let {dropDownList} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.registerHeading}>MY PROFESSION</Text>
        <View style={{marginTop: Metrix.VerticalSize(20)}}>
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={dropDownList.myproffession}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.profession(item)}
                    style={[
                      styles.lookingForButtonWrapper,
                      {
                        backgroundColor:
                          this.state.selectedProfessionId == item.id
                            ? Colors.Primary
                            : Colors.White,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.lookingForButtonWrapperText,
                        {
                          color:
                            this.state.selectedProfessionId == item.id
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
        {/* <View style={{marginTop: Metrix.VerticalSize(25)}}>
          <Text style={styles.lookingFor}>Personality:</Text>
          <DropDown
            props={{
              IconName: Images.Personalities,
              DropDownData: dropDownList.personlity,
            }}
          />
        </View> */}
      </ScrollView>
    );
  };
  // Physical appearence Logic
  Appearence = item => {
    this.setState({
      selectedPhysicalTypeId: item.id,
    });
  };
  Religion = item => {
    this.setState({
      selectedReligionId: item.id,
    });
  };
  // Physical app logic ends
  PhysicalAppearence = () => {
    let {dropDownList} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.registerHeading}>Physical Appearence</Text>
        <View style={{marginBottom: Metrix.VerticalSize(20), marginTop: 30}}>
          <Text style={styles.lookingFor}>Height:</Text>
          <Forminput.TextField
            defaultValue={this.state.height}
            placeholder="Enter your Height"
            keyboardType="email-address"
            onChangeText={height => this.setState({height})}
            returnKeyType="next"
            autoCapitalize="none"
            blurOnSubmit={false}
            Icon={Images.HeightIcon}
            containerStyle={{}}
          />
        </View>
        <View>
          <Text style={styles.lookingFor}>Physical Type:</Text>
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={dropDownList.physicalType}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.Appearence(item)}
                    style={[
                      styles.lookingForButtonWrapper,
                      {
                        backgroundColor:
                          this.state.selectedPhysicalTypeId == item.id
                            ? Colors.Primary
                            : Colors.White,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.lookingForButtonWrapperText,
                        {
                          color:
                            this.state.selectedPhysicalTypeId == item.id
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
        {/* <View>
          <Text style={styles.lookingFor}>Body Art:</Text>
          <DropDown
            props={{IconName: Images.Idea, DropDownData: dropDownList.gender}}
          />
        </View> */}
        <View>
          <Text style={styles.lookingFor}>Religion:</Text>
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={dropDownList.religon}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.Religion(item)}
                    style={[
                      styles.lookingForButtonWrapper,
                      {
                        backgroundColor:
                          this.state.selectedReligionId == item.id
                            ? Colors.Primary
                            : Colors.White,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.lookingForButtonWrapperText,
                        {
                          color:
                            this.state.selectedReligionId == item.id
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
      </ScrollView>
    );
  };
  MyRelatioship = () => {
    let {dropDownList} = this.props;
    return (
      <View>
        <Text style={styles.registerHeading}>My Relatioship Status</Text>
        <View style={{marginTop: Metrix.VerticalSize(25)}}>
          <Text style={styles.lookingFor}>Physical Type:</Text>
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={dropDownList.relationshipStatus}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.lookingForButtonWrapper}>
                    <Text style={styles.lookingForButtonWrapperText}>
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
      </View>
    );
  };
  Children1 = () => {
    return (
      <View>
        <Text style={styles.registerHeading}>Childrens?</Text>
        <Text style={styles.lookingFor}>Childrens:</Text>
        <View style={styles.childrenBts}>
          <Pressable style={styles.childrenBtsText}>
            <Text style={{fontWeight: 'bold'}}>Yes</Text>
          </Pressable>
          <Pressable style={styles.childrenBtsTextNo}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>No</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  AlcoholeConsuption1 = () => {
    let {dropDownList} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.registerHeading}>Alcohol Consumption</Text>
        {/* <View style={{marginTop: Metrix.VerticalSize(35)}}>
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={dropDownList.alcohol}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.lookingForButtonWrapper}>
                    <Text style={styles.lookingForButtonWrapperText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <View style={{ marginTop: Metrix.VerticalSize(5) }}>
          <Text style={styles.lookingFor}>Smokes:</Text>
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={dropDownList.smokes}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.lookingForButtonWrapper}>
                    <Text style={styles.lookingForButtonWrapperText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View> */}
        <View>
          <Text style={styles.lookingFor}>Festiches:</Text>
          <DropDown props={{IconName: Images.Festiches}} />
        </View>
      </ScrollView>
    );
  };
  QualityYouHave1 = () => {
    let {dropDownList} = this.props;
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.registerHeading}>Qualities You Have:</Text>
          {/* <View style={{marginTop: 20}}>
            <Text style={styles.lookingFor}>Personality:</Text>
            <DropDown
              props={{
                IconName: Images.Personalities,
                DropDownData: dropDownList.personlity,
              }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.lookingFor}>Qualities:</Text>
            <DropDown
              props={{
                IconName: Images.Personalities,
                DropDownData: dropDownList.qualities,
              }}
            />
          </View> */}
          <View style={{marginTop: Metrix.VerticalSize(20)}}>
            <Text
              style={{
                fontSize: 19,
                color: Colors.Black,
                fontWeight: '700',
                marginBottom: Metrix.VerticalSize(15),
              }}>
              what did'nt you like about your last relatioship?
            </Text>

            <Forminput.TextField
              // placeholder="Enter your Qualification"
              keyboardType="email-address"
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.Relationship}
              containerStyle={{}}
            />
          </View>
        </ScrollView>
      </View>
    );
  };
  // Hobbies logic
  hobby = async (item, index) => {
    let hobbyArray = this.state.selectedHobbyArray;
    if (item.isSelectHobby) {
      delete hobbyArray[index].isSelectHobby;
      this.setState({
        selectedHobbyArray: hobbyArray,
      });
    } else {
      Object.assign(hobbyArray[index], {isSelectHobby: true});
      this.setState({
        selectedHobbyArray: hobbyArray,
      });
    }
    let filterSelected = this.state.selectedHobbyArray.filter(
      item => item.isSelectHobby == true,
    );
    let filterId = filterSelected.map(item => item.id);
    await this.setState({
      selectedHobbyIds: filterId,
    });
  };
  Hobbies = () => {
    let {dropDownList} = this.props;
    return (
      <View>
        <Text style={styles.registerHeading}>Hobbies</Text>
        <Text style={styles.lookingFor}>Select upto 5</Text>
        <View>
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={this.state.selectedHobbyArray}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.hobby(item, index)}
                    style={[
                      styles.lookingForButtonWrapper,
                      {
                        backgroundColor: item.isSelectHobby
                          ? Colors.Primary
                          : Colors.White,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.lookingForButtonWrapperText,
                        {
                          color: item.isSelectHobby
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
      </View>
    );
  };
  Personality = () => {
    let {dropDownList} = this.props;
    return (
      <View>
        <Text style={styles.registerHeading}>Personality</Text>
        <Text style={styles.lookingFor}>Select upto 5</Text>
        <View>
          {/* buttons begin */}
          <View style={styles.lookingForButton}>
            <FlatList
              numColumns={2}
              data={dropDownList.personlity}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.lookingForButtonWrapper}>
                    <Text style={styles.lookingForButtonWrapperText}>
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
      </View>
    );
  };
  Sign = () => {
    let {dropDownList} = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.registerHeading}>Sign</Text>
        <View style={styles.sign}>
          <Text style={styles.lookingFor}>Sign:</Text>
          <DropDown
            id={'selectedSignId'}
            stateValue={this.state.selectedSign}
            stateName={'selectedSign'}
            updateParent={this.update}
            props={{IconName: Images.SignIcon, DropDownData: dropDownList.sign}}
          />
          <View style={{}}>
            <Text style={styles.lookingFor}>zip code:</Text>
            {/* <DropDown props={{IconName: Images.Location3}} /> */}
            <Forminput.TextField
              placeholder="Zip code"
              defaultValue={this.state.zipCode}
              keyboardType="email-address"
              onChangeText={zipCode => this.setState({zipCode})}
              returnKeyType="next"
              autoCapitalize="none"
              blurOnSubmit={false}
              Icon={Images.ZipCode}
              containerStyle={{}}
            />
          </View>
          <Text style={styles.lookingFor}>Hide Age?</Text>
          <View
            style={{
              width: Metrix.HorizontalSize(300),
              height: Metrix.VerticalSize(45),
              borderWidth: Metrix.VerticalSize(1),
              borderColor: Colors.Primary,
              borderRadius: Metrix.LightRadius,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: Metrix.HorizontalSize(15),
            }}>
            <Text style={{color: Colors.PlaceColor}}>
              {this.state.ageToggle ? 'ON' : 'OFF'}
            </Text>
            <Pressable
              onPress={() => this.setState({ageToggle: !this.state.ageToggle})}
              style={{
                height: 15,
                width: 40,
                flexDirection: 'row',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.Primary,
              }}>
              <View
                style={{
                  width: '50%',
                  backgroundColor: this.state.ageToggle
                    ? Colors.White
                    : Colors.Gray,
                  borderTopRightRadius: this.state.ageToggle ? 0 : 15,
                  borderBottomRightRadius: this.state.ageToggle ? 0 : 15,
                  borderTopLeftRadius: 15,
                  borderBottomLeftRadius: 15,
                }}></View>
              <View
                style={{
                  width: '50%',
                  backgroundColor: Colors.Gray,
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  borderTopLeftRadius: this.state.ageToggle ? 15 : 0,
                  borderBottomLeftRadius: this.state.ageToggle ? 15 : 0,
                  backgroundColor: this.state.ageToggle
                    ? Colors.Primary
                    : Colors.White,
                  // borderRadius: 15,
                }}></View>
            </Pressable>
          </View>
          {/* Geolocation */}
          <Text style={styles.lookingFor}>Geolocation by distance:</Text>
          <DropDown
            id={'selectedGeoLocByDisId'}
            stateValue={this.state.selectedGeoLocByDis}
            stateName={'selectedGeoLocByDis'}
            updateParent={this.update}
            props={{IconName: Images.eye, DropDownData: whereImNow}}
          />
          {/* where */}
          <Text style={styles.lookingFor}>Where am I know:</Text>
          <DropDown
            id={'selectedLocationId'}
            stateValue={this.state.selectedLocation}
            stateName={'selectedLocation'}
            updateParent={this.update}
            props={{IconName: Images.Location3, DropDownData: whereImNow}}
          />
          {/* zip code */}
        </View>
      </ScrollView>
    );
  };
  BackForm = () => {
    let {
      isAboutYourself,
      isPurpuseInApp,
      isEducationalBack,
      isAboutMe,
      isAlcoholeConsuption,
      isSexualeOrientation,
      isVaccine,
      isChildren,
      isQualityYouHave,
      isMyProfession,
      isPhysicalAppearence,
      isMyRelatioship,
      isChildren1,
      isAlcoholeConsuption1,
      isQualityYouHave1,
      isHobbies,
      isPersonality,
      isSign,
    } = this.state;
    if (isPurpuseInApp) {
      this.setState({
        isAboutYourself: true,
        isPurpuseInApp: false,
      });
    } else if (isEducationalBack) {
      this.setState({
        isPurpuseInApp: true,
        isEducationalBack: false,
      });
    } else if (isAboutMe) {
      this.setState({
        isEducationalBack: true,
        isAboutMe: false,
      });
    } else if (isAlcoholeConsuption) {
      this.setState({
        isAboutMe: true,
        isAlcoholeConsuption: false,
      });
    } else if (isSexualeOrientation) {
      this.setState({
        isAlcoholeConsuption: true,
        isSexualeOrientation: false,
      });
    } else if (isVaccine) {
      this.setState({
        isSexualeOrientation: true,
        isVaccine: false,
      });
    } else if (isChildren) {
      this.setState({
        isVaccine: true,
        isChildren: false,
      });
    } else if (isQualityYouHave) {
      this.setState({
        isChildren: true,
        isQualityYouHave: false,
      });
    } else if (isMyProfession) {
      this.setState({
        isQualityYouHave: true,
        isMyProfession: false,
      });
    } else if (isPhysicalAppearence) {
      this.setState({
        isMyProfession: true,
        isPhysicalAppearence: false,
      });
    }
    //  else if (isMyRelatioship) {
    //   this.setState({
    //     isPhysicalAppearence: true,
    //     isMyRelatioship: false,
    //   });
    // } else if (isChildren1) {
    //   this.setState({
    //     isMyRelatioship: true,
    //     isChildren1: false,
    //   });
    // } else if (isAlcoholeConsuption1) {
    //   this.setState({
    //     isChildren1: true,
    //     isAlcoholeConsuption1: false,
    //   });
    // } else if (isQualityYouHave1) {
    //   this.setState({
    //     isAlcoholeConsuption1: true,
    //     isQualityYouHave1: false,
    //   });
    // }
    else if (isHobbies) {
      this.setState({
        isPhysicalAppearence: true,
        isHobbies: false,
      });
    }
    //  else if (isPersonality) {
    //   this.setState({
    //     isHobbies: true,
    //     isPersonality: false,
    //   });
    // }
    else if (isSign) {
      this.setState({
        isHobbies: true,
        isSign: false,
      });
    }
  };
  NextForm = () => {
    let {
      isAboutYourself,
      // start isAboutYourself
      userName,
      password,
      email,
      profilePicture,
      name,
      age,
      selectedGenderId,
      // ends isAboutYourself
      isPurpuseInApp,
      // start isPurpuseInApp
      lookingId,
      lookingRelationIds,
      // end isPurpuseInApp
      isEducationalBack,
      // start isEducationalBack
      education,
      profession,
      selectedAnuualIncomeId,
      // end isEducationalBack
      isAboutMe,
      // start isAboutMe
      aboutMe,
      aboutMeRelationship,
      // end isAboutMe
      isAlcoholeConsuption,
      // start isAlcoholeConsuption
      selectedAlcohole,
      selectedSmokeId,
      selectedFesticheId,
      // end isAlcoholeConsuption
      isSexualeOrientation,
      // start isSexualeOrientation
      sexualId,
      relationshipStatusId,
      // end isSexualeOrientation
      isVaccine,
      // start isVaccine
      selectedVaccineId,
      // end isVaccine
      isChildren,
      // start isChildren
      selectedChildren,
      // end isChildren
      isQualityYouHave,
      // start isQualityYouHave
      personalityIds,
      qualityIds,
      // end isQualityYouHave
      isMyProfession,
      // start isMyProfession
      selectedProfessionId,
      // end isMyProfession
      isPhysicalAppearence,
      // start isPhysicalAppearence
      height,
      selectedPhysicalTypeId,
      selectedReligionId,
      // end isPhysicalAppearence
      isMyRelatioship,
      isChildren1,
      isAlcoholeConsuption1,
      isQualityYouHave1,
      isHobbies,
      // start isHobbies
      selectedHobbyIds,
      // end isHobbies
      isPersonality,
      isSign,
      // start isSign
      zipCode,
      selectedSignId,
      selectedGeoLocByDisId,
      selectedLocationId,
      ageToggle,
      // end isSign
    } = this.state;
    if (isAboutYourself) {
      if (
        userName === '' ||
        name == '' ||
        age == '' ||
        password == '' ||
        email == '' ||
        selectedGenderId == ''
      ) {
        showToast('error', 'fields should not be empty');
      } else {
        if (this.props.vaalidateEmail == 'User available') {
          this.setState({
            isPurpuseInApp: true,
            isAboutYourself: false,
          });
        } else {
          showToast('error', `${this.props.vaalidateEmail}`);
        }
      }
    } else if (isPurpuseInApp) {
      this.setState({
        isEducationalBack: true,
        isPurpuseInApp: false,
      });
    } else if (isEducationalBack) {
      this.setState({
        isAboutMe: true,
        isEducationalBack: false,
      });
    } else if (isAboutMe) {
      this.setState({
        isAlcoholeConsuption: true,
        isAboutMe: false,
      });
    } else if (isAlcoholeConsuption) {
      this.setState({
        isSexualeOrientation: true,
        isAlcoholeConsuption: false,
      });
    } else if (isSexualeOrientation) {
      this.setState({
        isVaccine: true,
        isSexualeOrientation: false,
      });
    } else if (isVaccine) {
      this.setState({
        isChildren: true,
        isVaccine: false,
      });
    } else if (isChildren) {
      this.setState({
        isQualityYouHave: true,
        isChildren: false,
      });
    } else if (isQualityYouHave) {
      this.setState({
        isMyProfession: true,
        isQualityYouHave: false,
      });
    } else if (isMyProfession) {
      this.setState({
        isPhysicalAppearence: true,
        isMyProfession: false,
      });
    } else if (isPhysicalAppearence) {
      this.setState({
        isHobbies: true,
        isPhysicalAppearence: false,
      });
    } else if (isHobbies) {
      this.setState({
        isSign: true,
        isHobbies: false,
      });
    }
    //  else if (isPersonality) {
    //   this.setState({
    //     isSign: true,
    //     isPersonality: false,
    //   });
    // }
    else if (isSign) {
      let signUpData = {
        id: this.props.route.params !== undefined ? this.props.user.id : 0,
        username: userName,
        name: name,
        password: password,
        email: email,
        photo: profilePicture,
        age: parseInt(age, 10),
        genderId: selectedGenderId,
        lookingRelations: lookingRelationIds,
        lookingGenderId: lookingId,
        eduction: education,
        profession: profession,
        annualIncomeId: selectedAnuualIncomeId,
        aboutMe: aboutMe,
        last_relationship: aboutMeRelationship,
        alcoholConsumptionId: selectedAlcohole,
        smokeId: selectedSmokeId,
        fetichesId: selectedFesticheId,
        sexualOrientationId: sexualId,
        relationshipStatusId: relationshipStatusId,
        vaccineId: selectedVaccineId,
        childrenId: selectedChildren,
        personalities: personalityIds,
        qualities: qualityIds,
        myProfessionId: selectedProfessionId,
        height: height,
        physicalTypeId: selectedPhysicalTypeId,
        religionId: selectedReligionId,
        hobbies: selectedHobbyIds,
        signId: selectedSignId,
        zipcode: zipCode,
        hideage: ageToggle,
        gelocationBydistance: selectedGeoLocByDisId,
        whereamiknow: selectedLocationId,
      };
      if (this.props.route.params !== undefined) {
        this.props.updateProfile(signUpData);
      } else {
        this.props.signUp(signUpData);
      }
      console.log(signUpData);
    }
  };
  render() {
    let {
      isAboutYourself,
      isPurpuseInApp,
      isEducationalBack,
      isAboutMe,
      isAlcoholeConsuption,
      isSexualeOrientation,
      isVaccine,
      isChildren,
      isQualityYouHave,
      isMyProfession,
      isPhysicalAppearence,
      isMyRelatioship,
      isChildren1,
      isAlcoholeConsuption1,
      isQualityYouHave1,
      isHobbies,
      isPersonality,
      isSign,
    } = this.state;
    return (
      <View style={styles.container}>
        <Header.Standard
          bottomBorder={true}
          //   extraStyle={{backgroundColor: Colors.white}}
          // leftIconName={'arrow-left'}
          onPressLeft={() => this.goBack()}
          Heading={'Register'}
        />
        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          style={{width: '100%'}}> */}
        <View
          style={{
            height: Metrix.VerticalSize(640),
            width: '80%',
            alignSelf: 'center',
            marginTop: Metrix.VerticalSize(20),
          }}>
          {isAboutYourself
            ? this.AboutYourSelf()
            : isPurpuseInApp
            ? this.PurpuseInApp()
            : isEducationalBack
            ? this.EducationalBack()
            : isAboutMe
            ? this.AboutMe()
            : isAlcoholeConsuption
            ? this.AlcoholeConsuption()
            : isSexualeOrientation
            ? this.SexualeOrientation()
            : isVaccine
            ? this.Vaccine()
            : isChildren
            ? this.Children()
            : isQualityYouHave
            ? this.QualityYouHave()
            : isMyProfession
            ? this.MyProfession()
            : isPhysicalAppearence
            ? this.PhysicalAppearence()
            : isMyRelatioship
            ? this.MyRelatioship()
            : isChildren1
            ? this.Children1()
            : isAlcoholeConsuption1
            ? this.AlcoholeConsuption1()
            : isQualityYouHave1
            ? this.QualityYouHave1()
            : isHobbies
            ? this.Hobbies()
            : isPersonality
            ? this.Personality()
            : this.Sign()}
        </View>
        {/* </ScrollView> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '70%',
            alignSelf: 'center',
            height: Metrix.VerticalSize(60),
            marginTop: Metrix.VerticalSize(15),
          }}>
          {isAboutYourself ? (
            <View />
          ) : (
            <Button.Standard
              text="Back"
              onPress={this.BackForm}
              textStyle={{color: Colors.Text}}
              containerStyle={{
                alignSelf: 'center',
                // marginBottom: Metrix.VerticalSize(25),
                backgroundColor: Colors.White,
                borderWidth: 1,
                borderColor: Colors.Primary,
                width: 130,
              }}
            />
          )}
          <Button.Standard
            text="Next"
            textStyle={{color: Colors.White}}
            onPress={this.NextForm}
            containerStyle={{
              alignSelf: 'center',
              // marginBottom: Metrix.VerticalSize(25),
              width: isAboutYourself ? 250 : 130,
            }}
          />
        </View>
        <Loader isModalLoader={this.props.loading} />
      </View>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    signUp: payload => {
      dispatch(AppAction.SignUp(payload));
    },
    updateProfile: payload => {
      dispatch(AppAction.UpdateProfile(payload));
    },
    validateEmail: payload => {
      dispatch(AppAction.ValidateEmail(payload));
    },
  };
}
function mapStateToProps(state) {
  console.log(state);
  return {
    loading: state.AppReducer.loader,
    dropDownList: state.AppReducer.dropDownList,
    user: state.AppReducer.user,
    GetEditProfile: state.AppReducer.GetEditProfile,
    MultiSelectionIds: state.AppReducer.MultiSelectionIds,
    vaalidateEmail: state.AppReducer.validateEmail,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
