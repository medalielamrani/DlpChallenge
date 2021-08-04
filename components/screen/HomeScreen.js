import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {fetchMovies} from '../../services/api';
import Loading from '../atoms/Loading';
import {IMAGE_URL} from '../../config/const';
const screen = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchNow, setSearchNow] = useState(false);

  //fetches movie and stores them in movies state

  useEffect(() => {
    setLoading(true);
    fetchMovies(searchTerm, movies).then(data => {
      setMovies(data);
      setLoading(false);
    });
  }, [searchNow]);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder={'search movies'}
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
          />
          <TouchableOpacity
            onPress={() => {
              console.log('pressed');
              setSearchNow(!searchNow);
            }}
            style={styles.searchBtn}>
            <Text style={styles.searchBtnLabel}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.movieListCard}>
          <FlatList
            data={movies}
            numColumns={1}
            renderItem={({item, index}) => {
              return (
                <View style={styles.movieCard}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Movie', {movie: item})}>
                    <Image
                      source={{
                        uri: IMAGE_URL + item.poster_path,
                      }}
                      style={styles.moviePic}
                      resizeMode="stretch"
                    />
                    <View style={styles.movieContent}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description}>{item.overview}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c0dae8',
    paddingTop: 100,
  },
  inputCard: {
    position: 'absolute',
    top: -40,
    margin: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 100,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  searchBtn: {
    zIndex: 100,
    width: 60,
    height: 37,
    backgroundColor: 'rgba(21,21,21,0.5)',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnLabel: {
    color: '#ffffff',
  },
  movieCard: {
    margin: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieListCard: {
    top: screen.height * 0.05,
  },
  moviePic: {
    height: 250,
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 14,
  },
  movieContent: {
    flexDirection: 'column',
    flex: 1,
  },
});
