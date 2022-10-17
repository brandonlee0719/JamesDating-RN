import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  inputStyle: {
    width: Metrix.HorizontalSize(300),
    height: Metrix.VerticalSize(45),
    borderWidth: Metrix.VerticalSize(1),
    borderColor: Colors.Primary,
    borderRadius: Metrix.LightRadius,
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  textAreaStyle: {
    width: Metrix.HorizontalSize(300),
    height: Metrix.VerticalSize(150),
    borderWidth: Metrix.VerticalSize(1),
    borderColor: Colors.Primary,
    borderRadius: Metrix.LightRadius,
    flexDirection: 'row',
  },
  input: {
    fontFamily: Fonts['Poppins-Black'],
    fontSize: Metrix.FontSmall,
    color: Colors.Text,
    textAlignVertical: 'center',
    width: '85%',
    height: Metrix.VerticalSize(45),
  },
  errMsgStyle: {
    letterSpacing: 0.49,
    fontFamily: Fonts['Poppins-Black'],
    fontSize: Metrix.FontExtraSmall,
    color: Colors.Danger,
    marginTop: Metrix.VerticalSize(10),
  },
});

export default styles;
