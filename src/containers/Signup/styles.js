import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrix } from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  imgView: {
    height: Metrix.VerticalSize(70),
    width: Metrix.HorizontalSize(70),
    backgroundColor: Colors.Primary,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: Metrix.VerticalSize(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: Colors.Text,
  },

  // perpose in app begin
  registerHeading: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.Primary,
  },
  lookingFor: {
    fontSize: 18,
    color: Colors.Black,
    fontWeight: '700',
    lineHeight: 60,
  },
  lookingForButton: {
    width: '100%',
  },
  lookingForButtonWrapperText: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.Black,
  },
  lookingForButtonWrapper: {
    borderColor: Colors.Primary,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrix.VerticalSize(30),
    padding: Metrix.HorizontalSize(10),
    borderRadius: 6,
    marginRight: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(15),
  },

  menWomen: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  men: {
    width: Metrix.VerticalSize(112),
    height: Metrix.VerticalSize(46),
    backgroundColor: Colors.Primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginLeft: Metrix.VerticalSize(10),
  },
  women: {
    width: Metrix.VerticalSize(112),
    height: Metrix.VerticalSize(46),
    display: 'flex',
    borderWidth: 1,
    borderColor: Colors.Primary,
    alignItems: 'center',
    marginLeft: Metrix.VerticalSize(10),
    justifyContent: 'center',
    borderRadius: 6,
  },
  // perpose in app end

  // AlcoholeConsuption bengin
  AlcoholeConsuption: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  // AlcoholeConsuption end

  // childre begin
  childrenBts: {
    // width: Metrix.VerticalSize(279),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    marginRight: 10,
  },
  childrenBtsText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: Metrix.VerticalSize(40),
    borderColor: Colors.Primary,
    borderRadius: 6,
    width: Metrix.VerticalSize(130),
  },
  childrenBtsTextNo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: Colors.Primary,
    color: Colors.White,
    height: Metrix.VerticalSize(40),
    borderColor: Colors.Primary,
    borderRadius: 6,
    width: Metrix.VerticalSize(130),
  },
  // childre end

  // QualityYouHave

  QualityYouHave: {},

  // sign begin
  sign: {},
  // sign end

  // pic plus icon
  picPlusIcon: {
    position: 'absolute', bottom: 5, right: 6,backgroundColor:Colors.Primary, borderRadius:100
  },

});

export default styles;
