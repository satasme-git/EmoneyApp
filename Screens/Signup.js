import React, { useState } from 'react';
import { View, Text , ScrollView , TouchableHighlight , TextInput , Image , Dimensions} from 'react-native';

import { styles } from '../Styles/Style';

import { useNavigation , DrawerActions } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Checkbox } from 'react-native-paper';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Signup () { 

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [referrel, setReferrel] = useState('');
    
    const [conpassword, setConPassword] = useState('');
    
    const [checked, setChecked] = useState(false);

    const [checked2, setChecked2] = useState(false);

    const [pwmatch, setPwMatch] = useState(null);
    const [loginError, setLoginError] = useState(null);
    const [emptyEmail, setEmptyEmail] = useState(null);
    const [emptyPw, setEmptyPw] = useState(null);
  
    const navigation = useNavigation();

    const signUp = (em,key,ref) =>{

      if (em!=='' && key!=='' && key == conpassword){

        const data = { email: em,key: key,referel: ref, };
     
      fetch('https://emoneytag.com/api/users', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        // getuserData(); 
        navigation.navigate('Login')
        setPwMatch(false)
        setEmptyPw(false)
        setEmptyEmail(false)
        setLoginError(false)
        console.log('Success:', data);
        reset()
      })
      .catch((error) => {
        console.error('Error:', error);
      })          

      }
      else{
        setLoginError(true)
      }
      if ( conpassword!==password ){
        setPwMatch(true)
      }

      if ( password == ''){
        setEmptyPw(true)
      }

      if ( email == ''){
        setEmptyEmail(true)
      }
    }


    const reset =()=>{
      setChecked(false)
      setChecked2(false)
      setEmail('')
      setPassword('')
      setConPassword('')
    }


    return (
        <View style={styles.container}>

        {loginError==true?
        <View style={{backgroundColor:'red',padding:10,elevation:5,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        
        onLayout={()=>
        setTimeout(() => {
          setLoginError(null)
        }, 800)
          
        }>
          <Text style={[styles.innerText,{color:'white'}]}>Something Wrong</Text>
        </View>
        :
        loginError==false?
        <View style={{backgroundColor:'green',padding:10,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        onLayout={()=>
          setTimeout(() => {
            setLoginError(null)
          }, 800)
        }
        >
          <Text style={[styles.innerText,{color:'white'}]}>Sign Up Successfully</Text>
        </View>
        :
        null
        }


        <ScrollView contentContainerStyle={{alignItems:'center'}} style={{marginTop:50}}>
          <Image  source={require('../assets/icon.png')} style={{height:80,width:80}} />
          <Text style={{color:'#333333',fontSize:30,}}> Register </Text>
          <Text style={[styles.heading,{alignSelf:'flex-start',paddingVertical:10,paddingLeft:40}]}>Register With Email</Text>
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
          
          <View style={{flexDirection:'row',alignItems:'center',}}>

            <View style={{backgroundColor: 'white',borderRadius:50,elevation:5,height:50,width:50,alignItems:'center',justifyContent: 'center',}}>
              <Ionicons name="lock-closed-outline" color={'black'} size={20}  /> 
            </View>
          
          <TextInput
              style={{backgroundColor:'white',elevation:3,width:windowWidth-60,marginLeft:-20,paddingLeft:30,borderBottomRightRadius:50,borderTopRightRadius:50,height:40}}
              placeholder="Password"
              onChangeText={(text) => setPassword(text)}
              value={password}                
              textContentType={'password'}
              secureTextEntry={checked ? false : true}
            />
          </View>
          <View style={{alignItems:'center',flexDirection:'row',alignSelf:'flex-start',paddingLeft:20}}>
          <Checkbox
                color={'#5c9be2'}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
                /> 
          <Text>Show Password</Text>
          </View>

          <View style={{flexDirection:'row',alignItems:'center',}}>

            <View style={{backgroundColor: 'white',borderRadius:50,elevation:5,height:50,width:50,alignItems:'center',justifyContent: 'center',}}>
            <Ionicons name="lock-closed-outline" color={'black'} size={20}  /> 
            </View>

            <TextInput
            style={{backgroundColor:'white',elevation:3,width:windowWidth-60,marginLeft:-20,paddingLeft:30,borderBottomRightRadius:50,borderTopRightRadius:50,height:40}}
            placeholder="Password"
            onChangeText={(text) => setConPassword(text)}
            value={conpassword}                
            textContentType={'password'}
            secureTextEntry={checked2 ? false : true}
            />
            </View>
            <View style={{alignItems:'center',flexDirection:'row',alignSelf:'flex-start',paddingLeft:20}}>
            <Checkbox
                color={'#5c9be2'}
                status={checked2 ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked2(!checked2);
                }}
                /> 
            <Text>Show Password</Text>
            </View>

            <View>
            {/* <Text>If you Have a Referrel Link, enter here</Text> */}
            {/* <View style={{backgroundColor: 'white',borderRadius:50,elevation:5,height:50,width:50,alignItems:'center',justifyContent: 'center',}}>
              <Ionicons name="mail-outline" color={'black'} size={20}  /> 
            </View> */}
          
          <TextInput
              style={{backgroundColor:'white',elevation:3,width:windowWidth-40,marginBottom:10,paddingLeft:30,borderRadius:50,height:40}}
              placeholder="If You Have a Referrel Link, Enter Here"
              onChangeText={(text) => setReferrel(text)}
              value={referrel}
              keyboardType={'default'}
            />
          </View>

          <TouchableHighlight underlayColor={'#159c02'} onPress={()=>signUp(email,password,referrel)} style={{backgroundColor:'#57b846',padding:15,paddingVertical:10,borderRadius:50,width:windowWidth-40,alignItems:'center'}}>
            <View>
              <Text style={{color:'white',fontSize:15}}>Sign Up</Text>
            </View>
          </TouchableHighlight>



        </ScrollView>
        
      </View>
    );
  
}
