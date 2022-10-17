import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  content: {
    flex: 1,
    paddingBottom: Metrix.VerticalSize(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    // width: Metrix.HorizontalSize(320),
    height: Metrix.VerticalSize(90),
    marginRight: Metrix.VerticalSize(30),
    marginTop: Metrix.VerticalSize(10),
  },
  imageWrapper: {
    width: Metrix.HorizontalSize(340),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  welcomeHeading: {
    width: Metrix.HorizontalSize(340),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: Metrix.VerticalSize(30),
  },
  back: {
    fontSize: 18,
    fontWeight: '200',
    color: Colors.Black,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: '700',
    color: Colors.Black,
  },
  socialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: Metrix.HorizontalSize(210),
    marginTop: Metrix.VerticalSize(30),
  },
  socialIconsWrapper: {
    width: Metrix.HorizontalSize(32),
    height: Metrix.HorizontalSize(37),
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Gray,
  },
  socialIconsImgFb: {
    width: Metrix.HorizontalSize(32),
    height: Metrix.HorizontalSize(37),
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Gray,
  },

  socialIconsImg: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },

  or: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Metrix.HorizontalSize(280),
    margin: Metrix.VerticalSize(30),
  },
  OrText: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.Black,
  },
  orLeft: {
    width: Metrix.HorizontalSize(110),
    backgroundColor: Colors.Black,
    height: Metrix.VerticalSize(2.4),
  },
  orRight: {
    width: Metrix.HorizontalSize(110),
    backgroundColor: Colors.Black,
    height: Metrix.VerticalSize(2.4),
  },
  headingStyle: {
    fontSize: Metrix.FontLarge,
    fontFamily: Fonts['Montserrat-Bold'],
    color: Colors.Text,
    // marginTop: Metrix.VerticalSize(52),
    letterSpacing: 0.77,
  },
  inputContainer: {
    width: Metrix.HorizontalSize(275),
    backgroundColor: Colors.Gray,
    borderRadius: 6,
    marginBottom: Metrix.VerticalSize(20),
  },
  inputContainerInput: {
    fontWeight: '900',
    paddingLeft: Metrix.VerticalSize(20),
    height: Metrix.VerticalSize(56),
    width: Metrix.HorizontalSize(298),
    // color:'red',asd
    fontSize: 19,
  },
  loginWithEmail: {
    width: Metrix.VerticalSize(298),
    height: Metrix.VerticalSize(56),
    backgroundColor: Colors.Primary,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: Metrix.HorizontalSize(13),
  },
  loginWithEmailText: {
    fontSize: 18,
    color: Colors.White,
  },
  forgetPassText: {
    fontSize: 18,
    fontFamily: Fonts['Montserrat-Regular'],
    color: Colors.Black,
    marginTop: Metrix.VerticalSize(25),
    // textDecorationLine: 'underline',
    letterSpacing: 0.42,
  },
  SignUpButton: {
    fontSize: 18,
    fontFamily: Fonts['Montserrat-Regular'],
    color: Colors.Black,
    marginTop: Metrix.VerticalSize(25),
    textDecorationLine: 'underline',
    letterSpacing: 0.42,
  },
});

export default styles;
