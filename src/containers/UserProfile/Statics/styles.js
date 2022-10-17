import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../../config';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    flex: 1,
  },
  statics: {
    // marginHorizontal: Metrix.HorizontalSize(20),
    paddingVertical: Metrix.VerticalSize(10),
  },
  staticsWrapper: {
    marginVertical: Metrix.VerticalSize(30),
  },
  staticsWrapperHeading: {
    fontSize: 18,
    color: Colors.Black,
    opacity: 0.6,
    fontFamily: Fonts['Poppins-Black'],
  },
  staticsStatus: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrix.HorizontalSize(187.5),
    height: Metrix.VerticalSize(200),
  },
  staticsStatusBorderH: {
    position: 'absolute',
    right: 0,
    height: 130,
    opacity: 0.2,
    borderWidth: 0.7,
  },
  staticsStatusBorderW: {
    position: 'absolute',
    bottom: 0,
    height: 1,
    width: 140,
    opacity: 0.2,
    borderWidth: 0.7,
  },
  staticsStatusBorderWs: {
    position: 'absolute',
    bottom: 0,
    height: 0,
    width: 0,
    opacity: 0.2,
    borderWidth: 0.7,
  },
  staticsStatusCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.Black,
    paddingTop: 10,
  },
  staticsStatusDesc: {
    color: Colors.Primary,
    fontWeight: '700',
  },
});
