
import Toast from 'react-native-toast-message';

/** 
* @param type success, error, info
  @param text Text to be displayed
*/

const showToast = (type = "success", text = "",) => (
    Toast.show({
      type: type,
      text2: text,
    })
)

  export default showToast;