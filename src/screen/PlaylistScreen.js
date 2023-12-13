import {React, useContext, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {GetNoteAction} from '../actions/GetNote';
import Video from 'react-native-video';
import WDHT from './test.mp4';
// import WDHT from './World Domination How-To.m3u8'
import AppController from '../controllers/AppController';
import AppContext from '../utils/AppContext';
import AuthContext from '../store/auth-context';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import videojs from 'video.js';
import Hls from 'hls.js';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Orientation from 'react-native-orientation-locker';
import CommentList from '../components/commentList/commentList.js';
import movieAPIs from '../apis/movie-apis';
import commentAPIs from '../apis/comment-apis';
import playlistAPIs from '../apis/playlist-apis';
import {useNavigation} from '@react-navigation/native';
import PlaylistCard from '../components/playlistItem/PlaylistCard';

const PlaylistScreen = ({route, navigation}) => {
  const [playlists, setPlaylist] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const authCtx = useContext(AuthContext);
  const appContext = useContext(AppContext);
  const LoadPlaylist = async () => {
    const user_playlists = await playlistAPIs.GETAllPlaylistByUser(
      authCtx.token,
    );
    console.log(user_playlists);
    setPlaylist(prevState => {
      return user_playlists;
    });
  };
  const handleAddToWatchList = () => {
    // if (!appContext.watchList.some(item => item.id === movie.id)) {
    //   appContext.setWatchList([...appContext.watchList, movie]);
    // }
  };

  useEffect(() => {
    LoadPlaylist();
  }, []);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const playlistHandler = async playlist => {
    console.log('&&&&&&&&&&&');
    console.log(playlist);
  };

  const newPlaylistHandler = async () => {
    console.log('add new playlist');
    const payload = {};
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={{width: '20%'}} onPress={handleGoBack}>
        <Text style={styles.buttonText}> Back</Text>
      </TouchableOpacity>
      {playlists.map(playlist => {
        return (
          <TouchableOpacity
            key={playlist._id}
            style={styles.playlistBlock}
            onPress={() => {
              playlistHandler(playlist);
            }}>
            <PlaylistCard playlist={playlist} />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 20,
    right: 20,
    backgroundColor: '#ff6f00',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  mainScreen: {
    flex: 1,
    flexDirection: 'column',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  mainScreen__header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'inherit',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  mainScreen__contentContainer: {
    flex: 8,
    flexDirection: 'column',
    backgroundColor: 'inherit',
  },

  mainScreen__toolbar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '3%',
  },

  mainScreen__title: {
    backgroundColor: 'transparent',
    fontSize: 25,
    marginLeft: '5%',
  },

  mainScreen__icon: {
    backgroundColor: 'transparent',
    size: 25,
    marginHorizontal: '3%',
  },

  mainScreen__newNoteFAB: {
    backgroundColor: 'transparent',
    color: '#fcba03',
    variant: 'standard',
    size: 'default',
    marginLeft: 'auto',
    marginRight: '5%',
    marginTop: '-7%',
    marginBottom: 'auto',
  },
});

export default PlaylistScreen;
