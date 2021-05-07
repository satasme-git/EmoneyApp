import React, { useEffect , useContext , useState , useRef} from 'react';
import { View, Text , ScrollView , TouchableHighlight, Image, Dimensions , FlatList , Animated,Button} from 'react-native';
import { useNavigation , useRoute} from '@react-navigation/native';

import { styles } from '../Styles/Style';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {EmoneyContext}  from '../context/Context';

import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { RadioButton } from 'react-native-paper';

// import CheckBox from 'react-native-check-box'

import RadioButtonRN from 'radio-buttons-react-native';
import { Checkbox, Stack, Icon, NativeBaseProvider, Center } from "native-base";
import { TextInput } from 'react-native';

import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function SurveySingle () {

  const emoney = useContext(EmoneyContext);

  const inputRef = useRef();
  
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
  
  const [click, setClick] = useState(false);

  const [checked, setChecked] = useState();

  const [id, setId] = useState();

  // const [check+id, setId+id] = useState();
  
  const [qno, setQno] = useState('');
  
  const [answers, setAnswers] = useState('');
  
  const [groupValue, setGroupValue] = useState([]);

  const scrollViewRef = useRef();

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

  const toastShow =()=>{
      Toast.showWithGravity('you must fill data!', Toast.LONG, Toast.BOTTOM) 
  }

  const obj = Object.fromEntries(
    Surveys.map(ser => [ ser.id , {
      label: ser.answers
    }])
  )
// console.log(obj)


  const data = [
    {
      label: 'Yes'
     },
     {
      label: 'No'
     }
    ];


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
  const saveAnswers = () => {
    fetch(
      'https://emoneytag.com/api/servey/saveanswer/'+item.id+'/'+qno+'/'+emoney.user.id+'/'+answers,
    )
      .then((response) => response.text())
      .then((json) => 
      
      console.log(json)
      
      )
      // .catch((error) => 
      // console.error(error)
      // )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
    
  };

  const redeemPoints = () => {
    fetch(
      'https://emoneytag.com/api/servey/redeempoints/'+item.id+'/'+qno+'/'+emoney.user.id+'/'+answers,
    )
      .then((response) => response.text())
      .then((json) => 
      
      console.log(json),
      console.log(answers)

      
      )
      .catch((error) => 
      console.error(error)
      )
      .finally(() => {setLoading(false);navigation.goBack()});
    setRefreshing(false);
    
  };
  
  useEffect(() => {
    getSurveys()
    getPoints()
  },[]);

    return (
      <NativeBaseProvider>
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>Survey {item.id} </Text>
          {/* <Button title={'click'} onPress={()=>toastShow()}/> */}

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>

        <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          {/* <Text>{item.id}</Text> */}
          {Surveys.map((survey,index)=>
          index==key || index<=key?
            <View key={survey.id} style={{backgroundColor: 'white',marginVertical:5,marginHorizontal:10,padding:10,marginTop:10,elevation:2,borderRadius:5,marginBottom:index>=key?70:0}}>
              <Text style={styles.heading}>{index<=9?'0':''}{index+1}. {survey.question}</Text>
              {survey.qtype=='yesno'?
              <View onLayout={()=>setClick(false)}>
                <RadioButtonRN
                  data={data}
                  selectedBtn={(e) => {
                    console.log(e.label,survey.id);setClick(true);
                    setQno(survey.id);
                    setAnswers(e.label)
                  }}
                  box={false}
                  animationTypes={['pulse']}
                  duration={300}
                  circleSize={15}
                  activeColor={'#297dd9'}
                />

              </View>

              :
              survey.qtype=='single'?

              <View onLayout={()=>setClick(false)}>
                {/* <Text>{obj.length}</Text> */}
                <RadioButtonRN
              data={
                [
                  {
                    label: survey.answers.split("~")[0]
                   },
                   {
                    label: survey.answers.split("~")[1]
                   },
                   {
                    label: survey.answers.split("~")[2]
                   },
                   {
                    label: survey.answers.split("~")[3]
                   },
                   {
                    label: survey.answers.split("~")[4]
                   }
                  ]
                }
                selectedBtn={(e) => {
                  console.log(e.label,survey.id);setClick(true);
                  setQno(survey.id);
                  setAnswers(e.label)
                }}
                box={false}
                animationTypes={['pulse']}
                duration={300}
                circleSize={15}
                activeColor={'#297dd9'}                
              />

                
              </View>
              :
              survey.qtype=='multiple'?
              <View onLayout={()=>setClick(false)}>
                
                <Checkbox.Group
                  colorScheme="#297dd9"
                  defaultValue={groupValue}
                  onChange={(values) => {
                    setGroupValue(values || []);
                    setAnswers(values.join(","))
                    setClick(true)
                    console.log(answers)
                  }}
                >
                <Stack space={2} justifyContent= 'center' alignItems="flex-start" marginLeft={2} marginTop={2}>
                  <Checkbox value={survey.answers.split("~")[0]} size="sm" >
                    <Text style={{paddingLeft:10}}>{survey.answers.split("~")[0]}</Text>
                  </Checkbox>
                  <Checkbox value={survey.answers.split("~")[1]} size="sm" >
                    <Text style={{paddingLeft:10}}>{survey.answers.split("~")[1]}</Text>
                  </Checkbox>
                  <Checkbox value={survey.answers.split("~")[2]} size="sm" >
                    <Text style={{paddingLeft:10}}>{survey.answers.split("~")[2]}</Text>
                  </Checkbox>
                  <Checkbox value={survey.answers.split("~")[3]} size="sm" >
                    <Text style={{paddingLeft:10}}>{survey.answers.split("~")[3]}</Text>
                  </Checkbox>
                  <Checkbox
                    isIndeterminate
                    value={survey.answers.split("~")[4]} 
                    size="sm" 
                  >
                    <Text style={{paddingLeft:10}}>{survey.answers.split("~")[4]}</Text>
                  </Checkbox>
                </Stack>
                </Checkbox.Group>

              </View>
              :
              survey.qtype=='essay'?
              <View onLayout={()=>setClick(false)}>
                <TextInput ref={inputRef} style={{borderWidth:1}} onChangeText={(text)=>setAnswers(text)} />
                {/* <Text>{survey.answers}</Text> */}
              </View>
              :
              null

            }
            </View>

            :
            null
          )}
        </ScrollView>
        {count==key+1?(
        <View style={{position: 'absolute',bottom:0,backgroundColor: 'white',margin:10,elevation:15,width:windowWidth-20,borderRadius:5,padding:10, flexDirection:'row',alignItems:'center',justifyContent: 'space-between',height:50}}>
  
          <TouchableHighlight onPress={click==true?()=>{redeemPoints()}:()=>toastShow()} style={{backgroundColor:'blue',paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
          <Text style={{color:'white'}}>Redeem points</Text>
        </TouchableHighlight>
        </View>)
        :

          (<View style={{position: 'absolute',bottom:0,backgroundColor: 'white',margin:10,elevation:15,width:windowWidth-20,borderRadius:5,padding:10, flexDirection:'row',alignItems:'center',justifyContent: 'space-between',height:50}}>                
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
          
          <TouchableHighlight onPress={click==true?()=>{setKey(prevKey => prevKey + 1);setView(false);saveAnswers()}:()=>toastShow()} style={{backgroundColor:'blue',paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
          <Text style={{color:'white'}}>Next</Text>
          </TouchableHighlight>
          :
          <TouchableHighlight underlayColor={'white'} onPress={()=>{}} style={{backgroundColor:'white',paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
          <Text style={{color:'white'}}>Next</Text>
          </TouchableHighlight>
          }

          </View>)
          }
          </View>
          </NativeBaseProvider>
    );
  
}
