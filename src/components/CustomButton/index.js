import { Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'
import styles from './styles'
import { Colors } from '../../config'

export class CustomButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Pressable style={[styles.container, { backgroundColor: this.props.bgColor ? this.props.bgColor : Colors.Primary }, this.props.customStyle && styles.customStyle]} onPress={this.props.handleClick}>
                <Text style={{ color: this.props.textColor ? this.props.textColor : Colors.White, fontWeight: 'bold', fontSize: 18 }}>{this.props.title}</Text>
            </Pressable>
        )
    }
}

export default CustomButton