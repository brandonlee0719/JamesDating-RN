import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Colors, Metrix } from '../../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import Forminput from '../FormInput';

const Standard = ({
  Heading,
  leftIconName,
  leftIconComp,
  onPressLeft,
  rightIconName,
  rightIconComp,
  onPressRight,
  extraStyle,
  onChangeText,
  value,
  isSearchActive,
  bottomBorder,
  bgColor,
  iconColor,
  iconBg,
  greenCircle,
  textColor,
}) => (
  <View>
    <View
      style={[
        styles.mainView,
        { ...extraStyle },
        { backgroundColor: bgColor ? bgColor : 'white' },
      ]}>
      {onPressLeft && (
        <TouchableOpacity onPress={onPressLeft} style={styles.iconView}>
          {leftIconComp || (
            <Ionicons
              name={leftIconName}
              color={iconColor ? iconColor : Colors.Text}
              size={26}
            />
          )}
        </TouchableOpacity>
      )}
      <Text style={[styles.headingStyle, { color: textColor ? Colors.White : Colors.Black, fontWeight: 'bold', fontSize: 18 }]}>
        {Heading}
      </Text>
      <TouchableOpacity onPress={onPressRight} style={iconBg}>
        {rightIconComp || rightIconName ? (
          isSearchActive ? (
            <View
              style={{
                height: Metrix.VerticalSize(40),
                width: 120,
                // backgroundColor: 'gray',
                flexDirection: 'row',
              }}>
              <View style={{ width: '80%' }}>
                <Forminput.TextField
                  placeholder="search"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChangeText}
                  value={value}
                  inputStyle={{ height: 40, width: 90 }}
                  containerStyle={{}}
                />
              </View>
              <View style={{ width: '20%', marginTop: 10 }}>
                <Ionicons name={rightIconName} color={Colors.Text} size={20} />
              </View>
            </View>
          ) : (
            <>
              <Ionicons
                name={rightIconName}
                color={iconColor ? iconColor : Colors.Text}
                size={20}
              />
              {greenCircle && (
                <Text
                  style={{
                    position: 'absolute',
                    zIndex: -1,
                    top: -1,
                    right: 1,
                    backgroundColor: Colors.Primary,
                    width: 10,
                    height: 10,
                    borderRadius: 100,
                  }}></Text>
              )}
            </>
          )
        ) : (
          <View style={styles.dummyView} />
        )}
      </TouchableOpacity>
    </View>
    {bottomBorder && (
      <View
        style={{
          paddingHorizontal: 20,
          width: '90%',
          height: 2,
          backgroundColor: Colors.Gray,
          alignSelf: 'center',
        }}></View>
    )}
  </View>
);

export default React.memo(Standard);
