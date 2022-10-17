import React from 'react';
import {Metrix, Colors} from '../../config';
import Toast, { BaseToast } from 'react-native-toast-message';

const ToastComponent = () => (
    <Toast
    config = {{
      error: ({ text1, ...rest }) => (
        <BaseToast
          {...rest}
          style={{ borderLeftColor: Colors.Danger}}
          text1Style={{
            fontSize: Metrix.customFontSize(15),
            fontWeight: '700',
            color: Colors.DarkGray
          }}
          text1="Error Occurred"
          text2Style={{
            fontSize: Metrix.customFontSize(14),
            fontWeight: '400',
            color: Colors.DarkGray
          }}
        />
      ),


      success: ({ text1, ...rest }) => (
        <BaseToast
        {...rest}
        style={{ borderLeftColor: Colors.Success }}
        text1Style={{
          fontSize: Metrix.customFontSize(15),
          fontWeight: '700',
          color: Colors.DarkGray
        }}
        text1="Success"
        text2Style={{
          fontSize: Metrix.customFontSize(14),
          fontWeight: '400',
          color: Colors.DarkGray
        }}
      />
      )
    }}
    autoHide
    visibilityTime={4000}
    />
);


export default ToastComponent;
