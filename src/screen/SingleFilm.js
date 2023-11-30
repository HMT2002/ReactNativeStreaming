import {React, useContext, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {GetNoteAction} from '../actions/GetNote';
import Video from 'react-native-video';
import WDHT from './test.mp4';
import Icon from 'react-native-vector-icons/FontAwesome';
// import WDHT from './World Domination How-To.m3u8'
import AppController from '../controllers/AppController';
import AppContext from '../utils/AppContext';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import videojs from 'video.js';
import Hls from 'hls.js';
import axios from 'axios';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import {faAdd} from '@fortawesome/free-solid-svg-icons/faAdd';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons/faArrowDown';
import {faShare} from '@fortawesome/free-solid-svg-icons/faShare';
import {faRankingStar} from '@fortawesome/free-solid-svg-icons/faRankingStar';
import {faHomeUser} from '@fortawesome/free-solid-svg-icons/faHomeUser';
import RatingModal from './RatingModal';
import Slider from '@react-native-community/slider';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const MovieDetailScreen = ({route, navigation}) => {
  const {movie} = route.params;
  console.log(movie.videos[0].videoname);
  const isFocus = useIsFocused();
  const appContext = useContext(AppContext);
  const videoRef = useRef();
  const [speed, setSpeed] = useState(1.0);
  const [quality, setQuality] = useState('auto');

  const handleSpeedChange = value => {
    setSpeed(value); // Set the playback speed based on the slider value
  };

  const handleQualityChange = value => {
    setQuality(value === 0 ? 'auto' : '720'); // Set the video quality based on the slider value
  };

  const [showVideo, setShowVideo] = useState(false);
  const [datas, setData] = useState('loveu');
  useEffect(() => {
    axios
      .get(
        'http://172.30.50.78:9000/redirect/hls/' + movie.videos[0].videoname,
        {
          headers: {myaxiosfetch: '123'},
        },
      )
      .then(function (response) {
        console.log(response.data);
        setData(response.data.subserverurl);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const url = 'https://jsonplaceholder.typicode.com/todos/1';

  const fetchUsers = () => {
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(async data => {
        console.log(data);
        setData(data);
      });
  };
  const [modalVisible, setModalVisible] = useState(false);

  const handleRatingButtonPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handlePlay = () => {
    setShowVideo(true);
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={{width: '20%'}} onPress={handleGoBack}>
        <Text style={styles.buttonText}>
          <FontAwesomeIcon style={{color: 'white'}} icon={faHomeUser} />
        </Text>
      </TouchableOpacity>
      {showVideo ? (
        <View style={styles.containerr}>
          <Video
            source={{uri: datas}}
            style={styles.video}
            controls={true}
            rate={speed}
            resizeMode={quality}
          />
          <View style={styles.sliderContainer}>
            <Text style={styles.label}>Adjust Speed:</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
              value={speed}
              onValueChange={handleSpeedChange}
            />
            <Text style={styles.value}>{speed.toFixed(2)}x</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.label}>Adjust Quality:</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              step={1}
              value={quality === 'auto' ? 0 : 1}
              onValueChange={handleQualityChange}
            />
            <Text style={styles.value}>
              {quality === 'auto' ? 'Auto' : '720p'}
            </Text>
          </View>
        </View>
      ) : (
        <Image
          source={{
            uri:
              'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' +
              movie.filmInfo.backdrop_path,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <Text style={styles.episodes}>
        Episodes: {movie.filmInfo.number_of_episodes}
      </Text>
      {movie.filmInfo.adult ? (
        <Text style={styles.ageRestriction}>Age Restriction:18+</Text>
      ) : (
        <Text style={styles.ageRestriction}>Age Restriction:6+</Text>
      )}
      <Text style={styles.numMovies}>
        Number of Movies: {Object.keys(movie.videos).length}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handlePlay}>
        <Text style={styles.buttonText}>Play Video</Text>
      </TouchableOpacity>

      <View>
        <Text
          style={styles.description}
          numberOfLines={isCollapsed ? 3 : undefined}>
          {' '}
          {movie.filmInfo.overview}
        </Text>
        {movie.filmInfo.overview.length > 100 && (
          <Button
            color="#000"
            style={styles.readmore}
            title={isCollapsed ? 'Read More' : 'Read Less'}
            onPress={toggleCollapse}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Add to Playlist')}>
          <Text style={styles.buttonText}>
            Add to Playlist{' '}
            <FontAwesomeIcon style={{color: 'white'}} icon={faAdd} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRatingButtonPress}>
          <Text style={styles.buttonText}>
            Rate Movie{' '}
            <FontAwesomeIcon style={{color: 'white'}} icon={faRankingStar} />
          </Text>
        </TouchableOpacity>
        <RatingModal visible={modalVisible} onClose={handleCloseModal} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Share')}>
          <Text style={styles.buttonText}>
            {' '}
            <FontAwesomeIcon style={{color: 'white'}} icon={faShare} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Download')}>
          <Text style={styles.buttonText}>
            {' '}
            <FontAwesomeIcon style={{color: 'white'}} icon={faArrowDown} />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>Comments</Text>
        <ScrollView style={styles.commentsScrollView}>
          <View style={styles.commentContainer}>
            <Avatar
              rounded
              source={require('../imagePoster/user/man.png')}
              size="small"
              containerStyle={styles.avatar}
            />
            <View style={styles.commentContent}>
              <Text style={styles.commentUser}>User 1</Text>
              <Text style={styles.commentText}>Comment 1</Text>
            </View>
          </View>
          <View style={styles.commentContainer}>
            <Avatar
              rounded
              source={require('../imagePoster/user/man1.png')}
              size="small"
              containerStyle={styles.avatar}
            />
            <View style={styles.commentContent}>
              <Text style={styles.commentUser}>User 2</Text>
              <Text style={styles.commentText}>Comment 2</Text>
            </View>
          </View>
          <View style={styles.commentContainer}>
            <Avatar
              rounded
              source={require('../imagePoster/user/userAvatar.jpg')}
              size="small"
              containerStyle={styles.avatar}
            />
            <View style={styles.commentContent}>
              <Text style={styles.commentUser}>User 3</Text>
              <Text style={styles.commentText}>Comment 3</Text>
            </View>
          </View>
          {/* Add more comments here */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  button: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  episodes: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  ageRestriction: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  numMovies: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#e50914',
    padding: 5,
    borderRadius: 4,
    margin: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  commentsContainer: {
    marginTop: 16,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  commentsScrollView: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    padding: 8,
  },
  readmore: {
    width: '20%',
    justifyContent: 'start',
    alignItems: 'center',
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  avatar: {
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 16,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 50,
    left: 0,
    bottom: 0,
    right: 0,
    width: 300,
    height: 500,
  },
  containerr: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  sliderContainer: {
    width: '80%',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  slider: {
    width: '100%',
  },
  value: {
    textAlign: 'center',
  },
});

export default MovieDetailScreen;
