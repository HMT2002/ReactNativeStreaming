import { React, useContext, useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Button, FlatList } from 'react-native';
import { Avatar } from 'react-native-elements';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nextProvider, useTranslation } from 'react-i18next';
import axios from 'axios';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import { faAdd } from '@fortawesome/free-solid-svg-icons/faAdd'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown'
import { faShare } from '@fortawesome/free-solid-svg-icons/faShare'
import { faRankingStar } from '@fortawesome/free-solid-svg-icons/faRankingStar'
import { faHomeUser } from '@fortawesome/free-solid-svg-icons/faHomeUser'
import RatingModal from './RatingModal';
import StarRating from './StarRating';
import Star from './Star';
import Slider from '@react-native-community/slider';
import { ip } from '@env'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
const MovieDetailScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { movie } = route.params;
  const [speed, setSpeed] = useState(1.0);
  const [quality, setQuality] = useState('auto');
  const [clickedButton, setClickedButton] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [userData, setUser] = useState({});
  const [datas, setData] = useState([]);
  const [src, setSrc] = useState();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const handleMPaymentPress = (movie) => {
    setModalVisible(!modalVisible)
    navigation.navigate('Payment');
  };
  const handleSpeedChange = (value) => {
    setSpeed(value); // Set the playback speed based on the slider value
  };
  const handleQualityChange = (value) => {
    setQuality(value === 0 ? 'auto' : '720'); // Set the video quality based on the slider value
  };


  useEffect(() => {

    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          movie.videos.map((video) =>

            axios.get(`http://10.135.51.159:9000/redirect/hls/` + video.videoname, {
              headers: { myaxiosfetch: "123" },
            })
          )
        );

        const videoDataArray = responses.map((response) => response.data.subserverurl);
        setData(videoDataArray);
        setSrc(videoDataArray[0]);
        console.log(src);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
    const retrieveUserData = async () => {
      try {
        const Data = await AsyncStorage.getItem('userData');
        if (Data !== null) {
          const parsedUserData = JSON.parse(Data);
          setUser(parsedUserData);
          console.log('Retrieved user data: '+userData);
          // You can use the user data as needed
        } else {
          console.log('No user data found');
        }
      } catch (error) {
        console.error('Error retrieving user data: ', error);
      }
    };

    retrieveUserData();

  }, []);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const handleRatingButtonPress = () => {
    setModalVisible(true);
  };
  const handleVideoClick = (videoUrl, index) => {
    console.log("Playing video:", videoUrl);
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
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.index}
        style={[styles.spsButton, { backgroundColor: clickedButton === item.index ? 'red' : 'blue' }]}
        onPress={() => handleVideoClick(item.videoData, item.index)}
      >
        <Text style={styles.spsTittle}>Espisole{item.index}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={{ width: "20%", height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', margin: 6 }} onPress={handleGoBack}>
        <FontAwesomeIcon style={{ color: "red", fontSize: '39em', width: '200px', height: '50px' }} icon={faHomeUser} />
      </TouchableOpacity>
      {showVideo ? (
        <View style={styles.containerr}>
          <Video
            source={{ uri: src }}
            style={styles.video}
            controls={true}
            rate={speed}
            resizeMode={quality}
          />
          <View style={styles.sliderContainer}>
            <Text style={styles.label}>{t("play speed")}</Text>
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
          source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.filmInfo.backdrop_path }}
          style={styles.image}
          resizeMode="cover"
        />


      )}

      <View style={styles.spsCtainer}>
        {datas.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.spsButton}
            onPress={() => handleVideoClick(item)}
          >
            <Text style={styles.spsTitle}>{t("espisode")} {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {(!showVideo) && ((!movie.primaryTag) ? ( <TouchableOpacity style={{ backgroundColor: 'orange', width: 160, padding: 10, margin: 10, borderRadius: 6, alignSelf: 'center' }} onPress={handlePlay}>
        <Text style={styles.buttonText}>{t("play video")}</Text>
      </TouchableOpacity>) :
        (userData.isVip ? ( <TouchableOpacity style={{ backgroundColor: 'orange', width: 160, padding: 10, margin: 10, borderRadius: 6, alignSelf: 'center' }} onPress={handlePlay}>
        <Text style={styles.buttonText}>{t("play video")}</Text>
      </TouchableOpacity>) : (<TouchableOpacity style={{ backgroundColor: 'orange', width: 160, padding: 10, margin: 10, borderRadius: 6, alignSelf: 'center' }} key={3} onPress={() => handleMPaymentPress()}>
          <Text style={styles.handleMPaymentPress}>Buy Primium Package</Text>
        </TouchableOpacity>))
      )
      }

      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{movie.filmInfo.original_title}</Text>
        <Star rating={movie.filmInfo.vote_average / 2} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        {movie.filmInfo.adult ? (<Text style={styles.ageRestriction}>{t("age restriction")} :18+</Text>) : (<Text style={styles.ageRestriction}>{t("age restriction")} :6+</Text>)}
        <Text style={styles.ageRestriction}>{t("number of movies")}: {Object.keys(movie.videos).length}</Text>
        <Text style={styles.ageRestriction}>{movie.filmInfo.release_date
        }</Text>
      </View>

      <View style={{ alignItems: 'start', flexDirection: 'column' }}>
        <Text style={styles.description} numberOfLines={isCollapsed ? 1 : undefined}>{movie.filmInfo.overview}</Text>



      </View>
      <TouchableOpacity style={{}} onPress={toggleCollapse}>
        <Text style={{ color: 'white' }}>{isCollapsed ? t("read more") : t("read less")} ...</Text>

      </TouchableOpacity>
      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Add to Playlist')}>
          <Text style={styles.buttonText}>{t("add to playlist")}   <FontAwesomeIcon style={{ color: "white" }} icon={faAdd} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRatingButtonPress}>
          <Text style={styles.buttonText}>{t("rate movie")}  <FontAwesomeIcon style={{ color: "white" }} icon={faRankingStar} /></Text>

        </TouchableOpacity>
        <RatingModal visible={modalVisible} onClose={handleCloseModal} />
        <TouchableOpacity style={styles.button} onPress={() => console.log('Share')}>
          <Text style={styles.buttonText}>{t("share")}  <FontAwesomeIcon style={{ color: "white" }} icon={faShare} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Download')}>
          <Text style={styles.buttonText}>{t("download")}{userData.isVip?"yes":"no"}  <FontAwesomeIcon style={{ color: "white" }} icon={faArrowDown} /></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>{t("comment")}</Text>
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
  }, readmore: {
    alignSelf: 'star',
    width: '20%',
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
    flexWrap: 'wrap',
    marginBottom: 8,
  }, backgroundVideo: {
    position: 'absolute',
    top: 50,
    left: 0,
    bottom: 0,
    right: 0,
    width: 300,
    height: 500,
  }, containerr: {
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
    marginBottom: -10

  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white'
  },
  slider: {
    width: '100%',
  },
  value: {
    textAlign: 'center',
  },
});

export default MovieDetailScreen;
