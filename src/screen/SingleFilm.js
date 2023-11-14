import {React, useContext, useRef, useEffect, useState,useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {GetNoteAction} from '../actions/GetNote';
import Video from 'react-native-video';
import WDHT from './test.mp4';
// import WDHT from './World Domination How-To.m3u8'
import AppController from '../controllers/AppController';
import AppContext from '../utils/AppContext';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import videojs from 'video.js';
import Hls from 'hls.js';
import axios from 'axios';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const getHlsUrl = async filename => {
  console.log(filename);
  var url = 'http://192.168.1.99:9000/redirect/hls/' + filename;

  const {data} = await axios({
    method: 'get',
    url: url,
    headers: {myaxiosfetch: '123'},
  });
  console.log(data);
  var url = data.subserverurl;
  return url;
};
const getDashUrl = async filename => {
  var url =
    'http://192.168.1.99:9000/redirect/dash/' + filename + '/' + filename;

  const {data} = await axios({
    method: 'get',
    url: url,
    headers: {myaxiosfetch: '123'},
  });
  console.log(data);
  var url = data.subserverurl;
  return url;
};

const MovieDetailScreen = ({route, navigation}) => {
  const {movie} = route.params;
  const isFocus = useIsFocused();
  const appContext = useContext(AppContext);
  const videoRef = useRef();
  const [videoURL, setVideoURL] = useState('');
  const [videoDASHURL, setVideoDASHURL] = useState({uri: ''});
  const [videoHLSURL, setVideoHLSURL] = useState({uri: ''});

  const [showVideo, setShowVideo] = useState(false);

  const LoadVideo = useCallback(async () => {
    try {
      // var obj_play;
      // let url = 'http://192.168.1.99:9000/redirect/hls/World Domination How-To';

      // console.log(videoRef)
      // const config = {
      //   startPosition: 0, // can be any number you want
      // };
      // obj_play = {
      //   fill: true,
      //   fluid: true,
      //   autoplay: true,
      //   controls: true,
      //   preload: 'auto',
      //   loop: true,
      //   sources: [
      //     // {
      //     //   src: data.path,
      //     //   type: 'application/x-mpegURL',
      //     //   withCredentials: true,
      //     // },
      //   ],
      // };
      // const hls = new Hls(config);
      // hls.loadSource(url);
      // hls.attachMedia(videoRef.current);
      // hls.subtitleDisplay = true;

      // const _player = videojs(
      //   videoRef.current,
      //   obj_play,
      //   function onPlayerReady() {
      //     videojs.log('Your player is ready!');

      //     // In this context, `this` is the player that was created by Video.js.
      //     this.play();

      //     // volume scale 0 - 1
      //     const defaultVolume = 0.4;
      //     this.volume(defaultVolume);

      //     // How about an event listener?
      //     this.on('ended', function () {
      //       videojs.log('Awww...over so soon?!');
      //     });
      //   },
      // );
      // console.log(_player);

      var urlDash = await getDashUrl(movie.videos[0].videoname);
      setVideoDASHURL(() => {
        return urlDash;
      });

      var urlHls = await getHlsUrl(movie.videos[0].videoname);
      setVideoHLSURL(() => {
        return urlHls;
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    LoadVideo();
  }, [LoadVideo]);
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handlePlay = async () => {
    var urlDash = await getDashUrl(movie.videos[0].videoname);
    console.log(urlDash);

    setVideoDASHURL(() => {
      return urlDash;
    });

    var urlHls = await getHlsUrl(movie.videos[0].videoname);
    console.log('HLS là');
    console.log(urlHls);

    setVideoHLSURL(() => {
      return urlHls;
    });
    setShowVideo(true);
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={{width: '20%'}} onPress={handleGoBack}>
        <Text style={styles.buttonText}> Back</Text>
      </TouchableOpacity>
      {showVideo ? (
        <Video
          source={{uri: videoHLSURL}}
          // source={{uri: 'http://192.168.1.99:9200/videos/sF06UnxDash/init.mpd'}}
          // source={{uri: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"}}

          paused={false} // make it start    r
          style={styles.image} // any style you want
          repeat={true} // make it a loop
          ref={videoRef} // Store reference
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={error => {
            console.log(error);
          }}
        />
      ) : (
        <Image source={movie.poster} style={styles.image} resizeMode="cover" />
      )}
      <Text style={styles.episodes}>Episodes: 10</Text>
      <Text style={styles.ageRestriction}>Age Restriction: 18+</Text>
      <Text style={styles.numMovies}>Number of Movies: 5</Text>

      <TouchableOpacity style={styles.button} onPress={handlePlay}>
        <Text style={styles.buttonText}>Play Video</Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nunc
        eget nunc consectetur tincidunt. Nulla facilisi. Sed euismod, nisl ac
        tincidunt tincidunt, mi mauris aliquet odio, vitae aliquam nunc nunc id
        nunc. Sed vitae nunc eget nunc consectetur tincidunt. Nulla facilisi.
        Sed euismod, nisl ac tincidunt tincidunt, mi mauris aliquet odio, vitae
        aliquam nunc nunc id nunc.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Add to Playlist')}>
          <Text style={styles.buttonText}>Add to Playlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Rate Movie')}>
          <Text style={styles.buttonText}>Rate Movie</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Share')}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Download')}>
          <Text style={styles.buttonText}>Download</Text>
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
});

export default MovieDetailScreen;
