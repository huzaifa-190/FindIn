import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";


import BottomTabNavigation from '../BottomTabNavigation/BottomTabNavigation'
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import { useAuth } from '../../Contexts/AuthContext';


const Stack = createStackNavigator();

export default function AppNavigator() {

  const { user } = useAuth();

  return (
    <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            {user ? (
                <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
              ) : (
                <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
              )}
           
          </Stack.Navigator>
        </NavigationContainer>
  )
}