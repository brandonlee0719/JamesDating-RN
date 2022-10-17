import {StyleSheet} from 'react-native';
import {Colors, Metrix} from '../../../config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // flex row

  dummyFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // header
  header: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrix.VerticalSize(100),
  },
  headerWrapper: {
    backgroundColor: '#FFFFFF',
    width: Metrix.HorizontalSize(320),
    height: Metrix.VerticalSize(60),
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrix.HorizontalSize(10),
  },
  headerWrapperLeftContainer: {
    width: Metrix.HorizontalSize(110),
  },
  headerWrapperTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: Colors.Black,
  },
  headerWrapperStatus: {
    color: '#14B82F',
  },

  headerWrapperRightContainer: {
    width: Metrix.HorizontalSize(110),
  },

  // All Messages
  AllMessages: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  AllMessagesWrapper: {
    width: Metrix.HorizontalSize(300),
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: Metrix.VerticalSize(10),
  },
  message: {
    backgroundColor: Colors.Primary,
    marginHorizontal: Metrix.HorizontalSize(15),
    paddingHorizontal: Metrix.HorizontalSize(10),
    paddingVertical: Metrix.VerticalSize(10),
    color: Colors.White,
    fontWeight: '700',
    opacity: 0.8,
    borderRadius: 7,
    fontSize: 17,
  },
  time: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    textAlign: 'center',
    width: 150,
  },
  timeText: {
    color: '#CBCBCB',
  },
  // bottom input
  BottomInput: {
    height: Metrix.VerticalSize(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomInputWrapper: {
    height: Metrix.VerticalSize(60),
    width: Metrix.HorizontalSize(300),
    paddingHorizontal: 10,
  },
  BottomInputLeftContainer: {
    flex: 5,
    opacity: 0.7,
    borderRadius: 7,
    height: Metrix.VerticalSize(45),
  },
  BottomInputLeftContainerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    paddingHorizontal: 10,
  },
  BottomInputLeftContainerInputText: {
    fontWeight: '700',
    fontSize: 17,
    paddingLeft: 10,
  },
  BottomInputRightContainer: {
    flex: 1,
    borderRadius: 7,
    alignSelf: 'center',
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrix.VerticalSize(45),
  },
});
