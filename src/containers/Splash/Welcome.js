import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Metrix} from '../../config';
import WelcomeSvg from '../../assets/images/welcome.png';
import navigationService from '../../config/navigationService';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerWrapper}>
        <Text style={styles.heading}>Welcome To</Text>
        <Text style={styles.heading}>James Club</Text>
        <View style={styles.svg}>
          <Image source={WelcomeSvg} />
        </View>
        <Text style={styles.lets}>Let's get to know your better</Text>
        <Text style={styles.purpose}>
          Our purpose is to connect people with the same goal as you, whatever
          it may be... love for a lifetime, a romance, a love for the better
          ages,a traveling companion, casual sex, ... join the James Club 248
          and be who you want to be !
        </Text>
        <TouchableOpacity
          onPress={() => navigationService.reset_0('Home')}
          style={styles.letsButton}>
          <Text style={styles.goButton}>Let's go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWrapper: {
    flex: 1,
    padding: Metrix.HorizontalSize(20),
    padding: Metrix.VerticalSize(40),
  },
  heading: {
    fontSize: 35,
    color: Colors.Primary,
    fontWeight: '700',
    letterSpacing: 2,
  },
  svg: {
    width: '100%',
    marginTop: Metrix.HorizontalSize(15),
  },
  lets: {
    fontSize: 20,
    lineHeight: Metrix.VerticalSize(80),
    color: Colors.Black,
  },
  purpose: {
    fontSize: 15.5,
    lineHeight: 22,
  },
  letsButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  goButton: {
    backgroundColor: Colors.Primary,
    width: '90%',
    padding: Metrix.HorizontalSize(12),
    borderRadius: 6,
    color: Colors.White,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
});

export default Welcome;
