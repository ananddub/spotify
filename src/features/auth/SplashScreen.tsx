import { StyleSheet, Image, View } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../utils/Constant'
import { screenHeight, screenWidth } from '../../utils/Scaling'
import { resetAndNavigate } from '../../utils/NavigationUtil'

export default function SplashScreen() {
    useEffect(() => {
        setTimeout(() => {
            resetAndNavigate('UserBottomTab')
        }, 300)
    }), []
    return (
        <View style={styles.container}>
            <Image
                style={styles.logoImage}
                source={require('../../assets/images/logo.png')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        height: screenHeight * 0.4,
        width: screenWidth * 0.4,
        resizeMode: 'contain'
    }
})

