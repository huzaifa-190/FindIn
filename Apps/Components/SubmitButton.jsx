
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';



export default function SubmitButton({label,mgv,onPress,bgColor,disabled}) {
  return (
     <TouchableOpacity style={{ backgroundColor: bgColor? bgColor : Colors.yellow,
      width: '100%',
      height: 55,
      borderRadius: 13,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: mgv ,}} activeOpacity={0.6} disabled={disabled  } onPress={onPress}>

        <Text style={styles.buttonText}>{label}</Text>

      </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.yellow,
        width: '100%',
        height: 48,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20 ,
    },
    buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
},
})