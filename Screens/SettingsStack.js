import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Settings from './Settings'
import Help from './Help'
import Privacy from './Privacy'
import About from './About'
import Terms from './Terms'
import How from './How'

export default function  MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown:false}}/>
        <Stack.Screen name="Help" component={Help} options={{ headerShown:false}}/>
        <Stack.Screen name="Privacy" component={Privacy} options={{ headerShown:false }}/>
        <Stack.Screen name="About" component={About} options={{ headerShown:false }}/>        
        <Stack.Screen name="Terms" component={Terms} options={{ headerShown:false }}/>       
        <Stack.Screen name="How" component={How} options={{ headerShown:false }}/>
      </Stack.Navigator>
    );
  }

