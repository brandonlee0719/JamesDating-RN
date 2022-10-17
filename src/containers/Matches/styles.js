import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: Colors.White,
  },
  matches: {
    marginHorizontal: Metrix.HorizontalSize(15),
    // paddingVertical: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(25),
  },
  matchesTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: Metrix.HorizontalSize(10),
    paddingVertical: Metrix.VerticalSize(10),
  },
  matchesTabsTitleActive: {
    fontSize: 16,
    fontFamily: Fonts['Poppins-Black'],
    fontWeight: '700',
    color: Colors.White,
    backgroundColor: Colors.Primary,
    width: Metrix.HorizontalSize(100),
    height: Metrix.HorizontalSize(47),
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  matchesTabsTitle: {
    fontSize: 16,
    fontFamily: Fonts['Poppins-Black'],
    fontWeight: '700',
    color: Colors.Primary,
    width: Metrix.HorizontalSize(100),
    height: Metrix.HorizontalSize(47),
    textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },

  card: {
    marginHorizontal: Metrix.HorizontalSize(10),
    marginTop: Metrix.VerticalSize(20),
  },
});

export default styles;
