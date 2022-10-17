import { StyleSheet } from "react-native";
import { Colors, Metrix } from "../../config";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userDetail: {
        flex: .9,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop:Metrix.VerticalSize(80)
    },
    dummyFlex:{
        alignItems:'center',
        justifyContent:'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.Black
    },
    status: {
        fontSize: 17,
        paddingVertical: 5
    },
    handleRing: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ringDecline: {
        backgroundColor:Colors.Danger,
        borderRadius:100,
        padding:10
    },
    ringText:{
        fontSize:17,
        paddingVertical:Metrix.VerticalSize(8),
        color:Colors.Black
    },
    ringAccept: {},
    handleRingWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Metrix.HorizontalSize(60)
    },
}) 