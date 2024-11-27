import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({
    id: "spotify",
    encryptionKey: "spotify"
})

export const mmkvStorage = {
    getItem: (key: string) => {
        return storage.getString(key) ?? null
    },
    setItem: (key: string, value: string) => {
        storage.set(key, value)
    },
    removeItem: (key: string) => {
        storage.delete(key)
    }
}
