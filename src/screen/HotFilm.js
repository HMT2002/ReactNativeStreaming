import { React, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Star from './Star';
import { useNavigation } from '@react-navigation/native';
import { PROXY_CLOUD, PROXY_TUE_LOCAL } from '@env';
import { ip } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
const MovieScreen = () => {
  const navigation = useNavigation();
  const [datas, setData] = useState({});
  const [userData, setUser] = useState({});
  const [selectedTag, setSelectedTag] = useState('rated');
  const isFocused = useIsFocused();

  const [ratedList, setRatedList] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movie });
  };
  async function getPlaylistForMovie(movieId) {
    try {
      const response = await axios.get(`http://${ip}:9000/playlists/all/${userData.id}`);
      setPlaylist(response.data[0].movieArr);
      if (response) { console.log("playlist " + response.data[0].movieArr.length) }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
  async function getRatingListForMovie(movieId) {
    try {

      const response = await axios.get(`http://${ip}:9000/rating/getfull/${userData.id}`);
      setRatedList(response.data);
      console.log(ratedList.length);
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    const retrieveUserData = async () => {
      try {
        await AsyncStorage.getItem('userData').then((data) => {
          const parsedUserData = JSON.parse(data);
          setUser(parsedUserData);
          console.log('Retrieved user data: ' + parsedUserData.id);

        });

      } catch (error) {
        console.error('Error retrieving user data: ', error);
      }
    };

    retrieveUserData();


  }, []);
  useEffect(() => {


    getRatingListForMovie();
    getPlaylistForMovie();
  }, [userData]);
  useEffect(() => {


    getRatingListForMovie();
    getPlaylistForMovie();
  }, [isFocused]);




  const renderArray = () => {
    if (selectedTag === 'rated') {
      return (
        <ScrollView>
          {ratedList && ratedList.map((item, index) => (
            <TouchableOpacity
              key={item.movie._id}
              style={styles.movieContainer}
              onPress={() => handleMoviePress(item.movie)}
            >
              <Image source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + item.movie.filmInfo.backdrop_path }} style={styles.poster} />
              <View key={item.movie.id} style={styles.movieDetails}>
                <Text style={styles.title}>{item.movie.filmInfo.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Star rating={item.movie.filmInfo.vote_average / 2} />
                  <Text style={styles.genre}>{item.movie.filmInfo.vote_count}</Text>
                </View>

              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          {playlist && playlist.map((item, index) => (
            <TouchableOpacity
              key={item._id}
              style={styles.movieContainer}
              onPress={() => handleMoviePress(item.movie)}
            >
              <Image source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + item.filmInfo.backdrop_path }} style={styles.poster} />
              <View key={item.id} style={styles.movieDetails}>
                <Text style={styles.title}>{item.filmInfo.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Star rating={item.filmInfo.vote_average / 2} />
                  <Text style={styles.genre}>{item.filmInfo.vote_count}</Text>
                </View>

              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    }
  };
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity style={{ flex: 1, borderColor: 'white', padding: 5, backgroundColor: selectedTag === 'rated' ? 'orange' : 'white', margin: 10 }} onPress={() => setSelectedTag('rated')}>
          <Text style={{ fontWeight: selectedTag === 'rated' ? 'bold' : 'normal' }}>Rated Film</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, borderColor: 'white', padding: 5, backgroundColor: selectedTag === 'playlist' ? 'orange' : 'white', margin: 10 }} onPress={() => setSelectedTag('playlist')}>
          <Text style={{ fontWeight: selectedTag === 'playlist' ? 'bold' : 'normal' }}>Your Playlist</Text>
        </TouchableOpacity>
      </View>
      {renderArray()}
    </View>
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
