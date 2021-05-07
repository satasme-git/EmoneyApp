import React, { Component } from 'react';
import { View, Text, ScrollView , Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Social } from "../Styles/Social";

import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../Styles/Style';
import { TouchableOpacity } from 'react-native';
import SocialEngSingle from './SocialEngSingle'

const Stack = createStackNavigator();

function SocialEngagement () {
    
  const navigation = useNavigation();

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>Social Media Engagement</Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>
        
        <ScrollView style={styles.container}>
          {Social.map((item)=>
          <View key={item.id}>
            {item.id=='6' || item.id=='7'?null:
            item.types.map((typ)=>
            typ.header=='Views' && item.name=='Youtube'?null :
            <TouchableOpacity onPress={()=>navigation.navigate('SocialEngSingle',{service:item.name+' '+typ.header,img:item.image,type:typ,})} style={{flexDirection:'row', margin:10, backgroundColor: 'white',elevation:5,padding:10,borderRadius:20,alignSelf:'center'}}>
              <Image source={item.image} style={{height:20,width:20,resizeMode:'cover',marginRight:5}}/>
              <Text> {item.name} </Text>
              <Text> {typ.header} </Text> 
            </TouchableOpacity>
            )}
          </View>
          )}
        </ScrollView>  
      </View>
    );
  
}

export default function  EarnNavigater() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SocialEngagement" component={SocialEngagement} options={{ headerShown:false }}/>
      <Stack.Screen name="SocialEngSingle" component={SocialEngSingle} options={{ headerShown:false}}/>
    </Stack.Navigator>
  );
}