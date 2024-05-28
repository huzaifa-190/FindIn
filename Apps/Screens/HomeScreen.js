// HomeScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,NativeModules,Platform } from 'react-native';
import { SvgXml,SvgUri } from 'react-native-svg';
const { StatusBarManager } = NativeModules;



import Colors from '../Constants/Colors';
import SubmitButton from '../Components/SubmitButton';
import colors from '../Constants/Colors';

const HomeScreen = ({ navigation }) => {

  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const xml = `
  <svg width="69" height="71" viewBox="0 0 69 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.106934 0.616329L19.1311 18.6841V71.0005L0.106934 51V0.616329Z" fill="#FBD758"/>
    <path d="M49.0261 19.3635H68.0503V71.0005H49.0261V19.3635Z" fill="#543199"/>
    <path d="M19.1311 71.0005L19.1311 51.0005L49.0262 51.0005L68.0503 51.0005V71.0005L19.1311 71.0005Z" fill="#543199"/>
    <path d="M0.107018 0.621006L49.1333 0.621005L68.051 19.31L19.2383 19.31L0.107018 0.621006Z" fill="#FBD758"/>
  </svg>`;
     
  return (
    <View style={{
      flex: 1,
      // justifyContent: 'flex-start',
      paddingTop:STATUSBAR_HEIGHT,
      justifyContent:'center',
      // alignItems: 'cener',
      paddingHorizontal: 25,
    }}>
      <View style={{flex:0.3,alignItems:'center',justifyContent:'center'}}>
        <SvgXml xml={xml} width="40%" height="40%"/>
      </View>

      <View style={{flex:0.7}}>

      <View style={{width:'100%',alignItems:'center',}}>
        <Text style={styles.heading1}>Lost?</Text>
        <Text style={styles.heading}>let's find </Text>
      </View>

      <SubmitButton label={'Login'} mgv={10} onPress={() => navigation.navigate('LoginScreen')}/>
      <SubmitButton label={'Sign up '} mgv={10} onPress={() => navigation.navigate('SignupScreen')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // paddingTop:STATUSBAR_HEIGHT,
    // alignItems: 'center',
    paddingHorizontal: 25,
  },
  heading1: {
    // marginTop:60,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color:colors.darkGrey
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color:colors.purple
  },
 
});

export default HomeScreen;
