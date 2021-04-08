import React, { useState } from 'react';
import { View, Text , Dimensions, Image, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import {styles,buttons} from "../Styles/Style";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation , DrawerActions } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Contact () {
  
  const navigation = useNavigation();

  const [que, setQue] = useState("ihaq");
  const [name, setName] = useState( "");  
  const [email, setEmail] = useState( "");
  const [sub, setSub] = useState( "");
  const [msg, setMsg] = useState( "");

    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10}}>
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}> Contact Information </Text>

          <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
        </View>

<ScrollView style={{padding:10}}>

        <View style={{flex:1,alignItems:'center',backgroundColor: 'white',borderRadius:10,elevation:2,width:windowWidth-40,padding:10,alignSelf:'center',marginTop:10,marginBottom:20}}>
          <Image  source={require('../assets/dme.jpg')} style={{width:windowWidth-20,height:200,resizeMode:'contain'}}/>
          {/* <Text style={[styles.mainHeader,{marginBottom:10}]}>Contact Information</Text> */}
          
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Ionicons name="call" color={'#383e56'} size={17}/>
            <Text style={{marginStart:10,color:'#383e56'}}>+0123456789</Text>
          </View>

          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Ionicons name="md-mail" color={'#383e56'} size={17}/>
            <Text style={{marginStart:10,color:'#383e56'}}>hello@gmail.com</Text>
          </View>

          <View>
            <DropDownPicker
                items={[
                    {label: 'I Have a Question', value: 'ihaq',selected:true},
                    {label: 'Cancel Order', value: 'co'},
                    {label: 'Refill Order', value: 'ro'},
                    {label: 'Other Issues', value: 'oi'}
                ]}
                // placeholderStyle={{
                //   fontWeight: 'bold',
                //   textAlign: 'center'
                // }}
                // defaultValue={que}
                containerStyle={{height: 40,marginTop:10}}
                style={{backgroundColor: '#eaebee',borderColor:'#eaebee'}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setQue(item)}
            />
            <TextInput
              style={styles.loginInput}
              placeholder="Name"
              onChangeText={(text) => setName(text)}
              value={name}
              textContentType={'name'}
            />
            <TextInput
              style={styles.loginInput}
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              textContentType={'emailAddress'}
              keyboardType={'email-address'}
            />
            <TextInput
              style={styles.loginInput}
              placeholder="Subject"
              onChangeText={(text) => setSub(text)}
              value={sub}
              textContentType={'none'}
            />
            <TextInput
              style={[styles.loginInput,{height:100}]}
              placeholder="Message"
              onChangeText={(text) => setMsg(text)}
              value={msg}
              textContentType={'name'}
              numberOfLines={6}
              multiline = {true}
              textAlignVertical={'top'}
            />
            <TouchableHighlight style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'flex-end',}}>
              <Text style={{color:'white'}}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>


        </ScrollView>


        </View>

    );
  
}