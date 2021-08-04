import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import Loading from '../atoms/Loading';
import Thumb from '../atoms/Thumb';
import BackButton from '../atoms/BackButton';
import InfoMovie from '../molecules/InfoMovie';

import {fetchCredits} from '../../services/api';
import {IMAGE_URL} from '../../config/const';
export default function MovieScreen({navigation, route}) {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [director, setDirector] = useState('');
  const {movie} = route.params;

  useEffect(() => {
    setLoading(true);
    fetchCredits(movie.id).then(data => {
      setCredits(data.credits);
      setDirector(data.director);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View>
        <BackButton navigation={navigation} />

        <Image
          source={{
            uri: IMAGE_URL + movie?.backdrop_path,
          }}
          style={styles.banner}
          resizeMode="stretch"
        />
        <InfoMovie style={styles.banner} movie={movie} director={director} />
      </View>
      <View style={styles.credit}>
        <>
          <Text style={styles.title}>CAST</Text>
          {credits && (
            <FlatList
              data={credits.cast}
              renderItem={({item}) => <Thumb item={item} />}
              horizontal
            />
          )}
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {height: 200},

  credit: {
    flex: 1,
    padding: 10,
  },

  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#c0dae8',
  },

  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
