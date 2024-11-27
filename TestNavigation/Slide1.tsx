import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function Slide1() {
    const navi = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'red' }}>Slide1</Text>
            <Button
                title="next"
                onPress={() => {
                    navi.navigate('slide2')
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
