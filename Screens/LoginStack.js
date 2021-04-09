import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


import Login from './Login'
import Signup from './Signup'
import ResetPw from './ResetPw'
import TabNavigation from './TabNavigation'

export default function  MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown:false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown:false }}/>
        <Stack.Screen name="ResetPw" component={ResetPw} options={{ headerShown:false }}/>
        <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown:false }}/>
      </Stack.Navigator>
    );
  }

