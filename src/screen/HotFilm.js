import {React, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {PROXY_CLOUD, PROXY_TUE_LOCAL} from '@env';
import {ip} from '@env';
const movies = [
  {
    id: 1,
    title: 'Movie 1',
    releaseDate: 'October 2023',
    image: require('../imagePoster/local/banner1.png'),
    description: 'This is the description for Movie 1.',
  },
  {
    id: 2,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 3,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 4,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 5,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 6,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  {
    id: 7,
    title: 'Movie 2',
    releaseDate: 'November 2023',
    image: require('../imagePoster/local/banner2.png'),
    description: 'This is the description for Movie 2.',
  },
  // Add more movies here
];

function MovieScreen() {
  const navigation = useNavigation();
  const [datas, setData] = useState({});
  const handleMoviePress = movie => {
    navigation.navigate('MovieDetail', {movie});
  };
  useEffect(() => {
    axios
      .get(PROXY_TUE_LOCAL + `/api/v1/info`)
      .then(function (response) {
        setData(response.data.data);

        console.log(response.data);
      })
      .catch(function (error) {
        console.log('homescreen' + error);
      });
  }, []);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {datas.length > 0 ? (
        datas.map(movie => (
          <TouchableOpacity
            key={movie.id}
            style={styles.movieContainer}
            onPress={() => handleMoviePress(movie)}>
            <Image
              source={{
                uri:
                  'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' +
                  movie.filmInfo.backdrop_path,
              }}
              style={styles.poster}
            />
            <View key={movie.id} style={styles.movieDetails}>
              <Text style={styles.title}>{movie.title}</Text>
              <Text style={styles.genre}>{movie.genre}</Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>loadding</Text>
      )}
      <Text>cc t met lam r do </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',

    backgroundColor: '#000',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  banner: {
    height: 200,

    backgroundColor: '#FFFFFF',
  },
  bannerImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  movieContainer: {
    marginRight: 16,
  },
  poster: {
    width: 120,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  movieDetails: {
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: '#fff',
  },
  modalContainer: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: 400,
    justifyContent: 'end',
    alignItems: 'start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#ff6f00',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  set: {
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: '#ff6f00',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 3,
    display: 'flex',
  },
});
export default MovieScreen;
