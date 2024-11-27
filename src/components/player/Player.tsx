import { Platform, StyleSheet, View } from "react-native";
import { BOTTOM_TAB_HEIGHT } from "../../utils/Constant";
import { screenHeight } from "../../utils/Scaling";
import CustomText from "../ui/CustomText";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useEvent, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useEffect, useRef } from "react";
import { useSharedState } from "../../features/tabs/ShareContext";
import FullScreenPlayer from "./FullScreenPlayer";
import AirPlayer from "./AirPlayer";
import usePlayerStore from "../../state/usePlayStore";


const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;

const withPlayer = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const WithPlayer = (props: P) => {
        const { translationY, isExpanded } = useSharedState()
        const currentPlayingTrack = usePlayerStore((state) => state.currentPlayingTrack);
        const isScroll = useSharedValue(false)
        const scrollRef = useRef<Animated.ScrollView>(null)



        useEffect(() => {
            translationY.value = withTiming(0, { duration: 300 })
        }, [translationY])

        const onScroll = useAnimatedScrollHandler({
            onBeginDrag({ contentOffset }) {
                if (contentOffset.y === 0) {
                    isScroll.value = false
                }
            },
            onEndDrag({ contentOffset }) {
                if (contentOffset.y === 0) {
                    isScroll.value = false
                }
            },
            onMomentumEnd({ contentOffset }) {
                if (contentOffset.y === 0) {
                    isScroll.value = false
                }
            }

        })
        const panGesture = Gesture.Pan()
            .onChange(() => {
                if (translationY.value <= -602) {
                    isScroll.value = true
                }
            })
            .onUpdate((event) => {
                translationY.value = Math.max(
                    Math.min(event.translationY + (
                        isExpanded.value ?
                            -MAX_PLAYER_HEIGHT +
                            MIN_PLAYER_HEIGHT : 0
                    ), 0),
                    -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT
                )
            }).onEnd((event) => {
                const trY = event.translationY
                if (trY > 0) {
                    const min = Math.abs(MAX_PLAYER_HEIGHT) / 4
                    console.log("true of swipe :", { Y: trY, min: min, condtion: trY < min })
                    if (trY < min) {
                        isExpanded.value = true
                        translationY.value = withTiming(-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT,
                            { duration: 300 })
                    } else {
                        isExpanded.value = false
                        translationY.value = withTiming(0, { duration: 300 })
                    }
                } else {
                    const min = Math.abs(MIN_PLAYER_HEIGHT)
                    console.log("false of swipe  :", { Y: trY, min })
                    if (Math.abs(trY) > min) {
                        isExpanded.value = true
                        translationY.value = withTiming(-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT,
                            { duration: 300 })
                    } else {
                        isExpanded.value = false
                        translationY.value = withTiming(0, { duration: 300 })
                    }
                }
                isScroll.value = false
            }).enabled(!isScroll.value)

        const animatedContainerStyle = useAnimatedStyle(() => {
            const height = interpolate(
                translationY.value,
                [-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, 0],
                [MAX_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT],
                'clamp'
            )
            return {
                height,
                borderTopLeftRadius: translationY.value < -2 ? 15 : 0,
                borderTopRightRadius: translationY.value < -2 ? 15 : 0
            }
        })

        const collapsedOpacityStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
                translationY.value,
                [-2, 0],
                [0, 1],
                'clamp'
            )
            return {
                opacity,
                display: translationY.value < -2 ? 'none' : 'flex'
            }
        })

        const expanedOpacityStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
                translationY.value,
                [-2, 0],
                [1, 0],
                'clamp'
            )
            return {
                opacity,
                display: translationY.value > -2 ? 'none' : 'flex'
            }
        })

        const combineGesture = Gesture.Simultaneous(panGesture, Gesture.Native())
        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />

                {currentPlayingTrack &&
                    <GestureDetector gesture={combineGesture}>
                        <Animated.View style={[styles.playerContainer, animatedContainerStyle]}>
                            {
                                Platform.OS === 'ios' ?
                                    <Animated.ScrollView
                                        persistentScrollbar
                                        ref={scrollRef}
                                        pinchGestureEnabled
                                        bounces={false}
                                        showsVerticalScrollIndicator={false}
                                        scrollEventThrottle={16}
                                        onScroll={onScroll}
                                        contentContainerStyle={styles.expandPlayer}
                                        style={expanedOpacityStyle}
                                    >
                                        <FullScreenPlayer />
                                    </Animated.ScrollView>
                                    : <Animated.View style={expanedOpacityStyle}>
                                        <ScrollView
                                            persistentScrollbar
                                            pinchGestureEnabled
                                            nestedScrollEnabled
                                            bounces={false}
                                            showsVerticalScrollIndicator={false}
                                            onScroll={onScroll}
                                            contentContainerStyle={styles.expandPlayer}
                                        >
                                            <FullScreenPlayer />
                                        </ScrollView>
                                    </Animated.View>
                            }
                            <Animated.View style={[styles.collapsedPlayer, collapsedOpacityStyle]}>
                                <AirPlayer />
                            </Animated.View>
                        </Animated.View>
                    </GestureDetector>
                }

            </View>
        )
    }
    return WithPlayer
}

export default withPlayer

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    expandPlayer: {
        alignItems: 'center',
        backgroundColor: "#444"
    },
    playerContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: 5,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    collapsedPlayer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
