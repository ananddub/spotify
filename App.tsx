import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/navigation/Navigation';
import TrackPlayer from 'react-native-track-player';
import NavigationTest from './TestNavigation/Navigation';
export default function App() {
    useEffect(() => {
        if (Platform.OS === 'android') {
            TrackPlayer.setupPlayer();
        }
    }, []);
    // return <NavigationTest />
    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={'#000'} />
            <View style={styles.container}>
                <Navigation />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
