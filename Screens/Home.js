import React, { useRef , useEffect} from 'react';
import { View, Text , Animated , Dimensions , Image, StatusBar, ScrollView , LogBox } from 'react-native';
import StickyParallaxHeader from 'react-native-sticky-parallax-header'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation , DrawerActions } from '@react-navigation/native';

import { SwiperFlatList } from 'react-native-swiper-flatlist';

import {styles,buttons} from "../Styles/Style";
import PlaceOrders from "./PlaceOrders";
import Earn from "./Earn";
import MyOrders from './MyOrders'
import Settings from './SettingsStack'


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const { event, ValueXY } = Animated
const scrollY = new ValueXY()

const renderHeader = () => {
    const opacity = scrollY.y.interpolate({
      inputRange: [0, 60, 90],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    })

    return (
      <View style={styles.headerCotainer}>
        <StatusBar barStyle={'dark-content'}/>
        <View style={styles.headerWrapper}>
          <Animated.View style={{ opacity }}>
            <Image source={require('../assets/icon.png')} style={{height:25,width:25,marginStart:15}}/>
          </Animated.View>
        </View>
      </View>
    )
  }


export default function Home () {
  
  const navigation = useNavigation();

    const social = [{
        id:'1',
        name: 'YouTube',
        color:'#ff0000'
        },
        {
          id:'2',
        name: 'Facebook',
        color:'#4267b2'
        },
        {
          id:'3',
        name: 'Instagram',
        color:'#e1306c'
        }, 
        {
          id:'4',
        name: 'Twitter',
        color:'#1da1f2'
        },
      ];

    const scroll = useRef(new Animated.Value(0)).current;

    const  renderForeground = () => {
       
    
        // const { scroll } = this.state
        const titleOpacity = scroll.interpolate({
          inputRange: [0, 106, 154],
          outputRange: [1, 1, 0],
          extrapolate: 'clamp'
        })

        useEffect(() => {
          LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
      },)
    
        return (
          <View style={styles.foreground}>
            <Animated.View style={{ opacity: titleOpacity ,flexDirection:'row',alignItems:'center'}}>
                
                <Image source={require('../assets/webicon.png')} style={{height:60,width:95}}/>
                <View style={{flexDirection:'row',height:25,width:windowWidth/1.5,paddingHorizontal:20}}>
                   <Text style={{color:'#222831',fontSize:20}}>Promote</Text> 
                   <SwiperFlatList
                        autoplay
                        autoplayDelay={3}
                        autoplayLoop
                        index={1}
                        disableGesture
                        autoplayLoopKeepAnimation={true}
                        data={social}
                        autoplayInvertDirection
                        vertical
                        renderItem={({ item }) => (
                            <View style={{height:25}} key={item.id}>
                                <Text style={{height:25,color:item.color,fontWeight:'bold',textAlign:'center',fontSize:20}}>{item.name}</Text>
                            </View>
                        )}
                    />
                </View>
                
            </Animated.View>
          </View>
        )
      }

    const { event, ValueXY } = Animated

    return (
      <View style={{flex:1}}>
      <Ionicons name="ios-menu" color={'black'} size={25} style={{position: 'absolute',top:30,left:10,zIndex:1,elevation:15}} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} />
      <StickyParallaxHeader
          snapToEdge
          foreground={renderForeground()}
          header={renderHeader()}
          parallaxHeight={70}
          headerHeight={60}
          headerSize={() => {}}
          onEndReached={() => {}}
          tabs={[
            {
              title: 'Earn Points',
              content: <Earn/>
            },
            {
              title: 'Promote Social Media',
              content: 
                <PlaceOrders/>    
            },
          ]}
          contentContainerStyles={{flex:1,backgroundColor:'white',marginTop:10}}
          tabTextContainerStyle={styles.tabTextContainerStyle}
          tabTextContainerActiveStyle={styles.tabTextContainerActiveStyle}
          tabTextStyle={styles.tabTextStyle}
          tabTextActiveStyle={styles.tabTextActiveStyle}
          tabWrapperStyle={styles.tabWrapperStyle}
          tabsContainerStyle={styles.tabsContainerStyle}
          tabsContainerBackgroundColor={'white'}
          scrollEvent={event(
              [{ nativeEvent: { contentOffset: { y: scrollY.y } } }],
              { useNativeDriver: false }
          )}
        >
        </StickyParallaxHeader>
      </View>
    );
  
}
