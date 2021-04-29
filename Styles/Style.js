import {StyleSheet, Dimensions, Platform} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const IS_IPHONE_X = windowHeight === 812 || windowHeight === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 20;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerInner: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  container2: {
    paddingTop:20,
    flex: 1,
    backgroundColor: '#eaeaea',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  signupContainer: {
    height:windowHeight - (windowHeight / 2.5),
    justifyContent: 'space-evenly',
    alignItems:'center',
  },
  singleInnerText: {
    fontSize: 15,
    justifyContent: 'space-evenly',
    alignItems:'center',
    lineHeight:25
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  loginContainer: {
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    height:windowHeight - (windowHeight / 2.5),
    marginTop:windowHeight / 40,
    alignItems:'center',
    borderRadius:15,
  },
  mainHeader: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  headerText2: {
    fontSize: 15,
    fontFamily:'sans-serif',
    color:'#336dcc'
  },
  child: { 
      width:windowWidth-20, 
      justifyContent: 'center',
      height:90 ,
      elevation:5,
      margin:10,
      borderRadius:10,
      backgroundColor: '#c87ff0',
    },
  text: { 
      fontSize: 16, 
      textAlign: 'center' ,
      height:25
    },
    image: { 
        resizeMode: "cover",
        height: 100,
        width: 200
        },
  singleHeaderText: {
    fontSize: 16,
    fontWeight:"bold"
  },
  innerText: {
    fontSize: 12,
    paddingVertical: 2,
    fontFamily:'sans-serif',
  },
  drawerText: {
    fontSize: 17,
    padding:10,
    paddingLeft:12
  },
  drawerItem: {
    paddingLeft:20
  },
  skipContainer: {
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    position:'absolute',
    top:0,
    width:windowWidth,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
    elevation:1,
    paddingTop:30,
    paddingVertical:2,
    zIndex:1
  },
  searchBarView: {
    height: 35,
    width: windowWidth - 160,
    marginHorizontal: 10,
    borderRadius: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    marginBottom:15,
    marginRight:140
  },
  searchScreenView: {
    height: 40,
    width: windowWidth - 80,
    marginHorizontal: 20,
    marginTop: 35,
    borderRadius: 25,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    marginBottom:15,
    marginLeft:60
  },
  searchBarInput: {
    width: windowWidth - 185,
    color: 'black',
    borderRadius: 25,
    paddingLeft: 15,
    fontSize:15
  },
  loginInput: {
    width: windowWidth - 60,
    color: 'black',
    backgroundColor: '#eaebee',
    paddingLeft: 15,
    borderRadius:5,
    height:40,
    marginTop:10,
    textAlign:'left'
  },
  image: {
    height: 120,
    width: 120,
  },
  thumbnail: {
    height: windowWidth/1.8,
    width: windowWidth-10,
    alignItems:'center',
    justifyContent: 'center',
  },
  imageInner:{
    backgroundColor: 'rgba(255,255,255,0.6)', 
    paddingBottom: 10,
    paddingHorizontal:10,
    paddingTop:5
  },
  newsContainer: {
    flex: 1,
    marginBottom: 1.5,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 0,
    flexDirection: 'row',
    width: windowWidth,
    height: 130,
    
  },
  newsInnerContainer: {
    padding: 5,
    width: windowWidth - 125,
    justifyContent:'space-between',
  },
  item: {
    width: windowWidth - 15,
    height: windowWidth - 180,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), 
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent:'flex-end',
  },
  images: {
    resizeMode: 'cover',
    borderRadius: 8,
  },
  ValidationText:{
    fontSize:10,
    color:'red',
    textAlign:'left',
    alignSelf:'flex-start',
    paddingLeft:20
  },
  contentContainer: {
    flexGrow: 1,
    padding:10
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
    elevation:1
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    // justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    // backgroundColor:'white'
  },
  headerCotainer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 30,
    // height:windowHeight/4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerWrapper: {
    flexDirection: 'row', 
    alignItems: 'center',
    // height:200,
    backgroundColor:'white'
  },
  headerImage: {
    width: 20,
    height: 20
  },
  headerText: {
    color: 'white',
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 20,
    // backgroundColor: 'rgba(0,0,0,0.6)'
  },
  tabTextContainerStyle: {
    backgroundColor: 'transparent',
    borderRadius: 18
  },
  tabTextContainerActiveStyle: {
    backgroundColor: '#0265d4',
    borderRadius:25,
  },
  tabTextStyle: {
    fontSize: 15,
    borderWidth:1.5,
    borderRadius:50,
    borderColor:'#0265d4',
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#0265d4',
  },
  tabTextActiveStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: 'white',
  },
  tabWrapperStyle: {
    paddingVertical: 10,
    marginRight:25,
    alignItems:'flex-start',
    elevation:5,
    // position:'absolute'
    // height:100
  },
  tabsContainerStyle: {
    paddingHorizontal: 10,
    justifyContent:'flex-start',
    width:windowWidth,
    // position:'absolute'
    // height:200
  },
  contentContiner: {
    height: windowHeight,
    padding: 10
  },
  contentText: {
    fontSize: 16
  },  
  foreground: {
    marginTop: -15,
    justifyContent: 'center',
    alignItems:'flex-start',
    padding:20
    // backgroundColor: 'white',
  },
  heading:{
    fontSize:17,
    color:'black'
  }


});

const buttons = StyleSheet.create({
  menu: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 1,
    elevation:4,
  },
  menu2: {
    position: 'absolute',
    left: 20,
    top: 40,
    zIndex: 1,
    elevation:4,
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 10,
    zIndex: 1,
  },
  login: {
    backgroundColor:'#218838',
    padding:10,
    paddingHorizontal:15,
    borderRadius:20,
    width: windowWidth - 40,
    alignItems:'center',
  },
  otherButtons: {
    flexDirection:'row',
    padding:10,
    paddingHorizontal:15,
    borderRadius:5,
    width: windowWidth - 40,
    justifyContent:'center',
    alignItems:'center',
    height:40,
    elevation:2,
    marginBottom:0
  },
  text:{
    color:'white',
    fontSize:15,
    fontFamily:'sans-serif-medium',
    paddingHorizontal:10,
  },
});

export {styles, buttons};
