import React, { Component } from 'react';
import { View, Text , ScrollView , TouchableHighlight, Image, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../Styles/Style';

import Ionicons from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Survey () {
    
  const navigation = useNavigation();

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>Fill out surveys</Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>
        <View style={{backgroundColor: 'white',padding:10}}>
            <Text style={styles.heading}>1 Survey Available</Text>
        </View>
            
        <ScrollView style={styles.container}>
            <View style={{elevation:5,backgroundColor: 'white',margin:10,padding:10,borderRadius:10}}>
                <Image source={require('../assets/3.png')} style={{width:160,height:150,resizeMode:'contain',alignSelf:'center'}} />
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>50 points Avialable</Text>
                <TouchableHighlight style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'center',marginRight:10}}>
                    <Text style={{color:'white'}}>Fill</Text>
                </TouchableHighlight>
            </View>
        
        </ScrollView>
      </View>
    );
  
}
