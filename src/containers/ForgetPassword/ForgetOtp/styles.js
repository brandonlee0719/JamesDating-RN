import { StyleSheet } from "react-native";
import { Colors, Metrix } from '../../../config'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    ForgetOtp: {
        flex:1,
        marginVertical:Metrix.VerticalSize(55),
        marginHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(10),
        alignSelf: 'center',
        justifyContent:'center',
    },
    ForgetPasswordInputContainer: {
        marginVertical: Metrix.VerticalSize(25),
    },
    ForgetPasswordInput: {
        backgroundColor: Colors.Gray,
        height: 56,
        fontWeight: '700',
        fontSize: 18,
        borderRadius: 7,
        paddingHorizontal: Metrix.HorizontalSize(20),
        width: Metrix.HorizontalSize(259)
    },
    save: {
        height: Metrix.VerticalSize(56)
    },
})
