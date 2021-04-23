import React, { useState, useEffect , useContext } from 'react';
import { View, Text , Image , TextInput , Dimensions, ScrollView, TouchableHighlight} from 'react-native';
import { styles } from '../Styles/Style';

import { useNavigation , DrawerActions } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { Checkbox } from 'react-native-paper';

import { GoogleSignin , GoogleSigninButton , statusCodes, } from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {EmoneyContext}  from '../context/Context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Login () {
  
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [checked, setChecked] = useState(false);

  const [userData, setUserData] = useState([]);

  const [userInfo, setUserInfo] = useState();
  const [error, setError] = useState(null);
  
  const [normalError, setNormalError] = useState(null);

  
  const [emailNull, setEmailNull] = useState(null);
  const [pwNull, setPwNull] = useState(null);
  const [loginError, setLoginError] = useState(null);  
  const emoney = useContext(EmoneyContext);

  // const getuserData = () => {
  //   fetch(
  //     'https://enewstag.com/api/socialUser/',
  //   )
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error))
  //     .finally(() => {setLoading(false);});
  //   setRefreshing(false);
    
  // };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      // saving error
    }
  }


  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
     
      setUserData(userInfo.user)
      setUserInfo(userInfo.user)
      // console.log(userInfo.user)
      googleSignUp(userInfo.user.email,'google',)

    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          break;
        case statusCodes.IN_PROGRESS:
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          break;
        default:
          setError( error );
          console.log(error)
      }

    }
  };

  const configureGoogleSignIn=() =>{
    GoogleSignin.configure({
      webClientId:'613851969001-4ltldhhue1ke9g8cm7aocnb80rucaa6n.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }


  const  getCurrentUser = async ()=> {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUserInfo( userInfo);
      setError(null)
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
        setError( new Error(errorMessage));
    }
  }

  const renderUserInfo=(userInfo)=> {
    return (
      <View>
        <TouchableHighlight style={{width:windowWidth-40,backgroundColor: 'white',elevation:2,height:40,borderRadius:5}} onPress={signOut} underlayColor={'#DDDDDD'}>
          <View style={{flexDirection:'row',justifyContent: 'center',alignItems:'center',flex:1,}}>
           <Text style={[{color:'black',fontSize:14}]}>Sign Out from Google</Text> 
          </View>
        </TouchableHighlight>
      </View>
    );
  }


  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      setUserInfo(null);
      lang.setLogData([])
      setError(null);

    } catch (error) {
      setError(error);
    }
  }


  const renderSignInButton=() =>{
    return (
      <View >
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Auto}
          onPress={()=>{signIn()}}
          style={{width:windowWidth-35}}
        />
      </View>
    );
  }
  const googleSignUp = (em,key,ref) =>{

    const data = { email: em,key: key,referel: ref, };
   
    fetch('https://emoneytag.com/api/users/google', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      // getuserData(); 
      console.log('Success:', data.user);
      emoney.setUser(data.user)
      storeData(data.user)
      navigation.navigate('TabNavigation')
      emoney.setState('home')
    })
    .catch((error) => {
      console.error('Error:', error);
      
    })
    // navigation.navigate('TabNavigation')
  }


  const normalSignIn = (em,key) =>{
 if (em!=='' && key!=='' ){
    const data = { email: em, key: key };
   
    fetch('https://emoneytag.com/api/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      // getuserData(); 
      console.log('Success:', data);

      fetch(
        'https://emoneytag.com/api/users/'+data+'',
      )
        .then((response) => response.json())
        .then((json) => {emoney.setUser(json.user);storeData(json.user)})
        .catch((error) => console.error(error))
        .finally(() => {setLoading(false);});
      setRefreshing(false);
      emoney.setId(data)
      setNormalError(false)
      setLoginError(false)
      setPwNull(false)
      setEmailNull(false)
      reset()
      
    })
    .catch((error) => {
      console.error('Error:', error);
      setNormalError(true)
      setLoginError(null)
      setEmailNull(null)
      setPwNull(null)
    })
    

  }

  if (em=='' && key == ''){
    setLoginError(true)
  }

  else if (em=='' && key!==''){
    setEmailNull(true)
  }

  else if (key == '' && em!==''){
    setPwNull(true)
  }

  }

  const reset =()=>{
    setChecked(false)
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    configureGoogleSignIn()
  });
  
  const body = userInfo ? renderUserInfo(userInfo) : renderSignInButton();
 

    return (
      <View style={styles.container}>
        


        {pwNull==true?
        <View style={{backgroundColor:'red',padding:10,elevation:5,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        
        onLayout={()=>
        setTimeout(() => {
          setPwNull(null)
        }, 800)
          
        }>
          <Text style={[styles.innerText,{color:'white'}]}>Password Empty</Text>
        </View>
        :
        loginError==false?
        <View style={{backgroundColor:'green',padding:10,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        onLayout={()=>
          setTimeout(() => {
            setPwNull(null)
          }, 800)
        }
        >
          <Text style={[styles.innerText,{color:'white'}]}>Sign In Successfully</Text>
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
          <Text style={[styles.innerText,{color:'white'}]}>Email is Empty</Text>
        </View>
        :
        emailNull==false?
        <View style={{backgroundColor:'green',padding:10,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        onLayout={()=>
          setTimeout(() => {
            setEmailNull(null)
            
          }, 800)
        }
        >
          <Text style={[styles.innerText,{color:'white'}]}>Sign In Successfully</Text>
        </View>
        :
        null
        }

        {loginError==true?
        <View style={{backgroundColor:'red',padding:10,elevation:5,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        
        onLayout={()=>
        setTimeout(() => {
          setLoginError(null)
        }, 800)
          
        }>
          <Text style={[styles.innerText,{color:'white'}]}>Email or Password is Empty</Text>
        </View>
        :
        loginError==false?
        <View style={{backgroundColor:'green',padding:10,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        onLayout={()=>
          setTimeout(() => {
            setLoginError(null)
            navigation.navigate('TabNavigation')
            emoney.setState('home')
          }, 800)
        }
        >
          <Text style={[styles.innerText,{color:'white'}]}>Sign In Successfully</Text>
        </View>
        :
        null
        }

      {normalError==true?
        <View style={{backgroundColor:'red',padding:10,elevation:5,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        
        onLayout={()=>
        setTimeout(() => {
          setNormalError(null)
        }, 800)
          
        }>
          <Text style={[styles.innerText,{color:'white'}]}>Email or Password Incorrect</Text>
        </View>
        :
        normalError==false?
        <View style={{backgroundColor:'green',padding:10,alignSelf:'center',top:40,position:'absolute',zIndex:2}} 
        onLayout={()=>
          setTimeout(() => {
            setNormalError(null)
            emoney.setState('home')
            // navigation.navigate('TabNavigation')
          }, 800)
        }
        >
          <Text style={[styles.innerText,{color:'white'}]}>Sign In Successfully</Text>
        </View>
        :
        null
        }


        <ScrollView contentContainerStyle={{alignItems:'center'}} style={{marginTop:50}}>
          <Image  source={require('../assets/icon.png')} style={{height:80,width:80}} />
          <Text style={{color:'#333333',fontSize:30,paddingBottom:15}}> Welcome </Text>
          <Text style={[styles.heading,{alignSelf:'flex-start',paddingVertical:10,paddingLeft:40,fontSize:16}]}>Log With Email</Text>
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
          <TouchableHighlight underlayColor={'#159c02'} onPress={()=>normalSignIn(email,password)} style={{backgroundColor:'#57b846',padding:15,paddingVertical:10,borderRadius:50,width:windowWidth-40,alignItems:'center'}}>
            <View>
              <Text style={{color:'white',fontSize:15}}>Login</Text>
            </View>
          </TouchableHighlight>
          <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
            <Text>Forgot Username Or Password?  </Text>
            <Text style={{color:'#0265d4'}} onPress={()=>navigation.navigate('ResetPw')}>Reset Password</Text>
          </View>

          <TouchableHighlight underlayColor={'#011842'} style={{backgroundColor:'#2f55a4',padding:15,paddingVertical:10,borderRadius:2,elevation:3,width:windowWidth-40,alignItems:'center',marginBottom:10}}>
            <View>
              <Text style={{color:'white',fontSize:15}}> Connect with Facebook </Text>
            </View>
          </TouchableHighlight>

          {body}

          <View style={{flexDirection:'row',alignItems:'center',padding:10}}>
            <Text>Didn't have An Account? </Text>
            <Text style={{color:'#0265d4'}} onPress={()=>navigation.navigate('Signup')}> Sign Up</Text>
          </View>

        </ScrollView>
        
      </View>
    );
  
}