/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';




function App(): JSX.Element {
  const [fetchedData,setFetchedData]=useState([])
 
async function getData(){
  axios.get('https://stagingsite.livelaw.in/dev/h-api/news',{
    headers:{
      's-id':'CKEY0F1HNJGSZHJFQPYB5HBMJEM79K26YQDJTY0RX7MVPHGHXTKALSTVARSDAYKUGF2Y' 
    }
  }).then(res=>{
    // console.log(res.data)
    console.log(res.data.news[0])
    setFetchedData(res.data.news)
  }).catch(err=>{
    console.log(err)
  })
}

  return (
    <View>

<Button title='getdata' onPress={getData}/>
<FlatList
data={fetchedData}
renderItem={({item,index})=>(
  <View style={{borderWidth:1,borderRadius:4,margin:2,height:''}}>
    <View style={{position:'relative'}}>
<Image source={{uri:item?.mediaId}} alt='' width={'100%'} height={200}/>
<Text style={{position:'absolute',top:5,left:0,backgroundColor:'yellow'}}>{item?.location}</Text>
    </View>
    <Text>{item?.description}</Text>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
  <View>
    <Image source={''} alt='no' width={5} height={5}/>
    <Text>{item?.authorName}</Text>
  </View>
  <View>
    <Image source={''} alt='no' width={5} height={5}/>
    <Text>{item?.date_news}</Text>
  </View>

</View>
  </View>
)}/>
    
</View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
