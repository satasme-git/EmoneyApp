import React, { Component } from 'react';
import { View, Text, Image , Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import {EarnData} from "../Styles/Earndata";
import {styles,buttons} from "../Styles/Style";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation , DrawerActions } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Earn (){

  const navigation = useNavigation();
  
    return (
      <View style={styles.container}>
        {
          EarnData.map((item)=>
          <TouchableHighlight underlayColor={'#d4d4d4'} onPress={()=>navigation.navigate(item.screen)} key={item.id} style={{margin: 10,elevation:5,backgroundColor: 'white',flexDirection:'row',alignItems:'center',borderRadius:5,width:windowWidth-20}}>
            <View style={{margin: 10,marginBottom:5,padding: 5,flexDirection:'row',alignItems:'center',borderRadius:5,width:windowWidth-20}}>
            <Image source={item.image} style={{height:100,width:100,resizeMode:'contain'}}/>
            <View style={{width:windowWidth/1.8}}>
            <Text style={[styles.headerText2,{marginLeft:10,color:'#011842'}]}>{item.name}</Text>
            </View>
            <View>
              <Ionicons name="chevron-forward" color={'#011842'} size={20} />
            </View>
            </View>
          </TouchableHighlight>
          )
        }
      </View>
    );
  
}
