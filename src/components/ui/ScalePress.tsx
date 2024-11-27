import { Animated, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
interface ScalePressProps {
    onPress?: () => void,
    onLongPress?: () => void,
    children?: React.ReactNode,
    style?: ViewStyle
}


export default function ScalePress(props: ScalePressProps) {

    const sacaleValue = new Animated.Value(1);
    const onPressIn = () => {
        Animated.spring(sacaleValue, {
            toValue: 0.8,
            useNativeDriver: true
        }).start()
    }
    const onPressOut = () => {
        Animated.timing(sacaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()
    }
    return (
        <TouchableOpacity
            onPress={props.onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={1}
            onLongPress={props.onLongPress}
            style={props.style}

        >
            <Animated.View
                style={{
                    transform: [
                        {
                            scale: sacaleValue
                        }
                    ],
                    width: '100%'
                }}
            >

                {props.children}
            </Animated.View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})
