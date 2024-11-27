import TrackPlayer, { Event, Capability, useProgress } from 'react-native-track-player';
import usePlayerStore from '../state/usePlayStore';
export async function playBackService() {

    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        TrackPlayer.play();
    })

    TrackPlayer.addEventListener(Event.RemotePause, async () => {
        TrackPlayer.pause()
    })

    TrackPlayer.addEventListener(Event.RemoteStop, async () => {
        TrackPlayer.stop()
        await usePlayerStore.getState().clear()
    })

    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        await usePlayerStore.getState().next()
    })

    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        await usePlayerStore.getState().previous()
    })


    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (e) => {
        const currenTrack = usePlayerStore.getState().currentPlayingTrack
        if (e?.track?.id === undefined || currenTrack?.id == e?.track?.id) {
            return;
        }
        const allTracks = usePlayerStore.getState().allTracks
        const track = allTracks.find((item) => item.id == e?.track?.id) as any

        usePlayerStore.getState().setCurrentPlayingTrack(track)

    })

    await TrackPlayer.setupPlayer()
    await TrackPlayer.updateOptions({
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
    })

}
