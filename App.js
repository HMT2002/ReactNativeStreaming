/* eslint-disable*/
import React, {useContext, useEffect, useState,useCallback} from 'react';
import AppContext, {AppContextProvider} from './src/utils/AppContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreen from './src/screen/MainScreen';
import HomeScreen from './src/screen/HomeScreen';
import HotFilm from './src/screen/HotFilm';
import SearchScreen from './src/screen/Search';
import MovieDetailScreen from './src/screen/SingleFilm';
import Profile from './src/screen/Account';
import LoginScreen from './src/screen/Loggin';
import CustomSnackBar from './src/components/tools/CustomSnackBar';
import RegisterScreen from './src/screen/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MenuProvider} from 'react-native-popup-menu';
import {Button, Snackbar} from '@react-native-material/core';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {setAttributes} from 'video.js/dist/types/utils/dom';

const Tab = createMaterialBottomTabNavigator();

const Stack = createNativeStackNavigator();

const AppChild = () => {
  const appContext = useContext(AppContext);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const OnHideSnackBar = () =>
    appContext.callSnackBar({type: null, message: null});

  useEffect(() => {
    setIsSnackbarVisible(appContext.snackBarMessage.message != null);
  }, [appContext.snackBarMessage]);

  useEffect(() => {
    appContext.callSnackBar({type: 'welcome', message: 'Have a nice day!'});
  }, []);

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HotMovie"
          component={MovieDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={MovieDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={MovieDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: 'white',
          },
          labelStyle: {
            fontSize: 16,
            fontWeight: 'bold',
          },
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Hot Movies" component={HotFilm} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AppContextProvider>
      <AppChild />
    </AppContextProvider>
  );
};

export default App;
