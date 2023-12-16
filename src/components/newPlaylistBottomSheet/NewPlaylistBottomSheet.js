/* eslint-disable*/
import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';

import TaskShorcut from '../tasks/TaskShortcut';
import AuthContext from '../../store/auth-context';
import {TextInput} from '@react-native-material/core';
import playlistAPIs, {
  DELETEPlaylistAction,
  POSTAddVideoToPlaylistAction,
} from '../../apis/playlist-apis';
// import BottomSheet from '@gorhom/bottom-sheet';
const NewPlaylistBottomSheet = props => {
  const authCtx = useContext(AuthContext);
  const [video, setVideo] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [inputPlaylistname, setInputPlaylistname] = useState('');
  const [input, setInput] = useState();

  const addToPlaylist = async playlist => {
    if (!props.video || !authCtx.token || !playlist._id) {
      console.log('Failed to add to playlist');
      return;
    }
    const response = await POSTAddVideoToPlaylistAction(
      props.video._id,
      props.info._id,
      authCtx.token,
      playlist._id,
    );
    console.log(response);
  };

  const onNewPlaylistPress = useCallback(async () => {
    console.log('Create new playlist ' + inputPlaylistname);
    if (inputPlaylistname.trim() === '') {
      setInputPlaylistname(prevState => {
        return '';
      });
      console.log('Playlistname is empty');

      return;
    }
    const response = await playlistAPIs.POSTCreatePlaylist(
      inputPlaylistname,
      authCtx.token,
    );
    console.log('%#$%^#$%$%#$%#$%#$%#$%#%%%^%$^%$$%#$%#$%$%^#$%#$%');
    console.log(response);
    setPlaylists(prevState => {
      return [
        ...prevState,
        {playlistname: inputPlaylistname, _id: response.playlist._id},
      ];
    });
    setInputPlaylistname(prevState => {
      return '';
    });
  });
  const deletePlaylistHandler = async index => {
    console.log('deletePlaylistHandler push ' + index);
    const selecplaylist = playlists[index];
    console.log(selecplaylist);
    if (index > -1) {
      const response = await DELETEPlaylistAction(selecplaylist._id);
      console.log(response);
      setPlaylists(playlists.filter(item => item._id !== selecplaylist._id));
    }
  };

  useEffect(() => {
    console.log('########################NewPlaylistBottomSheet props');
    const LoadPlaylists = async () => {
      if (authCtx.isStayLoggedIn === false) {
        console.log('User is not signed in yet, cant find playlists');
        return;
      }
      const user_playlists = await playlistAPIs.GETAllPlaylistByUser(
        authCtx.token,
      );
      setPlaylists(user_playlists);
    };

    setVideo(prevState => {
      return props.video;
    });
    LoadPlaylists();
  }, [props.video]);

  return (
    <View>
      <View style={styles.containerNewPlaylist}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.newPlaylist}
            value={inputPlaylistname}
            onChangeText={text => setInputPlaylistname(text)}
            placeholder="New playlist"
          />
        </View>

        <TouchableOpacity
          onPress={onNewPlaylistPress}
          style={styles.buttonAddNew}>
          <Text style={styles.addNewPlaylistText}>Create</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.seperatorText}>
        ---------------------------------------------------------------------------
      </Text>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {playlists.map((playlist, index) => {
            return (
              <View style={styles.containerPlaylists}>
                <TouchableOpacity
                  onPress={() => {
                    addToPlaylist(playlists[index]);
                  }}
                  style={styles.playlistItem}>
                  <Text style={styles.playlistItemText}>
                    {playlist.playlistname}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deletePlaylistItem}
                  onPress={() => {
                    deletePlaylistHandler(index);
                  }}>
                  <Text style={styles.deletePlaylistItemText}>X</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  containerNewPlaylist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerPlaylists: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  buttonAddNew: {
    width: 170,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
  },
  addNewPlaylistText: {
    color: '#f3cc1f',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  newPlaylist: {
    width: 170,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  itemText: {
    fontSize: 16,
    color: 'black',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  newPlaylistContainer: {},

  playlistCard: {
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    marginBottom: '5%',
    borderRadius: 10,
  },
  playlistItem: {
    height: 40,
    width: 300,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
  },
  playlistItemText: {
    color: 'black',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  deletePlaylistItemText: {
    color: '#eb1515',
    textAlign: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  seperatorText: {
    color: '#78aca5af',
    textAlign: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  deletePlaylistItem: {
    height: 40,
    width: 40,
    borderColor: '#f80909',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  bannerImage: {
    height: 70,
    maxHeight: 70,
    maxWidth: 70,
  },
  playlistCard__image: {
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  playlistCard__content: {
    flexDirection: 'column',
    padding: 5,
    flex: 1,
  },

  playlistCard_title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 10,
  },

  playlistCard_subTitle: {
    flexWrap: 'wrap',
    marginBottom: 10,
    flex: 1,
  },

  playlistCard_lastUpdated: {
    fontSize: 10,
  },

  playlistCard_popupMenu: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    height: 190,
  },
});
export default NewPlaylistBottomSheet;
