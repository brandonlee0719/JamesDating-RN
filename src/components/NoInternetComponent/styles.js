import { StyleSheet } from "react-native";
import { Colors,Metrix, Fonts } from "../../config";

const styles = StyleSheet.create({
    container: {
    
    },
    animatedContainer: {
        height: Metrix.VerticalSize(60),
        width: "85%",
        backgroundColor: Colors.DarkGray,
        opacity: 0.8,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      connectionView: {
        alignItems: 'flex-start',
        borderRadius: Metrix.VerticalSize(15),
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textStyle:{
        color: Colors.White, 
        fontSize: Metrix.customFontSize(18), 
        fontFamily: Fonts['Roboto-Medium'],
        marginHorizontal: 5,
        fontWeight:'600',
    }
});

export default styles;