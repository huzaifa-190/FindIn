import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, NativeModules, Platform, TouchableOpacity, TextInput } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import colors from '../../Constants/Colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { StatusBarManager } = NativeModules;

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const notifications = [
  { id: '1', name: 'Huzaifa Basharat', description: 'Liked your post', time: '2 mins ago' },
  { id: '2', name: 'Kabir', description: 'claimed on your item', time: '10 mins ago' },
  { id: '3', name: 'Taha', description: 'Posted a lost item', time: '1 hour ago' },
  { id: '4', name: 'M.Ali', description: 'Sent you a message', time: '3 hours ago' },
  { id: '5', name: 'Dawood Virk', description: 'Liked your item', time: '1 day ago' },
  { id: '6', name: 'Dawood Virk', description: 'Liked your item', time: '2 day ago' },
  { id: '7', name: 'Dawood Virk', description: 'Posted a lost item', time: '2 day ago' },
];

const NotificationItem = ({ item }) => (
  <View style={styles.notificationContainer}>
    <Image source={require('../../../assets/images/u1.jpg')} style={styles.icon} />
    <TouchableOpacity style={styles.content}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
    <Text style={styles.time}>{item.time}</Text>
  </View>
);

export default function NotificationScreen({ navigation }) {
  const animation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animation.value === 1 ? withTiming(280, { duration: 500 }) : withTiming(0, { duration: 500 }),
      paddingHorizontal: animation.value === 1 ? withTiming(10, { duration: 500 }) : withTiming(0, { duration: 500 }),
      borderRadius: animation.value === 1 ? withTiming(2, { duration: 500 }) : withTiming(0, { duration: 500 }),
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>Notifications</Text> 
        
        {/* <Animated.View style={[styles.animatedView, animatedStyle]}>
          {animation.value === 1 && (
            <>
              <View style={styles.iconContainer}>
                <TouchableOpacity>
                  <Ionicons
                    name="options-outline"
                    size={20}
                    color="grey"
                    style={{ transform: [{ rotate: "270deg" }] }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <TextInput placeholder="Search items by title" style={styles.textInput} />
              </View>
                <TouchableOpacity>
                    <Ionicons
                      name="options-outline"
                      size={20}
                      color="grey"
                      style={{ transform: [{ rotate: "270deg" }] }}
                      />
                  </TouchableOpacity>
            </>
          )}
          
        </Animated.View> */}
         
         {/* {animation.value === 0 && 
            <TouchableOpacity
                style={styles.searchIconContainer}
              onPress={() => {
                animation.value = animation.value === 1 ? 0 : 1;
              }}
            >
             
              <Fontisto name="search" size={18} color="grey" />
            </TouchableOpacity>
        } */}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <NotificationItem item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: colors.lightbg, // light grey background
  },
  headerContainer: {
    flex:0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    // justifyContent:'flex-end',
    // paddingHorizontal: '2%',
    marginTop: STATUSBAR_HEIGHT + 10,
    marginBottom: 10,
    marginHorizontal:25
  },

  animatedView: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 0.5,
    borderColor: colors.grey,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginVertical: 5,
    // marginHorizontal:10,
    height: 40,
    width:220,
    // backgroundColor:colors.lightPurple,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    // flex: 1,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textInput: {
    // flex: 1,
  },
  searchIconContainer: {
    // marginRight: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    // position:'absolute',
  },
  listContainer: {
    flex: 1,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkestBlue, // dark grey
  },
  description: {
    fontSize: 14,
    color: colors.grey, // medium grey
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#9A73EF', // medium light purple
  },
});
