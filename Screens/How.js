import React, { Component } from 'react';
import { View, Text , Image, ScrollView} from 'react-native';
import { useNavigation , useRoute } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { HowEarn } from "../Styles/HowEarn";
import { HowPromote } from "../Styles/HowPromote";
import { styles } from '../Styles/Style';
import { TouchableHighlight } from 'react-native';

export default function How () {
    
  const route = useRoute();
  const { item } = route.params;
  const navigation = useNavigation();

    return (
    <View style={{flex:1,backgroundColor: 'white',}}>
        <View style={{backgroundColor:'white',height:'auto',paddingLeft:10,paddingBottom:5}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>{item.name}</Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>
        <ScrollView>
          {item.id==1?
          HowEarn.map((how)=>
          <View key={how.id} style={{backgroundColor: 'white',marginVertical:10,elevation:5,marginHorizontal:10,padding:10,borderRadius:5,alignItems: 'center',}}>
            <Text style={[styles.mainHeader,{fontSize:17,textAlign:'center'}]}>{how.name}</Text>
            <Image source={how.image} style={{height:150,width:200,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={{textAlign:'center',color:'gray'}}>{how.detail}</Text>
            {/* <TouchableHighlight style={{backgroundColor: '#28a745',paddingHorizontal:10,paddingVertical:5,elevation:2,borderRadius:5,marginTop:10}}>
              <Text style={{color:'white'}}>Earn</Text>
            </TouchableHighlight> */}
          </View>
        ):
          HowPromote.map((how)=>
          <View key={how.id} style={{backgroundColor: 'white',marginVertical:10,elevation:5,marginHorizontal:10,padding:10,borderRadius:5,alignItems: 'center',}}>
            <Text style={[styles.mainHeader,{fontSize:17,textAlign:'center'}]}>{how.name}</Text>
            <Image source={how.image} style={{height:150,width:200,resizeMode:'contain',alignSelf:'center'}}/>
            <Text style={{textAlign:'center',color:'gray'}}>{how.detail}</Text>
            {/* <TouchableHighlight style={{backgroundColor: '#28a745',paddingHorizontal:10,paddingVertical:5,elevation:2,borderRadius:5,marginTop:10}}>
              <Text style={{color:'white'}}>Earn</Text>
            </TouchableHighlight> */}
          </View>
        )
        }


        </ScrollView>
    </View>
    );
  
}
