import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: Metrix.HorizontalSize(10),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Metrix.VerticalSize(70),
  },
  iconView: {
    paddingVertical: Metrix.HorizontalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingStyle: {
    letterSpacing: 0.63,
    fontSize: Metrix.FontSmall,
    fontFamily: Fonts['Poppins-Black'],
    color: Colors.Text,
  },
  dummyView: {
    width: 26,
    height: 26,
  },
});

export default styles;
