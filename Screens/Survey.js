import React, { useEffect , useContext , useState} from 'react';
import { View, Text , ScrollView , TouchableHighlight, Image, Dimensions , FlatList , Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { styles } from '../Styles/Style';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {EmoneyContext}  from '../context/Context';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Survey () {

  const emoney = useContext(EmoneyContext);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const [Links, setLinks] = useState([]);

  const [points, setPoints] = useState(0);
    
  const [view, setView] = useState(false);

  const navigation = useNavigation();
  const getLinks = () => {
    fetch(
      'https://emoneytag.com/api/servey/serveylist/'+emoney.user.id,
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
      'https://emoneytag.com/api/points/media/Servey Fill',
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
    getPoints()
  });

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>{Links.length} Survey{Links.length==0 || Links.length==1?'':'s'} Available</Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>

        <View style={{flex:1,backgroundColor: 'white',}}>
          <FlatList
          data={Links}
          numColumns={2}
          keyExtractor={item => item.id}
          renderItem={(item) => (
            <View style={{elevation:5,backgroundColor: 'white',margin:10,padding:10,borderRadius:10,width:(windowWidth-30)/2,marginRight:0}}>
                <Image source={require('../assets/4.jpg')} style={[styles.thumbnail,{width:60,height:60,alignSelf:'center',resizeMode:'contain'}]} />
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>{points} points {item.item.status=='Like'?'Avialable':'Earned'} </Text>
                {/* <Text>{item.item.url}</Text> */}
             
                {item.item.status=='Like'?
                <TouchableHighlight onPress={()=>navigation.navigate('SurveySingle',{item:item.item})} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10}}>
                    <Text style={{alignSelf:'center',color:'white'}}>View</Text>
                </TouchableHighlight>
                :
                <TouchableHighlight onPress={()=>navigation.navigate('SurveySingle',{item:item.item})} style={{backgroundColor:'gray',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10}}>
                    <Text style={{alignSelf:'center',color:'white'}}>Viewed</Text>
                </TouchableHighlight>
                }

            </View>
          )}
        />  
        </View>
                {/* <View style={{position: 'absolute',bottom:10,backgroundColor: 'white',margin:10,elevation:2,width:windowWidth-20,borderRadius:5,padding:10, flexDirection:'row',alignItems:'center',justifyContent: 'space-between',}}>
                <CountdownCircleTimer
                  isPlaying
                  duration={5}
                  size={50}
                  strokeWidth={5}
                  colors={[
                    ['#004777', 0.4],
                    ['#F7B801', 0.4],
                    ['#A30000', 0.2],
                  ]}
                  onComplete={()=>setView(true)}
              >
                {({ remainingTime, animatedColor }) => (
                  <Animated.Text style={{ color: animatedColor, fontSize: 25 }}>
                    {remainingTime}
                  </Animated.Text>
                )}
              </CountdownCircleTimer>
              {
                view==true?
                <TouchableHighlight style={{backgroundColor:'blue',paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
                <Text style={{color:'white'}}>Next</Text>
              </TouchableHighlight>
              :
              null
              }

                </View> */}

        {/* <ScrollView style={styles.container}>
            <View style={{elevation:5,backgroundColor: 'white',margin:10,padding:10,borderRadius:10}}>
                <Image source={require('../assets/4.jpg')} style={{width:160,height:150,resizeMode:'contain',alignSelf:'center'}} />
                <Text style={{color:'gray',padding:5,alignSelf:'center'}}>50 points Avialable</Text>
                <TouchableHighlight style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'center',marginRight:10}}>
                    <Text style={{color:'white'}}>Fill</Text>
                </TouchableHighlight>
            </View>
        
        </ScrollView> */}
      </View>
    );
  
}
