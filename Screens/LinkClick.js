import React, { useState , useContext , useEffect} from 'react';
import { View, Text, ScrollView ,Image ,Dimensions , TouchableHighlight , Linking ,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../Styles/Style';
import {EmoneyContext}  from '../context/Context';

import RNUrlPreview from 'react-native-url-preview';

// import {  } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function LinkClick () {
    
    
  const emoney = useContext(EmoneyContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const [Links, setLinks] = useState([]);

  const [points, setPoints] = useState(0);
  const getLinks = () => {
    fetch(
      'https://emoneytag.com/api/socialengage/'+emoney.user.id+'/Website Views',
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

  const getPoints = () => {
    fetch(
      'https://emoneytag.com/api/points/media/Website Views',
    )
      .then((response) => response.json())
      .then((json) => 
      
      setPoints(json)
      
      )
      // .catch((error) => 
      // console.error(error)
      // )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
    
  };


  useEffect(() => {
    getLinks()
    getPoints(  )
  });
 
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>{Links.length} Links Available</Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>
            
        {/* <ScrollView style={styles.container}>
        {Links.map((item)=>
            <View style={{elevation:5,backgroundColor: 'white',margin:10,padding:10,borderRadius:10}}>
                <Image source={require('../assets/3.jpg')} style={{width:160,height:150,resizeMode:'contain',alignSelf:'center'}} />
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>{points} points Avialable</Text>
                <TouchableHighlight onPress={()=>Linking.openURL(item.url)} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'center',marginRight:10}}>
                    <Text style={{color:'white'}}>View</Text>
                </TouchableHighlight>
            </View>
        )}
        </ScrollView> */}

        <View style={{flex:1,backgroundColor: 'white',}}>
          <FlatList
          data={Links}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={(item) => (
            <View style={{elevation:5,backgroundColor: 'white',margin:10,marginBottom:Links.length==item.index+1  || Links.length-2==item.index?10:0,padding:10,borderRadius:10,width:(windowWidth-30)/2,justifyContent: 'space-between',marginRight:0}}>
                <Image source={require('../assets/5.jpg')} style={[styles.thumbnail,{width:60,height:60,alignSelf:'center',resizeMode:'contain'}]} />
                {/* <RNUrlPreview text={item.item.url} title={false} description={false} imageStyle={{height:100,width:(windowWidth-80)/2}} /> */}
                <View>
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>{points} points Avialable </Text>
                {/* <Text>{item.item.url}</Text> */}
             
                {item.item.status=='Like'?
                <TouchableHighlight onPress={()=>Linking.openURL(item.item.url)} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10}}>
                    <Text style={{alignSelf:'center',color:'white'}}>View</Text>
                </TouchableHighlight>
                :
                <TouchableHighlight style={{backgroundColor:'gray',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10}}>
                    <Text style={{alignSelf:'center',color:'white'}}>Viewed</Text>
                </TouchableHighlight>
                }
                </View>
            </View>
          )}
        />  
        </View>

      </View>
    );
  
}

