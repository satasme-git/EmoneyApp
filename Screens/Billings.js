import React, { useState ,useContext , useEffect} from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { BIllData } from "../Styles/BillData";
import {styles,buttons} from "../Styles/Style";
import {EmoneyContext}  from '../context/Context';

export default function Billings () {

    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const [total, setTotal] = useState(0);
    const [social, setSocial] = useState(0);
    const [video, setVideo] = useState(0);
    const [other, setOther] = useState(0);
    const [withdraw, setWithdraw] = useState(0);
    
    const emoney = useContext(EmoneyContext);

    const BIllData = [
        {
            id:'1',
            topic: 'Total Earning Amount',
            price:total,
            status:'A',
        },
        {
            id:'2',
            topic: 'Social Media Earnings',
            price:social,
            status:'A',
        },
        {
            id:'3',
            topic: 'Watched Video Earnings',
            price:video,
            status:'A',
        },
        {
            id:'4',
            topic: 'Others Earnings',
            price:other,
            status:'A',
        },
        {
            id:'5',
            topic: 'Total Withdrawal Amount',
            price:withdraw,
            status:'B',
        },
    
      ]
  const getBillings = () => {
    fetch(
      'https://emoneytag.com/api/points/'+emoney.user.id+'/all',
    )
      .then((response) => response.text())
      .then((json) => 
      // emoney.user.id==''?setToday(0):
      setTotal(json)
      
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);
    


    fetch(
      'https://emoneytag.com/api/points/'+emoney.user.id+'/social',
    )
      .then((response) => response.text())
      .then((json) => 
      
      setSocial(json)
      // console.log(JSON.stringify(json))
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);



    fetch(
      'https://emoneytag.com/api/points/'+emoney.user.id+'/video',
    )
      .then((response) => response.text())
      .then((json) => 
      
      setVideo(json)
      // console.log(JSON.stringify(json))
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);



    fetch(
      'https://emoneytag.com/api/points/'+emoney.user.id+'/other',
    )
      .then((response) => response.text())
      .then((json) => 
      
      setOther(json)
      // console.log(json)
      )
      .finally(() => {setLoading(false);});
    setRefreshing(false);

    fetch(
        'https://emoneytag.com/api/payments/payedall/'+emoney.user.id+'',
      )
        .then((response) => response.text())
        .then((json) => 
        
        setWithdraw(json)
        // console.log(json)
        )
        .finally(() => {setLoading(false);});
      setRefreshing(false);


  };
  useEffect(() => {
    getBillings()
  }); 
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'white',height:75,justifyContent:'center',paddingLeft:40}}>
            <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
            <Text style={{marginTop:10,fontSize:24,color:'#011842'}}> Billings </Text>
        </View>
        <ScrollView>
        <Text style={{color:'black',fontSize:18,padding:10}}>Earning Summary</Text>
        {BIllData.map((item)=>
        item.status=='A'?
            <View key={item.id} style={{backgroundColor: 'white',margin: 10,marginTop:10,padding:15,elevation:5,borderRadius:10}}>
                <Text style={[styles.mainHeader,{color:'black',fontSize:17}]}>{item.topic}</Text>
                <Text style={[styles.headerText2,{color:'black'}]}>{item.price} </Text>
            </View>
            :
            null
        )}
        <Text style={{color:'black',fontSize:18,padding:10}}>Withdraw Summary</Text>
                {BIllData.map((item)=>
        item.status=='B'?
            <View key={item.id} style={{backgroundColor: 'white',margin: 10,marginTop:10,padding:15,elevation:5,borderRadius:10}}>
                <Text style={[styles.mainHeader,{color:'black',fontSize:17}]}>{item.topic}</Text>
                <Text style={[styles.headerText2,{color:'black'}]}>${item.price} </Text>
            </View>
            :
            null
        )}
        </ScrollView>
      </View>
      
    );
  
}
