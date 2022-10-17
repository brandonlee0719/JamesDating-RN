import { Image, Text, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './styles'
import navigationService from '../../../config/navigationService'
import { Header } from '../../../components'
import { Images } from '../../../config'

export class BlockUser extends Component {
    render() {
        const userList = [
            {
                id: 1,
                title: 'Ramsha',
                status: 'Tap to unblock'
            },
            {
                id: 2,
                title: 'Ramsha',
                status: 'Tap to unblock'
            },
            {
                id: 3,
                title: 'Ramsha',
                status: 'Tap to unblock'
            },
            {
                id: 4,
                title: 'Ramsha',
                status: 'Tap to unblock'
            },
            {
                id: 5,
                title: 'Ramsha',
                status: 'Tap to unblock'
            },
        ]
        return (
            <View style={styles.container}>
                <Header.Standard
                    //   extraStyle={{backgroundColor: Colors.white}}
                    leftIconName={'arrow-back'}
                    Heading={"Block User"}
                    onPressLeft={() => navigationService.goBack()}
                    onPressRight={() => alert('clicked')}
                    bgColor="transparent"
                    iconColor="black"
                />
                {userList.map((i) => (
                    <View style={styles.BlockUserList}>
                        <Image source={Images.Diary1} style={styles.BlockUserListImg} />
                        <View>
                            <Text style={styles.BlockUserListTitle}>Ramsha</Text>
                            <Text style={styles.BlockUserListDesc}>Tap to unblock</Text>
                        </View>
                    </View>
                ))}
            </View>
        )
    }
}

export default BlockUser