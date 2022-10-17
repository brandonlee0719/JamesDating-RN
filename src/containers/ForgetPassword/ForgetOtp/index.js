import {View, Text, Image, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import {Header, Loader} from '../../../components';
import navigationService from '../../../config/navigationService';
import {ApiCaller, Colors, Images} from '../../../config';
import CustomButton from '../../../components/CustomButton';
import axios from 'axios';

const ForgetOtp = ({route}) => {
  const {email} = route.params;

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleNavigate = () => {
    navigationService.navigate('SignIn');
  };

  const handleReset = async () => {
    let payload = {email, code, password: newPassword};
    try {
      setLoading(true);
      const res = await axios.post(
        `https://jamclub.pixtechcreation.com/api/Default/ResetPassword?email=${payload.email}&code=${payload.code}&password=${payload.password}`,
      );
      setLoading(false);
      res.data.status === 1 && handleNavigate();
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Header.Standard
          leftIconName={'arrow-back'}
          onPressLeft={navigationService.goBack}
          Heading={
            <View>
              <Image source={Images.FLogo} resizeMode="contain" />
            </View>
          }
        />
        {/* body begin */}
        <View style={styles.ForgetOtp}>
          <View style={styles.ForgetPasswordInputContainer}>
            <Text
              style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                color: Colors.Black,
              }}>
              Create New Password
            </Text>
          </View>
          <View style={styles.ForgetPasswordInputContainer}>
            <TextInput
              editable={false}
              selectTextOnFocus={false}
              value={email}
              placeholder="E-mail address"
              placeholderTextColor={Colors.PlaceColor}
              style={styles.ForgetPasswordInput}
            />
          </View>
          <View style={styles.ForgetPasswordInputContainer}>
            <TextInput
              onChangeText={e => setCode(e)}
              placeholder="Code"
              placeholderTextColor={Colors.PlaceColor}
              style={styles.ForgetPasswordInput}
            />
          </View>
          <View style={styles.ForgetPasswordInputContainer}>
            <TextInput
              onChangeText={e => setNewPassword(e)}
              placeholder="New Password"
              placeholderTextColor={Colors.PlaceColor}
              style={styles.ForgetPasswordInput}
            />
          </View>
          <View style={[styles.save, styles.ForgetPasswordInputContainer]}>
            <CustomButton handleClick={() => handleReset()} title="Save" />
          </View>
        </View>
        {/* body end */}
      </ScrollView>
      <Loader isModalLoader={loading} />
    </>
  );
};

export default ForgetOtp;
