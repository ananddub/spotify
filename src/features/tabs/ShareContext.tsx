import React, { createContext } from "react";
import { BOTTOM_TAB_HEIGHT } from "../../utils/Constant";
import { screenHeight } from "../../utils/Scaling";

import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

interface ShareContextType {
    translationY: Animated.SharedValue<number>,
    expandPlayer: () => void,
    collapsePlayer: () => void
    isExpanded: Animated.SharedValue<boolean>,
}

const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;

const SharedStateContext = createContext<ShareContextType | undefined>(undefined)

export const SharedStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const translationY = useSharedValue(0)
    const isExpanded = useSharedValue(false)
    const expandPlayer = () => {
        translationY.value = withTiming(-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, { duration: 600 })
        isExpanded.value = true
    }
    const collapsePlayer = () => {
        translationY.value = withTiming(0, { duration: 300 })
        isExpanded.value = false
    }
    return (
        <SharedStateContext.Provider value={{
            translationY,
            expandPlayer,
            collapsePlayer,
            isExpanded
        }}>
            {children}
        </SharedStateContext.Provider>
    )
}

export const useSharedState = () => {
    const context = React.useContext(SharedStateContext)
    if (context === undefined) {
        throw new Error('useSharedState must be used within a SharedStateProvider')
    }
    return context
}
