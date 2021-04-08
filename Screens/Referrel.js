import React, { Component } from 'react';
import { View, Text , Image, ScrollView, TouchableHighlight} from 'react-native';
import { useNavigation , DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ReferrelSocial } from "../Styles/ReferrelSocial";
import { SocialIcon } from 'react-social-icons';
import Clipboard from '@react-native-community/clipboard';
// import { SocialIcon } from 'react-native-elements'

export default function Referrel () {
  
  const navigation = useNavigation();

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,justifyContent:'center',paddingLeft:40}}>
            <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
            <Text style={{marginTop:10,fontSize:24,color:'#011842'}}> Referrel </Text>
        </View>
        <ScrollView style={{backgroundColor:'white'}}>
        <Text style={{color:'black',fontSize:18,padding:10}}>Referral Program</Text>
        <Text style={{paddingHorizontal:10}}>Invite a friend or someone from the Internet and make a transfer for points.</Text>
        <View style={{backgroundColor:'#eaebee',margin: 10,padding:10,borderRadius:10,height:100}}>
          <Text>emoneytag.com/register?ref=C@23a5c5f3</Text>
          <TouchableHighlight onPress={() => Clipboard.setString('emoneytag.com/register?ref=C@23a5c5f3')} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'flex-end',}}>
            <Text style={{color:'white'}}>Copy</Text>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row'}}>

        {ReferrelSocial.map((item)=>
          <View key={item.id}>
            <View >
            <Image source={item.image} style={{height:35,width:35,borderRadius:25,marginRight:2,marginStart:2}}/>
            {/* <SocialIcon network="pinterest" style={{ height: 25, width: 25 }} /> */}
            </View>            
          </View>
        )}

        </View>
        </ScrollView>
      </View>
    );
  
}
