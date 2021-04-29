import React, { useState } from 'react';
import { View, Text , ScrollView ,Dimensions ,TextInput , TouchableHighlight} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from '../Styles/Style';

import DropDownPicker from 'react-native-dropdown-picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function UploadVideo () {
    
  const navigation = useNavigation();

  const [category, setCategory] = useState();
  const [name, setName] = useState( "");  
  const [hash, setHash] = useState( "");
  const [time, setTime] = useState( "");

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}>Upload Video</Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />


        </View>
        <ScrollView style={styles.container}>
        <View style={{backgroundColor:'white',elevation:5,margin:10,borderRadius:5,paddingBottom:10}}>
        <Text style={[styles.heading,{padding:10}]}> Upload Your Video </Text>
        
        <Text style={styles.ValidationText}> *A Maximum Video Size 50Mb * </Text>
        <Text style={styles.ValidationText}> * Maximum Time Range 5Min * </Text>

        <Text style={[styles.heading,{padding:10}]}> Select Category * </Text>
        <DropDownPicker
                items={[
                    {label: 'Entertainment', value: 'e',selected:true},
                    {label: 'Comedy', value: 'co'},
                    {label: 'Music', value: 'mu'},
                    {label: 'Culture', value: 'cu'}
                ]}
                containerStyle={{height: 40}}
                style={{backgroundColor: '#eaebee',borderColor:'#eaebee',width:windowWidth-40,marginLeft:10}}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => setCategory(item)}
            />
            <TextInput
              style={[styles.loginInput,{width:windowWidth-40,marginLeft:10}]}
              placeholder="Name"
              onChangeText={(text) => setName(text)}
              value={name}
              textContentType={'name'}
            />
            <TextInput
              style={[styles.loginInput,{width:windowWidth-40,marginLeft:10}]}
              placeholder="Hash Tag"
              onChangeText={(text) => setHash(text)}
              value={hash}
              textContentType={'name'}
            />
            <TextInput
              style={[styles.loginInput,{width:windowWidth-40,marginLeft:10}]}
              placeholder="Time duration"
              onChangeText={(text) => setTime(text)}
              value={time}
              textContentType={'name'}
            />
        <View style={{backgroundColor:'gray',height:0.5,margin:10}} />
        <View style={{backgroundColor:'white',elevation:3,flexDirection:'row',margin: 10,alignSelf:'center',borderRadius:50}}>
        <Text style={[styles.heading,{padding:10}]}> Upload Thumbnail </Text>
        
        <View style={{height:50,width:50,backgroundColor:'#5c9be2',alignSelf:'center',borderBottomRightRadius:50,borderTopRightRadius:50,alignItems:'center',justifyContent:'center'}}>
        <Ionicons name="image-outline" color={'white'} size={25} />
        </View>
        </View>
<View style={{backgroundColor:'white',elevation:3,flexDirection:'row',margin: 10,alignSelf:'center',borderRadius:50}}>
        <Text style={[styles.heading,{padding:10}]}> Upload Video </Text>

        <View style={{height:50,width:50,backgroundColor:'#5c9be2',alignSelf:'center',borderBottomRightRadius:50,borderTopRightRadius:50,alignItems:'center',justifyContent:'center'}}>
        <Ionicons name="videocam-outline" color={'white'} size={25} />
        </View>  
</View>

          <TouchableHighlight style={{backgroundColor:'#0265d4',padding:5,paddingHorizontal:8,elevation:2,borderRadius:7,marginTop:10,alignSelf:'flex-end',marginRight:10}}>
            <Text style={{color:'white'}}>Upload</Text>
          </TouchableHighlight>
        </View>
        </ScrollView>
        
      </View>
    );
  
}