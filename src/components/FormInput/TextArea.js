import React from 'react';
import {Text, TextInput, View, TextInputProps, Image} from 'react-native';
import {Colors, Metrix} from '../../config';
import styles from './styles';

const TextArea: React.FC<TextInputProps | CustomProps> = ({
  errMsg,
  containerStyle,
  inputStyle,
  Icon,
  reference = () => {},
  onKeyPressEvent = () => {},
  ...props
}) => (
  <View style={[styles.textAreaStyle, {containerStyle}]}>
    <View style={{width: '15%', marginLeft: 20}}>
      <Image
        resizeMode="center"
        source={Icon}
        style={{height: '40%', width: '40%'}}
      />
    </View>
    <TextInput
      style={[
        {
          //   ...styles.inputStyle,
          width: '85%',
          height: Metrix.VerticalSize(150),
          textAlignVertical: 'top',
          marginTop: 10,
        },
        inputStyle,
      ]}
      ref={r => reference(r)}
      onKeyPress={e => onKeyPressEvent(e.nativeEvent.key)}
      {...props}
    />
    {/* {errMsg ? <Text style={styles.errMsgStyle}>{errMsg}</Text> : null} */}
  </View>
);

interface CustomProps {
  errMsg: String;
  containerStyle: StyleSheet;
  inputStyle: StyleSheet;
  reference: Function;
  onKeyPressEvent: Function;
}

TextArea.defaultProps = {
  placeholder: '',
  returnKeyType: 'default',
  underlineColorAndroid: Colors.Transparent,
  placeholderTextColor: Colors.PlaceColor,
  selectionColor: Colors.Primary,
  keyboardAppearance: 'dark',
  multiline: true,
  onChangeText: () => {},
  inputStyle: {},
  containerStyle: {},
};

export default React.memo(TextArea);
