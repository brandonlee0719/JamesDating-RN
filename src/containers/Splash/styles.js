import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrix } from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  // animation screen
  animation: {
    flex: 1,
    backgroundColor: Colors.White
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: Metrix.HorizontalSize(20),
    paddingVertical: Metrix.VerticalSize(40),
  },
  animationTopContainer: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerSignIn: {
    fontSize: 18,
    color: Colors.White
  },
  text: {
    fontSize: 40,
    width: Metrix.HorizontalSize(310),
    color: Colors.White,
    lineHeight: 60,
    // opacity: .9,
    // fontWeight:'700',
    fontFamily: Fonts['Montserrat-SemiBold'],
    // letterSpacing: 1,

  },
  animationBottomContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  animationLoginIcons: {
    marginVertical: Metrix.VerticalSize(20)
  },
});

export default styles;
