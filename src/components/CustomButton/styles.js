import {StyleSheet} from 'react-native';
import {Colors} from '../../config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Primary,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  customStyle: {
    shadowColor: '#fff',
    elevation: 3,
    // shadowOffset: {
    //     width: 0,
    //     height: 5,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 1.84,

    // elevation: 3,
  },
});

export default styles;
