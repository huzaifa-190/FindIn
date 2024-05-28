import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Platform,
  NativeModules,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
const { StatusBarManager } = NativeModules;
import Carousel from "react-native-reanimated-carousel";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import Colors from "../Constants/Colors";
import colors from "../Constants/Colors";

export default function ImageCarousel({ onPressBackArrow, data }) {
  const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
  const width = Dimensions.get("window").width;
  // const statusBarHeight = StatusBar.height
  const uris = data.filter((image)=>{
    return (!image=='')
  })
  return (
    <View>
      <Carousel
        style={{
          // width: {width},
          // marginTop:20,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        loop={true}
        width={width}
        height="100%"
        autoPlay={true}
        pagingEnabled={true}
        snapEnabled={false}
        mode="blur-parallax"
        // parallaxScrollingScale={1.2}
        // parallaxScrollingOffset={50}
        autoPlayInterval={2000}
        // data={[...new Array(3).keys()]}
        
        data={uris}
        scrollAnimationDuration={1000}
        onSnapToItem={(id) => console.log("current index:", id)}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                marginTop: STATUSBAR_HEIGHT,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 20,
                height: 35,
                width: 35,
              }}
              onPress={onPressBackArrow}
            >
              {/* <EvilIcons name="arrow-left" size={36} color="black" /> */}
              <AntDesign name="arrowleft" size={26} color={colors.grey} />
            </TouchableOpacity>
            <Image
              style={styles.itemImage}
              // source={require('../../assets/images/i2.jpg')}
              source={{ uri: item}}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 0.7,
  //   // marginTop: StatusBar.currentHeight || 0,
  // },
  item: {
    flex: 1,
    height: 220,
    width: 150,
    // borderWidth:2,
    // borderColor:'green'
    backgroundColor: Colors.white,
    // padding: 8,
    //   marginVertical: 5,
    //   marginRight:5,
    //   marginRight: 20,
    //   borderRadius:6,
  },
  itemImage: {
    position: "absolute",
    zIndex: -1,
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    //   resizeMode: 'center',
    //   borderRadius:18
    //   borderTopRightRadius:16,
    //   borderTopLeftRadius:16,
    //   marginRight:10
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
