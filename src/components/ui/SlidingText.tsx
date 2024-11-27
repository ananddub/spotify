import { Dimensions, LayoutChangeEvent, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import CustomText from './CustomText'
interface SlidingTextProps {
    text: string | undefined
    fontSize?: number,
    fontWeight?: string
}

export default function SlidingText(props: SlidingTextProps) {
    const [textwidht, setTextWidth] = useState<number>(0)
    const containerWidth = Dimensions.get('window').width - 230; const translateX = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    })
    const handleTextLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout
        setTextWidth(width)
    }
    useEffect(() => {
        if (textwidht >= containerWidth) {
            console.log('animated value ')
            translateX.value = withRepeat(
                withTiming(-textwidht + 200, {
                    duration: 8000,
                    easing: Easing.linear
                }),
                -1,
                true
            )

        } else {
            translateX.value = 0
        }
    }, [textwidht, containerWidth, props.text])
    return (
        <View style={[styles.container]}>
            <Animated.View style={[styles.textContainer, animatedStyle]}>
                <CustomText
                    style={{
                        fontWeight: props.fontWeight,
                        fontSize: props.fontSize,
                        color: 'white'
                    }}
                    numberOfLines={1}
                    onLayout={handleTextLayout}
                >
                    {props.text}
                </CustomText>

            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        width: '100%'
    },
    textContainer: {
        flexDirection: 'row',
        width: 600,
    }
})
















