import {
    View,
    Text,
    TextInput,
    FlatList,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    NativeModules,
  } from "react-native";
  import React, { useState } from "react";

import colors from "../Constants/Colors";


export default function FoundItemsCustomList( {item , navigation}) {
  return (
   
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate("ItemDetail", { item: item })}
        >
         
          {item.images ? <Image source={{ uri: item.images.filter((image)=>(!image==''))[0] }} style={styles.itemImage} />:null}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              marginRight: 5,
            }}
          >
            <View
              style={{
                flex: 0.8,
                justifyContent: "center",
                alignItems: "flex-start",
                paddingLeft: 12,
              }}
            >
              <Text
                style={{ color: colors.darkestBlue, fontSize: 16, fontWeight: "500" }}
              >
                {item.title}
              </Text>
              <Text style={{ color: colors.skyBlue }}>Lahore , 0 KM</Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Image
                style={styles.itemDp}
                source={require("./../../assets/images/u1.jpg")}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
      
    
}


const styles = StyleSheet.create({
    
    item: {
      backgroundColor: colors.white,
      // padding: 8,
      marginVertical: 5,
      marginRight: 20,
      height: 180,
      width: 170,
      borderRadius: 6,
    },
    itemImage: {
      height: "60%",
      width: "100%",
      resizeMode: "cover",
      // resizeMode: 'contain',
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
    },
    itemDp: {
      height: 33,
      width: 33,
      resizeMode: "cover",
      borderRadius: 50,
    },
    title: {
      fontSize: 16,
    },
  });
  