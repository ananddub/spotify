import { Platform, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { Colors, Fonts } from '../../utils/Constant';
import { RFValue } from 'react-native-responsive-fontsize';
interface Props extends TextStyle {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8' | 'h9' | 'body';
    fontFamily?: Fonts;
    fontSize?: number;
    fontWeight?: any,
    color?: string;
    children?: React.ReactNode;
    style?: TextStyle | TextStyle[];
    numberOfLines?: number;
    onLayout?: (event: any) => void
}
const PFontsize = (fontsize: number) => {
    return Platform.OS === 'android' ? RFValue(fontsize) : RFValue(fontsize - 2)
}
export default function CustomText(props: Props) {
    if (props.fontFamily === undefined) {
        props.fontFamily = Fonts.Bold
    } else {
        console.log('FontFamily :', props.fontFamily)
    }
    let computed: number = PFontsize(12)
    switch (props.variant) {

        case 'h1':
            computed = PFontsize(24)
            break;
        case 'h2':
            computed = PFontsize(22)
            break;
        case 'h3':
            computed = PFontsize(20)
            break;
        case 'h4':
            computed = PFontsize(18)
            break;
        case 'h5':
            computed = PFontsize(16)
            break;
        case 'h6':
            computed = PFontsize(14)
            break;
        case 'h7':
            computed = PFontsize(12)
            break;
        case 'h8':
            computed = PFontsize(10)
            break;
        case 'h9':
            computed = PFontsize(8)
            break;
    }
    return (
        <Text
            onLayout={props.onLayout}
            numberOfLines={props.numberOfLines}
            style={[styles.text, {
                color: Colors.text,
                fontSize: computed,
            },
            { fontWeight: props.fontWeight },
            { fontFamily: props.fontFamily },
            props.style
            ]}
            {...props}
        >
            {props.children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'left'
    }
})
