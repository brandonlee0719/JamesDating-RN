import { Image, Modal, Pressable, Text, TextInput, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { Header, Loader } from '../../components'
import navigationService from '../../config/navigationService'
import { Colors, Images, Metrix } from '../../config'
import CustomButton from '../../components/CustomButton'
import { useDispatch } from 'react-redux'
import { AppAction } from '../../store/actions'
const ForgetPassword = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);

    function handleRecover() {
        if (!email) {
            setErr(true)
        } else if (email) {
            setErr(false)
            setModalVisible(true)
        }
    }
    const abc = () => {
        setModalVisible(false)
        navigationService.navigate('ForgetOtp', { 'email': email })
    }
    const handleConfirm = () => {
        dispatch(AppAction.ForgetPassword({ email, abc, setLoading }));

    }
    return (
        <>
            <View style={styles.container}>
                <Header.Standard
                    leftIconName={"arrow-back"}
                    onPressLeft={navigationService.goBack}
                    Heading={<View>
                        <Image source={Images.FLogo} resizeMode="contain" />
                    </View>}
                />
                <View style={styles.ForgetPassword}>
                    <Text style={{ fontSize: 14.5, lineHeight: 25, opacity: .8 }}>Enter your email and you will immediately receive
                        your login information from us.
                    </Text>
                </View>
                {/* body begin */}
                <View style={styles.ForgetPasswordBody}>
                    <Image source={Images.Banner} />
                    <View style={{ marginTop: 40 }}>
                        <View style={styles.ForgetPasswordInputContainer}>
                            <TextInput onChangeText={(e) => setEmail(e)} placeholder='E-mail address' placeholderTextColor={Colors.PlaceColor} style={styles.ForgetPasswordInput} />
                        </View>
                        {err &&
                            <View>
                                <Text style={{ color: 'red', fontSize: 16 }}>Email is required*</Text>
                            </View>
                        }
                        <View style={[styles.ForgetPasswordInputContainer, styles.ForgetPasswordButton]}>
                            <CustomButton handleClick={() => handleRecover()} title="Recover" />
                        </View>
                    </View>
                </View>
                {/* body end */}
            </View>
            {modalVisible

                &&

                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalViewHeading}>Are you conform?</Text>
                                <Text style={styles.modalViewDesc}>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et…
                                </Text>
                                <View style={styles.ForgetPasswordInputContainer}>
                                    <TextInput editable={false} selectTextOnFocus={false} placeholder={email} placeholderTextColor={Colors.PlaceColor} style={styles.ForgetPasswordInput} />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: Metrix.VerticalSize(20), justifyContent: 'space-between', width: '100%' }}>
                                    <View style={{ height: 48, width: 120 }}>
                                        <CustomButton title="Cancel" handleClick={() => setModalVisible(false)} textColor={Colors.Primary} bgColor="white" customStyle={true} />
                                    </View>
                                    <View style={{ height: 48, width: 120 }}>
                                        <CustomButton handleClick={() => handleConfirm()} title="Confirm" />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            }
            <Loader isModalLoader={loading} />
        </>
    )
}

export default ForgetPassword