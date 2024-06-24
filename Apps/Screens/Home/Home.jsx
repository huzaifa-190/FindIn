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
  NativeModules,
  Dimensions,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
const { StatusBarManager } = NativeModules;
import { ScrollView } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  getFirestore,
  collection,
  getDoc,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import Loader from "../../Components/Loader";
import colors from "../../Constants/Colors";
import FoundItemsCustomList from "../../Components/FoundItemsCustomList";
import { useAuth } from "../../Contexts/AuthContext";
import { useItems } from "../../Contexts/ItemsContext";
import { fetchItems , fetchCategories } from "../../Hooks/FireStoreHooks/FireStoreHooks";
import { Colors } from "react-native/Libraries/NewAppScreen";

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& FUNCTIONS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
const Item = (item, navigation) =>  (
  // <View style={styles.item}>
  <TouchableOpacity
    style={styles.item}
    onPress={() => navigation.navigate("ItemDetail", { item: item })}
  >
    {/* <Image
      style={styles.itemImage}
      source={require("./../../../assets/images/i1.jpg")}
    /> */}

    {item.images ? (
      <Image
        source={{ uri: item.images.filter((image) => !image == "")[0] }}
        style={styles.itemImage}
      />
    ) : null}
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
          source={require("./../../../assets/images/u1.jpg")}
        />
      </View>
    </View>
  </TouchableOpacity>
  // {/* </View> */}
);


export default function Home({ navigation }) {
  const { user } = useAuth();
  const { items, setItems ,categories,setCategories} = useItems();
  let lostItems, foundItems;
  const [search, setSearch] = useState("");
  if (items) {
    lostItems = items.filter((item) => item.status == "lost" && item.title.toLowerCase().includes(search.toLowerCase()));
    foundItems = items.filter((item) => item.status == "found" && item.title.toLowerCase().includes(search.toLowerCase()));
    // const filteredItems = items.filter((item) =>
    //   item.category.toLowerCase().includes(search.toLowerCase())
    //   );
  }
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
  const width = Dimensions.get('window').width;


  useEffect(() => {
    console.log("useeffect of HOME [] \n");
    fetchItems("Items", setItems); // fetching items from Items collection and seting items in ItemsContext
    fetchCategories("Categories", setCategories); // fetching categories from Categories collection and seting categories in ItemsContext

    // console.log("items now ==> ", items);
  }, []);

  
 
  if (!items) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="never" contentContainerStyle={{flexGrow:1,backgroundColor:colors.lightbg,flexDirection:'column'
    ,justifyContent:'flex-start',paddingTop:"13%",}} >
    
    {/* <ScrollView contentContainerStyle={{flex:1,flexDirection: "column",
      justifyContent: "flex-start", backgroundColor:colors.lightbg,paddingTop:STATUSBAR_HEIGHT + 30}}>  
 */}

    <View
      style={{
        flex: 1,
        // backgroundColor: colors.lightbg,
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >

      <StatusBar style="dark" backgroundColor={colors.lightbg} />
      {/* <SafeAreaView> */}

      {/* <View style={{flex:1,backgroundColor:colors.lightbg,flexDirection:'column'
    ,justifyContent:'flex-start',paddingTop:"13%",}}> */}

      <View style={{ flex: 0.1, paddingHorizontal: "8%" }}>
        <Text style={{ fontSize: 16, color: Colors.darkestBlue }}>Hello </Text>
        <Text style={{ fontSize: 26, fontWeight: "500", color: colors.yellow }}>
          {user ? user.username : null}{" "}
        </Text>
      </View>

      <View style={{ flex: 0.1, paddingHorizontal: "8%" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 0.5,
            borderColor: colors.grey,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 6,
            backgroundColor: colors.white,
            marginVertical: 5,
          }}
        >
          <View style={{ flex: 0.1 }}>
            <Fontisto name="search" size={18} color="grey" />
          </View>
          <View style={{ flex: 0.8 }}>
            <TextInput placeholder="Search items by title" onChangeText={(search)=> setSearch(search)}></TextInput>
          </View>
          <View style={{ flex: 0.1 }}>
            <TouchableOpacity>
              <Ionicons
                name="options-outline"
                size={20}
                color="grey"
                style={{ transform: [{ rotate: "270deg" }] }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Found items container */}
      <View style={{ flex: 0.4, marginVertical: "4%", marginLeft: "8%" }}>
        <View
          style={{
            flex: 0.15,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.darkestBlue,
            }}
          >
            Found Items
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("FoundItems", { data: items ,type:'found'} , )}
          >
            <Text style={{ color: colors.skyBlue }}>see all ({foundItems.length})</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.85 }}>
          {/* <FlatList
            // data={DATA}
            data={foundItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => Item(item, navigation)}
          /> */}

          {/* Here I used my own custom built flatlist using scroll view  */}

          <ScrollView
            contentContainerStyle={{}}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {foundItems.map((item) => (
              <FoundItemsCustomList item={item} navigation={navigation} />
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Lost items container */}
      <View style={{ flex: 0.4, marginBottom: "4%", marginLeft: "8%" }}>
        <View
          style={{
            flex: 0.15,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 15,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.darkestBlue,
            }}
          >
            Lost Items
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("LostItems", { data: items ,type:'lost'})}
          >
            <Text style={{ color: colors.skyBlue }}>see all ({lostItems.length})</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.85 }}>
          <FlatList
            data={lostItems}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => Item(item, navigation)}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>

    </View>

     {/* </ScrollView> */}

     </KeyboardAwareScrollView>  

  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 0.7,
  //   // marginTop: StatusBar.currentHeight || 0,
  // },
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
