import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView';
import withPlayer from '../../components/player/Player';
import usePlayerStore from '../../state/usePlayStore';
import CustomHeader from '../../components/ui/CustomHeader';
import CustomText from '../../components/ui/CustomText';
import { screenHeight } from '../../utils/Scaling';
import { FlatList } from 'react-native';
import TrackItem from '../../components/track/TrackItem';

function HomeScreen() {
    const allTracks = usePlayerStore((state) => state.allTracks);
    const currentPlayingTrack = usePlayerStore((state) => state.currentPlayingTrack);
    useEffect(() => {
        console.log("tracked changed ", currentPlayingTrack?.title)
    }, [currentPlayingTrack])
    const renderMusicTrack = ({ item }: any) => {
        return <TrackItem item={item} />;
    };

    return (
        <CustomSafeAreaView>
            <CustomHeader title="your track" />
            <FlatList
                data={allTracks}
                renderItem={renderMusicTrack}
                keyExtractor={(item: any) => item.id}
                extraData={currentPlayingTrack}
                showsVerticalScrollIndicator={false}
                style={{ paddingTop: 20 }}
            />
        </CustomSafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default withPlayer(HomeScreen);
