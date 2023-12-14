import { React, useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, Modal, Dimensions, ImageBackground, Button } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { height } from '@fortawesome/free-solid-svg-icons/faMugSaucer';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { ip } from '@env'
import i18n from '../utils/i18n';
import Star from './Star';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserLock } from '@fortawesome/free-solid-svg-icons/faUserLock'
const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [datas, setData] = useState([]);
  const [userData, setUser] = useState({});
  const [flagSrc, setFlagSrc] = useState(require('../assets/engflag.png'));
  const { t } = useTranslation();
  useEffect(() => {

    axios
      .get(`http://10.135.51.159:9000/api/v1/info`)
      .then(function (response) {
        setData(response.data.data);

        console.log("data:"+response.data.data.length);
      })
      .catch(function (error) {
        console.log("homescreen" + error);
      });
    const retrieveUserData = async () => {
      try {
        const Data = await AsyncStorage.getItem('userData');
        if (Data !== null) {
          const parsedUserData = JSON.parse(Data);
          setUser(parsedUserData);
          console.log('Retrieved user data: ');
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
  // Retrieve the user data from AsyncStorage
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index: (currentIndex + 1) % bannerData.length,
        });
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleLogout = () => {
    navigation.navigate('Login',);
  };

  const bannerData = [
    { id: 1, image: require('../imagePoster/local/banner1.png') },
    { id: 2, image: require('../imagePoster/local/banner2.png') },
    { id: 3, image: require('../imagePoster/local/banner3.png') },
    // Add more banner items as needed
  ];

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movie });
  };
  const handleMPaymentPress = (movie) => {
    setModalVisible(!modalVisible)
    navigation.navigate('Payment');
  };
  const renderBannerItem = ({ item }) => {
    return (
      <ImageBackground
        key={item.id}
        source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + item.filmInfo.backdrop_path }}
        style={{ width: Dimensions.get('window').width, height: 300 }}
      >
        <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', width: '100%', height: '100%', padding: 10 }}>
          <TouchableOpacity key={item.id} style={{ backgroundColor: 'orange', width: 200, height: 50, borderRadius: 10, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 24, margin: 5, textTransform: 'uppercase', fontWeight: '700' }}>Watch Now</Text>
          </TouchableOpacity></View>
      </ImageBackground>
    );
  };
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const changeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLanguage);
    setFlagSrc(newLanguage === 'en' ? require('../assets/engflag.png') : require('../assets/vnflag.png'));
  };



  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', height: 150 }}>
        <View style={{ flexDirection: 'column', alignItems: 'center', padding: 10, margin: 10, width: '33%' }}>
          <Text style={{ color: 'white', fontSize: 20 }}>{t('welcome')}</Text>
          <Text style={{ color: 'red', fontSize: 25 }}>Star </Text>
          <Text style={{ color: 'red', fontSize: 25 }}> Cinema</Text>
        </View>
        <Image source={require('../imagePoster/local/logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={changeLanguage} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 10, width: '30%' }}>
          <Image source={i18n.language === 'en' ? require('../assets/engflag.png') : require('../assets/vnflag.png')} style={{ width: 80, height: 80, borderRadius: 5 }} />

          {/* <Text style={{color:"white"}}>{currentLanguage}</Text> */}
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.set} onPress={() => setModalVisible(!modalVisible)}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: userData.avatar }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />


          </View>

        </TouchableOpacity> */}
      </View>



      <Modal visible={modalVisible} animationType="slide" transparent >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.logoutButton} key={1}>
              <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 'bold' }}>
                {userData.username}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} key={2}>
              <Text style={styles.handleMPaymentPress}>Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} key={3} onPress={() => handleMPaymentPress()}>
              <Text style={styles.handleMPaymentPress}>Update Primium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} key={7}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal><View style={{
        width: '100%', flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {datas.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={datas}
            renderItem={renderBannerItem}
            style={{ width: '95%', height: '80%', marginBottom: 10 }}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => (
              { length: 1000, offset: Dimensions.get('window').width * index, index }
            )}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise((resolve) => setTimeout(resolve, 500));
              wait.then(() => {
                flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
              });
            }}
          />
        ) : (<Text>loadding</Text>)}
        <View style={{ height: 1, width: "100%", backgroundColor: 'white' }} />

      </View>
      <View style={{ height: 1, width: "100%", backgroundColor: 'white' }} />
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>{t('popular')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

          {datas.length > 0 ? (datas.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieContainer}
              onPress={() => handleMoviePress(movie)}
            >
              <ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.filmInfo.backdrop_path }} style={{width: 180,
    height: 220,
    resizeMode: 'cover',
    borderRadius: 10}} >
              
                  {(movie.primaryTag&&(  <View style={{ width: '100%', height: 40, backgroundColor: 'red' ,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>      
                  <Text style={{
    fontSize: 17,
   
    textTransform: 'uppercase',
    overflow: 'hidden',
    fontWeight: 'bold',color:'black'}}>{movie.primaryTag ? "   primary " : "no "}
                  <FontAwesomeIcon style={{
    fontSize: 17,

    textTransform: 'uppercase',
    overflow: 'hidden',
    fontWeight: 'bold',color:'black'}} icon={faUserLock} /> </Text> 
                    </View>))  
} 
           

              </ImageBackground>
              <View key={movie.id} style={styles.movieDetails}>
              <Text style={styles.title}>{movie.filmInfo.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Star rating={movie.filmInfo.vote_average / 2} />
                  <Text style={styles.genre}>{movie.filmInfo.vote_count} {t("rate")}</Text>
                </View>

              </View>
            </TouchableOpacity>
          ))) : (<Text>loadding</Text>)}
        </ScrollView>

        {/* Add more sections as needed */}
      </View>
      <View style={{ height: 1, width: "100%", backgroundColor: 'white' }} />
      <View style={{ padding: 10 }}>
        <Text style={styles.sectionTitle}>{t('tv show')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {datas.length > 0 ? (datas.filter((x) => x.filmType === "TV").map((movie) => (
                 <TouchableOpacity
                 key={movie.id}
                 style={styles.movieContainer}
                 onPress={() => handleMoviePress(movie)}
               >
                 <ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.filmInfo.backdrop_path }} style={{width: 180,
       height: 220,
       resizeMode: 'cover',
       borderRadius: 10}} >
                 
                     {(movie.primaryTag&&(  <View style={{ width: '100%', height: 40, backgroundColor: 'red' ,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>      
                     <Text style={{
       fontSize: 17,
      
       textTransform: 'uppercase',
       overflow: 'hidden',
       fontWeight: 'bold',color:'black'}}>{movie.primaryTag ? "   primary " : "no "}
                     <FontAwesomeIcon style={{
       fontSize: 17,
   
       textTransform: 'uppercase',
       overflow: 'hidden',
       fontWeight: 'bold',color:'black'}} icon={faUserLock} /> </Text> 
                       </View>))  
   } 
              
   
                 </ImageBackground>
                 <View key={movie.id} style={styles.movieDetails}>
                 <Text style={styles.title}>{movie.filmInfo.name}</Text>
                   <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                     <Star rating={movie.filmInfo.vote_average / 2} />
                     <Text style={styles.genre}>{movie.filmInfo.vote_count} {t("rate")}</Text>
                   </View>
   
                 </View>
               </TouchableOpacity>
          ))) : (<Text>loadding</Text>)}
        </ScrollView>
      </View>
      <View style={{ height: 1, width: "100%", backgroundColor: 'white' }} />
      <View style={{ padding: 10 }}>
        <Text style={styles.sectionTitle}>{t('movie')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {datas.length > 0 ? (datas.filter((x) => x.filmType === "Movie").map((movie) => (
                 <TouchableOpacity
                 key={movie.id}
                 style={styles.movieContainer}
                 onPress={() => handleMoviePress(movie)}
               >
                 <ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.filmInfo.backdrop_path }} style={{width: 180,
       height: 220,
       resizeMode: 'cover',
       borderRadius: 10}} >
                 
                     {(movie.primaryTag&&(  <View style={{ width: '100%', height: 40, backgroundColor: 'red' ,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>      
                     <Text style={{
       fontSize: 17,
      
       textTransform: 'uppercase',
       overflow: 'hidden',
       fontWeight: 'bold',color:'black'}}>{movie.primaryTag ? "   primary " : "no "}
                     <FontAwesomeIcon style={{
       fontSize: 17,
   
       textTransform: 'uppercase',
       overflow: 'hidden',
       fontWeight: 'bold',color:'black'}} icon={faUserLock} /> </Text> 
                       </View>))  
   } 
              
   
                 </ImageBackground>
                 <View key={movie.id} style={styles.movieDetails}>
                 <Text style={styles.title}>{movie.filmInfo.title}</Text>
                   <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                     <Star rating={movie.filmInfo.vote_average / 2} />
                     <Text style={styles.genre}>{movie.filmInfo.vote_count} {t("rate")}</Text>
                   </View>
   
                 </View>
               </TouchableOpacity>
          ))) : (<Text>loadding</Text>)}
        </ScrollView>

      </View>
      <View style={{ height: 1, width: "100%", backgroundColor: 'white' }} />
      <View style={{ padding: 10 }}>
        <Text style={styles.sectionTitle}>{t('continue watching')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {datas.length > 0 ? (datas.filter((x) => x.filmType === "TV").map((movie) => (
                 <TouchableOpacity
                 key={movie.id}
                 style={styles.movieContainer}
                 onPress={() => handleMoviePress(movie)}
               >
                 <ImageBackground source={{ uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/' + movie.filmInfo.backdrop_path }} style={{width: 180,
       height: 220,
       resizeMode: 'cover',
       borderRadius: 10}} >
                 
                     {(movie.primaryTag&&(  <View style={{ width: '100%', height: 40, backgroundColor: 'red' ,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:5}}>      
                     <Text style={{
       fontSize: 17,
      
       textTransform: 'uppercase',
       overflow: 'hidden',
       fontWeight: 'bold',color:'black'}}>{movie.primaryTag ? "   primary " : "no "}
                     <FontAwesomeIcon style={{
       fontSize: 17,
   
       textTransform: 'uppercase',
       overflow: 'hidden',
       fontWeight: 'bold',color:'black'}} icon={faUserLock} /> </Text> 
                       </View>))  
   } 
              
   
                 </ImageBackground>
                 <View key={movie.id} style={styles.movieDetails}>
                 <Text style={styles.title}>{movie.filmInfo.name}</Text>
                   <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                     <Star rating={movie.filmInfo.vote_average / 2} />
                     <Text style={styles.genre}>{movie.filmInfo.vote_count} {t("rate")}</Text>
                   </View>
   
                 </View>
               </TouchableOpacity>
          ))) : (<Text>loadding</Text>)}
        </ScrollView>
      </View>

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
    width: '33%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  banner: {
    height: 200,


    backgroundColor: '#FFFFFF'
  },
  bannerImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  movieContainer: {
    margin: 10,

    width: 180,
    height: 300,

    borderRadius: 10,
  },
  poster: {
    width: 180,
    height: 220,
    resizeMode: 'cover',
    borderRadius: 10,
    padding:10
  },
  movieDetails: {
    width: '100%',
    height: '100%',
    marginTop: 8,
    padding: 3
  },
  title: {

    fontSize: 17,
    height:40,
    width: '100%',
    textTransform: 'uppercase',
    overflow: 'hidden',
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: '#fff',
    margin: 4

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

export default HomeScreen;
