import { Platform, Image, StyleSheet, Text, View } from 'react-native'
import React, { act, useEffect, useState } from 'react'
import { useSharedState } from '../../features/tabs/ShareContext'
import TrackPlayer, { usePlaybackState, useProgress } from 'react-native-track-player'
import usePlayerStore from '../../state/usePlayStore'
import ImageColors from 'react-native-image-colors'
import { Colors, darkenColor } from '../../utils/Constant'
import { useNavigation } from '@react-navigation/native'
import { fontR, screenWidth } from '../../utils/Scaling'
import SlidingText from '../ui/SlidingText'
import CustomText from '../ui/CustomText'
import ScalePress from '../ui/ScalePress'
import Icon from '../ui/Icon'
import Slider from '@react-native-community/slider'
import PackageIcon from 'react-native-vector-icons/MaterialIcons'
export default function ControlAndDetail() {
    const { expandPlayer } = useSharedState()
    const progress = useProgress()
    const state = usePlaybackState()
    const [color, setColors] = useState(['#666', '#666'])
    const [icon, setIcon] = useState(undefined)

    const [isPlaying, setIsPlaying] = useState(state.state === "playing")
    const { play,
        currentPlayingTrack,
        pause,
        toggleRepeat,
        toggleShuffle,
        previous,
        next,
    } = usePlayerStore((state) => state);
    const isRepeating = usePlayerStore((state) => state.isRepeating)
    const states = usePlayerStore((state) => state)
    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60)
        const sec = Math.floor(seconds % 60)
        return `${min}:${sec < 10 ? "0" + sec : sec}`
    }

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

    const togglePlayback = async () => {
        if (isPlaying) {
            await pause()
        } else {
            await play()
        }
    }

    const handleSeek = async (value: number) => {
        const position = value * progress.duration
        await TrackPlayer.seekTo(position)
    }
    useEffect(() => {
        PackageIcon.getImageSource('circle', 15, 'white')
            .then((source) => setIcon(source))
    }, [])


    const handleLooping = async () => {
        const { isRepeating, isShuffling } = states
        console.log(isRepeating, isShuffling)
        if (isRepeating) {
            await toggleShuffle()
        } else {
            await toggleRepeat()
        }
    }
    useEffect(() => {
        const { isRepeating, isShuffling } = states
        console.log("isRepeating====>", { isRepeating, isShuffling })
    }, [states])
    return (
        <View style={styles.container}>
            <View style={styles.flexRowBetween}>
                <View style={{ width: '85%' }}>
                    <SlidingText
                        text={currentPlayingTrack?.title}
                        fontWeight='bold'
                        fontSize={fontR(18)}
                    />
                    <CustomText
                        fontSize={fontR(14)}
                        style={styles.aritish}>
                        {currentPlayingTrack?.artist?.name}
                    </CustomText>
                </View>
                <ScalePress>
                    <Icon
                        name="add-circle-outline"
                        iconFamily="MaterialIcons"
                        size={fontR(28)}
                        color="white"
                    />
                </ScalePress>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={progress.position / progress.duration || 0}
                minimumTrackTintColor='white'
                onSlidingComplete={handleSeek}
                maximumTrackTintColor='rgba(255,255,255,0.2)'
                thumbImage={icon}
                tapToSeek
            />
            <View style={styles.flexRowBetween}>
                <CustomText fontSize={fontR(14)} style={styles.subText}>
                    {formatTime(progress.position)}
                </CustomText>
                <CustomText fontSize={fontR(14)} style={styles.subText}>
                    {formatTime(progress.duration)}
                </CustomText>
            </View>
            <View style={styles.flexRowBetween}>
                <ScalePress onPress={handleLooping}>
                    <Icon
                        name={isRepeating ? "repeat" : "shuffle"}
                        iconFamily="Ionicons"
                        size={fontR(22)}
                        color="green"
                    />
                </ScalePress>

                <ScalePress onPress={previous}>
                    <Icon
                        name='play-skip-back-sharp'
                        iconFamily="Ionicons"
                        size={fontR(26)}
                        color="white"
                    />
                </ScalePress>

                <ScalePress onPress={togglePlayback}>
                    <Icon
                        name={isPlaying ? "pause-circle-sharp" : "play-circle-sharp"}
                        iconFamily="Ionicons"
                        size={fontR(50)}
                        color="white"
                    />
                </ScalePress>
                <ScalePress onPress={next}>
                    <Icon
                        name='play-skip-forward-sharp'
                        iconFamily="Ionicons"
                        size={fontR(26)}
                        color="white"
                    />
                </ScalePress>
                <ScalePress >
                    <Icon
                        name='alarm'
                        iconFamily="MaterialIcons"
                        size={fontR(22)}
                        color="white"
                    />
                </ScalePress>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        zIndex: 100,
    },
    subText: {
        color: 'white',
        marginTop: 2,
        opacity: 0.8
    },
    titleText: {
        marginTop: 10
    },
    modalContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        marginBottom: 40,
    },
    artistcontainer: {
        backgroundColor: Colors.backgroundLight,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 10
    },
    infoContainer: {
        backgroundColor: Colors.backgroundLight,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 10
    },
    artistCover: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    slider: {
        width: Platform.OS === 'android' ? screenWidth : screenWidth - 30,
        height: 40,
        alignSelf: 'center',
        marginTop: 10
    },
    timeZone: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        bottom: 10
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    aritish: {
        color: 'white',
        opacity: 0.8,
        marginTop: 5
    }
})
