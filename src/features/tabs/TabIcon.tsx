import { RFValue } from "react-native-responsive-fontsize"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Colors, Fonts } from "../../utils/Constant"
import Home from '../../assets/icons/home.png'
import Search from '../../assets/icons/search.png'
import Library from '../../assets/icons/library.png'

import HomeFocus from '../../assets/icons/home_focused.png'
import SearchFocus from '../../assets/icons/search_focused.png'
import LibraryFocus from '../../assets/icons/library_focused.png'
import React from "react"
import CustomText from "../../components/ui/CustomText"

interface TabProps {
    name: string
}

interface IconProps {
    focus: boolean
}

const styles: ImageStyle = {
    width: RFValue(18),
    height: RFValue(18)
}


const tabStyles: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center'
}

const textStyleInActive: TextStyle = {
    textAlign: 'center',
    marginTop: 4,
    color: Colors.inactive
}

const textStyleActive: TextStyle = {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 4,
    color: Colors.text
}

const TabIcon: React.FC<TabProps> = ({ name }) => {
    return (
        <View style={tabStyles}>
            <Image
                source={name === "Home" ?
                    Home : name === "Search" ? Search : Library}
                style={styles}
            />
            <CustomText style={textStyleInActive}>{name}</CustomText>
        </View>
    )
}

const TabIconFocus: React.FC<TabProps> = ({ name }) => {
    return (
        <View style={tabStyles}>
            <Image
                source={name === "Home" ?
                    HomeFocus : name === "Search" ? SearchFocus : LibraryFocus}
                style={styles}
            />
            <CustomText style={textStyleActive}>{name}</CustomText>
        </View>
    )
}

export const HomeTabIcon: React.FC<IconProps> = ({ focused }: { focused: boolean }) => {
    return focused ? <TabIconFocus name="Home" /> : <TabIcon name="Home" />
}
export const LibraryTabIcon: React.FC<IconProps> = ({ focused }: { focused: boolean }) => {
    return focused ? <TabIconFocus name="Library" /> : <TabIcon name="Library" />
}

export const SearchTabIcon: React.FC<IconProps> = ({ focused }: { focused: boolean }) => {
    return focused ? <TabIconFocus name="Search" /> : <TabIcon name="Search" />
}
