import { View, Image, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSharedState } from '../../features/tabs/ShareContext'
import { usePlaybackState, useProgress } from 'react-native-track-player'
import usePlayerStore from '../../state/usePlayStore'
import ImageColors from 'react-native-image-colors'
import { darkenColor } from '../../utils/Constant'
import LinearGradient from 'react-native-linear-gradient'
import SlidingText from '../ui/SlidingText'
import { fontR } from '../../utils/Scaling'
import CustomText from '../ui/CustomText'
import Icon from '../ui/Icon'

const AirPlayer = () => {
    const { expandPlayer } = useSharedState()
    const progress = useProgress()
    const state = usePlaybackState()
    const [color, setColors] = useState(['#666', '#666'])
    const [isPlaying, setIsPlaying] = useState(state.state === "playing")
    const currentPlayingTrack = usePlayerStore((state) => state.currentPlayingTrack)
    const play = usePlayerStore((state) => state.play)
    const pause = usePlayerStore((state) => state.pause)


    useEffect(() => {
        setIsPlaying(state.state === "playing")
    }, [state.state])


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

    const calculateProgressWidth: any = () => {
        if (progress.duration > 0) {
            const percenatage = (progress.position / progress.duration) * 100
            return `${Math.round(percenatage)}%`
        }
        return "0%"
    }
    const togglePlayback = async () => {
        if (isPlaying) {
            await pause()
        } else {
            await play()
        }
    }

    return (
        <LinearGradient colors={color} style={styles.container}>
            <View style={styles.flexRowBetween}>
                <TouchableOpacity onPress={expandPlayer} activeOpacity={1}>
                    <View style={styles.flexRow}>
                        <Image
                            source={currentPlayingTrack?.artwork_uri}
                            style={styles.img}
                        />
                        <View style={{ width: '68%' }}>
                            <SlidingText
                                text={currentPlayingTrack?.title}
                                fontWeight="bold"
                                fontSize={fontR(8)}
                            />
                            <CustomText>
                                {currentPlayingTrack?.artist?.name}
                            </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.flexRow}>
                    <Icon
                        name="broadcast-on-home"
                        iconFamily="MaterialIcons"
                        color='#ccc'
                        size={fontR(20)}
                    />
                    <TouchableOpacity onPress={togglePlayback}>
                        <Icon
                            name={isPlaying ? 'pause' : 'play-arrow'}
                            iconFamily='MaterialIcons'
                            color='#ccc'
                            size={fontR(22)}
                        />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                    <View style={[styles.progressBar, { width: calculateProgressWidth() }]} />
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 5,
        overflow: 'hidden',
        width: '100%'
    },
    img: {
        borderRadius: 5,
        height: 45,
        width: 45,
        resizeMode: 'cover'
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    progressContainer: {
        height: 2,
        width: '100%',
        marginTop: 5
    },
    progressBackground: {
        height: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    progressBar: {
        height: 3,
        backgroundColor: 'white'
    }
})


export default AirPlayer
