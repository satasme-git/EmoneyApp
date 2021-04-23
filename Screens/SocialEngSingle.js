import React, { useState , useContext , useEffect , } from 'react';
import { View, Text, ScrollView ,Image ,Dimensions , TouchableHighlight , Linking } from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../Styles/Style';
import {EmoneyContext}  from '../context/Context';
import { ProgressBarAndroidBase } from 'react-native';
// import {  } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function SocialEngSingle () {
    
  const emoney = useContext(EmoneyContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  
  const { img } = route.params;

  const { type } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [elevation, setElevation] = useState(0);
  
  const [Links, setLinks] = useState([]);
  const getLinks = () => {
    fetch(
      'https://emoneytag.com/api/socialengage/'+emoney.user.id+'/'+item,
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
    // console.log(item)
    getLinks()

  });
 
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:'auto',paddingLeft:10,paddingBottom:5,elevation:elevation}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}> {Links.length} {item} Available </Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>
        {/* <View style={{backgroundColor: 'white',padding:10}}>
            <Text style={styles.heading}></Text>
        </View> */}
            
        <ScrollView style={styles.container} onScrollEndDrag={()=>setElevation(0)} onScrollBeginDrag={()=>setElevation(3)}>
          {Links.map((item)=>
          
            <View style={{elevation:5,backgroundColor: 'white',margin:10,padding:10,borderRadius:10}}>
                <Image source={img} style={[styles.thumbnail,{width:100,height:100,alignSelf:'center',resizeMode:'contain'}]} />
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>50 points Avialable</Text>
                {}
                {item.status=='Like'?
                <TouchableHighlight onPress={()=>Linking.openURL(item.url)} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'center',marginRight:10}}>
                    <Text style={{color:'white'}}>{type.button1}</Text>
                </TouchableHighlight>
                :
                <TouchableHighlight style={{backgroundColor:'gray',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'center',marginRight:10}}>
                    <Text style={{color:'white'}}>{type.button2}</Text>
                </TouchableHighlight>
                }
            </View>
        )}
        </ScrollView>
        
      </View>
    );
  
}
