import React, { Component } from 'react';
import { View, Text, ScrollView ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from '../Styles/Style';
import { HelpData } from '../Styles/HelpData'
export default function Help () {
    
  const navigation = useNavigation();

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}> How to Use</Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>
        <ScrollView style={styles.container}>

      {HelpData.map((item)=>
              <View key={item.id} style={{backgroundColor: 'white',margin:20,marginBottom:10,elevation:5,borderRadius:10}}>
              <Image source={item.image} style={{height:150,width:200,resizeMode:'contain',alignSelf:'center'}}/>
              <View style={{alignItems:'center',padding:10}}>
              <Text style={[styles.heading,{paddingBottom:10}]}>{item.name}</Text>
              <AntDesign name="rightcircle" color={'#5c9be2'} size={25} />
              </View>
            </View>
      )}

        </ScrollView>
       
      </View>
    );
  
}
