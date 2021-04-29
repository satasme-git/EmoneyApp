import React, { Component } from 'react';
import { View, Text, TouchableHighlight ,Dimensions } from 'react-native';
import {styles,buttons} from "../Styles/Style";
import { SettingData } from "../Styles/SettingData";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation , DrawerActions } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Settings () {

    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'white',height:75,justifyContent:'center',paddingLeft:10}}>
          <Text style={{marginTop:10,fontSize:24,color:'#011842',marginLeft:30}}> Settings </Text>
          <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
        </View>
        {
            SettingData.map((item)=>
                <View key={item.id} style={{alignItems:'center'}}>

                    <TouchableHighlight underlayColor={'#d4d4d4'} onPress={()=>navigation.navigate(item.screen)} style={{width:windowWidth-20,padding: 5,paddingLeft:5}}>
                        <Text style={styles.headerText2}>{item.name}</Text>   
                    </TouchableHighlight>
                    {/* <View style={{backgroundColor: 'gray',height:0.5,width:windowWidth}} /> */}
                </View>
            )
        }
      </View>
    );
  
}
