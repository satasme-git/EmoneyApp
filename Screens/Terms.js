import React, { Component } from 'react';
import { View, Text, ScrollView ,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { TermsData } from "../Styles/TermsData";
import { styles } from '../Styles/Style';
export default function Terms () {
    
  const navigation = useNavigation();

    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'white',height:75,paddingLeft:10,}}>
          <Text style={{marginTop:25,fontSize:24,color:'#011842',marginLeft:30}}> Terms of Servivce </Text>

          <Ionicons name="arrow-back" color={'black'} size={25} style={{position: 'absolute',top:30,left:10}} onPress={()=>navigation.goBack()} />
        </View>
        <ScrollView style={styles.container}>
          {TermsData.map((item)=>

          <View key={item.id} style={{margin:15,}}>
            <Text style={[styles.heading,{fontWeight:'bold'}]}>{item.head}</Text>
            {item.id==2?
            <View style={{flex:1}}>
            <Text>2.1 Emoneytag, we, our, its and us refer to , 
            {<Text style={{color:'#2f55a4'}} onPress={() => Linking.openURL('https://emoneytag.com/')}>www.Emoneytag.com </Text>}
            {<Text>its owner and authorized officials{"\n"}2.2 'Services' include all the services offered by Emoneytag including but not limited to  </Text>}
            {<Text style={{color:'#2f55a4'}} onPress={() => Linking.openURL('https://emoneytag.com/')}>www.Emoneytag.com </Text>}
            {<Text>, Amazon Services packages, Facebook Services package (including likes, followers & other), Instagram Services package (including likes, followers & other), Twitter Services package (including likes, followers & other) and YouTube Services package (including views, likes, followers & other) and such other packages Emoneytag may introduce in future.{"\n"}2.3 Additional or separate agreement refers to any separate understanding between Emoneytag and the user other than or in addition to the TOS.{"\n"}2.4 You, client, visitor and user refer to any person visiting </Text>}
            {<Text style={{color:'#2f55a4'}} onPress={() => Linking.openURL('https://emoneytag.com/')}>www.Emoneytag.com </Text>}
            {<Text>and using the Services.{"\n"}2.5 The 'TOS' refers to all provisions of this terms of services document from 1 to 12 applies to the Services.{"\n"}2.6 Privacy Policy means the principle position of Emoneytag describing the ways of collection, use and maintenance of the information relating to the user.{"\n"}2.7 Provision: It refers to all the sections, sub-sections and proviso herein contained.{"\n"}2.8 Likes; it refers to the number of likes on a Facebook page, Twitter page, Instagram or a web page URL as indicated by the Facebook.com platform.{"\n"}2.9 Views; it means the number of views YouTube shows beneath the video player indicating number of visitors who have viewed the page or the number of post views.{"\n"}2.10 Subscribes or Follows; It refers to an act of the user subscribing to any update as follower on the social media account of the client including YouTube, Twitter and Instagram.{"\n"}2.11 Members; it means the number of users joined Facebook group or channel and is shown on top of the group or channel.{"\n"}2.12 Inviting; It refers to an act of the user inviting another user to any group within the social media account of the client including Facebook.{"\n"}2.13 Comments; It refers to an act of the user commenting on a post / video / chat or group within the social media account of the client including Facebook, YouTube, Twitter or Instagram.{"\n"}2.14 Retweets; It refers to an act of the user sharing clients post within the social media account of the client including Twitter.</Text>}
            </Text>
            </View>
          :
          item.id==3?
          <View>
            <Text>3.1 Our services include carrying out promotional campaigns by helping the client to increase the members, followers, views, likes, subscribes, comments & other engagement of social media networks users of the social media account of the client.{'\n'}3.2 The client agrees that Emoneytag owns no liability for the content, activity and purpose of the client's social media account.{'\n'}3.3 It is sole responsibility of the client to ensure the observation of the terms and conditions of any contract with third party.{'\n'}3.4 Emoneytag does not require access to the client's social media account. It is responsibility of the client to ensure his/her/its social media account is safe from the unauthorized access.{'\n'}3.5 The client agrees not to violate any provision of the contract the client has had with any third party. It is the responsibility of the client to ensure that the Terms of Services are not contrary to the contract with third party. The client represents and warrants that Emoneytag is and shall not be party to such violation.{'\n'}3.6 The client understands that Emoneytag is not affiliated, in any manner, to any social media network including without limitation Facebook, Instagram, Twitter, Amazon and YouTube.{'\n'}3.7 The client agrees not to use the Services for any purpose not compliant with the laws for the time being in force in Poland and with the public policy.{'\n'}3.8 Emoneytag may modify or terminate the Services at any time without serving notice; provided that the existing user either shall be refunded or served.{'\n'}3.9 Emoneytag reserves the right to amend, change or modify any provision of the Terms of Services, and the amended, changed or modified Terms of Services shall be effective immediately after they are posted on 
            {<Text style={{color:'#2f55a4'}} onPress={() => Linking.openURL('https://emoneytag.com/')}> www.Emoneytag.com </Text>}
            {<Text>{'\n'}3.10 Emoneytag may refuse services to any client without assigning the reason to that effect.{'\n'}3.11 Emoneytag may refuse the Service to the client account containing unlawful, threatening, offensive, defamatory, libelous or objectionable or otherwise violate the Terms of Services.{'\n'}3.12 Emoneytag provides a limited warranty of 30 days to maintain the desired promotion level for our services. In the event of reduction in the likes, followers, or views, the client is advised to inform immediately to Emoneytag which shall immediately make up such reduction or refund in full if not stated otherwise in the package purchased. In the event of reduction in the likes, followers, members or views after the period of 30 days the client is advised to inform immediately to Emoneytag which will look into the matter and will investigate and will do its best in the good faith to make up such reduction.{'\n'}3.13 Emoneytag employs a natural human campaigns & natural social media marketing techniques, using no software and hence posing no negative consequences for the client's social media account. Anything that may be used in addition Emoneytag is obligated to state within the package / offer and explain to the client.{'\n'}3.14 The Services completion may take time as Emoneytag employs real human accounts and adopts a natural course. The smaller packages take 2 to 14 days, and larger packages may take 30 to 60 days.{'\n'}3.15 Client agrees that Emoneytag may use whenever necessary third party services aside from own marketing tools and techniques including but not limited to: traffic exchanges, ppc (pay per click) and ppm (pay per mille) platforms.{'\n'}3.16 Emoneytag does not incentive any user to like, view or follow the client's social media profile in a manner that falls within the meaning of violation of the terms and conditions of the social media networks including but not limited to YouTube, Facebook, Instagram, Reddit, Twitter, LinkedIn, Spotify, Soundcloud, Pinterest, Tumblr, Vimeo, VKontakte, Amazon, eBay, Etsy, Google Maps, TripAdvisor, Booking.com, Airbnb, Yelp, Trustpilot, Capterra, G2, Google Play, App Store, Windows Store, Fiverr, Upwork, Freelancer and PeoplePerHour.{'\n'}3.17 We hereby warrant that we do not make, instigate or encourage any user to violate the terms and conditions of the social media networks including but not limited to YouTube, Facebook, Instagram, Reddit, Twitter, LinkedIn, Spotify, Soundcloud, Pinterest, Tumblr, Vimeo, VKontakte, Amazon, eBay, Etsy, Google Maps, TripAdvisor, Booking.com, Airbnb, Yelp, Trustpilot, Capterra, G2, Google Play, App Store, Windows Store, Fiverr, Upwork, Freelancer and PeoplePerHour.{'\n'}3.18 Emoneytag does not mislead the user in any manner that may violate the terms and conditions of the social media networks including but not limited to YouTube, Facebook, Instagram, Reddit, Twitter, LinkedIn, Spotify, Soundcloud, Pinterest, Tumblr, Vimeo, VKontakte, Amazon, eBay, Etsy, Google Maps, TripAdvisor, Booking.com, Airbnb, Yelp, Trustpilot, Capterra, G2, Google Play, App Store, Windows Store, Fiverr, Upwork, Freelancer and PeoplePerHour.{'\n'}3.19 Emoneytag employs a strategy to provide the Services which is compliant with terms and conditions of the social media networks and all the laws for the time being in force.\n3.20 Technically, Emoneytag also serves the interests of the social media networks, and employs all the measures to ensure that no provision of the terms and conditions of the social media websites is violated, and no act is detrimental to the interests of the social media websites.{'\n'}3.21 Emoneytag may take up 6 months to complete an order.{'\n'}3.22 Emoneytag will have orders under $100 completed in under 1 month, and orders under $1000 completed in under three months.</Text>}
            </Text>
          </View>
          :
          item.id==8?
          <View>
            <Text>8.1 All the material contained in  
            {<Text style={{color:'#2f55a4'}} onPress={() => Linking.openURL('https://emoneytag.com/')}> www.Emoneytag.com </Text>}
            {<Text>, including, without limitation, the content, software, images, drawings and design, is the sole property of Emoneytag and is protected by the copyright protection laws for the time being in force in Poland and by the relevant International Treaties. No user is allowed to copy, reproduce, distribute, reprint, host or use in any other manner without the written approval of Emoneytag.{'\n'}8.2 In the event of infringement of our rights, we shall take strict legal action, and shall also claim compensation.{'\n'}8.3 Emoneytag reserves the rights not hereby claimed.</Text>}
            </Text>
          </View>
          :
            <Text>{item.content}</Text>}
          </View>
          )}
        </ScrollView>
      </View>
    );
  
}
