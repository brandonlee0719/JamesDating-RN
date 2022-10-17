import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrix } from "../../../config";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        flex: 1,
        alignItems: 'center'
    },
    Filter: {
        // paddingHorizontal: Metrix.HorizontalSize(20),
        width: Metrix.HorizontalSize(310),
        marginTop: Metrix.VerticalSize(30),
        paddingVertical: Metrix.VerticalSize(10),

    },
    FilterClose: {
        position: 'relative',
        alignItems: 'flex-end'
    },
    filterByDefaultValue: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Metrix.HorizontalSize(17),
        marginBottom: 10,
        marginTop: -17
    },
    // name
    FilterNameContainer: {
        marginVertical: Metrix.VerticalSize(15)
    },
    FilterNameLabel: {
        fontSize: Metrix.FontMedium,
        paddingVertical: Metrix.VerticalSize(15),
        opacity: .7,
        fontFamily: Fonts['Poppins-Black'],

    },
    FilterNameInput: {
        borderWidth: 1.2,
        borderRadius: 7,
        height: Metrix.VerticalSize(60),
        borderColor: Colors.Gray
    },
    lookingForButtonWrapper: {
        // width: Metrix.HorizontalSize(110),
        marginHorizontal: Metrix.HorizontalSize(5),
        paddingHorizontal: Metrix.HorizontalSize(16),
        marginVertical: Metrix.VerticalSize(10),
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.Primary,
        height: Metrix.VerticalSize(50),
        borderRadius: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    seleted: {
        backgroundColor: Colors.Primary
    },
    seletedText: {
        color: Colors.White
    },
    lookingForButtonWrapperText: {
        color: Colors.Black,
        fontWeight: '700',
        fontSize: 17
    },

})