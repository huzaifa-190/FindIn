import { View, Text ,Dimensions,Image,StyleSheet,Platform,NativeModules,ScrollView, TouchableOpacity} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
const { StatusBarManager } = NativeModules;
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// IMporting own components
import Colors from '../../Constants/Colors'
import HeaderReturn from '../../Components/HeaderReturn';
import ImageCarousel from '../../Components/ImageCarousel';
import SubmitButton from '../../Components/SubmitButton';
import colors from '../../Constants/Colors';

export default function ItemDetail({route,navigation}) {

    const [isHeartTapped,setIsHearTapped] = useState(false) 
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
    const width = Dimensions.get('window').width;
    // const statusBarHeight = StatusBar.height
    const item = route.params.item
    console.log(item,)




  return (
     <View  style={{flex:1,backgroundColor:Colors.lightbg,flexDirection:'column',justifyContent:'flex-start',}} > 

        <StatusBar animated={true} translucent={true} backgroundColor={colors.lightbg}/>
        {/* <StatusBar hidden={true} animated={true} translucent={true}/> */}

        {/* <View style={{flex:0.15,justifyContent:'center',}}>
            <HeaderReturn showBackIcon={true} midHeading={item.title} onBackPress={() => navigation.pop()}/>
        </View> */}


        <View style={{flex:0.35,backgroundColor:Colors.lightbg,alignItems:'center',justifyContent:'center',paddingTop:STATUSBAR_HEIGHT}}>
            <ImageCarousel onPressBackArrow={()=>(navigation.pop())} data={item.images}/>
        </View>

        <View style={{flex:0.65,zIndex:-1,backfaceVisibility:'visible',paddingHorizontal:'4%',borderTopRightRadius:30,borderTopLeftRadius:30}}>

            <ScrollView  showsVerticalScrollIndicator={false} >
            
                <Text style={styles.foundTextBox}>{item.status}</Text>

                <View style={{paddingLeft:7}}>

                    <Text style={{color:Colors.darkestBlue,fontSize:16,fontWeight:'bold',marginBottom:4}}>{item.title}</Text>

                    <View style={{flexDirection:'row',marginVertical:6,}}>
                        <Ionicons name="time-outline" size={19} color={Colors.grey} />
                        <Text style={{marginLeft:5,fotSize:14,color:Colors.grey,fontWeight:'500'}}>4 days ago</Text>
                        {/* <Text style={{marginLeft:5,fotSize:14,color:Colors.grey,fontWeight:'500'}}>{item.createdAt? item.createdAt.toDate() : null}</Text> */}
                    </View>

                    <View style={{flexDirection:'row',marginVertical:8,}}>
                        <MaterialIcons name="location-on" size={19} color={Colors.black} />          
                        <Text style={{marginLeft:5,fontSize:14,color:Colors.grey,fontWeight:'500'}}>Cui cafe</Text>
                    </View>

                    <Text style={{marginVertical:10,fontSize:16,color:Colors.darkestBlue}}>{item.email}</Text>
                    <Text style={styles.heading}>Additional Information</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>Color                 Black
                        </Text>
                        <Text style={styles.infoText}>Brand               {item.brand ? item.brand : 'NULL'}
                        </Text>
                        <Text style={styles.infoText}>Category            {item.category ? item.category : 'NULL'}
                        </Text>
                    </View>

                    <View style={styles.iconsRowBox}>
                        <TouchableOpacity>
                            <Foundation name="mail" size={24} color={Colors.darkestBlue} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>(setIsHearTapped(!isHeartTapped))} style={{}}>
                            {isHeartTapped ? <FontAwesome name="heart" size={24} color="#D84A44" /> :
                            <FontAwesome name="heart-o" size={24} color='#D84A44' />
                            }
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <Fontisto name="share" size={24} color={Colors.darkestBlue} />
                        </TouchableOpacity>
                    </View>

                    <SubmitButton label={'Send message'} bgColor={Colors.darkestBlue} mgv={20}></SubmitButton>
                    <SubmitButton label={'Call now'}  mgv={10}></SubmitButton>
                    
                </View>

            </ScrollView> 
    </View>


    </View>
  )
}


const styles = StyleSheet.create({
    foundTextBox:{flex:1,backgroundColor:Colors.lightPurple,color:Colors.white,width:70,height:40,textAlign:'center',fontSize:14,
    fontWeight:'bold',padding:10,marginVertical:10,borderRadius:15,
      },
      heading:{
        fontSize:18,fontWeight:'bold',color:Colors.darkestBlue
      },
    item: {
        flex: 1,
        height: 220,
        width:150,
      backgroundColor: Colors.white,
     
    },
    itemImage:{
      height:"100%",
      width:'100%',
      resizeMode: 'cover',
      borderRadius:18
   
    },
    infoBox:{
        paddingHorizontal:10,paddingVertical:15,marginTop:15,backgroundColor:Colors.yellow,borderRadius:10,
        justifyContent: 'center',alignItems:'center',marginVertical:10
    },
    infoText:{
        width:'100%',fontSize:16,color:Colors.darkestBlue,fontWeight:'bold',textAlign:'center',paddingRight:10,marginVertical:4
    },
    iconsRowBox:{
        flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',backgroundColor:Colors.lightGrey,
        paddingVertical:18,marginTop:0,borderRadius:30

    }
    
  });