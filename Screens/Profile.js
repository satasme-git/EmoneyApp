import React, { Component } from 'react';
import { View, Text, Image , Dimensions, ScrollView , TouchableOpacity} from 'react-native';
import {styles,buttons} from "../Styles/Style";
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import {ProfileData} from "../Styles/ProfileData";
import { useNavigation , DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pie from 'react-native-pie'
const windowWidth = Dimensions.get('window').width;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
 
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const renderNavBar = () => (
  <View style={styles.navContainer}>
    <View style={styles.statusBar} />
    <View style={styles.navBar}>
        <Image source={require('../assets/pro.png')} style={{height:25,width:25,borderRadius:20,marginStart:30}}/>
        <Text style={[styles.headerText2,{paddingStart:10}]}>gayashanmanoj1995@gmail.com</Text>
    </View>
  </View>
);

const renderContent = () => {
  return (
    <View style={styles.body}>
      {ProfileData.map((item) => (
      <View key={item.id} style={{backgroundColor: 'white',height:200,elevation:2,borderRadius:10,padding:20,width:windowWidth-20,alignItems:'center',marginTop:10}}>
        <Text style={styles.mainHeader}>{item.name}</Text>
      </View>
      ))}
    </View>
  );
};

const title = () => {
  return (
    <View style={{backgroundColor: 'white',marginBottom:-40,marginTop:45}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <Image source={require('../assets/pro.png')} style={{height:100,width:100,borderRadius:50}}/>
        <View style={{alignItems:'center',justifyContent:'space-between',padding:10 }}>
          <Text style={[styles.innerText,{marginBottom:5}]}>Profile Strength</Text>
          <Pie
                radius={35}
                innerRadius={30}
                sections={[
                  {
                    percentage: 60,
                    color: '#336db0',
                  },
                ]}
                backgroundColor="#ddd"
              />
        </View>
        
      </View>
            
            <Text style={styles.headerText2}> gayashanmanoj1995@gmail.com </Text>
            <Text style={styles.headerText2}> 0772766439 </Text>
            <Text style={styles.headerText2}> Earned Points : 0$ </Text>
            <View style={{height:0.8,backgroundColor: '#336db0',width:windowWidth-20,marginVertical:10}} />
            
    </View>
  );
};


export default function Profile () {
  
  const navigation = useNavigation();

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
