import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/ui/CustomSafeAreaView';
import CustomHeader from '../../components/ui/CustomHeader';
import {fontR, screenHeight} from '../../utils/Scaling';
import CustomText from '../../components/ui/CustomText';
import Icon from '../../components/ui/Icon';

export default function SearchScreen() {
  return (
    <CustomSafeAreaView>
      <CustomHeader title="" />
      <View style={styles.container}>
        <Icon
          name="musical-note"
          iconFamily="Ionicons"
          color="white"
          size={fontR(40)}
        />
        <CustomText variant="h5">Comming Soon</CustomText>
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
