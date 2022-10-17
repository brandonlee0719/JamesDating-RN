import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps, ViewPropTypes, TextProps, TextPropTypes } from "react-native"
import { Metrix } from "../../config";
import Loader from "../Loader";
import styles from "./styles";


const Standard: React.FC <TouchableOpacityProps | CustomProps > 
= ({  text, containerStyle, textStyle, isLoading, ...props }) => (
    <TouchableOpacity
        activeOpacity={Metrix.ActiveOpacity}
        {...props}
        style={[styles.standardView, containerStyle]}>
        {isLoading ? <Loader /> :    
        <Text style={[styles.textStyle, textStyle]}>{text}</Text> }
    </TouchableOpacity>
)
interface CustomProps {
    text: String;
    containerStyle: StyleSheet;
    textStyle: StyleSheet;
    color: String;
    isLoading:  Boolean;
}


Standard.defaultProps = {
    onPress: () => { }, 
    text: "", 
    containerStyle: {}, 
    textStyle: {}, 
    color: "", 
    isLoading: false,
}
 

export default React.memo(Standard);
