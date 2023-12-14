import { React, useContext, useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { GetNoteAction } from '../actions/GetNote';
import Video from 'react-native-video';

import Icon from 'react-native-vector-icons/FontAwesome';
// import WDHT from './World Domination How-To.m3u8'
import AppController from '../controllers/AppController';
import AppContext from '../utils/AppContext';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import videojs from 'video.js';
import Hls from 'hls.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Orientation from 'react-native-orientation-locker';
import CommentList from '../components/commentList/commentList.js';

const MovieDetailScreen = ({ route, navigation }) => {
  const { movie } = route.params;
  const isFocus = useIsFocused();
  const appContext = useContext(AppContext);
  const videoRef = useRef();
  const { watchList, setWatchList } = useContext(AppContext);

  const handleAddToWatchList = () => {
    // Check if the movie is not already in the watch list
    if (!watchList.some((item) => item.id === movie.id)) {
      setWatchList([...watchList, movie]);
    }
  };

  const [showVideo, setShowVideo] = useState(false);
  const [datas, setData] = useState([]);
  const [src, setSrc] = useState();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSpeedChange = value => {
    setSpeed(value); // Set the playback speed based on the slider value
  };
  const handleQualityChange = value => {
    setQuality(value === 0 ? 'auto' : '720'); // Set the video quality based on the slider value
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          movie.videos.map(video =>
            axios.get(
              `${PROXY_CLOUD}/redirect/dash/` +
                video.videoname +
                `/` +
                video.videoname,
              {headers: {myaxiosfetch: '123'}},
            ),
          ),
        );
        console.log(responses);
        const videoDataArray = responses.map(
          response => response.data.subserverurl,
        );
        setData(videoDataArray);
        setSrc(videoDataArray[0]);
        console.log(src);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, []);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleRatingButtonPress = () => {
    setModalVisible(true);
  };
  const handleVideoClick = (videoUrl, index) => {
    console.log('Playing video:', videoUrl);
    setClickedButton(index);
    setSrc(videoUrl);
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

  // const onFullscreenPlayerWillPresent = () => {
  //   Orientation.lockToLandscape();
  // };

  // const onFullscreenPlayerWillDismiss = () => {
  //   Orientation.lockToPortrait();
  // };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={{
          width: '20%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          margin: 6,
        }}
        onPress={handleGoBack}>
        <FontAwesomeIcon
          style={{
            color: 'red',
            fontSize: '39em',
            width: '200px',
            height: '50px',
          }}
          icon={faHomeUser}
        />
      </TouchableOpacity>
      {showVideo ? (
        <View style={styles.containerr}>
          <Video
            source={{uri: src}}
            style={styles.video}
            controls={true}
            rate={speed}
            resizeMode={quality}
          />
          <View style={styles.sliderContainer}>
            <Text style={styles.label}>{t('play speed')}</Text>
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
      <Text style={styles.episodes}>Episodes: 10</Text>
      <Text style={styles.ageRestriction}>Age Restriction: 18+</Text>
      <Text style={styles.numMovies}>Number of Movies: 5</Text>

      <TouchableOpacity style={styles.button} onPress={handlePlay}>
        <Text style={styles.buttonText}>Play Video</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Add to Playlist')}>
          <Text style={styles.buttonText}>
            {t('add to playlist')}{' '}
            <FontAwesomeIcon style={{color: 'white'}} icon={faAdd} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRatingButtonPress}>
          <Text style={styles.buttonText}>
            {t('rate movie')}{' '}
            <FontAwesomeIcon style={{color: 'white'}} icon={faRankingStar} />
          </Text>
        </TouchableOpacity>
        <RatingModal visible={modalVisible} onClose={handleCloseModal} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Share')}>
          <Text style={styles.buttonText}>
            {t('share')}{' '}
            <FontAwesomeIcon style={{color: 'white'}} icon={faShare} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Download')}>
          <Text style={styles.buttonText}>
            {t('download')}{' '}
            <FontAwesomeIcon style={{color: 'white'}} icon={faArrowDown} />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>{t('comment')}</Text>
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
  spsCtainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  spsButton: {
    margin: 6,
    padding: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 1,
  },
  spsTittle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  button: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
    backgroundColor: 'orange',
    borderRadius: 8,
    width: 'auto',
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
  episodeItem: {
    width: 60,
    height: 60,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  episodeNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ageRestriction: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  numMovies: {
    margin: 5,
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
    alignSelf: 'star',
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
    flexWrap: 'wrap',
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
    height: 300,
    marginBottom: 6,
  },
  sliderContainer: {
    width: '100%',
    marginBottom: -10,
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
