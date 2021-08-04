import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.pop()}>
      <Text>{'< BACK'}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
const styles = StyleSheet.create({
  backBtn: {
    zIndex: 100,
    width: 100,
    height: 30,
    backgroundColor: 'rgba(21,21,21,0.5)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
  },
});
