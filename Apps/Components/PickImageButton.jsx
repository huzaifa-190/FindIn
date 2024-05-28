import { StyleSheet,View,Text,TouchableOpacity,Image,ScrollView } from 'react-native';
import React from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';


import Colors from '../Constants/Colors';
export default function PickImageButton({image,onPress,dis,}) {
  return (
    <TouchableOpacity style={{
      borderRadius:20,height:90,width:90,backgroundColor:dis ?  Colors.lightPurple : 'red',
      alignItems:'center',justifyContent:'center',opacity: dis ? 0.3 :1,
    }} disabled={dis} onPress={onPress}>
      
        {image ? <Image
        style={styles.itemImage}
        source={{uri:image}} /> : 
        <MaterialIcons name="camera-enhance" size={30} color={Colors.white}  />
        }
        
 </TouchableOpacity>
  )
}


const styles = StyleSheet.create({


addImageBtn:{
      // opacity: disabled ? 0.3 :1,
      borderRadius:20,height:90,width:90,backgroundColor:Colors.lightPurple,
      alignItems:'center',justifyContent:'center',opacity:0.8
    },
itemImage:{
    height:90,
    width:90,
    borderRadius:20,
  },
})