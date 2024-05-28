import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import {requestForegroundPermissionsAsync,getCurrentPositionAsync} from 'expo-location'

// import colors from '../../Constants/Colors'
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function MapTab() {
  const [Latitude,setLatitude] = useState(null)
  const [Longitude,setLongitude] = useState(null)
  const [userCurrentLocation,setUserCurrentLocation] = useState({})
  // const [userCurrentLocation,setUserCurrentLocation] = useState({
  //   latitude: 32.78825,
  //   longitude: -89.4324,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // })
  const [err,setErr] =useState(null)

  const startWatching = async () => {

    let {status}=await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErr('Permission to access location was denied');
        return;
      }
      let location=  await getCurrentPositionAsync();
      console.log("\n\n\n Location isss ==> ",location);

    // setLatitude(location.coords.latitude);
    // setLongitude(location.coords.longitude);
    
    setUserCurrentLocation(location.coords)
  }
 
  useEffect(()=>{

    console.log("inside map useeffect []")
    // startWatching();

  },[])



  return (
    <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
      {/* {err ? <Text>Error loading map</Text> : 
       <MapView
        initialRegion={{
          latitude: userCurrentLocation.latitude,
          longitude: userCurrentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        
        
        style={{height: '100%', width: '100%',}}
        >
          <Marker title='You' coordinate={{
             latitude: userCurrentLocation.latitude,
             longitude: userCurrentLocation.longitude
          }} >

          </Marker>
        </MapView>
      }  */}
      <Text>This is map</Text>
    </View>
  )
}