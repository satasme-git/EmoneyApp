import React, { useState , useEffect , useContext } from 'react';
import { View, Text , ScrollView} from 'react-native';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions , useNavigation  } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

import Referrel from "./Referrel";
import {OrderData} from "../Styles/OrderData";

import {EmoneyContext}  from '../context/Context';

export default function MyOrders () {
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const emoney = useContext(EmoneyContext);

  const [Links, setLinks] = useState([]);
  const navigation = useNavigation();
  const getOrders = () => {
    fetch(
      'https://emoneytag.com/api/getoprice/allorders/'+emoney.user.id,
    )
      .then((response) => response.json())
      .then((json) => 
      
      setLinks(json)
      
      )
      // .catch((error) => 
      // console.error(error)
      // )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
    
  };
  useEffect(() => {
    getOrders()
  });
    return (

    <Container>
      <View style={{backgroundColor:'white',height:75,justifyContent:'center',paddingLeft:40}}>
        <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
        <Text style={{marginTop:10,fontSize:24,color:'#011842'}}> My Orders </Text>
      </View>
      <ScrollView horizontal scrollEnabled >
      <DataTable>
    <DataTable.Header>
      <DataTable.Title style={{width:300}}>ID</DataTable.Title>
      <DataTable.Title style={{width:100}}>Social Name</DataTable.Title>
      <DataTable.Title style={{width:200}}>Service</DataTable.Title>
      <DataTable.Title style={{width:500}}>Url</DataTable.Title>
      <DataTable.Title style={{width:100}}>Date</DataTable.Title>
      <DataTable.Title style={{width:50}}>Price</DataTable.Title>
      <DataTable.Title style={{width:150}}>Quantity</DataTable.Title>
      <DataTable.Title style={{width:75}}>Status</DataTable.Title>
    </DataTable.Header>

{Links.map((item)=>
 <DataTable.Row key={item.id}>
 <DataTable.Cell style={{width:300}}>{item.id}</DataTable.Cell>
 <DataTable.Cell style={{width:100}}>{item.social}</DataTable.Cell>
 <DataTable.Cell style={{width:200}}>{item.service}</DataTable.Cell>
 <DataTable.Cell style={{width:500}}>{item.social_link}</DataTable.Cell>
 <DataTable.Cell style={{width:100}}>{item.social}</DataTable.Cell>
 <DataTable.Cell style={{width:50}}>{item.cost}</DataTable.Cell>
 <DataTable.Cell style={{width:150}}>{item.qty}</DataTable.Cell>
 <DataTable.Cell style={{width:75}}>{item.status}</DataTable.Cell>
</DataTable.Row>
)}
     
    </DataTable>
    </ScrollView>
    </Container>

    

    );
  
}
