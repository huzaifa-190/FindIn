
import { View, Text } from 'react-native'
import React from 'react'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Colors from './Apps/Constants/Colors'

const toastConfig = {
 
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor:  Colors.yellow,}}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
        //   fontWeight: 'bold',
          color: Colors.darkestBlue
        }}
        text2Style={{
            fontSize: 15,color:Colors.darkestBlue
          }}
      />
    ),
  
    error: (props) => (
      <ErrorToast
        {...props}
        style={{borderLeftColor:'#c64843',borderLeftWidth:6,}}
        text1Style={{
          fontSize: 15,
          color:'#c64843'
        }}
        text2Style={{
          fontSize: 15,color:Colors.darkestBlue
        }}
      />
    ),
    // myToast: ({ text1, props }) => (
    //   <View style={{ height: 60, width: '100%', backgroundColor: 'tomato',padding:20 }}>
    //     <Text>{text1}</Text>
    //     <Text>{props.uuid}</Text>
    //   </View>
    // )
  };

  export default toastConfig