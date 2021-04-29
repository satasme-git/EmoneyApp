import React, { useContext , useState ,useEffect} from 'react';
import { View, Text, Image , Dimensions, ScrollView , TouchableHighlight, TextInput} from 'react-native';
import {styles,buttons} from "../Styles/Style";
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {ProfileData} from "../Styles/ProfileData";
import { useNavigation , DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pie from 'react-native-pie'

import {EmoneyContext}  from '../context/Context';

const windowWidth = Dimensions.get('window').width;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
 
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


export default function Profile () {
  
  const emoney = useContext(EmoneyContext);
  const navigation = useNavigation();  
  
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [complete, setComplete] = useState('');
  const [earn, setEarn] = useState('');

  const [chemail, setChEmail] = useState('');

  const putUserEmail = (em) =>{

    const data = { email: em};
   
    fetch('https://emoneytag.com/api/users/'+emoney.user.id+'', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(data => {
      // getuserData(); 
      console.log('Success:', data);
      setChEmail(em)
      // storeData(data.user)
      // navigation.navigate('TabNavigation')
      // emoney.setState('home')
    })
    .catch((error) => {
      console.error('Error:', error);
      
    })
    // navigation.navigate('TabNavigation')
  }

  const getPoints = () => {
    fetch(
      'https://emoneytag.com/api/profile/detail/'+emoney.user.id+'',
    )
      .then((response) => response.json())
      .then((json) => 
      
      setEarn(json)
      // console.log(json)
      )
      // .catch((error) => 
      // console.error(error)
      // )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
    
  };

  const getProfile = () => {
    fetch(
      'https://emoneytag.com/api/profile/'+emoney.user.id+'',
    )
      .then((response) => response.text())
      .then((json) => 
      
      setComplete(json.slice(16,18).replace('%',''))
      // setComplete(json)
      // console.log(json)
      
      )
      // .catch((error) => 
      // console.error(error)
      // )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
    
  };
  const getVeryfyEmail =()=>{
    

    fetch(
      'https://emoneytag.com/api/users/'+emoney.user.id+'/verifyemail',
    )
      .then((response) => response.text())
      .then((json) => 
      
      // setYest(JSON.stringify(json))
      console.log(json)
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
  }
  
  useEffect(() => {
    getProfile()
    getPoints()
  });
  const renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
          <Image source={require('../assets/pro.png')} style={{height:25,width:25,borderRadius:20,marginStart:30}}/>
          <Text style={[styles.headerText2,{paddingStart:10}]}>{emoney.user.email}</Text>
      </View>
    </View>
  );

  
  const title = () => {

    return (
      <View style={{backgroundColor: 'white',marginBottom:-40,marginTop:45}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View>
          <Image source={require('../assets/pro.png')} style={{height:100,width:100,borderRadius:50}}/>
          <Text style={[styles.headerText2]}>{earn.email} </Text>
              <Text style={styles.headerText2}>Mobile Number : {earn.mobile} </Text>
              <Text style={styles.headerText2}>Earned Points : {earn.points} </Text>
              
  
          </View>
          <View style={{alignItems:'center',justifyContent:'space-between',padding:10, }}>
            <Text style={[styles.innerText,{marginBottom:5}]}>Profile Strength</Text>
            <Pie
                  radius={35}
                  // innerRadius={30}
                  sections={[
                    {
                      percentage: complete,
                      color: '#3366cc',
                    },
                    {
                      percentage: (100-complete),
                      color: '#dc3912',
                    },
                  ]}
                  backgroundColor="#ddd"
                />
  
                <View style={{justifyContent:'flex-start'}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{backgroundColor: '#3366cc',width:7,height:7,borderRadius:10}} />
                  <Text style={[styles.headerText2,{fontSize:11,padding:3}]}>Complete {complete}%</Text>
                </View>
  
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <View style={{backgroundColor:  '#dc3912',width:7,height:7,borderRadius:10}} />
                  <Text style={[styles.headerText2,{fontSize:11,padding:3,color: '#dc3912'}]}>Uncomplete {100-complete}%</Text>
                </View>
                </View>
          </View>
          
        </View>
              
  
              <View style={{height:0.8,backgroundColor: '#336db0',width:windowWidth-20,marginVertical:10}} />
              
      </View>
    );
  };
  
  const renderContent = ()=> {
    // const emoney = useContext(EmoneyContext);
    
    return (
      <View style={styles.body}>
        
        <View style={{backgroundColor: 'white',elevation:2,borderRadius:10,padding:20,width:windowWidth-20,alignItems:'center',marginTop:10}}>
          <Text style={styles.mainHeader}>Verify Your Email:</Text>
          <Text style={{fontSize:11,textAlign:'center'}}>Go to your mail and click the activation link. If you didn't receive any messages from us, click on the button next to.</Text>
          <TouchableHighlight onPress={getVeryfyEmail} style={{backgroundColor:'#28a745',padding:7,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,width:windowWidth-60,alignItems:'center'}}>
              <Text style={{color:'white'}}>Send Activation Link</Text>
            </TouchableHighlight>
        </View>

        <View style={{backgroundColor: 'white',elevation:2,borderRadius:10,padding:20,width:windowWidth-20,alignItems:'center',marginTop:10}}>
          <Text style={styles.mainHeader}>Change Email</Text>
          <Text style={{fontSize:11,textAlign:'center'}}>Email</Text>
          <View style={{flexDirection:'row',width:windowWidth-40,alignItems:'center',justifyContent: 'space-between',marginTop:5}}>
            <TextInput
                style={{backgroundColor:'white',elevation:1,width:windowWidth-100,paddingLeft:10,height:40,borderRadius:2}}
                placeholder="user@example.com"
                onChangeText={(text) => setChEmail(text)}
                value={chemail}
                keyboardType={'email-address'}
              />
          <TouchableHighlight onPress={()=>putUserEmail(chemail)} style={{backgroundColor:'#28a745',padding:7,paddingHorizontal:8,elevation:2,borderRadius:7,alignItems:'center'}}>
              <Text style={{color:'white'}}>Save</Text>
          </TouchableHighlight>
          </View>

        </View>

  
        {ProfileData.map((item) => (
        <View key={item.id} style={{backgroundColor: 'white',height:200,elevation:2,borderRadius:10,padding:20,width:windowWidth-20,alignItems:'center',marginTop:10}}>
          <Text style={styles.mainHeader}>{item.name}</Text>
        </View>
        ))}
      </View>
    );
  };


    return (
      <View style={styles.containerInner}>
        <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
        <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT}
        headerMaxHeight={250}
        extraScrollHeight={20}
        navbarColor="white"
        alwaysShowNavBar={false}
        titleStyle={styles.titleStyle}
        title={title()}
        alwaysShowTitle={false}
        backgroundColor={'white'}
        // backgroundImage={require('./bg.png')}
        backgroundImageScale={1.2}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        // scrollViewProps={{
        //   onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
        //   onScrollEndDrag: () => console.log('onScrollEndDrag'),
        // }}
      />
      </View>
    );
  
}
