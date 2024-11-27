import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import CustomText from './CustomText';

function CustomHeader({title}: {title: string}) {
  return (
    <View style={styles.flexRow}>
      <Image
        source={require('../../assets/images/logo_text.png')}
        style={styles.img}
      />
      <CustomText style={{fontWeight: '500'}}>{title}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  flexRow: {
    gap: 10,
  },
  text: {
    marginTop: 2,
  },
});

export default CustomHeader;
