
import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect,useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import colors from './components/Colors';

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// import LoginScreen from '../../Screens/Login/LoginScreen';
// import SignupScreen from '../../Screens/SignUp/SignupScreen';
import Login from '../../Screens/Auth/Login';
import Signup from '../../Screens/Auth/Signup';
import HomeScreen from '../../Screens/HomeScreen';
import BottomTabNavigation from '../../Navigations/BottomTabNavigation/BottomTabNavigation';
const Stack = createNativeStackNavigator();

export default function App() {

  const [user,setUser] = useState()
  
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>

      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SignupScreen" component={Signup} />
      <Stack.Screen name="LoginScreen" component={Login} options={{title: 'Welcome'}}/>
      <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />


    </Stack.Navigator>

    

   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
