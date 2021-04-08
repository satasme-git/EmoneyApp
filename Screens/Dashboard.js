import React, { Component } from 'react';
import { View, Text, ScrollView, Image ,Dimensions } from 'react-native';
import {styles,buttons} from "../Styles/Style";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import {Dummy} from "../Styles/Dummy";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions , useNavigation  } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Dashboard () {
  const navigation = useNavigation();
  const highlights = [{
    id:'1',
    name: 'Name',
    point:100
    },
    {
      id:'2',
    name: 'Name',
    point:250
    },
    {
      id:'3',
    name: 'Name',
    point:150
    }, 
    {
      id:'4',
    name: 'Name',
    point:500
    },
  ];

    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'white',height:75,justifyContent:'center',paddingLeft:40}}>
          <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
          <Text style={{marginTop:10,fontSize:24,color:'#011842'}}> Dashboard </Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={{backgroundColor: 'white',margin: 10,marginBottom:5,paddingBottom:10,paddingTop:10,borderRadius:10,elevation:5}}>
            <Text style={styles.text}>Highlights Scores</Text>
            <Image  source={require('../assets/Browse.png')} style={{width:windowWidth-20,height:150,resizeMode:'contain'}}/>
          <SwiperFlatList
              autoplay
              autoplayDelay={5}
              autoplayLoop
              index={2}
              disableGesture
              autoplayLoopKeepAnimation={true}
              data={highlights}
              renderItem={({ item }) => (
                <View style={[styles.child]}>
                  <Text style={styles.text}>({item.name}) Withdraw : ${item.point}</Text>
                </View>
              )}
            />
          </View>
        {Dummy.map((item)=>
            <View key={item.id} style={{backgroundColor:'white',marginHorizontal:10,marginVertical:5,marginTop:10,padding:15,elevation:5,borderRadius:10}}> 
              <Text style={styles.mainHeader}>{item.name}</Text>
              <Text style={styles.innerText}>{item.point}</Text>
            </View>
        )}
        </ScrollView>
      </View>
    );
  
}
