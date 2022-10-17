import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { Colors, Metrix } from '../../config';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const NoInternetComponent: React.FC<CustomProps>
    = ({ isConnected, isInternetReachable, ...props }) => {
        const windowHeight = Dimensions.get("window").height;
        const slideUpValue = useRef(new Animated.Value(windowHeight * -1)).current;

        const _start = () => {
            return Animated.timing(slideUpValue, {
                toValue: windowHeight * 0.80 * -1,
                duration: 1000,
                useNativeDriver: true
            }).start(_end());
        };

        const _end = () => {
            setTimeout(() => {
                Animated.timing(slideUpValue, {
                    toValue: windowHeight * -1,
                    duration: 1000,
                    useNativeDriver: true
                }).start();
            }, 10000);
        }

        const instantEnd = () => {
            Animated.timing(slideUpValue, {
              toValue: windowHeight * -1,
              duration: 150,
              useNativeDriver: true,
            }).start();
          };

        useEffect(() => {
            if (isConnected == false || isInternetReachable == false) {
                _start();
            }
            else
                _end();
        }, [isConnected, isInternetReachable]);




        return (
            <View>
                <Animated.View style={[styles.animatedContainer, {
                    transform: [
                        {
                            translateY: slideUpValue
                        }
                    ],
                }]}>
                    <View style={styles.connectionView}>
                        <Icon size={Metrix.customFontSize(19)}  name={!isConnected && !isInternetReachable ? "wifi-off" :
                            !isInternetReachable && isConnected ? "wifi-refresh" :
                                "wifi"
                        }
                            color={!isConnected && !isInternetReachable ? Colors.Danger : Colors.Success} />
                        <Text style={styles.textStyle} ellipsizeMode={'tail'} numberOfLines={2}>
                            {!isConnected && !isInternetReachable ? "You are currently offline." :
                                !isInternetReachable && isConnected ? `Trying to restore the connection..` :
                                    "Your Internet connection has been restored."}
                        </Text>
                    </View>
                </Animated.View>
            </View>
        )
    }

interface CustomProps {
    isConnected: Boolean,
    isInternetReachable: Boolean,
}

NoInternetComponent.defaultProps = {
    isConnected: true,
    isInternetReachable: true,
}

export default React.memo(NoInternetComponent);