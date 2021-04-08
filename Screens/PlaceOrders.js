import React, { Component } from 'react';
import { View, Text, Image , Dimensions, FlatList, ScrollView, TouchableHighlight } from 'react-native';
import { Social } from "../Styles/Social";
import {styles,buttons} from "../Styles/Style";
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Referrel from "./Referrel";
import MyOrders from "./MyOrders";

export default function PlaceOrders () {
  
  const navigation = useNavigation();

    return (
      <View style={styles.container}>

          <View style={{paddingHorizontal:0,flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>
            {
              Social.map((item)=>
              <TouchableHighlight key={item.id} onPress={()=>navigation.navigate('SocialOrderSingle',{ item : item })} style={{backgroundColor:'white',margin: 10,elevation:5,width:150,borderRadius:25,elevation:5,alignItems:'center'}}>
                <View style={{padding:10,backgroundColor:'white',width:150,borderRadius:25,alignItems:'center'}}>
                  <Image source={item.image} style={{height:50,width:50,resizeMode:'cover',}}/>
                  <Text style={{textAlign:'center'}}>{item.name}</Text>
                </View>
                
              </TouchableHighlight>
              )
            }
          </View>

</View>



    );
  
}
