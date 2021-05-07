import React, { useContext , useState ,useEffect , useRef} from 'react';
import { View, Text, Image , Dimensions, ScrollView , TouchableHighlight, TextInput} from 'react-native';
import {styles,buttons} from "../Styles/Style";
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {ProfileData} from "../Styles/ProfileData";
import { useNavigation , DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pie from 'react-native-pie'
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import RBSheet from "react-native-raw-bottom-sheet";
import { format } from 'date-fns'
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {EmoneyContext}  from '../context/Context';

const windowWidth = Dimensions.get('window').width;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
 
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;


export default function Profile () {
  const refRBSheet = useRef();
  const emoney = useContext(EmoneyContext);
  const navigation = useNavigation();  
  
  const [date, setDate] = useState(new Date())
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [complete, setComplete] = useState('');
  const [earn, setEarn] = useState('');

  const [user, setUser] = useState([]);

  const [chemail, setChEmail] = useState('');
  
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [no, setNo] = useState('');
  const [street, setStreet] = useState('');
  const [pocode, setPoCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [paypal, setPaypal] = useState('');

  
  const [cfname, setCFname] = useState('');
  const [clname, setCLname] = useState('');
  const [cno, setCNo] = useState('');
  
  const [bcountry, setBCountry] = useState('AAAA');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  
  const [sp, setSp] = useState('');
  const [edu, setEdu] = useState('');

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('user', jsonValue)
    } catch (e) {
      // saving error
    }
  }

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
      getUserDetails()
      getProfile()
      // storeData(data.user)
      // navigation.navigate('TabNavigation')
      // emoney.setState('home')
    })
    .catch((error) => {
      console.error('Error:', error);
      
    })
    // navigation.navigate('TabNavigation')
  }

  const putPaymentDetails = (fn,ln,no,st,ct,re,po,co,cur,pa) =>{

    const data = { p_fname: fn,p_lname:ln,p_number:no,p_street:st,p_city:ct,p_region:re,p_postal:po,p_country:co,p_currency:cur,p_pay:pa};
   
    fetch('https://emoneytag.com/api/users/'+emoney.user.id+'', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      // getuserData(); 
      console.log('Success:', data);
      storeData(data)
      emoney.setUser(data)
      getProfile()
      // setChEmail(em)
      // storeData(data.user)
      // navigation.navigate('TabNavigation')
      // emoney.setState('home')
    })
    .catch((error) => {
      console.error('Error:', error);
      
    })
    // navigation.navigate('TabNavigation')
  }

  const putContactDetails = (fn,ln,no) =>{

    const data = { fname: fn,lname:ln,mobile:no};
   
    fetch('https://emoneytag.com/api/users/'+emoney.user.id+'', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      // getuserData(); 
      console.log('Success:', data);
      storeData(data)
      emoney.setUser(data)
      getProfile()

      // setChEmail(em)
      // storeData(data.user)
      // navigation.navigate('TabNavigation')
      // emoney.setState('home')
    })
    .catch((error) => {
      console.error('Error:', error);
      
    })
  }

  const putBasicDetails = (co,ge,d) =>{

    const data = { country: co,gender:ge,dob:d};
   
    fetch('https://emoneytag.com/api/users/'+emoney.user.id+'', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      storeData(data)
      emoney.setUser(data)
      getProfile()
    })
    .catch((error) => {
      console.error('Error:', error);
      
    })
    // navigation.navigate('TabNavigation')
  }

  const putExperienceDetails = (sp,ed) =>{

    const data = { specialization: sp,education:ed};
   
    fetch('https://emoneytag.com/api/users/'+emoney.user.id+'', {
      method: 'PUT', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      storeData(data)
      emoney.setUser(data)
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
  // const getUserFullDetail = () => {
  //   fetch(
  //     'https://emoneytag.com/api/users/'+emoney.user.id+'',
  //   )
  //     .then((response) => response.json())
  //     .then((json) => 

  //       // setUser(json),
  //       emoney.setUserFull(json.user),
  //       // console.log(emoney.user),
  //       setChEmail(emoney.userFull.tempemail),
  //       setCFname(emoney.userFull.fname),
  //       setCLname(emoney.userFull.lname),
  //       setCNo(emoney.userFull.mobile),
  //       setBCountry(emoney.userFull.country),
  //       setGender(emoney.userFull.gender),
  //       setDob(emoney.userFull.dob),
  //       setSp(emoney.userFull.specialization),
  //       setEdu(emoney.userFull.education)

  //     // console.log(json)
  //     )
  //     // .catch((error) => 
  //     // console.error(error)
  //     // )
  //     .finally(() => {setLoading(false);});
  //   setRefreshing(false);
    
  // };

  const getUserDetails = () => {
    setLoading(true)
    fetch(
      'https://emoneytag.com/api/users/'+emoney.user.id+'',
    )
      .then((response) => response.json())
      .then((json) => 

        setUser(json),
        setFname(user.fname),
        setLname(user.lname),
        setNo(user.addresno),
        setStreet(user.street),
        setPoCode(user.postal),
        setCity(user.city),
        setState(user.region),
        setCountry(user.country),
        setCurrency(user.currency),
        setPaypal(user.p_pay),
        setChEmail(emoney.user.email),
        setCFname(emoney.user.fname),
        setCLname(emoney.user.lname),
        setCNo(0+emoney.user.mobile.toString()),
        setBCountry(emoney.user.country),
        setGender(emoney.user.gender),
        setDob(emoney.user.dob),
        setSp(emoney.user.specialization),
        setEdu(emoney.user.education)
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
    getUserDetails()
    // getUserFullDetail()
    // console.log(emoney.userFull)
  },[]);
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
          <Text style={[styles.headerText2]} onLayout={()=>{getUserDetails()}}>{earn.email} </Text>
              <Text style={styles.headerText2}>Mobile Number : {earn.mobile} </Text>
              <Text style={styles.headerText2}>Earned Points : {earn.points} </Text>
              {/* <Text>{emoney.user.fname}</Text> */}
  
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
                style={{backgroundColor:'#eaebee',width:windowWidth-100,paddingLeft:10,height:40,borderRadius:2}}
                placeholder="user@example.com"
                onChangeText={(text) => setChEmail(text)}
                value={chemail}
                keyboardType={'email-address'}
              />
          <TouchableHighlight onPress={()=>putUserEmail(chemail)} style={{backgroundColor:'#28a745',padding:7,paddingHorizontal:8,borderRadius:7,alignItems:'center'}}>
              <Text style={{color:'white'}}>Save</Text>
          </TouchableHighlight>
          </View>
        </View>

        <View style={{backgroundColor: 'white',elevation:2,borderRadius:10,padding:20,width:windowWidth-20,alignItems:'center',marginTop:10}}>
          <Text style={styles.mainHeader}>Payment Receiver(Needed when cash out)</Text>
          {/* <Text style={{fontSize:11,textAlign:'center'}}>Email</Text> */}

          <View style={{paddingTop:10}}>
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="First Name"
              onChangeText={(text) => setFname(text)}
              value={fname}
              keyboardType={'email-address'}
            />
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="Last Name"
              onChangeText={(text) => setLname(text)}
              value={lname}
              keyboardType={'email-address'}
            />
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="Contact Number"
              onChangeText={(text) => setNo(text)}
              value={no}
              keyboardType={'email-address'}
            />
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="Street"
              onChangeText={(text) => setStreet(text)}
              value={street}
              keyboardType={'email-address'}
            />

            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="Postal Code"
              onChangeText={(text) => setPoCode(text)}
              value={pocode}
              keyboardType={'email-address'}
            />
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="City"
              onChangeText={(text) => setCity(text)}
              value={city}
              keyboardType={'email-address'}
            />
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="State Or Region"
              onChangeText={(text) => setState(text)}
              value={state}
              keyboardType={'email-address'}
            />
              <DropDownPicker
                items={[
                    {label: '--Select Country--', value: 'AAAA',selected:true},
                    {label: 'Afghanistan', value: 'AF'},
                    {label: 'Armenia', value: 'AM'},
                    {label: 'Azerbaijan', value: 'AZ'},
                    {label: 'Bahrain', value: 'BH'},
                    {label: 'Bangladesh', value: 'BD'},
                    {label: 'Bhutan', value: 'BT'},
                    {label: 'British Indian Ocean Territory', value: 'IO'},
                    {label: 'Brunei Darussalam', value: 'BN'},
                    {label: 'Cambodia', value: 'KH'},
                    {label: 'China', value: 'CN'},
                    {label: 'Christmas Island', value: 'CX'},
                    {label: 'Cocos (Keeling) Islands', value: 'CC'},
                    {label: 'Georgia', value: 'GE'},
                    {label: 'Hong Kong', value: 'HK'},
                    {label: 'India', value: 'IN'},
                    {label: 'Indonesia', value: 'ID'},
                    {label: 'Iran', value: 'IR'},
                    {label: 'Iraq', value: 'IQ'},
                    {label: 'Israel', value: 'IL'},
                    {label: 'Japan', value: 'JP'},
                    {label: 'Jordan', value: 'JO'},
                    {label: 'Kazakhstan', value: 'KZ'},
                    {label: "Korea, Democratic People's Republic of", value: 'KP'},
                    {label: 'Korea, Republic of', value: 'KR'},
                    {label: 'Kuwait', value: 'KW'},
                    {label: 'Kyrgyzstan', value: 'KG'},
                    {label: 'Lao', value: 'LA'},
                    {label: 'Lebanon', value: 'LB'},
                    {label: 'Malaysia', value: 'MY'},
                    {label: 'Maldives', value: 'MV'},
                    {label: 'Mongolia', value: 'MN'},
                    {label: 'Myanmar (Burma)', value: 'MM'},
                    {label: 'Nepal', value: 'NP'},
                    {label: 'Oman', value: 'OM'},
                    {label: 'Pakistan', value: 'PK'},
                    {label: 'Philippines', value: 'PH'},
                    {label: 'Qatar', value: 'QA'},
                    {label: 'Russian Federation', value: 'RU'},
                    {label: 'Saudi Arabia', value: 'SA'},
                    {label: 'Singapore', value: 'SG'},
                    {label: 'Sri Lanka', value: 'LK'},
                    {label: 'Syria', value: 'SY'},
                    {label: 'Taiwan', value: 'TW'},
                    {label: 'Tajikistan', value: 'TJ'},
                    {label: 'Thailand', value: 'TH'},
                    {label: 'East Timor', value: 'TP'},
                    {label: 'Turkmenistan', value: 'TM'},
                    {label: 'United Arab Emirates', value: 'AE'},
                    {label: 'Uzbekistan', value: 'UZ'},
                    {label: 'Vietnam', value: 'VN'},
                    {label: 'Yemen', value: 'YE'},
                ]}
                // placeholderStyle={{
                //   fontWeight: 'bold',
                //   textAlign: 'center'
                // }}
                defaultValue={country}
                containerStyle={{height: 40,marginTop:0}}
                style={{backgroundColor: '#eaebee',borderColor:'#eaebee'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setCountry(item.value)}
            />

              <DropDownPicker
                items={[
                  {label: '--Select Currency--', value: 'AAAA',selected:true},
                  {label:'Afghan Afghani', value:"AFA"},
                  {label:'Armenian Dram', value:"AMD"},
                  {label:'Azerbaijani Manat', value:"AZN"},
                  {label:'Bahraini Dinar', value:"BHD"},
                  {label:'Bangladeshi Taka', value:"BDT"},
                  {label:'Bhutanese Ngultrum', value:"BTN"},
                  {label:'Brunei Dollar', value:"BND"},
                  {label:'Cambodian Riel', value:"KHR"},
                  {label:'Chinese Yuan', value:"CNY"},
                  {label:'Georgian Lari', value:"GEL"},
                  {label:'Hong Kong Dollar', value:"HKD"},
                  {label:'Indian Rupee', value:"INR"},
                  {label:'Indonesian Rupiah', value:"IDR"},
                  {label:'Iranian Rial', value:"IRR"},
                  {label:'Iraqi Dinar', value:"IQD"},
                  {label:'Israeli New Sheqel', value:"ILS"},
                  {label:'Japanese Yen', value:"JPY"},
                  {label:'Jordanian Dinar', value:"JOD"},
                  {label:'Kazakhstani Tenge', value:"KZT"},
                  {label:'Kuwaiti Dinar', value:"KWD"},
                  {label:'Kyrgystani Som', value:"KGS"},
                  {label:'Laotian Kip', value:"LAK"},
                  {label:'Lebanese Pound', value:"LBP"},
                  {label:'Macanese Pataca', value:"MOP"},
                  {label:'Malaysian Ringgit', value:"MYR"},
                  {label:'Maldivian Rufiyaa', value:"MVR"},
                  {label:'Mongolian Tugrik', value:"MNT"},
                  {label:'Nepalese Rupee', value:"NPR"},
                  {label:'North Korean Won', value:"KPW"},
                  {label:'Omani Rial', value:"OMR"},
                  {label:'Pakistani Rupee', value:"PKR"},
                  {label:'Philippine Peso', value:"PHP"},
                  {label:'Qatari Rial', value:"QAR"},
                  {label:'Saudi Riyal', value:"SAR"},
                  {label:'Singapore Dollar', value:"SGD"},
                  {label:'South Korean Won', value:"KRW"},
                  {label:'Sri Lankan Rupee', value:"LKR"},
                  {label:'Syrian Pound', value:"SYP"},
                  {label:'Tajikistani Somoni', value:"TJS"},
                  {label:'Thai Baht', value:"THB"},
                  {label:'Turkish Lira', value:"TRY"},
                  {label:'Turkmenistani Mana', value:"TMT"},
                  {label:'US Dollar', value:"USD"},
                  {label:'Uzbekistan Som', value:"UZS"},
                  {label:'Vietnamese Dong', value:"VND"},
                  {label:'Yemeni Rial', value:"YER"},
                ]}
                defaultValue={currency}
                containerStyle={{height: 40,marginTop:10}}
                style={{backgroundColor: '#eaebee',borderColor:'#eaebee'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setCurrency(item.value)}
              />
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10,marginTop:10}}
              placeholder="Paypal Email or PayerID"
              onChangeText={(text) => setPaypal(text)}
              value={paypal}
              keyboardType={'email-address'}
            />
          <TouchableHighlight onPress={()=>{putPaymentDetails(fname,lname,no,street,city,state,pocode,country,currency,paypal)}} style={{backgroundColor:'#28a745',padding:7,paddingHorizontal:8,borderRadius:7,alignItems:'center',marginTop:30}}>
              <Text style={{color:'white'}}>Save</Text>
          </TouchableHighlight>
          </View>
        </View>
        
        <View style={{backgroundColor: 'white',elevation:2,borderRadius:10,padding:20,width:windowWidth-20,alignItems:'center',marginTop:10}}>
          <Text style={styles.mainHeader}>Contact Details</Text>
          <View style={{paddingTop:10}}>
          <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="First Name"
              onChangeText={(text) => setCFname(text)}
              value={cfname}
              keyboardType={'email-address'}
            />
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="Last Name"
              onChangeText={(text) => setCLname(text)}
              value={clname}
              keyboardType={'email-address'}
            />
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="Contact Number"
              onChangeText={(text) => setCNo(text)}
              value={cno}
              keyboardType={'email-address'}
            />
          <TouchableHighlight onPress={()=>{putContactDetails(cfname,clname,cno);}} style={{backgroundColor:'#28a745',padding:7,paddingHorizontal:8,borderRadius:7,alignItems:'center'}}>
              <Text style={{color:'white'}}>Save</Text>
          </TouchableHighlight>
          </View>
        </View>

        <View style={{backgroundColor: 'white',elevation:2,borderRadius:10,padding:20,width:windowWidth-20,alignItems:'center',marginTop:10}}>
          <Text style={styles.mainHeader}>Basic Information</Text>
          <View style={{paddingTop:10}}>
            <View>
            <DropDownPicker
                items={[
                    {label: '--Select Country--', value: 'AAAA',selected:true},
                    {label: 'Afghanistan', value: 'AF'},
                    {label: 'Armenia', value: 'AM'},
                    {label: 'Azerbaijan', value: 'AZ'},
                    {label: 'Bahrain', value: 'BH'},
                    {label: 'Bangladesh', value: 'BD'},
                    {label: 'Bhutan', value: 'BT'},
                    {label: 'British Indian Ocean Territory', value: 'IO'},
                    {label: 'Brunei Darussalam', value: 'BN'},
                    {label: 'Cambodia', value: 'KH'},
                    {label: 'China', value: 'CN'},
                    {label: 'Christmas Island', value: 'CX'},
                    {label: 'Cocos (Keeling) Islands', value: 'CC'},
                    {label: 'Georgia', value: 'GE'},
                    {label: 'Hong Kong', value: 'HK'},
                    {label: 'India', value: 'IN'},
                    {label: 'Indonesia', value: 'ID'},
                    {label: 'Iran', value: 'IR'},
                    {label: 'Iraq', value: 'IQ'},
                    {label: 'Israel', value: 'IL'},
                    {label: 'Japan', value: 'JP'},
                    {label: 'Jordan', value: 'JO'},
                    {label: 'Kazakhstan', value: 'KZ'},
                    {label: "Korea, Democratic People's Republic of", value: 'KP'},
                    {label: 'Korea, Republic of', value: 'KR'},
                    {label: 'Kuwait', value: 'KW'},
                    {label: 'Kyrgyzstan', value: 'KG'},
                    {label: 'Lao', value: 'LA'},
                    {label: 'Lebanon', value: 'LB'},
                    {label: 'Malaysia', value: 'MY'},
                    {label: 'Maldives', value: 'MV'},
                    {label: 'Mongolia', value: 'MN'},
                    {label: 'Myanmar (Burma)', value: 'MM'},
                    {label: 'Nepal', value: 'NP'},
                    {label: 'Oman', value: 'OM'},
                    {label: 'Pakistan', value: 'PK'},
                    {label: 'Philippines', value: 'PH'},
                    {label: 'Qatar', value: 'QA'},
                    {label: 'Russian Federation', value: 'RU'},
                    {label: 'Saudi Arabia', value: 'SA'},
                    {label: 'Singapore', value: 'SG'},
                    {label: 'Sri Lanka', value: 'LK'},
                    {label: 'Syria', value: 'SY'},
                    {label: 'Taiwan', value: 'TW'},
                    {label: 'Tajikistan', value: 'TJ'},
                    {label: 'Thailand', value: 'TH'},
                    {label: 'East Timor', value: 'TP'},
                    {label: 'Turkmenistan', value: 'TM'},
                    {label: 'United Arab Emirates', value: 'AE'},
                    {label: 'Uzbekistan', value: 'UZ'},
                    {label: 'Vietnam', value: 'VN'},
                    {label: 'Yemen', value: 'YE'},
                ]}
                // placeholderStyle={{
                //   fontWeight: 'bold',
                //   textAlign: 'center'
                // }}
                defaultValue={bcountry}
                containerStyle={{height: 40,marginTop:10}}
                style={{backgroundColor: '#eaebee',borderColor:'#eaebee'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setBCountry(item.value)}
            />
            </View>
            
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10,marginTop:10}}
              placeholder="Gender"
              onChangeText={(text) => setGender(text)}
              value={gender}
              keyboardType={'email-address'}
            />

            <TouchableHighlight underlayColor={'#DDDDDD'} onPress={() => refRBSheet.current.open()} style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10,justifyContent:'center'}}>
              <Text>{format(date, "yyyy-MM-dd")}</Text>
            </TouchableHighlight>

          <TouchableHighlight onPress={()=>{putBasicDetails(bcountry,gender,format(date, "yyyy-MM-dd"));}} style={{backgroundColor:'#28a745',padding:7,paddingHorizontal:8,borderRadius:7,alignItems:'center',zIndex:2}}>
              <Text style={{color:'white'}}>Save</Text>
          </TouchableHighlight>

          </View>
        </View>

        <View style={{backgroundColor: 'white',elevation:2,borderRadius:10,padding:20,width:windowWidth-20,alignItems:'center',marginTop:10}}>
          <Text style={styles.mainHeader}>Experience</Text>
          <Text style={{fontSize:11,textAlign:'center'}}>Add your work experience to get better paid monetization ads. </Text>
          <View style={{paddingTop:10}}>
          <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="Specialization"
              onChangeText={(text) => setSp(text)}
              value={sp}
              keyboardType={'email-address'}
            />
            <TextInput
              style={{backgroundColor:'#eaebee',width:windowWidth-40,paddingLeft:10,height:40,borderRadius:2,marginBottom:10}}
              placeholder="Education"
              onChangeText={(text) => setEdu(text)}
              value={edu}
              keyboardType={'email-address'}
            />
          <TouchableHighlight onPress={()=>{putExperienceDetails(sp,edu)}} style={{backgroundColor:'#28a745',padding:7,paddingHorizontal:8,borderRadius:7,alignItems:'center'}}>
              <Text style={{color:'white'}}>Save</Text>
          </TouchableHighlight>
          </View>
        </View>

      </View>
    );
  };


    return (
      <View style={styles.containerInner}>

        {isLoading==true?(
        <View style={{position:'absolute',height:SCREEN_HEIGHT,width:windowWidth,zIndex:1,top:0,backgroundColor: 'rgba(0,0,0,0.3)',elevation:6,justifyContent:'center',alignItems:'center'}}>
          <View style={{alignSelf:'center',alignItems:'center',justifyContent: 'center',height:120,width:120}}>
            <Image source={require('../assets/icon.png')} style={{height:50,width:50,tintColor:'white'}} />
            <MaterialIndicator  color='white' size={30}/>
          </View>
        </View>):
        null
        }

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
            <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.1)",
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
            <DatePicker
              mode={'date'}
              date={date}
              onDateChange={setDate}
            />
      </RBSheet>
      </View>
    );
  
}
