import React, { Component } from 'react';
import { View, Text , ScrollView} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions , useNavigation  } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

import Referrel from "./Referrel";
import {OrderData} from "../Styles/OrderData";

export default function MyOrders () {
  
  const navigation = useNavigation();

    return (

    <Container>
      <View style={{backgroundColor:'white',height:75,justifyContent:'center',paddingLeft:40}}>
        <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
        <Text style={{marginTop:10,fontSize:24,color:'#011842'}}> My Orders </Text>
      </View>
      <ScrollView horizontal scrollEnabled >
      <DataTable>
    <DataTable.Header>
      <DataTable.Title style={{width:20}}>ID</DataTable.Title>
      <DataTable.Title style={{width:100}}>Social Name</DataTable.Title>
      <DataTable.Title style={{width:100}}>Service</DataTable.Title>
      <DataTable.Title style={{width:300}}>Url</DataTable.Title>
      <DataTable.Title style={{width:100}}>Date</DataTable.Title>
      <DataTable.Title style={{width:50}}>Price</DataTable.Title>
      <DataTable.Title style={{width:50}}>Quantity</DataTable.Title>
      <DataTable.Title style={{width:50}}>Status</DataTable.Title>
    </DataTable.Header>

{OrderData.map((item)=>
 <DataTable.Row key={item.id}>
 <DataTable.Cell style={{width:20}}>{item.id}</DataTable.Cell>
 <DataTable.Cell style={{width:100}}>{item.sname}</DataTable.Cell>
 <DataTable.Cell style={{width:100}}>{item.service}</DataTable.Cell>
 <DataTable.Cell style={{width:300}}>{item.url}</DataTable.Cell>
 <DataTable.Cell style={{width:100}}>{item.date}</DataTable.Cell>
 <DataTable.Cell style={{width:50}}>{item.price}</DataTable.Cell>
 <DataTable.Cell style={{width:50}}>{item.quantity}</DataTable.Cell>
 <DataTable.Cell style={{width:50}}>{item.status}</DataTable.Cell>
</DataTable.Row>
)}
     
    </DataTable>
    </ScrollView>
    </Container>

    

    );
  
}
