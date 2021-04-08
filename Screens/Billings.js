import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BIllData } from "../Styles/BillData";
import {styles,buttons} from "../Styles/Style";

export default function Billings () {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'white',height:75,justifyContent:'center',paddingLeft:40}}>
            <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
            <Text style={{marginTop:10,fontSize:24,color:'#011842'}}> Billings </Text>
        </View>
        <ScrollView>
        <Text style={{color:'black',fontSize:18,padding:10}}>Earning Summary</Text>
        {BIllData.map((item)=>
        item.status=='A'?
            <View key={item.id} style={{backgroundColor: 'white',margin: 5,marginTop:10,padding:10,elevation:5,borderRadius:10}}>
                <Text style={[styles.mainHeader,{color:'black'}]}>{item.topic}</Text>
                <Text style={[styles.headerText2,{color:'black'}]}>${item.price} </Text>
            </View>
            :
            null
        )}
        <Text style={{color:'black',fontSize:18,padding:10}}>Withdraw Summary</Text>
                {BIllData.map((item)=>
        item.status=='B'?
            <View key={item.id} style={{backgroundColor: 'white',margin: 5,marginTop:10,padding:10,elevation:5,borderRadius:10}}>
                <Text style={[styles.mainHeader,{color:'black'}]}>{item.topic}</Text>
                <Text style={[styles.headerText2,{color:'black'}]}>${item.price} </Text>
            </View>
            :
            null
        )}
        </ScrollView>
      </View>
      
    );
  
}
