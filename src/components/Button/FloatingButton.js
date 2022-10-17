import React from "react";
import { TouchableOpacity,TouchableOpacityProps } from "react-native"
import { Colors, Metrix } from "../../config";
import Icon from "react-native-vector-icons/FontAwesome5"
import styles from "./styles";


const FloatingButton: React.FC <TouchableOpacityProps | CustomProps > 
 = ({ iconComp , ...props }) => (
    <TouchableOpacity
        activeOpacity={Metrix.ActiveOpacity}
        {...props}
        style={styles.floatingButtonView}>
        {iconComp || <Icon name="plus" color={Colors.Text} size={18} />}
    </TouchableOpacity>
)

interface CustomProps {
    iconComp: React.Component;
}


FloatingButton.defaultProps = {
    onPress: () => { }, 
    iconComp : undefined
}
 
export default React.memo(FloatingButton);
