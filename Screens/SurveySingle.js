import React, { useEffect , useContext , useState} from 'react';
import { View, Text , ScrollView , TouchableHighlight, Image, Dimensions , FlatList , Animated} from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';

import { styles } from '../Styles/Style';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {EmoneyContext}  from '../context/Context';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { RadioButton } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function SurveySingle () {

  const emoney = useContext(EmoneyContext);

  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const [Surveys, setSurveys] = useState([]);

  const [count, setCount] = useState(0);
    
  const [view, setView] = useState(false);

  const [duration, setDuration] = useState(5);

  const [key, setKey] = useState(0);
  
  const [skey, setSKey] = useState(0);

  const [checked, setChecked] = useState();

  const getSurveys = () => {
    fetch(
      'https://emoneytag.com/api/servey/load/'+item.id,
    )
      .then((response) => response.json())
      .then((json) => 
      
      setSurveys(json),
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
      'https://emoneytag.com/api/servey/qcount/'+item.id,
    )
      .then((response) => response.text())
      .then((json) => 
      
      setCount(json)
      
      )
      // .catch((error) => 
      // console.error(error)
      // )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
    
  };
  
  useEffect(() => {
    getSurveys()
    getPoints()
  });

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>Survey</Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>

        <ScrollView>
          {/* <Text>{item.id}</Text> */}
          {Surveys.map((survey,index)=>
          index==key || index<=key?
            <View key={survey.id} style={{backgroundColor: 'white',marginVertical:5,marginHorizontal:10,padding:10,marginTop:10}}>
              <Text style={styles.heading}>{index<=9?'0':''}{index+1}. {survey.question}</Text>
              {survey.qtype=='yesno'?
              <View>

                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <RadioButton
                  value={survey.id}
                  status={ checked === survey.id ? 'checked' : 'unchecked' }
                  onPress={() => setChecked(survey.id)}
                />
                <Text>{survey.id} </Text>
                <Text>yes</Text>
                </View>

                <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
                <RadioButton
                  value={survey.id+60}
                  status={ checked === survey.id+60 ? 'checked' : 'unchecked' }
                  onPress={() => setChecked(survey.id+60)}
                />
                <Text>{survey.id+60} </Text>
                <Text>no</Text>
                </View>


              </View>
              :
              survey.qtype=='single'?
              <View>
                <Text>{survey.answers.split("~")[0]}</Text>
                
                <Text>{survey.answers.split("~")[1]}</Text>
                
                <Text>{survey.answers.split("~")[2]}</Text>
                
                <Text>{survey.answers.split("~")[3]}</Text>
                
                <Text>{survey.answers.split("~")[4]}</Text>
              {/* <Text>{survey.answers.replace(/~/g,'\n')}</Text> */}
              {/* <Text>no</Text> */}
              </View>
              :null
            }
            </View>

            :
            null
          )}
        </ScrollView>
        {count==key+1?(
        <View style={{position: 'absolute',bottom:10,backgroundColor: 'white',margin:10,elevation:2,width:windowWidth-20,borderRadius:5,padding:10, flexDirection:'row',alignItems:'center',justifyContent: 'space-between',}}>
        {/* <CountdownCircleTimer
          isPlaying
          duration={5}
          size={40}
          key={key}
          strokeWidth={5}
          colors={[
            ['#0265d4', 0.4],
            ['#8f88fb', 0.4],
            ['#d50b0b', 0.2],
          ]}
          onComplete={()=>setView(true)}
      >
        {({ remainingTime, animatedColor }) => (
          <Animated.Text style={{ color: animatedColor, fontSize: 20 }}>
            {remainingTime} 
          </Animated.Text>
        )}
        </CountdownCircleTimer> */}
          <TouchableHighlight onPress={()=>{}} style={{backgroundColor:'blue',paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
          <Text style={{color:'white'}}>Redeem points</Text>
        </TouchableHighlight>
        </View>)
        :

          (<View style={{position: 'absolute',bottom:10,backgroundColor: 'white',margin:10,elevation:2,width:windowWidth-20,borderRadius:5,padding:10, flexDirection:'row',alignItems:'center',justifyContent: 'space-between',}}>                
          <CountdownCircleTimer
            isPlaying
            duration={5}
            size={40}
            key={key}
            strokeWidth={5}
            colors={[
              ['#0265d4', 0.4],
              ['#8f88fb', 0.4],
              ['#d50b0b', 0.2],
            ]}
            onComplete={()=>setView(true)}
          >
          {({ remainingTime, animatedColor }) => (
            <Animated.Text style={{ color: animatedColor, fontSize: 20 }}>
              {remainingTime}
            </Animated.Text>
          )}
          </CountdownCircleTimer>
          
      <Text style={{fontSize:13}}>Seconds remaining to next question</Text>
          {
          view==true?
          
          <TouchableHighlight onPress={()=>{setKey(prevKey => prevKey + 1);setView(false)}} style={{backgroundColor:'blue',paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
          <Text style={{color:'white'}}>Next</Text>
          </TouchableHighlight>
          :
          <TouchableHighlight onPress={()=>{setKey(prevKey => prevKey + 1);setView(false)}} style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
          <Text style={{color:'white'}}>Next</Text>
          </TouchableHighlight>
          }

          </View>)
          }
          </View>
    );
  
}
