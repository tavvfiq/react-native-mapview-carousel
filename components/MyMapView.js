import { StyleSheet, Text, View, Dimensions, FlatList, Animated, Image } from 'react-native'
import React from 'react'
import MapView, {Marker, AnimatedRegion, Animated as AnimatedMap} from 'react-native-maps'
import { generateRandomLat, generateRandomLong } from '../utils'

const AnimatedMarker = Animated.createAnimatedComponent(Marker)

const WIDTH = Dimensions.get('window').width
const CARD_WIDTH = (WIDTH / 3) - 20

const data = [
  {
    id: -1
  },
  {
    id: 1,
    lat: generateRandomLat(),
    lng: generateRandomLong(),
    image: 'https://randomwordgenerator.com/img/picture-generator/54e2d54b4350aa14f1dc8460962e33791c3ad6e04e50744172277ed7914fc2_640.jpg',
    title: 'best place 1',
    description: 'lorem ipsum sirdolot amet kudasai',
  },
  {
    id: 2,
    lat: generateRandomLat(),
    lng: generateRandomLong(),
    image: 'https://randomwordgenerator.com/img/picture-generator/51e3d2444a4faa0df7c5d57bc32f3e7b1d3ac3e45658704f722c7cd391_640.jpg',
    title: 'best place 2',
    description: 'lorem ipsum sirdolot amet kudasai',
  },
  {
    id: 3,
    lat: generateRandomLat(),
    lng: generateRandomLong(),
    image: 'https://randomwordgenerator.com/img/picture-generator/54e9d7464b55a514f1dc8460962e33791c3ad6e04e507441722973d49548c4_640.jpg',
    title: 'best place 3',
    description: 'lorem ipsum sirdolot amet kudasai',
  },
  {
    id: 4,
    lat: generateRandomLat(),
    lng: generateRandomLong(),
    image: 'https://randomwordgenerator.com/img/picture-generator/54e1dc444d57aa14f1dc8460962e33791c3ad6e04e5074417c2e7dd2944ec3_640.jpg',
    title: 'best place 4',
    description: 'lorem ipsum sirdolot amet kudasai',
  },
  {
    id: -2
  },
]

export default function MyMapView() {
  const region = React.useRef(new AnimatedRegion({
    latitude: parseFloat(data[1].lat),
    longitude: parseFloat(data[1].lng),
    latitudeDelta: 0.8,
    longitudeDelta: 0.8
    })).current
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (<View>
    <AnimatedMap
    region={region}
    initialRegion={{
      latitude: parseFloat(data[1].lat),
      longitude:parseFloat(data[1].lng),
      latitudeDelta: 0.8,
      longitudeDelta: 0.8
    }} style={styles.map}>
      {data.map(val => val.id > 0 ? <Marker style={{
        backgroundColor: 'white'
      }} key={val.id} identifier={val.id.toString()} coordinate={{
        latitude: parseFloat(val.lat),
        longitude: parseFloat(val.lng)
      }} /> : null)}
    </AnimatedMap>
    <FlatList
      snapToInterval={CARD_WIDTH + 10}
      scrollEventThrottle={16}
      snapToAlignment="center"
      horizontal={true}
      style={{
        position: 'absolute',
        bottom: 0,
      }} 
      contentContainerStyle={{
        paddingVertical: 10,
        alignItems: 'center'
      }}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      decelerationRate={0}
      data={data} 
      onScroll={Animated.event([
       {
         nativeEvent: {
           contentOffset: {
             x: scrollX,
           }
         }
       }
      ], {
        useNativeDriver: false
      })}
      onMomentumScrollEnd={(event) => {
        const {contentOffset} = event.nativeEvent;
        const {x} = contentOffset;
        const idx = Math.floor((x / (CARD_WIDTH + 10)) + 1);
        region.timing({
          latitude: parseFloat(data[idx].lat),
          longitude: parseFloat(data[idx].lng),
          useNativeDriver: true,
          duration: 500
        }).start()
      }}
      renderItem={({item, index}) => {
        const idx = index;
        const cardWidth = scrollX.interpolate({
          inputRange: [
            (idx - 2) * CARD_WIDTH + 20,
            (idx - 1) * CARD_WIDTH + 20,
            idx * CARD_WIDTH + 20,
          ],
          outputRange: [CARD_WIDTH, 1.5 * CARD_WIDTH, CARD_WIDTH],
          extrapolate: 'clamp'
        })
        const cardHeight = scrollX.interpolate({
          inputRange: [
            (idx - 2) * CARD_WIDTH + 20,
            (idx - 1) * CARD_WIDTH + 20,
            (idx) * CARD_WIDTH + 20,
          ],
          outputRange: [150, 1.5 * 150, 150],
          extrapolate: 'clamp'
        })
        const imageHeight = scrollX.interpolate({
          inputRange: [
            (idx - 2) * CARD_WIDTH + 20,
            (idx - 1) * CARD_WIDTH + 20,
            (idx) * CARD_WIDTH + 20,
          ],
          outputRange: [75, 1.5 * 75, 75],
          extrapolate: 'clamp'
        })
        if (index === 0 || index === data.length - 1) {
            return <View style={{
              width: CARD_WIDTH,
            }} />
        }
        return (
          <Animated.View 
            style={[styles.card, {
              width: cardWidth,
              height: cardHeight,
            }]}>
            <Animated.Image style={[styles.image, {
              height: imageHeight,
            }]} source={{uri: item.image}} />
            <View style={{
              paddingHorizontal: 5,
              paddingVertical: 5,
            }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text> 
            </View>
          </Animated.View>)
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 150,
    width: CARD_WIDTH,
    elevation: 10,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 75,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  title: {
    fontWeight: 'bold'
  },
  description: {
    fontWeight: '500',
    fontSize: 12,
    marginTop: 5,
  }
})