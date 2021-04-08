import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './Home'
import Earn from './Earn'
import PlaceOrders from './PlaceOrders'
import BrowseVideo from './BrowseVideo'
import SocialEngagement from './SocialEngagement'
import UploadVideo from './UploadVideo'
import Survey from './Survey'
import LinkClick from './LinkClick'
import SocialOrderSingle from './SocialOrderSingle'

export default function  HomeNavigater() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown:false}}/>
        <Stack.Screen name="Earn" component={Earn} options={{ headerShown:false}}/>
        <Stack.Screen name="PlaceOrders" component={PlaceOrders} options={{ headerShown:false }}/>
        <Stack.Screen name="BrowseVideo" component={BrowseVideo} options={{ headerShown:false }}/>
        <Stack.Screen name="SocialEngagement" component={SocialEngagement} options={{ headerShown:false }}/>
        <Stack.Screen name="Survey" component={Survey} options={{ headerShown:false }}/>
        <Stack.Screen name="UploadVideo" component={UploadVideo} options={{ headerShown:false }}/>
        <Stack.Screen name="LinkClick" component={LinkClick} options={{ headerShown:false }}/>
        <Stack.Screen name="SocialOrderSingle" component={SocialOrderSingle} options={{ headerShown:false }}/>
      </Stack.Navigator>
    );
  }
