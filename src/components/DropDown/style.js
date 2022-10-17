import {StyleSheet} from 'react-native';
import {Colors, Metrix} from '../../config';

const styles = StyleSheet.create({
  dropDown: {
    flex: 1,
    width: Metrix.HorizontalSize(300),
  },
  dropDownWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrix.VerticalSize(10),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Primary,
  },
  dropDownData: {
    padding: Metrix.VerticalSize(19),
    borderWidth: Metrix.VerticalSize(1.2),
    borderTopWidth: 0,
    // borderTopRightRadius:5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderColor: Colors.Primary,
    // flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: -5,
  },
  dropDownDataTitle: {
    marginLeft: Metrix.VerticalSize(14),
    fontSize: 17,
    color: Colors.Black,
  },
  dropDownDataRadio: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#A5A5A5',
  },
  dropDownDataRadioActive: {
    width: 20,
    height: 20,
    backgroundColor: Colors.Primary,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: Colors.Primary,
  },
});

export default styles;
