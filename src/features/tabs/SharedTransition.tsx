import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SharedStateProvider } from './ShareContext'
import UserBottomTab from './UserBottomTab'

export default function SharedTransition() {
    return (
        <SharedStateProvider>
            <UserBottomTab />
        </SharedStateProvider>
    )
}

const styles = StyleSheet.create({})
