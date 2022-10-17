import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrix} from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  search: {
    position: 'relative',
    padding: Metrix.VerticalSize(5),
    width: '90%',
    flexDirection:'row',
    height: Metrix.VerticalSize(65),
    marginLeft: Metrix.VerticalSize(20),
  },
  searchInput: {
    flex:4,
    marginRight:-10,
    borderRadius: 6,
    paddingLeft: Metrix.HorizontalSize(45),
    backgroundColor: '#EEEEEE',
    fontSize: Metrix.VerticalSize(18),
    fontWeight: '500',
    color: Colors.BlackOpacity,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    top: '35%',
    left: '5%',
  },
  searchImg: {
    flex:.8,
    // position: 'absolute',
    // right: '1%',
    // top: '6%',
    // height: Metrix.VerticalSize(50),
    // width: Metrix.HorizontalSize(50),
    borderRadius: 10,
    // height: Metrix.VerticalSize(50),
    backgroundColor: Colors.Primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Options: {
    height: Metrix.VerticalSize(140),
    width: '100%',
  },
  card: {
    width: '100%',
    height: Metrix.HorizontalSize(410),
    display: 'flex',
    alignItems: 'center',
    marginTop: -40,
  },
  cardImage: {
    borderRadius: 120,
    width: '100%',
    height: '100%',
  },
  cardDesc: {
    flex: 1,
  },
  cardDescTop: {
    flex: 1,
    width: Metrix.VerticalSize(85),
    borderRadius: 6,
    paddingHorizontal: Metrix.VerticalSize(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: Metrix.VerticalSize(15),
    backgroundColor: Colors.Primary,
  },
  cardDescBottom: {
    margin: Metrix.VerticalSize(15),
    flex: 8,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor:'red',
    zIndex: 11,
  },
  cardDescBottomUpper: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  cardDescBottomUpperName: {
    lineHeight: 60,
    color: Colors.White,
    fontWeight: '700',
    fontSize: 19,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardDescBottomUpperDasignationText: {
    color: Colors.White,
    fontWeight: '700',
    fontSize: 17,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  cardDescBottomUpperDasignation: {
    flexDirection: 'row',
    marginVertical: Metrix.VerticalSize(6),
    width: Metrix.VerticalSize(220),
  },

  cardDescBottomDown: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDescBottomDownWrapper: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: Colors.BlackOpacity(0.5)
},
modalWrapper: {
    backgroundColor: Colors.White,
    borderRadius: 10,
    justifyContent: 'space-around'
}
});

export default styles;
