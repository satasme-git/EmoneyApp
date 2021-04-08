import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { PrivacyData } from "../Styles/PrivacyData";
import { styles } from '../Styles/Style';
export default function Privacy () {
    
  const navigation = useNavigation();

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}> Privacy </Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />
        </View>
        <ScrollView style={styles.container}>
          {PrivacyData.map((item)=>
          <View key={item.id} style={{margin:15,}}>
            <Text style={[styles.heading,{fontWeight:'bold'}]}>{item.head}</Text>
            <Text>{item.content}</Text>
          </View>
          )}
        </ScrollView>
      </View>
    );
  
}
