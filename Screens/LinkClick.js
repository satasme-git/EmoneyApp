import React, { useState , useContext , useEffect} from 'react';
import { View, Text, ScrollView ,Image ,Dimensions , TouchableHighlight , Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../Styles/Style';
import {EmoneyContext}  from '../context/Context';
// import {  } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function LinkClick () {
    
    
  const emoney = useContext(EmoneyContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const [Links, setLinks] = useState([]);
  const getLinks = () => {
    fetch(
      'https://emoneytag.com/api/socialengage/'+emoney.user.id+'/Youtube Video Watch',
    )
      .then((response) => response.json())
      .then((json) => 
      
      setLinks(json),
      // console.log(json)
      // setComplete(json)
      // console.log(json)
      
      )
      // .catch((error) => 
      // console.error(error)
      // )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
    
  };
  useEffect(() => {
    getLinks()
  });
 
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>{Links.length} Links Available</Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>
            
        <ScrollView style={styles.container}>
        {Links.map((item)=>
            <View style={{elevation:5,backgroundColor: 'white',margin:10,padding:10,borderRadius:10}}>
                <Image source={require('../assets/3.jpg')} style={{width:160,height:150,resizeMode:'contain',alignSelf:'center'}} />
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>50 points Avialable</Text>
                <TouchableHighlight onPress={()=>Linking.openURL(item.url)} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'center',marginRight:10}}>
                    <Text style={{color:'white'}}>View</Text>
                </TouchableHighlight>
            </View>
        )}
        </ScrollView>
      </View>
    );
  
}

