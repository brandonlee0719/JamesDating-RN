import { StyleSheet } from "react-native";
import { Colors } from "../../config";

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: Colors.BlackOpacity(0.4)
    },
    activityIndicatorWrapper: {
        backgroundColor: Colors.DarkGray,
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default styles;