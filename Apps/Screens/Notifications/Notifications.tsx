import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet, SafeAreaView, NativeModules, Platform, TouchableOpacity } from 'react-native';
const { StatusBarManager } = NativeModules;
import { Fontisto } from '@expo/vector-icons';
import colors from '../../Constants/Colors';

interface Notification {
  id: string;
  name: string;
  description: string;
  time: string;
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const notifications: Notification[] = [
  { id: '1', name: 'Huzaifa Basharat', description: 'Liked your post', time: '2 mins ago' },
  { id: '2', name: 'Kabir', description: 'claimed on your item', time: '10 mins ago' },
  { id: '3', name: 'Taha', description: 'Posted a lost item', time: '1 hour ago' },
  { id: '4', name: 'M.Ali', description: 'Sent you a message', time: '3 hours ago' },
  { id: '5', name: 'Dawood Virk', description: 'Liked your item', time: '1 day ago' },
  { id: '6', name: 'Dawood Virk', description: 'Liked your item', time: '2 day ago' },
  { id: '7', name: 'Dawood Virk', description: 'Posted a lost item', time: '2 day ago' },
];

class NotificationItem extends Component<{ item: Notification }> {
  render() {
    const { item } = this.props;
    return (
      <View style={styles.notificationContainer}>
        <Image source={require('../../../assets/images/u1.jpg')} style={styles.icon} />
        <TouchableOpacity style={styles.content}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    );
  }
}

class NotificationScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center', paddingHorizontal: '2%', marginTop: STATUSBAR_HEIGHT + 10, marginBottom: 10 }}>
          <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', paddingLeft: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Notifications</Text>
          </View>
          <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity>
              <Fontisto name="search" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.9 }}>
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
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightbg, // light grey background
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

export default NotificationScreen;
