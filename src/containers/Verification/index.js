import { Image, Text, View, TextInput } from 'react-native'
import React, { Component } from 'react'
import { styles } from './styles'
import { Header } from '../../components'
import { Images } from '../../config'



export class Verification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin1: '',
            pin2: '',
            pin3: '',
            pin4: '',
            pin5: '',
            pin6: '',
        }
    }

    render() {

        const { pin1, pin2, pin3, pin4, pin5, pin6 } = this.state;
        return (
            <View style={styles.container}>
                {/* header begin*/}
                <Header.Standard
                    //   extraStyle={{backgroundColor: Colors.white}}
                    leftIconName={'arrow-back'}
                    onPressLeft={() => NavigationService.goBack()}
                    Heading={"Varification Code"}
                    onPressRight={() => alert('clicked')}
                    iconColor="black"
                />
                {/* header end*/}
                {/* top begin*/}
                <View style={styles.forgetTopContainer}>
                    <View style={styles.forgetCircle}>
                        <Image source={Images.Circle} />
                        <Image style={styles.forgetIcon} source={Images.ForgetPhone} />
                    </View>
                    <View style={styles.forgetText}>
                        <Text style={styles.forgetVerificationText}>Verification Code</Text>
                        <Text style={styles.forgetTexts}>Please enter the code that we have</Text>
                        <Text style={styles.forgetTexts}>sent to you verified phone number or Email</Text>
                    </View>
                    {/* inputs */}
                    <View style={styles.inputFields}>
                        <TextInput ref={'nameRef1'} onChangeText={(pin1) => {
                            this.setState({ pin1: pin1 })
                            if (pin1 != '') {
                                this.ref.pinRef2.focus()
                            }
                        }} value={pin1} maxLength={1} keyboardType='decimal-pad' style={styles.inputFieldText} />
                        <TextInput ref={'nameRef2'} onChangeText={(pin2) => this.setState({ pin2: pin2 })} value={pin2} maxLength={1} keyboardType='decimal-pad' style={styles.inputFieldText} />
                        <TextInput ref={'nameRef3'} onChangeText={(pin3) => this.setState({ pin3: pin3 })} value={pin3} maxLength={1} keyboardType='decimal-pad' style={styles.inputFieldText} />
                        <TextInput ref={'nameRef4'} onChangeText={(pin4) => this.setState({ pin4: pin4 })} value={pin4} maxLength={1} keyboardType='decimal-pad' style={styles.inputFieldText} />
                        <TextInput ref={'nameRef5'} onChangeText={(pin5) => this.setState({ pin5: pin5 })} value={pin5} maxLength={1} keyboardType='decimal-pad' style={styles.inputFieldText} />
                        <TextInput ref={'nameRef6'} onChangeText={(pin6) => this.setState({ pin6: pin6 })} value={pin6} maxLength={1} keyboardType='decimal-pad' style={styles.inputFieldText} />

                    </View>
                </View>
                {/* bottom begin */}
                {/* bottom end */}
            </View>
        )
    }
}

export default Verification