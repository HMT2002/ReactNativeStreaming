/* eslint-disable*/
import React, { useContext, useEffect, useState } from "react";
import AppContext, { AppContextProvider } from "./src/utils/AppContext";

import MainScreen from "./src/screen/MainScreen";
import CustomSnackBar from "./src/components/tools/CustomSnackBar";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from "react-native-popup-menu";
import { Snackbar } from "@react-native-material/core";

const Stack = createNativeStackNavigator();

const AppChild = () => {
  const appContext = useContext(AppContext);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const OnHideSnackBar = () => appContext.callSnackBar({ type: null, message: null });

  useEffect(() => {
    setIsSnackbarVisible(appContext.snackBarMessage.message != null);
  }, [appContext.snackBarMessage]);

  useEffect(() => {
    appContext.callSnackBar({ type: "welcome", message: "Have a nice day!" });
  }, []);

  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider >
  )
}

const App = () => {
  return (
    <AppContextProvider>
      <AppChild />
    </AppContextProvider>)
};

export default App;