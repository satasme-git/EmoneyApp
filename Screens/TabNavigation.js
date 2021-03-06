import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Drawer from "./DrawerNavigation";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import Profile from "./Profile";
import Dashboard from "./Dashboard";
import SettingsStack from "./SettingsStack";
import Home from "./Home";
import Billings from "./Billings";
import HomeNavigater from "./HomeNavigater";

import ImagePicker from './ImagePicker'

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs({navigation}) {
  return (
    <Tab.Navigator
    lazy
    initialRouteName="Home"
    activeColor="#d81a1a"
    inactiveColor="gray"
    barStyle={{ backgroundColor: '#fff',elevation:25 }}
    shifting={false}
    >
            <Tab.Screen 
            name="HomeNavigater" 
            component={HomeNavigater}
            options={{
              tabBarLabel: 'Home',
              
              tabBarIcon: ({ color }) => (
                <Ionicons name="home-outline" color={color} size={17} />
              ),
              
            }}
            />
             <Tab.Screen 
            name="Dashboard" 
            component={Dashboard}
            options={{
              tabBarLabel: 'Dashboard',
              
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="dashboard" color={color} size={17} />
              ),
            }}
            />

            <Tab.Screen 
            name="Billings" 
            component={Billings} 
            options={{
              tabBarLabel: 'Billings',
              
              tabBarIcon: ({ color }) => (
                <FontAwesome name="dollar" color={color} size={20} />
              ),
            }}

            />

            <Tab.Screen 
            name="Profile" 
            component={Profile} 
            options={{
              tabBarLabel: 'Profile',
              
              tabBarIcon: ({ color }) => (
                <SimpleLineIcons name="user" color={color} size={17} />
              ),
            }}

            />
            <Tab.Screen 
            name="SettingsStack" 
            component={SettingsStack} 
            options={{
              tabBarLabel: 'Settings',
              
              tabBarIcon: ({ color }) => (
                <Ionicons name="settings-outline" color={color} size={17} />
              ),
            }}

            />
        </Tab.Navigator>
  );
}


