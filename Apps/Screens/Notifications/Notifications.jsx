import { View, Text } from 'react-native'
import React from 'react'


import Colors from '../../Constants/Colors'
import HeaderReturn from '../../Components/HeaderReturn'

export default function Notifications() {
  return (
    <View  style={{flex:1,backgroundColor:Colors.lightbg,flexDirection:'column',justifyContent:'flex-start',}} > 
    <View style={{flex:0.15,justifyContent:'center'}}>
        <HeaderReturn midHeading={'Notifications'} />
      </View>
    </View>
  )
}