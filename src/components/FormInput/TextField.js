import React from 'react';
import {TextInput, View, Text, TextInputProps, Image} from 'react-native';
import {Colors, Metrix} from '../../config';
import styles from './styles';

const TextField: React.FC<TextInputProps | CustomProps> = ({
  errMsg,
  Icon,
  inputStyle = {},
  containerStyle = {},
  reference = () => {},
  onKeyPressEvent = () => {},
  ...props
}) => (
  <View style={[styles.inputStyle, {containerStyle}]}>
    <View
      style={{width: '15%', alignItems: 'center', justifyContent: 'center'}}>
      <Image
        resizeMode="contain"
        source={Icon}
        style={{height: '50%', width: '50%'}}
      />
    </View>
    <TextInput
      style={[
        styles.input,
        {
          borderColor: errMsg ? Colors.Danger : Colors.Primary,
          fontSize: Metrix.FontMedium,
        },
      ]}
      ref={r => reference(r)}
      onKeyPress={e => onKeyPressEvent(e.nativeEvent.key)}
      {...props}
    />
    {errMsg ? <Text style={styles.errMsgStyle}>{errMsg}</Text> : null}
  </View>
);

interface CustomProps {
  errMsg: String;
  containerStyle: StyleSheet;
  inputStyle: StyleSheet;
  reference: Function;
  onKeyPressEvent: Function;
}

TextField.defaultProps = {
  errMsg: '',
  placeholder: '',
  returnKeyType: 'default',
  underlineColorAndroid: Colors.Transparent,
  placeholderTextColor: Colors.PlaceColor,
  selectionColor: Colors.Primary,
  keyboardAppearance: 'dark',
  onChangeText: () => {},
  inputStyle: {},
  containerStyle: {},
};

export default React.memo(TextField);
