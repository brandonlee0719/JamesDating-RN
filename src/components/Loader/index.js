import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Modal,
  View,
} from 'react-native';
import {Colors} from '../../config';
import styles from './styles';

const Loader: React.FC<ActivityIndicatorProps> = ({
  style,
  isModalLoader,
  ...props
}) => {
  return (
    <Modal transparent={true} animationType={'none'} visible={isModalLoader}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator {...props} animating={true} />
        </View>
      </View>
    </Modal>
  );
  //   if (isModalLoader) {
  //     return (
  //       <ActivityIndicator
  //         {...props}
  //         style={[{backgroundColor: 'transparent'}, style]}
  //         animating={true}
  //       />
  //     );
  //   } else {
  //     return (
  //       <Modal transparent={true} animationType={'none'} visible={false}>
  //         <View style={styles.modalBackground}>
  //           <View style={styles.activityIndicatorWrapper}>
  //             <ActivityIndicator {...props} animating={true} />
  //           </View>
  //         </View>
  //       </Modal>
  //     );
  //   }
};

interface CustomProps {
  isModalLoader: Boolean;
}

Loader.defaultProps = {
  size: 'small',
  isModalLoader: false,
  color: 'White',
};

export default React.memo(Loader);
