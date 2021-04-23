import React, { useState } from 'react';
import { View, Text ,TextInput , Dimensions, ScrollView , Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useRoute } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from '../Styles/Style';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DropDownPicker from 'react-native-dropdown-picker';

import NumericInput from 'react-native-numeric-input'

import { RadioButton } from 'react-native-paper';

import Slider from '@react-native-community/slider';

import { Checkbox } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function SocialOrderSingle () {
    
  const [url, setUrl] = useState("");
  const [value, setValue] = useState();
  
  const [qu, setQu] = useState(0);

  const [region, setRegion] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [checked, setChecked] = useState('m');
  const [checked2, setChecked2] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          <View style={{marginTop:25,flexDirection:'row',alignItems:'center',marginLeft:30}}>
            <Image source={item.image} style={{height:25,width:25,resizeMode:'cover',}}/>
            <Text style={{fontSize:24,color:'#011842'}}> {item.name} </Text>
          </View>
          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />
        </View>
        <View style={[styles.container]}>
            
            {item.placeholder==''?null:
            <View style={{margin: 10,}}>
            <Text style={styles.heading}>Add Your {item.name} URL Bellow</Text>
            <TextInput
              style={[styles.loginInput,{width:windowWidth-20}]}
              placeholder={item.placeholder}
              onChangeText={(text) => setUrl(text)}
              value={url}
              textContentType={'none'}
            />
            </View>
        }
        <ScrollView style={{marginBottom:1}}>
            {item.types.map((item,index)=>
            <View key={index} style={{margin: 10,backgroundColor: 'white',padding:5,elevation:5,borderRadius:10}}>
            <View style={{flexDirection:'row',alignItems:"center"}}>
            <AntDesign name={item.icon} color={'black'} size={20}  style={{marginRight:10}}/>
            <Checkbox
                color={'#5c9be2'}
                status={checked2 ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked2(!checked2);
                }}
                />
            <Text style={styles.heading}>{item.header}</Text>
            </View>
            
            <View style={{flexDirection:'row',alignItems:"center",margin:10}}>
                <Text>Quantity : </Text>
                <NumericInput 
                    value={value} 
                    onChange={value => setValue({value})} 
                    // onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                    totalWidth={100} 
                    totalHeight={33} 
                    minValue={0}
                    iconSize={25}
                    step={1}
                    valueType='real'
                    rounded 
                    type={'plus-minus'}
                    textColor='#000' 
                    iconStyle={{ color: 'white' }} 
                    rightButtonBackgroundColor='#5c9be2' 
                    leftButtonBackgroundColor='#5c9be2'/>

            </View>


            <View style={{flexDirection:'row',alignItems:"center",margin:10}}>
            <Text>Region : </Text>
            <DropDownPicker
                items={[
                    {label: 'Afganistan', value: 'ihaq',selected:true},
                    {label: 'Azerbaijan', value: 'co'},
                    {label: 'Bhutan', value: 'ro'},
                    {label: 'Sri Lanka', value: 'oi'}
                ]}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#eaebee',borderColor:'#eaebee',width:windowWidth-100}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setRegion(item)}
            />
            </View>


            <View style={{flexDirection:'row',alignItems:"center",margin:10,justifyContent:'space-between'}}>
            <Text>Age group : </Text>
            <Text>From </Text>
            <TextInput
              style={[styles.loginInput,{width:50}]}
              placeholder={item.placeholder}
              onChangeText={(text) => setFrom(text)}
              value={from}
              keyboardType={'number-pad'}
            />

            <Text>To </Text>
            <TextInput
              style={[styles.loginInput,{width:50}]}
              placeholder={item.placeholder}
              onChangeText={(text) => setTo(text)}
              value={to}
              keyboardType={'number-pad'}
            />

            </View>

            <View style={{flexDirection:'row',alignItems:"center",margin:10}}>
            <Text> Gender : </Text>
            
            <RadioButton
                value="m"
                color={'#5c9be2'}
                status={ checked === 'm' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('m')}
            />
            <Text> Male </Text>
            
            <RadioButton
                value="fm"
                color={'#5c9be2'}
                status={ checked === 'fm' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('fm')}
            />
            <Text> Female </Text>
            </View>

            <Slider
                style={{width: windowWidth-40, height: 40}}
                minimumValue={0}
                maximumValue={1000}
                minimumTrackTintColor="gray"
                maximumTrackTintColor="black"
                onValueChange={(value)=>setQu(value)}
                step={1}
            />
            <Text style={{padding:10,paddingTop:0}}>{qu} </Text>
            </View>
            )}
        
        </ScrollView>
        
        </View>
        
      </View>
    );
  
}
