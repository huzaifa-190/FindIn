import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import colors from "../../Constants/Colors";

// import colors from '../../Constants/Colors'
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function MapTab() {
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);
  const [userCurrentLocation, setUserCurrentLocation] = useState({});
  // const [userCurrentLocation,setUserCurrentLocation] = useState({
  //   latitude: 31.403,
  //   longitude: 74.2106,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // })
  const [err, setErr] = useState(null);

  const getLocation = async () => {
    let { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission denied! ")
      setErr("Permission to access location was denied");
      return;
    }
    let location = await getCurrentPositionAsync();
    console.log("\n\n\n Location isss ==> ", location);

    // setLatitude(location.coords.latitude);
    // setLongitude(location.coords.longitude);

    setUserCurrentLocation(location.coords);
    return location;
  };

  useEffect(() => {
    console.log("inside map useeffect []");
    // startWatching();
    getLocation();
  }, []);



  if (!userCurrentLocation) {
		return (
			<View style={{flex: 1,
        justifyContent: "center",
        alignItems: "center",}}>
				<ActivityIndicator
					animating={true}
					color={colors.green}
					size='large'
				/>
				{errorMsg ? <Text>{errorMsg}</Text> : null}
			</View>
		);
	}
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {err ? <Text>Error loading map</Text> : 
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
      } 

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
  );
}
