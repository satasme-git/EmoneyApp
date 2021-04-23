import React, { Component } from 'react';
import { View, Text, Image , Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';
import {EarnData} from "../Styles/Earndata";
import {styles,buttons} from "../Styles/Style";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation , DrawerActions } from '@react-navigation/native';
import {BoxShadow} from 'react-native-shadow'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Earn (){

  const navigation = useNavigation();
  const shadowOpt = {
    width:windowWidth-20,
    height:125,
    // borderRadius:10,
    color:"#000",
    border:6,
    radius:5,
    opacity:0.17,
    x:0,
    y:2,
    style:{borderRadius:5,margin:10}
  }

    return (
      <View style={styles.container}>
        {
          EarnData.map((item)=>
			    // <BoxShadow setting={shadowOpt}>
            <TouchableHighlight underlayColor={'#efefef'} onPress={()=>navigation.navigate(item.screen)} key={item.id} style={{backgroundColor: 'white',flexDirection:'row',alignItems:'center',borderRadius:5,elevation:4,margin:10}}>
              <View style={{margin: 10,marginBottom:5,padding: 5,flexDirection:'row',alignItems:'center',borderRadius:5,width:windowWidth-20}}>
              <Image source={item.image} style={{height:70,width:70,resizeMode:'contain',margin:10}}/>
              <View style={{width:windowWidth/2,padding:5}}>
              <Text style={[styles.headerText2,{marginLeft:10,color:'#011842'}]}>{item.name}</Text>
              </View>
              <View style={{height:70,justifyContent: 'center',borderLeftWidth:0.4,width:50,borderColor:'gray',alignItems:'center'}}>
                <View style={{backgroundColor: '#16c79a',borderRadius:50,height:30,width:30,justifyContent: 'center',alignItems:'center'}}>
                <Feather name="chevrons-right" color={'white'} size={20} />
                </View>
              </View>
              </View>
            </TouchableHighlight>
          // </BoxShadow>
          )
        }
      </View>
    );
  
}
