import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from "@react-navigation/stack";
import Toast from 'react-native-toast-message';


// ************************************* Importing own components 
// import Home from './Apps/Screens/Home/Home';
// const Stack = createStackNavigator();
import { useAuth } from './Apps/Contexts/AuthContext';
import toastConfig from './ToastConfig';
import BottomTabNavigation from './Apps/Navigations/BottomTabNavigation/BottomTabNavigation';

// import './Apps/DataBase/FirebaseConfig';
import AppNavigator from './Apps/Navigations/AppNavigator/AppNavigator';
import {AuthProvider} from './Apps/Contexts/AuthContext'
import { ItemsProvider } from './Apps/Contexts/ItemsContext';



export default function App() {
  // const { user } = useAuth();

  return (
  <View style={{flex:1}}>
    <StatusBar animated={true} translucent={true}  />

    <AuthProvider>
      <ItemsProvider>
        <AppNavigator/>
      </ItemsProvider>
    </AuthProvider>
           
     {/* <AuthNavigation/>
            <BottomTabNavigation/> */}
    <Toast config={toastConfig} />
  </View>

     
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'orange'
  },
});


