import React, {useEffect} from 'react';
import {Platform,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from "./Screens/DrawerNavigation";
import { EmoneyProvider } from './context/Context';

const App= () => {

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
    }
    // SplashScreen.hide();
  }, []);



  return (
    <EmoneyProvider>
      <NavigationContainer>
        <DrawerNavigation/>
      </NavigationContainer>      
    </EmoneyProvider>

  );
};


export default App;
