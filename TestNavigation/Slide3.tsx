import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Slide3() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'red' }}>Slide3</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
