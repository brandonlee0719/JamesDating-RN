import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrix } from '../../config';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrix.VerticalSize(20),
    marginVertical: Metrix.VerticalSize(10),
    height: Metrix.VerticalSize(80),
  },
  img: {
    width: 56,
    height: 56,
    resizeMode: 'cover',
    borderRadius: 10,
    marginHorizontal: 9,

  },
  imgActive: {
    borderWidth: 3,
    borderColor: Colors.Primary
  },
  imgPlusIcon: {
    width: 16,
    marginLeft: 'auto',
    marginTop: -14,
    height: 16,
    marginRight: 4,
    backgroundColor: Colors.Primary,
    flexDirection: 'row',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: Colors.White,
  },
  centeredView: {
    backgroundColor: 'red',
    flex: 1
  },
});

export default styles;
