import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrix } from "../../../config";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EBEEFB',
        flex: 1
    },
    diaryPost: {
        marginHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(5),
    },
    diaryPostHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    diaryPostUserImage: {
        width: Metrix.HorizontalSize(50),
        height: Metrix.VerticalSize(50),
        borderRadius: 7,
        resizeMode: 'cover'
    },
    diaryPostTitle: {
        marginHorizontal: 20,
        fontSize: 18.6,
        letterSpacing:1,
        fontWeight: 'bold',
        color: Colors.Black,
        opacity: .7,
        fontFamily: Fonts['Poppins-Black'],
    },
    diaryPostImage:{
        marginVertical:Metrix.VerticalSize(20),
    },
})

export default styles