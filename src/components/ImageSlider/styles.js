import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrix } from '../../config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary,
  },
  card: {
    // width: '100%',
    height: Metrix.HorizontalSize(410),
    // display: 'flex',
    // alignItems: 'center',
    marginTop: -60,
  },
  cardImage: {
    borderRadius: 120,
    width: '100%',
    height: Metrix.VerticalSize(520),
  },
  cardDesc: {
    flex: 1,
  },
  cardDescTop: {
    width: Metrix.VerticalSize(105),
    height: Metrix.VerticalSize(40),
    borderRadius: 8,
    paddingHorizontal: Metrix.VerticalSize(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: -10,
    margin: Metrix.VerticalSize(10),
    backgroundColor: Colors.Primary,
  },
  cardDescTopRight: {
    // width: Metrix.VerticalSize(105),
    height: Metrix.VerticalSize(40),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: Metrix.VerticalSize(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: Colors.Primary,
  },
  cardDescBottom: {

    flex: 9,
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    // backgroundColor:'red',
    zIndex: 11,
    // marginTop:Metrix.VerticalSize(30)
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  cardDescBottomUpper: {
    flex: 1,
    margin: Metrix.VerticalSize(15),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },

  cardDescBottomUpperName: {
    lineHeight: 40,
    color: Colors.White,
    fontWeight: '700',
    fontSize: 19,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardDescBottomUpperDasignationText: {
    color: Colors.White,
    fontWeight: '700',
    fontSize: 16,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: Metrix.HorizontalSize(15),
  },
  cardDescBottomUpperDasignation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: Metrix.VerticalSize(8),
    width: Metrix.VerticalSize(220),
  },

  cardDescBottomDown: {
    width: '100%',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
  },
  cardDescBottomDownWrapper: {
    width: '76%',
    height: 60,
    marginBottom: Metrix.VerticalSize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // dislike
  dislike: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.Danger,
    borderWidth: 3,
    borderRadius: 7,
    paddingVertical: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(20),
    borderColor: Colors.Danger,
  },
  like: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#69ec83',
    borderWidth: 3,
    borderRadius: 7,
    paddingVertical: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(20),
    borderColor: '#69ec83',
  },
  linearGradient: {
    backgroundColor: 'transparent',
  },

  customModal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red'
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
