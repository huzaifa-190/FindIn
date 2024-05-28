import { View, Text, TextInput,FlatList,
    SafeAreaView,StyleSheet, TouchableOpacity,Image,KeyboardAvoidingView,Platform,NativeModules } from 'react-native'
  import React, { useState } from 'react'
  import { StatusBar } from 'expo-status-bar';
  const { StatusBarManager } = NativeModules;

  // import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

  
  import { Fontisto } from '@expo/vector-icons';
  import { Ionicons } from '@expo/vector-icons';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
  import { ScrollView } from 'react-native-gesture-handler';
  
  // import Animated from 'react-native-reanimated';
  
  import colors from '../../Constants/Colors'
  import HeaderReturn from '../../Components/HeaderReturn';
  import { useItems } from '../../Contexts/ItemsContext';


const categories = [
    {
      id: 1,
      title: 'All ',
    },
    {
      id: 2,
      title: 'Phone',
    },
    {
      id: 3,
      title: 'bag',
    },
    {
      id: 4,
      title: 'wallet',
    },
    {
      id: 5,
      title: 'keys',
    },
    {
      id: 6,
      title: 'documents'
    },
    {
      id: 7,
      title: 'other'
    },
  ];

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& FUNCTIONS &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


const CategoriesList =(item)=>(
    <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginRight:20,
    paddingHorizontal:13,backgroundColor:'yellow',height:30,borderRadius:15}} 
    onPress={(item) => (setSelectedCategory(item.title))} >
        <Text style={{fontSize:16,fontWeight:'500',color:colors.purple}}  >{item.title}</Text>
    </TouchableOpacity>
)


const Item = (item,navigation) => (

                    // Item container
  // <Animated.View entering={FadeInDown.delay(200*item.id)}>

    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start', marginBottom:'6%',}}>
        <View style={styles.item}>
            <TouchableOpacity style={{flex:0.7}} onPress={()=> (navigation.navigate('ItemDetail',{item:item}))}>
              {/* <Image
                style={styles.itemImage}
                source={require('./../../../assets/images/i1.jpg')}
                /> */}
              {item.images ? <Image source={{ uri: item.images.filter((image)=>(!image==''))[0] }} style={styles.itemImage} />:null}

            </TouchableOpacity>
        
            <View style={{flex:0.37,flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',marginRight:5}}>
        
                <View style={{flex:0.7,justifyContent:'center',alignItems:'flex-start',paddingLeft:12}}>
                    <Text style={{color:colors.darkestBlue,fontSize:16,fontWeight:'500'}}>{item.title }</Text>
                    <Text style={{color:colors.skyBlue}}>Lahore , 0 KM</Text>
                </View>
                <TouchableOpacity style={{flex:0.3}}>
                    <Image
                        style={styles.itemDp}
                        source={require('./../../../assets/images/u1.jpg')}
                        />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.claimBtn} onPress={()=>navigation.navigate('ItemDetail',{item:item})}>
                <Text style={{color:colors.white,}}>Claim</Text>
            </TouchableOpacity>
        
        </View>
    </View>
  // </Animated.View>

  );


export default function FoundItems({navigation,route}) {
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
    const [selectedCategory, setSelectedCategory] = useState('All')
    const {items} =useItems()

  return (
    
    // <ScrollView nestedScrollEnabled={true}> 
    <View  style={{flex:1,
        backgroundColor:colors.lightbg,flexDirection:'column',justifyContent:'flex-start',}} > 
        
    {/* <KeyboardAwareScrollView keyboardShouldPersistTaps='never'  contentContainerStyle={{flex:1,
        backgroundColor:colors.lightbg,flexDirection:'column',justifyContent:'flex-start',paddingTop:"10%",}} >  */}

      {/* <StatusBar style='dark'/> */}


        {/* Top header view */}
        <View style={{flex:0.15,justifyContent:'center'}}>
            <HeaderReturn backLabel={'Home'} showBackIcon={true} onBackPress={() => navigation.pop()}/>
        </View>
        {/* <View style={{flex:0.3 }}>
            <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}} onPress={() => navigation.pop()}>
                <Ionicons name="chevron-back" size={24} color={colors.yellow} />
                <Text style={{color:colors.darkGrey}}>Home</Text>
            </TouchableOpacity>
        </View>


        <View style={{flex:0.7}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center',borderWidth:0.5,borderColor:colors.grey,
            paddingVertical:8,paddingHorizontal:10,borderRadius:6,backgroundColor:colors.white,marginVertical:12}}>
            
                <View style={{flex:0.1}}>
                    <Fontisto name="search" size={16} color='grey'/> 
                </View>
                <View style={{flex:0.8}}>
                    <TextInput  placeholder="Find items" >
                    </TextInput>
                </View>
                <View style={{flex:0.1}}>
                    <TouchableOpacity>
                    <Ionicons name="options-outline" size={20} color="grey" style={{transform: [{ rotate: '270deg' }]}} />
                    </TouchableOpacity>
                </View>
            </View>
    
        </View> */}

      
        {/* mid container for heading and categories */}

    <View style={{flex:0.2,flexDirection:'column',justifyContent:'space-between',}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:colors.darkestBlue,paddingLeft:'8%'}}>Found Items</Text>

            <View style={{flex:1,paddingVertical:'5%',paddingHorizontal:'10%',alignItems:'center',}} >
                <SafeAreaView style={{flex:1}}>
                    <FlatList
                        data={categories}
                        horizontal
                        keyExtractor={item => item.id}
                        keyboardShouldPersistTaps='never'
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => CategoriesList(item)}
                        />
                </SafeAreaView>
            </View>
    </View>



          {/* Lost items container */}
    <View style={{flex:0.7,marginTop:'2%',marginHorizontal:'5%',marginBottom:8}}>

        <SafeAreaView style={{flex:1}}>
          <FlatList
            data={items.filter((img)=>{return img.status =='found'})}
            // horizontal
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='never'
            renderItem={({item}) => Item(item,navigation)}
            // snapToAlignment="start"
            // decelerationRate={"normal"}
            // snapToInterval={120}
            />
        </SafeAreaView>
    </View>
{/* </KeyboardAwareScrollView> */}
</View>
// </ScrollView>


  )
}


const styles = StyleSheet.create({
    // container: {
    //   flex: 0.7,
    //   // marginTop: StatusBar.currentHeight || 0,
    // },
    item: {
        flex: 1,
        height: 220,
        width:150,
        // borderWidth:2,
        // borderColor:'green'
      backgroundColor: colors.white,
      // padding: 8,
    //   marginVertical: 5,
    //   marginRight:5,
    //   marginRight: 20,
    //   borderRadius:6,
      
    },
    itemImage:{
      height:"100%",
      width:'100%',
      resizeMode: 'cover',
      borderTopRightRadius:6,
      borderTopLeftRadius:6
    },
    itemDp:{
      height:33,
      width:33,
      resizeMode: 'cover',
      borderRadius:50
    },
    title: {
      fontSize: 16,
    },
    claimBtn:{
      flex:0.13,alignItems:'center',backgroundColor:colors.lightPurple,padding:6,
    borderBottomLeftRadius:6,borderBottomRightRadius:6 }
  });