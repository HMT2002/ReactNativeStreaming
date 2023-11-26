import {React,useContext,useRef,useEffect,useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import {GetNoteAction} from '../actions/GetNote';
import Video from 'react-native-video';
import WDHT from './test.mp4'

// import WDHT from './World Domination How-To.m3u8'
import AppController from '../controllers/AppController';
import AppContext from '../utils/AppContext';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import videojs from 'video.js';
import Hls from 'hls.js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
const MovieDetailScreen = ({ route, navigation }) => {

  
  const { movie } = route.params;
  const isFocus = useIsFocused();
  const appContext = useContext(AppContext);
  const videoRef = useRef();
     
 
  const [showVideo, setShowVideo] = useState(false);
  const [datas,setData]=useState('loveu');
  useEffect(() => {
           
    axios.get('http://192.168.1.10:9000/redirect/hls/'+movie.videos[0].videoname,{
      headers: {myaxiosfetch:"123"},
    })
  .then(function (response) {

setData(response.data.subserverurl);

  })
  .catch(function (error) {
    console.log(error);
  });
 
  },[]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    const fetchUsers =  () => {
     fetch(url).then((res)=>{
      return res.json();
     }).then(async (data)=>{
      console.log(data);
      setData(data);
     })   
    };

  const handleGoBack = () => {
    navigation.goBack();
  };  
  const handlePlay = () => {
    setShowVideo(true);
  };  
  return (
    <ScrollView style={styles.container}>
       <TouchableOpacity style={{width:"20%"}} onPress={handleGoBack}>
        <Text style={styles.buttonText}>{datas}</Text>
      </TouchableOpacity>
      {showVideo ? (
      <Video
  
      source={{uri: datas}}// the video file
     
      controls={true}
      style={styles.image} 
      repeat={true} 
      ref={videoRef} 
      onBuffer={this.onBuffer} 
      onError={error => {
        console.log(error);
      }}
    />
    ) : (
 
       <Image
       source={{uri:'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'+movie.filmInfo.backdrop_path}}
        style={styles.image}
        resizeMode="cover"
      />
       
    
    )}
      <Text style={styles.episodes}>Episodes: {movie.filmInfo.number_of_episodes}</Text>
      {movie.filmInfo.adult?(<Text style={styles.ageRestriction}>Age Restriction:18+</Text>):(<Text style={styles.ageRestriction}>Age Restriction:6+</Text>)} 
      <Text style={styles.numMovies}>Number of Movies: {Object.keys(movie.videos).length }</Text>
   
      <TouchableOpacity style={styles.button} onPress={handlePlay}>
        <Text style={styles.buttonText}>Play Video</Text>
      </TouchableOpacity>
     
      <View>
      <Text style={styles.description} numberOfLines={isCollapsed ? 3 : undefined}>  {movie.filmInfo.overview}</Text>
      {movie.filmInfo.overview.length > 100 && (
        <Button color="#000"
        style={styles.readmore} title={isCollapsed ? 'Read More' : 'Read Less'} onPress={toggleCollapse} />
      )}
    </View>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Add to Playlist')}>
            <Text style={styles.buttonText}>Add to Playlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Rate Movie')}>
            <Text style={styles.buttonText}>Rate Movie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Share')}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Download')}>
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
  },readmore:{
    width:'20%',
    justifyContent: 'start',
      alignItems: 'center'
  
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
  }, description: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },backgroundVideo: {
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
