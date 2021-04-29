import React, { useState , useEffect , useContext} from 'react';
import { View, Text, ScrollView, Image ,Dimensions } from 'react-native';
import {styles,buttons} from "../Styles/Style";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
// import {Dummy} from "../Styles/Dummy";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions , useNavigation  } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import {EmoneyContext}  from '../context/Context';
export default function Dashboard () {
  const navigation = useNavigation();

  const emoney = useContext(EmoneyContext);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [today, setToday] = useState(0);
  const [yest, setYest] = useState(0);
  const [week, setWeek] = useState(0);
  const [month, setMonth] = useState(0);

  const getToday = () => {
    fetch(
      'https://emoneytag.com/api/earnings/'+emoney.user.id+'/today',
    )
      .then((response) => response.json())
      .then((json) => 
      // emoney.user.id==''?setToday(0):
      setToday(JSON.stringify(json))
      
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
    


    fetch(
      'https://emoneytag.com/api/earnings/'+emoney.user.id+'/yesterday',
    )
      .then((response) => response.json())
      .then((json) => 
      
      setYest(JSON.stringify(json))
      // console.log(JSON.stringify(json))
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);



    fetch(
      'https://emoneytag.com/api/earnings/'+emoney.user.id+'/7day',
    )
      .then((response) => response.json())
      .then((json) => 
      
      setWeek(JSON.stringify(json))
      // console.log(JSON.stringify(json))
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);



    fetch(
      'https://emoneytag.com/api/earnings/'+emoney.user.id+'/month',
    )
      .then((response) => response.json())
      .then((json) => 
      
      setMonth(JSON.stringify(json))
      // console.log(json)
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);

  };
  const Dummy = [
    {
      id:'1',
    name: 'Today(Points)',
    point:today
    },
    {
      id:'2',
    name: 'Yesterday(Points)',
    point:0
    },
    {
      id:'3',
    name: 'Last 7 days(Points)',
    point:week
    },
    {
      id:'4',
    name: 'This month(Points)',
    point:month
    },
    
  ]

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

  useEffect(() => {
    getToday()
    // console.log(emoney.user.id)
  });
  
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'white',height:75,justifyContent:'center',paddingLeft:40}}>
          <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
          <Text style={{marginTop:10,fontSize:24,color:'#011842'}}> Dashboard </Text>
        </View>
        <ScrollView style={styles.container}>
          {/* <View style={{backgroundColor: 'white',margin: 10,marginBottom:5,paddingBottom:10,paddingTop:10,borderRadius:10,elevation:5}}> */}
            
            {/* <Image  source={require('../assets/Browse.png')} style={{width:windowWidth-20,height:150,resizeMode:'contain'}}/> */}
         
         
          <View style={{height:110}}>

          
  
          <SwiperFlatList
              autoplay
              vertical
              // horizontal={false}
              autoplayDelay={3}
              autoplayLoop
              index={1}
              disableGesture
              autoplayInvertDirection={false}
              autoplayLoopKeepAnimation={true}
              data={highlights}
              renderItem={({ item }) => (
                // <View style={[styles.child]}>
                  <LinearGradient start={{x: 0, y: 10}} end={{x: 1, y: 10}} colors={['#8f88fb', '#bb7ef2', '#f080e9']} style={styles.child}>
                  <Text style={[styles.text,{color:'#ffcc29',fontWeight:'bold',fontSize:17}]}>Highlights</Text>
                  <Text style={[styles.text,{color:'white'}]}>${item.point}</Text>
                  <Text style={[styles.text,{color:'white'}]}> - {item.name} - </Text>
                
            </LinearGradient>
            // </View>
              )}
            />
            </View>
          {/* </View> */}
        {Dummy.map((item)=>
            <View key={item.id} style={{backgroundColor:'white',marginHorizontal:10,marginVertical:5,marginTop:10,padding:15,elevation:5,borderRadius:10}}> 
              <Text style={[styles.mainHeader,{fontSize:17}]}>{item.name}</Text>
              <Text style={styles.innerText}>{item.point}</Text>
            </View>
        )}
        </ScrollView>
      </View>
    );
  
}
