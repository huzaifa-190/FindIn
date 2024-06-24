import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';


// ************************************* Importing own components 

import toastConfig from './ToastConfig';

import AppNavigator from './Apps/Navigations/AppNavigator/AppNavigator';
import {AuthProvider} from './Apps/Contexts/AuthContext'
import { ItemsProvider } from './Apps/Contexts/ItemsContext';



export default function App() {

  return (
  <View style={{flex:1}}>
    <StatusBar animated={true} translucent={true}  />

    <AuthProvider>
      <ItemsProvider>
        <AppNavigator/>
      </ItemsProvider>
    </AuthProvider>
           
    
    <Toast config={toastConfig} />
  </View>

     
  );
}
