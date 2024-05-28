import React from 'react';
import { View,StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';
// import { View } from 'react-native-reanimated/lib/typescript/Animated';

export default function Animation() {
  return (
    <View style={styles.loadingContainer}>
        {/* <Text>Loading ...</Text> */}
        <LottieView source={require('../../assets/Animations/loader1.json')} autoPlay  loop style={styles.loadingAnimation}/>
    </View>
  );
}
const styles = StyleSheet.create({

    loadingAnimation: {
        width: '25%',
        height: '20%',
        alignSelf: 'center',
      },
      loadingContainer: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
      },



})