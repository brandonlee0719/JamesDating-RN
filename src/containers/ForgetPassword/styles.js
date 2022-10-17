import { StyleSheet } from "react-native";
import { Colors, Metrix } from '../../config'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },

    logo: {
        width: 50,
        height: 50,
        resizeMode: 'contain',

    },
    ForgetPassword: {

        marginHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(10),
    },
    ForgetPasswordBody: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Metrix.VerticalSize(50)
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
    ForgetPasswordButton: {
        width: Metrix.HorizontalSize(259),
        height: Metrix.VerticalSize(54),
    },
    centeredView: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        display:'flex',
        alignItems:'center',
        paddingHorizontal:Metrix.HorizontalSize(30),
        justifyContent:'center',
        backgroundColor:Colors.White,
        width:Metrix.HorizontalSize(310),
        height:Metrix.VerticalSize(360),
        alignItems: "center",
        shadowColor: "#000",
        borderRadius:10,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalViewHeading:{
        fontSize:19,
        color:Colors.Black,
        fontWeight:'700'
    },
    modalViewDesc:{
        fontSize:14,
        paddingVertical:15,
        opacity:.8,
    },
    cancel:{

    },
})