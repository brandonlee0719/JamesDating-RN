import { StyleSheet } from "react-native";
import { Colors, Metrix } from "../../../config";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    BlockUserList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: Metrix.HorizontalSize(20),
        paddingVertical: Metrix.VerticalSize(10)
    },
    BlockUserListImg: {
        width: 50,
        height: 50,
        borderRadius: 7,
        marginRight: 15
    },
    BlockUserListTitle: {
        fontSize: 19,
        color: Colors.Black,
    },
    BlockUserListDesc: {
        fontSize: 13,
        opacity: .7
    },
})