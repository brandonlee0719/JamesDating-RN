import { StyleSheet } from "react-native";
import { Colors, Metrix } from "../../config";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White
    },
    chatsWrapperBottomBorder: {
        borderWidth: 1,
        borderColor: Colors.Gray
    },
    chatsWrapper: {
        marginHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    chatsWrapperName: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.Black,
        opacity: .7
    },
    chatsWrapperMessage: {
        fontSize: 13
    },


    // chatsWrapper with messages
    chatsWrapperMessages: {
        paddingHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(7),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        
    }

})

export default styles