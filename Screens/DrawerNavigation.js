import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigation from "./TabNavigation";
import PlaceOrders from "./PlaceOrders";
import MyOrders from "./MyOrders";
import Contact from "./Contact";
import Referrel from "./Referrel";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigation} />
      {/* <Drawer.Screen name="Place Orders" component={PlaceOrders} /> */}
      <Drawer.Screen name="My Orders" component={MyOrders} />
      <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen name="Referrel" component={Referrel} />
    </Drawer.Navigator>
  );
}