import React, { useContext , useState , useEffect} from 'react';
import { View, Text , Image, ScrollView, TouchableHighlight, Share, Button} from 'react-native';
import { useNavigation , DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ReferrelSocial } from "../Styles/ReferrelSocial";
import { SocialIcon } from 'react-social-icons';
import Clipboard from '@react-native-community/clipboard';
import {EmoneyContext}  from '../context/Context';
// import { SocialIcon } from 'react-native-elements'

export default function Referrel () {

  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const emoney = useContext(EmoneyContext);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'emoneytag.com/register?ref='+emoney.user.refcode.slice(1)+'',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getReferralPoints =()=>{
    fetch(
      'https://emoneytag.com/api/userref/'+emoney.user.id+'',
    )
      .then((response) => response.text())
      .then((json) => 
      
      setTotal(json)
      // console.log(json)
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
  }

  useEffect(() => {
    getReferralPoints()
  });
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,justifyContent:'center',paddingLeft:40}}>
            <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
            <Text style={{marginTop:10,fontSize:24,color:'#011842'}}> Referrel </Text>
        </View>
        <ScrollView style={{backgroundColor:'white'}}>
        {/* <Text style={{color:'black',fontSize:18,padding:10}}>Referral Program</Text> */}
        <Text style={{paddingHorizontal:10}}>Invite a friend or someone from the Internet and make a transfer for 40 points. So far you have refered {total} people</Text>
        <View style={{backgroundColor:'#eaebee',margin: 10,padding:10,borderRadius:10,height:80}}>
          <Text>emoneytag.com/register?ref={emoney.user.refcode.slice(1)}</Text>
          <TouchableHighlight onPress={() => Clipboard.setString('emoneytag.com/register?ref=C@23a5c5f3')} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'flex-end',}}>
            <Text style={{color:'white'}}>Copy</Text>
          </TouchableHighlight>
        </View>
        {/* <View style={{flexDirection:'row'}}> */}
        {/* <Button onPress={onShare} title="Share" /> */}
        <TouchableHighlight onPress={onShare} style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:5,alignSelf:'flex-end',marginRight:10,}}>
        <Ionicons name="share-social-outline" color={'white'} size={25} />
          </TouchableHighlight>
        

        {/* </View> */}
        </ScrollView>
      </View>
    );
  
}
