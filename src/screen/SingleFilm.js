import {React, useContext, useRef, useEffect, useState} from 'react';
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Orientation from 'react-native-orientation-locker';
import CommentList from '../components/commentList/commentList.js';
import movieAPIs from '../apis/movie-apis';
import commentAPIs from '../apis/comment-apis';

const MovieDetailScreen = ({route, navigation}) => {
  const {movie} = route.params;
  const isFocus = useIsFocused();
  const [videoUri, setVideoUri] = useState({uri: ''});
  const [comments, setComments] = useState([]);

  const videoRef = useRef();
  console.log('movie SingleFilm');
  const handleAddToWatchList = () => {
    // Check if the movie is not already in the watch list
    if (!watchList.some(item => item.id === movie.id)) {
      setWatchList([...watchList, movie]);
    }
  };

  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const CheckVideoAndEncode = async () => {};
    const LoadVideo = async () => {
      // try {

      //   console.log(videoRef)
      //   const config = {
      //     startPosition: 0, // can be any number you want
      //   };
      //   var obj_play = {
      //     fill: true,
      //     fluid: true,
      //     autoplay: true,
      //     controls: true,
      //     preload: 'auto',
      //     loop: true,
      //     sources: [
      //       {
      //         src: data.path,
      //       },
      //     ],
      //   };
      //   const _player = videojs(
      //     videoRef.current,
      //     obj_play,
      //     function onPlayerReady() {
      //       videojs.log('Your player is ready!');

      //       // In this context, `this` is the player that was created by Video.js.
      //       this.play();

      //       // volume scale 0 - 1
      //       const defaultVolume = 0.4;
      //       this.volume(defaultVolume);

      //       // How about an event listener?
      //       this.on('ended', function () {
      //         videojs.log('Awww...over so soon?!');
      //       });
      //     },
      //   );
      //   console.log(_player);

      //   // _player.on('xhr-hooks-ready', () => {
      //   //   const playerRequestHook = (options) => {
      //   //     options.beforeSend = (xhr) => {
      //   //       xhr.setRequestHeader('foo', 'bar');
      //   //     };
      //   //     console.log(options)
      //   //     return options;
      //   //   };
      //   //   _player.tech().vhs.xhr.onResponse(playerRequestHook);
      //   // });
      // } catch (error) {
      //   console.log(error);
      // }
      let url = '';
      if (
        movie.videos.length !== 0 &&
        movie.videos !== null &&
        movie !== undefined &&
        movie !== null
      ) {
        url = await movieAPIs.getDashUrl(movie.videos[0].videoname);
        setVideoUri(prevState => {
          return {uri: url};
        });
      }
    };

    const LoadComment = async () => {};
    //CheckVideoAndEncode();
    LoadVideo();
    LoadComment();
  }, []);
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handlePlay = async () => {
    let url = '';

    url = await movieAPIs.getDashUrl(movie.videos[0].videoname);
    console.log(url);
    setVideoUri(prevState => {
      return {uri: url};
    });

    setShowVideo(true);
  };

  const onFullscreenPlayerWillPresent = () => {
    Orientation.lockToLandscape();
  };

  const onFullscreenPlayerWillDismiss = () => {
    Orientation.lockToPortrait();
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={{width: '20%'}} onPress={handleGoBack}>
        <Text style={styles.buttonText}> Back</Text>
      </TouchableOpacity>
      {showVideo ? (
        <Video
          setControls
          controls
          resizeMode="cover"
          source={videoUri} // the video file
          // source={{uri: "https://tzvodacomcontent.s3.amazonaws.com/video-1654952965085/video-1654952965085.m3u8"}}
          // source={{uri: "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"}}

          onFullscreenPlayerWillPresent={onFullscreenPlayerWillPresent}
          onFullscreenPlayerWillDismiss={onFullscreenPlayerWillDismiss}
          paused={false} // make it start    r
          style={styles.image} // any style you want
          repeat={false} // make it a loop
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
      <Text style={styles.description}>{movie.filmInfo.overview}</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleAddToWatchList}>
          <Text style={styles.buttonText}>Add to Watch List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Download')}>
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.commentsTitle}>Comments</Text>
        {/* <View style={styles.commentContainer}>
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
          </View> */}
        {/* Add more comments here */}
        {movie !== undefined && movie !== null ? (
          <CommentList video={movie.videos[0]} />
        ) : null}
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
