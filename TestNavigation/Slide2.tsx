import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function Slide2() {
    const navi = useNavigation()
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'black',
            alignItems: 'center'
        }}>
            <Text style={{ color: 'red' }}>Slide2</Text>
            <Button
                title="next slide3"
                onPress={() => {
                    navi.navigate('slide3')
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})
