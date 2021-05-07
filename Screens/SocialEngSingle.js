import React, { useState , useContext , useEffect , } from 'react';
import { View, Text, ScrollView ,Image ,Dimensions , TouchableHighlight , Linking , FlatList,SafeAreaView} from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../Styles/Style';
import {EmoneyContext}  from '../context/Context';
import { ProgressBarAndroidBase } from 'react-native';
import RNUrlPreview from 'react-native-url-preview';
import { WebView } from 'react-native-webview';
import Toast from 'react-native-simple-toast';
// import {  } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function SocialEngSingle () {
    
  const emoney = useContext(EmoneyContext);
  const route = useRoute();
  const navigation = useNavigation();
  const { service } = route.params;
  
  const { img } = route.params;

  const { type } = route.params;

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [elevation, setElevation] = useState(0);
  
  const [Links, setLinks] = useState([]);
  
  const [points, setPoints] = useState(0);
  
  const [can, setCan] = useState(false);

  const getLinks = () => {
    fetch(
      'https://emoneytag.com/api/socialengage/'+emoney.user.id+'/'+service,
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
      'https://emoneytag.com/api/points/media'+'/'+service,
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
      // console.log('Success:', data);
      data=='sucess'?
      successToastShow()
      // setCan(true)
      :
      data=='exceed'?
      exeedToastShow()
      // setCan(false)
      :
      null
    })
    .catch((error) => {
      console.error('Error:', error);
      
    })
    // navigation.goBack()
  }

  const successToastShow =()=>{
    Toast.showWithGravity('Done', Toast.LONG, Toast.BOTTOM) 
}
const exeedToastShow =()=>{
  Toast.showWithGravity('Daily limit exeed', Toast.LONG, Toast.BOTTOM) 
}

  useEffect(() => {
    // console.log(service)
    getLinks()
    getPoints()
    // console.log(Links)
  });
 
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:'auto',paddingLeft:10,paddingBottom:5,elevation:elevation}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}> {Links.length} {service} Available </Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>
        {/* <View style={{backgroundColor: 'white',padding:10}}>
            <Text style={styles.heading}></Text>
        </View> */}
        <View style={{flex:1,backgroundColor: 'white',}}>
          <FlatList
          data={Links}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={(item) => (
            <View style={{elevation:5,backgroundColor: 'white',margin:10,marginBottom:Links.length==item.index+1  || Links.length-2==item.index?10:0,padding:10,borderRadius:10,width:(windowWidth-30)/2,marginRight:0}}>
                <Image source={img} style={[styles.thumbnail,{width:60,height:60,alignSelf:'center',resizeMode:'contain'}]} />
                {/* <Text>{item.item.url}</Text> */}
                {/* <RNUrlPreview text={item.item.url} title={false} description={false} imageStyle={{height:100,width:(windowWidth-80)/2}} /> */}
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>{points} points Avialable </Text>
               {/* <Text>{item.item.url}</Text> */}
               { 
                  service=='Youtube Subscribe'?
                  <Text></Text>
                  :
                 <Text style={{fontWeight:'bold',fontSize:15,alignSelf:'center'}}>{((item.item.url.includes("https://")==true?item.item.url:'https://'+item.item.url).split("/")[3])}</Text>
               }
               
             
                {item.item.status=='Like'?
                <TouchableHighlight onPressIn={()=>{onSave(service,emoney.user.id,item.item.id)}} onPressOut={Linking.openURL(item.item.url.includes("https://")==true?item.item.url:'https://'+item.item.url)} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,marginRight:0}}>
                    <Text style={{alignSelf:'center',color:'white'}}>{type.button1}</Text>
                </TouchableHighlight>
                :
                <TouchableHighlight style={{backgroundColor:'gray',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,marginRight:0}}>
                    <Text style={{alignSelf:'center',color:'white'}}>{type.button2}</Text>
                </TouchableHighlight>
                }
            </View>
          )}
        />  
        </View>

        {/* <SafeAreaView style={{flex: 1}}>
        <WebView
          source={{
            html:
              '<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FGalarmApp%2F&width=200&layout=standard&action=like&size=large&share=false&height=35&appId=1010058565805776" width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'
          }}
          scalesPageToFit={false}
        />
      </SafeAreaView> */}



        {/* <ScrollView contentContainerStyle={{alignItems: 'flex-start'}} style={[{flexDirection:'row',flexWrap: 'wrap'}]} onScrollEndDrag={()=>setElevation(0)} onScrollBeginDrag={()=>setElevation(3)}>
          {Links.map((item)=>
          
            <View style={{elevation:5,backgroundColor: 'white',margin:10,padding:10,borderRadius:10,width:(windowWidth-100)/2}}>
                <Image source={img} style={[styles.thumbnail,{width:100,height:100,alignSelf:'center',resizeMode:'contain'}]} />
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>{points} points Avialable</Text>
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
        </ScrollView> */}
        
      </View>
    );
  
}
