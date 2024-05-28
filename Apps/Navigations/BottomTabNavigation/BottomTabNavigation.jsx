import { View, Text, ImageBackgroundComponent,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { AntDesign } from '@expo/vector-icons';
// import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


// ************************************************ Importing own components *************************************************************
import Colors from '../../Constants/Colors';
import HomeStackNavigation from '../../Navigations/HomeStackNavigation/HomeStackNavigation';
import Home from '../../Screens/Home/Home';
import MapTab from '../../Screens/Map/MapTab';
import Notifications from '../../Screens/Notifications/Notifications'
import Profile from '../../Screens/Profile/Profile'
import Add from '../../Screens/Add/Add'
import { styled } from 'nativewind';
import colors from '../../Constants/Colors';


const Tab = createMaterialBottomTabNavigator();
// const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    tabBarContainer: {
        borderTopLeftRadius:27,borderTopRightRadius:27,
        backgroundColor:colors.purple,alignItems:'center',
        justifyContent:'space-between',paddingHorizontal:22,paddingVertical:0,
        // borderWidth: 0.5,
        // borderColor: Colors.yellow,
        height:70,
        
        
    },
  
  });

export default function     BottomTabNavigation({navigation}) {
   
  return (
    <View style={{flex:1,backgroundColor:Colors.white ,}}>
        <Tab.Navigator  screenOptions={{headerShown:false}} initialRouteName='HomeStackNavigation' backBehavior='initialRoute' 
            labeled={false} shifting={false}  barStyle={styles.tabBarContainer} activeColor={Colors.white} > 
            <Tab.Screen name="HomeStackNavigation" component={HomeStackNavigation} options={homeOptions} />
            <Tab.Screen name="MapTab" component={MapTab} options={mapOptions} />
            <Tab.Screen name="Add" component={Add} options={AddOptions}/>
            <Tab.Screen name="Notifications" component={Notifications}  options={NotificationOptions} />
            <Tab.Screen name="Profile" component={Profile} options={profileOptions} />
        </Tab.Navigator>
    </View>

  )
}

// const tabScreenOptions = { 
//     // tabBarStyle: {height:70,borderTopLeftRadius:45,borderTopRightRadius:45},
//     headerShown:false,tabBarActiveTintColor:Colors.powderBlue,
//     tabBarInactiveTintColor:Colors.darkGrey,tabBarShowLabel:false,
//     tabBarHideOnKeyboard: true,
 
// }

const homeOptions ={
    
    
    title: ()=>(
        <Text style={{color:Colors.purple,fontSize:14,marginBottom:2}}>Home</Text>
    ),
    tabBarIcon: ({color})=>(
        
        <AntDesign name="home" size={22} color={Colors.white} />
    ),
}

const mapOptions = {
    // tabBarLabel: ({color})=>(
    //     <Text style={{color:color,fontSize:14,marginBottom:2}}>Search</Text>
    // ),
    tabBarIcon: ()=>(
        // <Fontisto name="search" size={size} color={color}/>    
        <Feather name="map-pin" size={22} color={Colors.white} />
    ),
    // activeColor:colors.black
   
}
const AddOptions = {
    // tabBarLabel: ({color})=>(
    //     <Text style={{color:color,fontSize:14,marginBottom:2}}>Add</Text>
    // ),
    tabBarIcon: ({color,size,focused})=>(
        // <View style={{backgroundColor:Colors.white,alignItems:'center',justifyContent:'center',
        // height:'100%',width:'100%',borderRadius:50
        //  }} > 
        // </View>
            <FontAwesome6 name="add" size={25} color={Colors.yellow}/>
    ),


}

const NotificationOptions = {
    
    // tabBarLabel:({color})=>(
    //        <Text style={{color:color,fontSize:14,marginBottom:2}}>Notifications</Text>
    //     ),
    tabBarIcon: ({color})=>(
        <Ionicons name="notifications-outline" size={22} color={Colors.white} />      ),
        
}

const profileOptions = {
    // tabBarLabel: ({color})=>(
    //     <Text style={{color:color,fontSize:14,marginBottom:2}}>profile</Text>
    // ),
    tabBarIcon: ()=>(
        <Octicons name="person" size={22} color={Colors.white }/>      ),
}
