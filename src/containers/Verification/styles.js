import { StyleSheet } from "react-native";
import { Colors, Metrix } from '../../config'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    forgetTopContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop:20,
    },
    forgetCircle: {
        position: 'relative'
    },
    forgetIcon: {
        position: 'absolute',
        left: 40,
        top: 30
    },
    forgetText: {
        alignItems: 'center',
        textAlign: 'center',
        width: Metrix.HorizontalSize(299)
    },
    forgetTexts:{
        fontSize:15,
        color:'#A5A5A5'
    },
    forgetVerificationText:{
        fontSize:21,
        marginVertical:Metrix.VerticalSize(20),
        color:Colors.Black
    },
    inputFields:{
        marginVertical:Metrix.VerticalSize(10),
        width:Metrix.HorizontalSize(299),
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    inputFieldText:{
        borderBottomWidth:1,
        borderColor:Colors.Black,

    },

})