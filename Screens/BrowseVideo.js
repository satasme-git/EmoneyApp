import React, { useState , useContext , useEffect} from 'react';
import { View, Text, ScrollView ,Image ,Dimensions , TouchableHighlight , Linking ,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../Styles/Style';
import {EmoneyContext}  from '../context/Context';
// import {  } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function BrowseVideo () {
    
  const emoney = useContext(EmoneyContext);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const [Links, setLinks] = useState([]);
  
  const [points, setPoints] = useState(0);

  
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

  const getPoints = () => {
    fetch(
      'https://emoneytag.com/api/points/media/Youtube Video Watch',
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

  const onSave = (ser,uid,oid) =>{

    const data = { service: ser,userid:uid,orderid:oid};
   
    fetch('https://emoneytag.com/api/socialengage', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
      
    })
    // navigation.goBack()
  }

  useEffect(() => {
    getLinks()
    getPoints()
  });
 
    return (
      <View style={{flex:1,backgroundColor: '#fff',}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>{Links.length} Video{Links.length==0 || Links.length==1?'':'s'} Available </Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />
        </View>
        <FlatList
          data={Links}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={(item) => (
            <View style={{elevation:5,backgroundColor: 'white',margin:10,marginBottom:Links.length==item.index+1  || Links.length-2==item.index?10:0,padding:10,borderRadius:10,width:(windowWidth-30)/2,justifyContent: 'space-between',marginRight:0}}>
                <Image source={require('../assets/video.jpg')} style={[styles.thumbnail,{width:(windowWidth-60)/2,height:80,alignSelf:'center',resizeMode:'contain'}]} />
                {/* <RNUrlPreview text={item.item.url} title={false} description={false} imageStyle={{height:100,width:(windowWidth-80)/2}} /> */}
                <View>
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>{points} points Avialable </Text>
                {/* <Text>{item.item.url}</Text> */}
             
                {item.item.status=='Like'?
                <TouchableHighlight onPress={()=>{Linking.openURL(item.item.url);onSave("Youtube Video Watch",emoney.user.id,item.item.id)}} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10}}>
                    <Text style={{alignSelf:'center',color:'white'}}>Start Watching</Text>
                </TouchableHighlight>
                :
                <TouchableHighlight style={{backgroundColor:'gray',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10}}>
                    <Text style={{alignSelf:'center',color:'white'}}>Watched</Text>
                </TouchableHighlight>
                }
                </View>
            </View>
          )}
        />  
        {/* <ScrollView style={styles.container}>
          {Links.map((item)=>
          
            <View style={{elevation:5,backgroundColor: 'white',margin:10,padding:10,borderRadius:10}}>
                <Image source={require('../assets/video.jpg')} style={[styles.thumbnail,{width:windowWidth-40}]} />
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>50 points Avialable</Text>
                {item.status=='Like'?
                <TouchableHighlight onPress={()=>Linking.openURL(item.url)} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'center',marginRight:10}}>
                    <Text style={{color:'white'}}>Start Watching</Text>
                </TouchableHighlight>
                :
                <TouchableHighlight style={{backgroundColor:'gray',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'center',marginRight:10}}>
                    <Text style={{color:'white'}}>Watched</Text>
                </TouchableHighlight>
                }
            </View>
        )}
        </ScrollView> */}
        
      </View>
    );
  
}
