import React from 'react';
import {Text, View, Image, StyleSheet, Dimensions} from 'react-native';
import ProgressBar from '../atoms/ProgressBar';
import {IMAGE_URL} from '../../config/const';
const screen = Dimensions.get('window');
const InfoMovie = ({movie, director}) => {
  return (
    <View style={styles.infoCard}>
      <View style={styles.textInfo}>
        <Text style={styles.title}>{movie.original_title}</Text>
        <Text style={{color: 'white', fontWeight: 'bold'}}>PLOT</Text>
        <Text style={{color: 'white', fontSize: 10}}>
          {movie.overview.length < 100
            ? movie.overview
            : movie.overview.substr(0, 100) + '...'}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ProgressBar vote_average={movie.vote_average} />
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {movie.vote_average}
          </Text>
        </View>
        <>
          <Text style={{color: 'white', fontWeight: 'bold'}}>DIRECTOR</Text>
          <Text style={{color: 'white', fontSize: 10}}>{director?.name}</Text>
        </>
      </View>
    </View>
  );
};

export default InfoMovie;

const styles = StyleSheet.create({
  infoCard: {
    padding: 10,
    backgroundColor: '#00E2B7',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    margin: 10,
  },
  poster: {
    width: screen.width * 0.3,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInfo: {
    left: 10,
    right: 10,
    flex: 1,
    justifyContent: 'space-evenly',
  },
});
