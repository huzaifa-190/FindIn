import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';



// ************************************************ Importing own components *************************************************************

import Home from '../../Screens/Home/Home';
import FoundItems from '../../Screens/FoundItems/FoundItems';
import LostItems from '../../Screens/LostItems/LostItems';
import ItemDetail from '../../Screens/ItemDetail/ItemDetail';
const Stack = createStackNavigator();

export default function HomeStackNavigation() {
  return (

      <Stack.Navigator screenOptions={{ headerShown: false }}>
      
        <Stack.Screen name="Home" component={Home } />
        <Stack.Screen name="FoundItems" component={FoundItems } />
        <Stack.Screen name="LostItems" component={LostItems } />
        <Stack.Screen name="ItemDetail" component={ItemDetail } />

      </Stack.Navigator>
    // <NavigationContainer>
    // </NavigationContainer>
//     <View>
//       <Text>HomeStackNavigation</Text>
//     </View>
  )
}