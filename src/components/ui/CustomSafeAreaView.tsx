import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/Constant'
import { SafeAreaView } from 'react-native-safe-area-context'

interface CustomSafeAreaViewProps {
    children?: React.ReactNode,
    style?: ViewStyle,

}

export default function CustomSafeAreaView({ children, style }: CustomSafeAreaViewProps) {
    return (
        <View style={[styles.container, style]}>
            <SafeAreaView />
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 2,
        backgroundColor: Colors.background
    }
})
