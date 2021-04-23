import React, { useContext } from 'react';
import { View, Text , TouchableHighlight, Image} from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation  } from '@react-navigation/native';
import { StackActions , getFocusedRouteNameFromRoute} from '@react-navigation/native';
import { createDrawerNavigator , DrawerContentScrollView , DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import TabNavigation from "./TabNavigation";
import PlaceOrders from "./PlaceOrders";
import MyOrders from "./MyOrders";
import Contact from "./Contact";
import Referrel from "./Referrel";
import Login from "./Login";
import LoginStack from "./LoginStack";
import {EmoneyContext}  from '../context/Context';

import { TabActions } from '@react-navigation/native';

function CustomDrawerContent(props) {

  const emoney = useContext(EmoneyContext);
  // const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{alignItems: 'center',}}>
        <Image source={require('../assets/icon.png')} style={{height:100,width:100}} />
        {
          emoney.user.length==0?<Text>Email Address</Text>:
          <Text>{emoney.user.email}</Text>
        }
        
        <View style={{backgroundColor:'#303030',height:0.5,marginTop:5,marginBottom:5}} />
      </View>
      <View style={{backgroundColor:'#303030',height:0.5,marginTop:5,marginBottom:5}} />
      {/* <DrawerItemList {...props} /> */}

      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='home'? '#5c9be2':'white',}} onPress={()=>{props.navigation.navigate('Home');emoney.setState('home')}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name="home-outline" color={emoney.state=='home'? 'white':'black'} size={20} style={{marginRight:10}}/>
          <Text style={{fontSize:16,color:emoney.state=='home'? 'white':'black'}}>Home</Text>
        </View>
        
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='or'? '#5c9be2':'white',}} onPress={()=>{props.navigation.navigate('My Orders');emoney.setState('or')}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name="ios-list-outline" color={emoney.state=='or'? 'white':'black'} size={20} style={{marginRight:10}}/>
          <Text style={{fontSize:16,color:emoney.state=='or'? 'white':'black'}}>My Orders</Text>
      </View>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='ref'? '#5c9be2':'white',}} onPress={()=>{props.navigation.navigate('Referrel');emoney.setState('ref')}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name="share-social-outline" color={emoney.state=='ref'? 'white':'black'} size={20} style={{marginRight:10}}/>
          <Text style={{fontSize:16,color:emoney.state=='ref'? 'white':'black'}}>Referrel</Text>
      </View>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='cont'? '#5c9be2':'white',}} onPress={()=>{props.navigation.navigate('Contact');emoney.setState('cont')}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name="mail-outline" color={emoney.state=='cont'? 'white':'black'} size={20} style={{marginRight:10}}/>
          <Text style={{fontSize:16,color:emoney.state=='cont'? 'white':'black'}}>Contact</Text>
      </View>
      </TouchableHighlight>

      <View style={{backgroundColor:'#303030',height:0.4 ,margin:5}} />
      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='login'? '#5c9be2':'white',}} onPress={()=>{
        {emoney.user.length==0?
          props.navigation.navigate('Login'):
          props.navigation.dispatch(StackActions.popToTop());
        }
        ;props.navigation.closeDrawer();
      emoney.setState('login');emoney.setUser([])}}>

      <View style={{flexDirection:'row',alignItems:'center'}}>
        <Ionicons name={emoney.user.length==0?'log-in-outline':'log-out-outline'} color={emoney.state=='login'? 'white':'black'} size={20} style={{marginRight:10}}/>
        <Text style={{fontSize:16,color:emoney.state=='login'? 'white':'black'}}>{emoney.user.length==0?'Login':'Logout'}</Text>
      </View>
      </TouchableHighlight>
      {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {


  return (
    // <NavigationContainer>
    <Drawer.Navigator
    drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={TabNavigation} />
      <Drawer.Screen name="My Orders" component={MyOrders} />
      <Drawer.Screen name="Contact" component={Contact} />
      <Drawer.Screen name="Referrel" component={Referrel} />
      <Drawer.Screen name="Login" component={LoginStack}         
      options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route);
          return {
            swipeEnabled: routeName !== 'Login',
          };
       }}
      />
    </Drawer.Navigator>
    // </NavigationContainer>
  );
}

export default function Navigation() {
  return (
    // <NavigationContainer>
      <MyDrawer />
    // </NavigationContainer>
  );
}