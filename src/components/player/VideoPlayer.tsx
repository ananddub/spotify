import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import Video from 'react-native-video'
import LinearGradient from 'react-native-linear-gradient'
interface Props {
    video_uri: string
}
export default function VideoPlayer(props: Props) {
    return (
        <View>
            <Video
                source={{ uri: props.video_uri }}
                ignoreSilentSwitch='ignore'
                playWhenInactive={false}
                playInBackground={false}
                controls={false}
                disableFocus={true}
                muted
                style={styles.videoContainer}
                repeat
                hideShutterView
                resizeMode="cover"
                shutterColor='transparent'
            />
            <LinearGradient
                colors={[
                    'rgba(0,0,0,0)',
                    'rgba(0,0,0,0.1)',
                    'rgba(0,0,0,0.2)',
                    'rgba(0,0,0,0.3)',
                    'rgba(0,0,0,0.4)',
                    'rgba(0,0,0,0.5)',
                    'rgba(0,0,0,0.6)',
                    'rgba(0,0,0,0.7)',
                    'rgba(0,0,0,0.8)',
                    'rgba(0,0,0,0.9)',
                    'rgba(0,0,0,1)',
                ]}
                style={styles.gradiant}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    videoContainer: {
        height: screenHeight,
        aspectRatio: 16 / 9,
        width: screenWidth,
        position: 'absolute',
        zIndex: -2
    },
    gradiant: {
        height: screenHeight,
        width: screenWidth,
        zIndex: -1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }
})
