import { View, Text,TouchableOpacity,StatusBar,NativeModules,Platform } from 'react-native'
import React from 'react'
const { StatusBarManager } = NativeModules;
import { Ionicons } from '@expo/vector-icons';


import Colors from '../Constants/Colors'

export default function HeaderReturn({showBackIcon,backLabel,onBackPress,midHeading,rightICon: rightIcon}) {

    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

  return (


    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',paddingLeft:"5%",paddingRight:'2%',marginTop:STATUSBAR_HEIGHT+10,marginBottom:10}}>

        {/* LEFT CONTENT*/}
        <View style={{flex:0.2 ,alignItems:'flex-start',justifyContent:'center',}}>
            {showBackIcon ?  
            <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={onBackPress}>
                <Ionicons name="chevron-back" size={28} color={Colors.yellow} />
                {backLabel ? <Text style={{color:Colors.darkGrey,fontSize:16}}>{backLabel}</Text>: null }
            </TouchableOpacity>
            : null }
        </View>

        {/* MID HEADING */}
        <View style={{flex:0.6,alignItems:'center',justifyContent:'center',marginLeft:5}}>
                <Text style={{fontSize:18,fontWeight:'bold'}}>{midHeading}</Text>
        </View>

        {/* RIGHT CONTENT*/}
        <View style={{flex:0.2,alignItems:'center',justifyContent:'center'}}>
            {rightIcon ? rightIcon : null}
        </View>
    </View>
  )
}