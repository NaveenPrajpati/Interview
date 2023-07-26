
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import moment from 'moment'
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';




function App(): JSX.Element {
  const [fetchedData, setFetchedData] = useState([])
  const height = Dimensions.get('screen').height
  async function getData() {
    axios.get('https://stagingsite.livelaw.in/dev/h-api/news', {
      headers: {
        's-id': 'CKEY0F1HNJGSZHJFQPYB5HBMJEM79K26YQDJTY0RX7MVPHGHXTKALSTVARSDAYKUGF2Y'
      }
    }).then(res => {
      setFetchedData(res.data.news)
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <View>

      <FlatList
        data={fetchedData}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.container} >
            <View style={{ position: 'relative' }}>
              <Image source={{ uri: item?.mediaId ? item.mediaId : 'https://www.nic.in/wp-content/uploads/2022/02/LC-NC.png' }} alt='' height={200} style={{ width: '100%' }} />
              <Text style={styles.location}>{item?.location ? item?.location : 'india'}</Text>
            </View>
            <Text style={styles.discription}>{item?.description ? item?.description : 'The most dangerous bakugan in the world is here.'}</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
              
              <View style={styles.subcontainer}>
                <Image source={{ uri: 'https://img.freepik.com/free-icon/user_318-563642.jpg?w=360' }} alt='no' width={30} height={30} />
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>{item?.authorName}</Text>
              </View>
              
              <View style={styles.subcontainer}>
                <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/019/873/851/original/clock-icon-transparent-free-icon-free-png.png' }} alt='no' width={30} height={30} />
                <Text style={styles.time}>{moment(item?.date_news).fromNow()}</Text>
              </View>

            </View>
          </View>
        )} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 10,
    margin: 4,
    backgroundColor: '#f9fbfd'
  },
  location: {
    position: 'absolute',
    fontSize: 20,
    top: 15,
    left: 0,
    backgroundColor: 'orange',
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  discription: {
    fontSize: 22, 
    fontWeight: 'bold',
     color: 'black',
      padding: 5 
  },
  subcontainer: {
    flexDirection: 'row',
     alignItems: 'center',
      gap: 3 
  },
  time: {
    fontSize: 18,
     fontWeight: '400', 
     color: 'black' 
  },
});

export default App;
