import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrix } from '../../config';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
    },
    profileUserDetails: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderRadius: 100
    },
    profileBtn: {
        width: Metrix.HorizontalSize(156),
        height: Metrix.VerticalSize(54),
        marginVertical: Metrix.VerticalSize(10)
    },
    profileName: {
        fontSize: 17,
        fontFamily: Fonts['Montserrat-SemiBold'],
    },
    profileNameId:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        marginVertical:Metrix.VerticalSize(10)
    },
    profileId: {
        fontSize: 14,
        fontWeight: '100',
        opacity: .8,
        fontFamily: Fonts['Montserrat-Regular'],


    },
    // bottom section
    ProfileBottomContent: {
        flex: 1.8,
        alignItems:'center',
        justifyContent:'center'
    },
    ProfileBottomContentWrapper: {
        width:Metrix.HorizontalSize(355),
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
    ProfileBottomContentWrapperItems:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        padding:Metrix.VerticalSize(17),
        margin:Metrix.VerticalSize(3),
    },
    ProfileBottomContentWrapperItemsRightItem:{
        marginLeft:20,
        fontSize:18,
        fontWeight:'600',
        color:Colors.Black,
        opacity:.8

        
    },
});

export default styles;
