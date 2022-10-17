import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrix } from '../../../../config'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBEEFB'
    },
    calendarTopContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(10),
        paddingVertical: Metrix.VerticalSize(20),
    },
    calendarTopContainerWrapper: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        width: Metrix.HorizontalSize(94)
    },
    calendarTopContainerWrapperDate: {
        backgroundColor: Colors.PrimaryLight,
        paddingHorizontal: Metrix.HorizontalSize(12),
        paddingVertical: Metrix.VerticalSize(9),
        borderRadius: 7,
        fontWeight: '600',
        fontFamily: Fonts['Poppins-Black'],

    },
    calendarBottomContainer: {
        paddingHorizontal: Metrix.HorizontalSize(20),
        paddingTop: Metrix.VerticalSize(25),
        flex: 14,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: Colors.White,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: 10
    },
    calendarTopContainerWrapperText: {
        backgroundColor: Colors.PrimaryLight,
        padding: 8,
        borderRadius: 6
    },
    calendarBottomContainerInput: {
        borderWidth: 1,
        borderColor: Colors.Black,
        height: Metrix.VerticalSize(44),
        paddingHorizontal: Metrix.HorizontalSize(20),
        borderRadius: 6,
        marginVertical: Metrix.VerticalSize(15)
    },
    calendarBottomContainerTextArea: {
        borderWidth: 1,
        borderColor: Colors.Black,
        textAlignVertical: 'top',
        paddingHorizontal: Metrix.HorizontalSize(20),
        borderRadius: 6,
        marginVertical: Metrix.VerticalSize(15)
    },
    calendarBottomContainerTitle: {
        fontWeight: '700',
        letterSpacing: .5,
        fontSize: 16,
        opacity: .7,
        color: Colors.Black,
    },
    cancel: {
        width: '100%', height: 50, marginVertical: 15,
        shadowColor: "#000",
        marginVertical:Metrix.VerticalSize(20),
        backgroundColor:Colors.White,
        borderRadius:6,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    // modal
    modal:{
        flex:1,
        alignItems:'flex-start',
        justifyContent:'flex-start'
    },

    // datePicker
    datePicker:{
        flex:1,
        backgroundColor:Colors.PrimaryLight,
        width:Metrix.HorizontalSize(299),
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    },
    datePickerWrapper:{
        width:Metrix.HorizontalSize(299)
    },

})