import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"
import { trackData } from "../utils/dummyData";
import { convertTrack } from "../utils/Constant";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { mmkvStorage } from "./storage";
interface Track {
    id: any;
    track_uri: string; video_uri?: string;
    title: string;
    lyricist: string;
    artist: any;
    artwork_uri: any;
    category: string
}

interface PlayerStore {
    currentPlayingTrack: Track | null;
    allTracks: Track[];
    isShuffling: boolean;
    isRepeating: boolean;
    clear: () => void;
    setCurrentTrack: (track: Track) => Promise<void>;
    setCurrentPlayingTrack: (track: Track) => Promise<void>;
    play: () => Promise<void>;
    pause: () => Promise<void>;
    next: () => Promise<void>;
    previous: () => Promise<void>;
    toggleRepeat: () => Promise<void>;
    toggleShuffle: () => Promise<void>;
}

const usePlayerStore = create<PlayerStore>()(
    persist(
        (set, get) => ({
            currentPlayingTrack: null,
            allTracks: trackData,
            isShuffling: false,
            isRepeating: false,
            clear: () => {
                set({ currentPlayingTrack: null })
            },
            setCurrentTrack: async (track: Track) => {
                set({ currentPlayingTrack: track })
            },
            setCurrentPlayingTrack: async (track: Track) => {
                const { allTracks } = get()
                await TrackPlayer.reset();
                const currentTrackConvert = convertTrack(track)
                const otherTracks = allTracks.filter((t) => t.id !== track.id).map(convertTrack)
                await TrackPlayer.add([currentTrackConvert, ...otherTracks])
                await TrackPlayer.play()
                set({ currentPlayingTrack: track })
            },
            play: async () => {
                const { currentPlayingTrack, allTracks } = get()
                const activeTrack = await TrackPlayer.getActiveTrack()
                if (activeTrack) {
                    await TrackPlayer.play()
                } else {
                    await TrackPlayer.reset()
                    const currentTrackConvert = convertTrack(currentPlayingTrack)
                    const otherTracks = allTracks.filter((t) => t.id !== currentPlayingTrack?.id).map(convertTrack)

                    await TrackPlayer.add([currentTrackConvert, ...otherTracks])
                    await TrackPlayer.play()
                }
            },
            pause: async () => {
                await TrackPlayer.pause()
            },
            next: async () => {
                const { currentPlayingTrack, allTracks, isRepeating } = get()
                await TrackPlayer.reset()
                if (isRepeating) {
                    await TrackPlayer.add([convertTrack(currentPlayingTrack)])
                    return TrackPlayer.play()
                    return;
                }
                const currentIndex = allTracks.findIndex((t) => t.id === currentPlayingTrack?.id)
                let nextIndex = (currentIndex + 1) % allTracks.length
                if (allTracks.length === 1) {
                    nextIndex = curIndex
                }
                const nextTrack = allTracks[nextIndex]
                if (nextTrack) {
                    set({ currentPlayingTrack: nextTrack })
                    const otherTracks = allTracks.filter((t) => t.id !== currentPlayingTrack?.id).map(convertTrack)
                    await TrackPlayer.add([convertTrack(nextTrack), ...otherTracks])
                    await TrackPlayer.play()
                }

            },
            previous: async () => {
                const { currentPlayingTrack, allTracks } = get()
                await TrackPlayer.reset()
                const currentIndex = allTracks.findIndex((t) => t.id === currentPlayingTrack?.id)
                let prevIndex = (currentIndex - 1 + allTracks.length) % allTracks.length
                if (prevIndex < 0) {
                    prevIndex = allTracks.length - 1
                }
                const prevTrack = allTracks[prevIndex]
                if (prevTrack) {
                    set({ currentPlayingTrack: prevTrack })
                    const otherTracks = allTracks.filter((t) => t.id !== currentPlayingTrack?.id).map(convertTrack)
                    await TrackPlayer.add([convertTrack(prevTrack), ...otherTracks])
                    await TrackPlayer.play()
                }
            },
            toggleRepeat: async () => {
                try {
                    const { currentPlayingTrack } = get()
                    await TrackPlayer.reset()
                    await TrackPlayer.add([convertTrack(currentPlayingTrack)])
                    await TrackPlayer.setRepeatMode(RepeatMode.Track)
                    await TrackPlayer.play()
                } finally {
                    set({ isShuffling: false, isRepeating: true })
                }
            },
            toggleShuffle: async () => {
                try {
                    const { currentPlayingTrack, allTracks } = get()
                    await TrackPlayer.reset()
                    const otherTracks = allTracks?.filter(t => t.id !== currentPlayingTrack?.id).map(convertTrack)
                    await TrackPlayer.add([convertTrack(currentPlayingTrack), ...otherTracks])
                    await TrackPlayer.play()
                    await TrackPlayer.setRepeatMode(RepeatMode.Off)
                    await TrackPlayer.play()
                } finally {
                    set({ isShuffling: true, isRepeating: false })
                }
            }

        }),
        {
            name: "player-store",
            storage: createJSONStorage(() => mmkvStorage),
        }
    )
)

export default usePlayerStore

