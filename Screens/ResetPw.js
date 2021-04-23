import React, { useState } from 'react';
import { View, Text , ScrollView , TouchableHighlight , TextInput , Image , Dimensions} from 'react-native';

import { styles } from '../Styles/Style';

import { useNavigation , DrawerActions } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Checkbox } from 'react-native-paper';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function ResetPw () { 


  const [emailNull, setEmailNull] = useState(null);
  const [error, setError] = useState(null);

  const resetPw = (em) =>{

    if (em!==''){
    fetch("https://emoneytag.com/api/users/"+em+"/sendpwlink", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    })
    .catch((error) => {

      // setError(Object.entries(error))
      reset()
      setError(false)
    })
    }
    else if (em==''){
      setEmailNull(true)
    }   
  }

  const [email, setEmail] = useState('');

  const reset =()=>{
    setEmail('')
  }
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
        
        {error==false?
        <View style={{backgroundColor:'green',padding:10,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        onLayout={()=>
          setTimeout(() => {
            setError(null)
            // console.log(error);
            navigation.navigate('Login')
          }, 800)
        }
        >
          <Text style={[styles.innerText,{color:'white'}]}>Check Your Email Inbox</Text>
        </View>
        :
        null
        }

        {emailNull==true?
        <View style={{backgroundColor:'red',padding:10,elevation:5,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        
        onLayout={()=>
        setTimeout(() => {
          setEmailNull(null)
          
        }, 800)
          
        }>
          <Text style={[styles.innerText,{color:'white'}]}>Email Empty</Text>
        </View>
        :
        emailNull==false?
        <View style={{backgroundColor:'green',padding:10,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        onLayout={()=>
          setTimeout(() => {
            setEmailNull(null)
            // navigation.navigate('Login')
          }, 800)
        }
        >
          <Text style={[styles.innerText,{color:'white'}]}> Success </Text>
        </View>
        :
        null
        }


        <ScrollView contentContainerStyle={{alignItems:'center'}} style={{marginTop:50}}>
          <Image  source={require('../assets/icon.png')} style={{height:80,width:80}} />
          <Text style={{color:'#333333',fontSize:30,marginBottom:20}}> Reset Your Password </Text>
          
          <Text style={[styles.heading,{alignSelf:'flex-start',paddingVertical:10,paddingLeft:40}]}>Enter Valid Email</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
            <View style={{backgroundColor: 'white',borderRadius:50,elevation:5,height:50,width:50,alignItems:'center',justifyContent: 'center',}}>
              <Ionicons name="mail-outline" color={'black'} size={20}  /> 
            </View>
          
          <TextInput
              style={{backgroundColor:'white',elevation:3,width:windowWidth-60,marginLeft:-20,paddingLeft:30,borderBottomRightRadius:50,borderTopRightRadius:50,height:40}}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType={'email-address'}
            />
          </View>
          
          {/* <Text>{error.length}</Text> */}

          <TouchableHighlight underlayColor={'#159c02'} onPress={()=>resetPw(email)} style={{backgroundColor:'#57b846',padding:15,paddingVertical:10,borderRadius:50,width:windowWidth-40,alignItems:'center'}}>
            <View>
              <Text style={{color:'white',fontSize:15}}>Send</Text>
            </View>
          </TouchableHighlight>



        </ScrollView>
        
      </View>
    );
  
}
