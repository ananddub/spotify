import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import usePlayerStore from '../../state/usePlayStore';
import { Colors } from '../../utils/Constant';
import { resetAndNavigate } from '../../utils/NavigationUtil';
import CustomText from '../ui/CustomText';
import { fontR } from '../../utils/Scaling';
import Icon from '../ui/Icon';
interface TrackItemProps {
    item: any,
    onNavigate?: boolean,
}

export default function TrackItem({ item, onNavigate }: TrackItemProps) {
    const { currentPlayingTrack, setCurrentPlayingTrack } = usePlayerStore.getState();
    const togglePlayTrack = async () => {
        await setCurrentPlayingTrack(item)
    }
    const isActive = currentPlayingTrack?.id === item?.id
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={
                () => {
                    togglePlayTrack()
                    if (onNavigate) {
                        resetAndNavigate("UserBottomTab")
                    }
                }
            }

        >
            <View style={styles.flexRowBetween}>
                <View style={styles.flexRow}>
                    <Image
                        source={item?.artwork_uri}
                        style={styles.img}
                    />
                    <View style={styles.trackInfo}>
                        <CustomText variant="h6"
                            numberOfLines={1}
                            fontSize={fontR(9)}
                            style={{
                                color: isActive ? Colors.primary : Colors.text
                            }}
                        >{item?.title}</CustomText>
                        <CustomText
                            numberOfLines={1}
                            fontSize={fontR(8)}
                            style={{
                                color: Colors.text
                            }}
                        >
                            {item?.artist?.name}
                        </CustomText>

                    </View>
                </View>
                <Icon name="ellipsis-horizontal-sharp" iconFamily="Ionicons" color={Colors.text} size={fontR(14)} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.backgroundDark,
        marginVertical: 5
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    img: {
        borderRadius: 10,
        width: 50,
        height: 50,
        resizeMode: 'cover'
    },
    trackInfo: {
        width: "65%"
    }
})
