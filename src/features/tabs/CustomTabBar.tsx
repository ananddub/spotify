import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { BOTTOM_TAB_HEIGHT, Colors } from '../../utils/Constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import ScalePress from '../../components/ui/ScalePress';
import { HomeTabIcon, LibraryTabIcon, SearchTabIcon } from './TabIcon';
import { useSharedState } from './ShareContext';

export default function CustomTabBar(props: BottomTabBarProps) {
    const { state, navigation } = props;
    const { translationY } = useSharedState()
    const bottom = useSafeAreaInsets()

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: -translationY.value
                }
            ]
        }
    })
    return (
        <Animated.View style={[styles.tabBarContainer, animatedStyle, { paddingBottom: bottom.bottom }]}>
            {
                state.routes.map((route, index) => {
                    const isFocused = state.index === index
                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true
                        })
                        if (!isFocused && !event?.defaultPrevented) {
                            navigation.navigate(route.name)
                        }
                    }
                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key
                        })
                    }
                    return (
                        <ScalePress
                            key={index}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabItem}
                        >
                            {route?.name === "Home" && <HomeTabIcon focused={isFocused} />}
                            {route?.name === "Search" && <SearchTabIcon focused={isFocused} />}
                            {route?.name === "Library" && <LibraryTabIcon focused={isFocused} />}
                        </ScalePress>
                    )
                })
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tabBarContainer: {
        backgroundColor: Colors.backgroundDark,
        width: '100%',
        position: 'absolute',
        height: BOTTOM_TAB_HEIGHT,
        bottom: 0,
        padding: 10,
        zIndex: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
