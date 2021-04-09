import React, { useContext } from 'react';
import { View, Text , TouchableHighlight, Image} from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation  } from '@react-navigation/native';
import { createDrawerNavigator , DrawerContentScrollView , DrawerItemList, DrawerItem } from '@react-navigation/drawer';

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
        <Text>{emoney.user.email}</Text>
        <View style={{backgroundColor:'#303030',height:0.5,marginTop:5,marginBottom:5}} />
      </View>
      <View style={{backgroundColor:'#303030',height:0.5,marginTop:5,marginBottom:5}} />
      {/* <DrawerItemList {...props} /> */}

      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='home'? '#5c9be2':'white',}} onPress={()=>{props.navigation.navigate('Home');emoney.setState('home')}}>
        <Text style={{fontSize:16,color:emoney.state=='home'? 'white':'black'}}>Home</Text>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='or'? '#5c9be2':'white',}} onPress={()=>{props.navigation.navigate('My Orders');emoney.setState('or')}}>
        <Text style={{fontSize:16,color:emoney.state=='or'? 'white':'black'}}>My Orders</Text>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='ref'? '#5c9be2':'white',}} onPress={()=>{props.navigation.navigate('Referrel');emoney.setState('ref')}}>
        <Text style={{fontSize:16,color:emoney.state=='ref'? 'white':'black'}}>Referrel</Text>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='cont'? '#5c9be2':'white',}} onPress={()=>{props.navigation.navigate('Contact');emoney.setState('cont')}}>
        <Text style={{fontSize:16,color:emoney.state=='cont'? 'white':'black'}}>Contact</Text>
      </TouchableHighlight>

      <TouchableHighlight underlayColor={'#c4c4c4'} style={{padding:12,backgroundColor:emoney.state=='login'? '#5c9be2':'white',}} onPress={()=>{props.navigation.navigate('Login');emoney.setState('login')}}>
        <Text style={{fontSize:16,color:emoney.state=='login'? 'white':'black'}}>Login</Text>
      </TouchableHighlight>
      {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
    </DrawerContentScrollView>
  );
}


// function CustomDrawerContent(props) {

//   const emoney = useContext(EmoneyContext);
//   const jumpToAction = TabActions.jumpTo('TabNavigation');
//   const navigation = useNavigation();

//   return (
//     <DrawerContentScrollView {...props}>
//         <View style={{padding:10,height:200,justifyContent:'space-between'}} >
          
          
//         </View>


//       {/* <DrawerItemList {...props} /> */}
      
//       <View>
//           <TouchableHighlight underlayColor={lang.state=='Home'?'#9d151a':"#DDDDDD"} style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',backgroundColor:lang.state=='Home'|| state == 'Home'?'#e12229': 'white'}} 
//           onPress={()=>{props.navigation.navigate('Home');lang.setState('Home');props.navigation.dispatch(jumpToAction)}}>
//             <Text style={[styles.drawerText,,{color:lang.state =='Home' || state == 'Home'?'white':'black'}]}>Home</Text>
//           </TouchableHighlight>
        
//       </View>


//       <View style={{backgroundColor:'#303030',height:0.5,marginTop:5,marginBottom:5}} />
//       <TouchableHighlight underlayColor={lang.state=='log'?'#9d151a':"#DDDDDD"} style={{flexDirection:'row',alignItems: 'center',justifyContent: 'space-between',backgroundColor:lang.state=='log'?'#e12229':'white'}} 
//       onPress={()=>{props.navigation.navigate('Logout');lang.setState('log')}}>
//         <Text style={[styles.drawerText,{color:lang.state=='log'?'white':'black'}]}>{lang.logdata.length==0 ?'Login':'Logout'}</Text>
//       </TouchableHighlight>
//     </DrawerContentScrollView>
//   );
// }


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
      <Drawer.Screen name="Login" component={LoginStack} />
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