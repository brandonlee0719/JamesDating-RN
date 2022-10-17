import { StyleSheet } from "react-native";
import { Colors, Metrix } from "../../config";

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: Colors.BlackOpacity(0.5)
    },
    modalWrapper: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        justifyContent: 'space-around'
    }
});

export default styles;