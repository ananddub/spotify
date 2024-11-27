import { View, Text, StyleSheet, Platform, Touchable, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, darkenColor } from '../../utils/Constant'
import { fontR, screenHeight, screenWidth } from '../../utils/Scaling'
import usePlayerStore from '../../state/usePlayStore'
import { useSharedState } from '../../features/tabs/ShareContext'
import ImageColors from 'react-native-image-colors'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../ui/Icon'
import CustomText from '../ui/CustomText'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoPlayer from './VideoPlayer'
import ControlAndDetail from './ControlAndDetail'

const FullScreenPlayer = () => {
    const { collapsePlayer } = useSharedState()
    const [color, setColors] = useState(['#666', '#666'])
    const { play, pause, currentPlayingTrack, isRepeating } = usePlayerStore((state) => state)

    useEffect(() => {
        const url = currentPlayingTrack?.artwork_uri
        ImageColors.getColors(url, {
            fallback: "#666",
            cache: true,
            key: url
        }).then((c: any) => {
            const color = Platform.OS === "ios" ? c.secondary : c.vibrant
            const darkendecSecondary = darkenColor(color)
            setColors([darkendecSecondary, darkendecSecondary])
        })
    }, [currentPlayingTrack])
    return (
        <View style={styles.container}>
            {
                currentPlayingTrack?.video_uri ?
                    <VideoPlayer video_uri={currentPlayingTrack?.video_uri} />
                    : <View style={styles.imageContainer}>
                        <Image source={currentPlayingTrack?.artwork_uri}
                            style={styles.img} />
                    </View>
            }

            <LinearGradient
                colors={[...color, 'rgba(0,0,0,0.9)']}
                style={styles.gradiant}
            />

            <SafeAreaView style={styles.flexRowBetween}>
                <TouchableOpacity onPress={collapsePlayer}>
                    <Icon name="chevron-down-sharp" iconFamily="Ionicons" color='white' size={fontR(20)} />
                </TouchableOpacity>
                <CustomText fontWeight={'bold'} variant='h6'>{currentPlayingTrack?.artist?.name}</CustomText>
                <TouchableOpacity>
                    <Icon name="ellipsis-horizontal-sharp" color='white' iconFamily="Ionicons" size={fontR(20)} />
                </TouchableOpacity>
            </SafeAreaView>
            <View style={styles.albumContainer} />
            <ControlAndDetail />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.background,
        height: screenHeight
    },
    gradiant: {
        height: screenHeight,
        width: screenWidth,
        zIndex: -3,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: Platform.OS === 'ios' ? 50 : 30
    },
    albumContainer: {
        width: '100%',
        height: screenHeight * 0.42,
    },
    imageContainer: {
        position: 'absolute',
        width: screenWidth * 0.9,
        height: screenHeight * 0.42,
        overflow: 'hidden',
        borderRadius: 10,
        alignSelf: 'center',
        top: screenHeight * 0.17
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
})

export default FullScreenPlayer
