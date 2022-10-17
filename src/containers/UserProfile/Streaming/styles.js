import { StyleSheet } from "react-native";
import { Colors, Fonts, Metrix } from '../../../config'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    Streaming: {
        marginHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(10),
    },
    StreamingWrapper: {
        // marginHorizontal: Metrix.HorizontalSize(15),
        width: '100%',
    },
    StreamingVideo: {
        position: 'relative',
        width: Metrix.HorizontalSize(300),
        marginRight: Metrix.HorizontalSize(10),
        height: Metrix.VerticalSize(184)
    },
    StreamingGames: {
        position: 'relative',
        width: Metrix.HorizontalSize(110),
        marginRight: Metrix.HorizontalSize(6),
        height: Metrix.VerticalSize(184)
    },
    StreamingVideoIcon: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    linearGradient: {
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 10,
    },
    categoryTitle: {
        color: Colors.Black,
        paddingVertical: Metrix.VerticalSize(20),
        paddingHorizontal: Metrix.HorizontalSize(20),
        fontSize: 18,
        fontFamily: Fonts['Poppins-Black'],
    },
    StreamingVideoHot: {
        backgroundColor: Colors.Primary, alignSelf: 'flex-end', marginHorizontal: Metrix.HorizontalSize(12), marginVertical: Metrix.VerticalSize(10),
        paddingHorizontal:17,
        paddingVertical:5,
        borderRadius:3
    }
    ,
    StreamingVideoHotText:{
        fontWeight:'bold',
        color:Colors.White,
        opacity:.7
    },
})
