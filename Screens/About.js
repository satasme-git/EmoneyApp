import React, { Component } from 'react';
import { View, Text ,Image} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../Styles/Style';

export default function About () {
    
  const navigation = useNavigation();
  
    return (
        <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}> About </Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />
        </View>
        <View style={styles.container}>
          <View style={{backgroundColor: 'white',margin:20,elevation:5,padding:10,borderRadius:10}}>
            <Image source={require('../assets/webicon.png')} style={{height:80,width:150,resizeMode:"contain",alignSelf:'center'}}/>
              <Text style={{textAlign:'justify',lineHeight:20,fontSize:16}} >You can choose this method easily. Only you have to do is complete the tasks provided by us, By using your social media account and earn points. You can earn points by using Facebook, Twitter, Instagram, YouTube and TikTok social media accounts.your one tap can earn points for you.</Text>
          </View>
        </View>
    </View>
    );
  
}
