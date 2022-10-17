import { Dimensions, StyleSheet } from 'react-native';
import {Colors, Metrix} from '../../../../config';
const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};
export default StyleSheet.create({
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: .4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    // marginTop: -350,
    zIndex:99,
    height: dimensions.height - 500,
  },
  remoteContainer: {
    height: 500,
    position: 'absolute',
    top: -180,
  },
  remote: {
    width: 400,
    height: 500,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
  roleText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.Black,
  },
  dummyFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streamDetailTop: {
    // flex: 1,
    marginHorizontal: Metrix.HorizontalSize(20),
    height: Metrix.VerticalSize(80),
    // paddingVertical: Metrix.VerticalSize(10),
  },
  userDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetailImage: {
    width: Metrix.HorizontalSize(53),
    height: Metrix.VerticalSize(59),
    borderRadius: 100,
  },
  userDetailId: {
    fontWeight: 'bold',
    color: Colors.White,
    fontSize: 18,
    letterSpacing: 0.6,
  },
  iconText: {
    color: Colors.White,
    fontWeight: '700',
  },
  streamDetailCenter: {
    flex: 1.5,
    marginHorizontal: Metrix.HorizontalSize(20),
    marginBottom: -20,
    paddingVertical: Metrix.VerticalSize(10),
  },
  streamDetailBottom: {
    flex: 3,
    marginHorizontal: Metrix.HorizontalSize(20),
    // paddingVertical: Metrix.VerticalSize(10),
  },
  streamDetailCoins: {
    flex: 4,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingRight: Metrix.HorizontalSize(10),
  },

  streamDetailCoinsWrapper: {
    opacity: 0.7,
    borderRadius: 7,
    width: Metrix.HorizontalSize(45),
    height: Metrix.VerticalSize(50),
    backgroundColor: '#707070',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streamDetailIcon: {
    width: 20,
    height: 20,
  },
  streamDetailBottomComment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streamDetailBottomInput: {
    backgroundColor: '#707070',
    flex: 3,
    borderRadius: 8,
    fontSize: 16,
    height: Metrix.VerticalSize(46),
    paddingHorizontal: Metrix.HorizontalSize(16),
  },
  streamDetailBottomSend: {
    backgroundColor: Colors.Primary,
    flex: 1,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrix.VerticalSize(46),
  },
  backgroundVideo: {
    width: Metrix.HorizontalSize(300),
    height: Metrix.VerticalSize(300),
  },
});