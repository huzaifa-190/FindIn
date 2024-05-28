import React, { useState } from 'react';
  import { StyleSheet,View,Text,TouchableOpacity,Image,ScrollView } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import * as ImagePicker from 'expo-image-picker';
  import AntDesign from '@expo/vector-icons/AntDesign';
  import CheckBox from 'react-native-check-box'
  import { StatusBar } from 'expo-status-bar';

  import { TextInput } from 'react-native-paper';

  import { MaterialIcons } from '@expo/vector-icons';
  import { MaterialCommunityIcons } from '@expo/vector-icons';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


  import colors from '../Constants/Colors'

export default function DropDown({data,placeholder,renderLeftIcon,isSearch,value,onChange}) {
  return (
    <View>
      <Dropdown
              style={styles.field}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search ={isSearch ? true : null}
              
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={placeholder}
              searchPlaceholder="Search..."
              value={value}
              onChange={onChange}
              renderLeftIcon={renderLeftIcon}/>
    </View>
  )
}


const styles = StyleSheet.create({
    // field: {
    //   marginBottom: 10,
    //   padding: 12,
    //   height: 50,
    //   borderRadius:10,
    //   borderColor: colors.grey,
    //   borderWidth: 0.5,
    // },
   
    placeholderStyle: {
      fontSize: 16,
      paddingLeft:5,
      color:colors.grey
    },
    selectedTextStyle: {
      fontSize: 16,
      paddingLeft:5,
      color:colors.yellow
    },
   
  });