import React, { useEffect, useState } from 'react';
import { StyleSheet,View,Text,TouchableOpacity,Image,TextInput,ScrollView,Platform,Dimensions,StatusBar,Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Switch } from 'react-native-paper';
  // import Modal from 'react-native-modal';
  import { Entypo } from '@expo/vector-icons';
  import {updatePassword}  from "firebase/auth";

  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { storage,auth } from '../../DataBase/FirebaseConfig';


  // -----------------------------------------Importing own compnents 
import colors from '../../Constants/Colors'
import Modall from '../../Components/Modall';
import InputField from '../../Components/InputField';
import Loader from '../../Components/Loader'
import { useAuth } from '../../Contexts/AuthContext';
import Toast from 'react-native-toast-message';
import { err } from 'react-native-svg';



const screenWidth = Dimensions.get('window').width;

export default function Profile({navigation}) {

  const [isNotificationsOn, setIsNotificationsOn] = useState(false);
  const [dp,setDp] = useState(null);
  const [isChngPassModalVisible, setIsChngPassModalVisible] = useState(false);
  const [isNewPassModalVisible, setIsNewPassModalVisible] = useState(false);
  const [isLogOutModalVisible,setIsLogOutModalVisible] = useState(false)
  const [prevPassword, setPrevPassword] = useState('');
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {logout,user,userLoginPassword} = useAuth()
  
  useEffect(()=>{
    console.log("useeffect of profile called []")

  },[])
  
  const selectProfilePic =async()=>{
    
    // Function to pick image from device
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    
    console.log(result);
    setDp(result.assets[0].uri)
  };

  const uploadImage = async (img ) => {

    if(img == null) {
      return alert("Please select an image to upload");
    }
    console.log("Uploading image ...");
    const response = await fetch(img);
    const blob = await response.blob();
    const filename = img.substring(img.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `profiles/${filename}`);
    
    setIsLoading(true)
    try{

      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);
      console.log("\n\n\t\timage URL returned ==>", url.trim());
      setIsLoading(false)
      Toast.show({type:'success',text1:"Profile updated !"})
      return url.trim();
    }
    catch(error){
      setIsLoading(false)
      console.log(new Error(error));
    }

  };

  const onToggleNotifications = () => setIsNotificationsOn(!isNotificationsOn);
  
  const cancelPassModal =()=>{
    setPrevPassword('')
    setIsChngPassModalVisible(!isChngPassModalVisible)
  }
  const cancelNewPassModal =()=>{
    setNewPassword('')
    setIsNewPassModalVisible(!isNewPassModalVisible)
  }
  const cancelLogoutModal =()=>{
    setIsLogOutModalVisible(!isLogOutModalVisible)
  }

  const onDone = async()=>{
    try {
            setIsNewPassModalVisible(false)
            const user = auth.currentUser;
            await updatePassword(user, newPassword)
            console.log("done changing password")
            Toast.show({type:'success',text1:"Password updated successfully"})
            setNewPassword('')
            logout();
            
          } catch (error) {
            Toast.show({type:'error',text1:error})
            console.log(error);
          }
    console.log("Neew password is ",newPassword)
  }

  const onProceed =async()=>{

    console.log("User login password is ==> ",userLoginPassword)
    console.log("Previous password is ",prevPassword)
    if(prevPassword == userLoginPassword ){

      // alert('truee')
      setIsChngPassModalVisible(false);
      setIsNewPassModalVisible(true)
      setPrevPassword('')
    }
    else{
      setIsChngPassModalVisible(false);
      // alert('Wrong  password')
      Toast.show({type:'error',text1:"Wrong password"})

      setPrevPassword('')

    }

  }
  
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }
  return (

    <ScrollView contentContainerStyle={styles.container}>

        {/* Top container for user info  */}
        <View style={{flex:0.4,backgroundColor:colors.grey,alignItems:'center',justifyContent:'center',marginTop:StatusBar.height,paddingTop:20}}>
          <StatusBar style='dark' backgroundColor={colors.lightbg} />
          <TouchableOpacity onPress={()=>(selectProfilePic())}>
             {dp ? <Image
                style={styles.dp}
                  source={{uri:dp}} /> 
                  : 
                  <Image
                        style={styles.dp}
                        source={require("./../../../assets/images/p1.jpg")}
                      />
             }
          </TouchableOpacity>
          <Text style={{fontSize:24,fontWeight:'bold',color:colors.white}}>{user?user.username.charAt(0).toUpperCase()+user.username.slice(1).toLowerCase():null}</Text>
          <Text style={styles.emailText}>{user?user.email:null }</Text>
          <Text style={styles.emailText}>Password : {userLoginPassword}</Text>

          <TouchableOpacity style={{backgroundColor:colors.yellow,alignItems:'center',justifyContent:'center',
          height:35,width:120,borderRadius:20}} onPress={()=>(uploadImage(dp))}>
            <Text style={{color:colors.lightGrey,fontSize:16,fontWeight:'400'}}>Edit Profile</Text>
          </TouchableOpacity>

         </View>

        {/* Container view for settings */}

        <View style={{flex:0.6,backgroundColor:colors.lightbg,borderTopLeftRadius:30,borderTopRightRadius:30,}}>
          
          <View style={styles.sectionHeaderView}>
            <Text style={styles.sectionText}>Account</Text>
          </View>

          <TouchableOpacity style={styles.sectionOptions} onPress={()=>((setIsChngPassModalVisible(true)))}>
            <Text style={styles.text}>Change Password</Text>
            <Entypo name="chevron-right" size={24} color="black" />

          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.sectionOptions}>
            <Text>Change Language</Text>
            <Entypo name="chevron-right" size={24} color="black" />

          </TouchableOpacity> */}

          <View style={styles.sectionOptions}>
            <Text style={styles.text}>Enable notifications</Text>
            {/* <Entypo name="chevron-right" size={24} color="black" /> */}
            <Switch value={isNotificationsOn} onValueChange={onToggleNotifications} />

          </View>

          <View style={styles.sectionHeaderView}>
            <Text style={styles.sectionText}>Others</Text>

          </View>

          <TouchableOpacity style={styles.sectionOptions}>
            <Text style={styles.text}>Privacy policy</Text>
            <Entypo name="chevron-right" size={24} color="black" />

          </TouchableOpacity>

          <TouchableOpacity style={styles.sectionOptions}>
            <Text style={styles.text}>Terms and conditions</Text>
            <Entypo name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutBtn} onPress={()=> (setIsLogOutModalVisible(true))}>
            {/* <Feather name="power" size={20} color={colors.grey} /> */}
            <Entypo name="chevron-left" size={24} color="black" />
            <Text style={styles.sectionText}>Logout</Text>
            {/* <SimpleLineIcons name="logout" size={18} color={colors.lightGrey} /> */}
          </TouchableOpacity>

        </View>

          <Modall isVisible={isChngPassModalVisible} onBackdropPress={cancelPassModal} onCancel={()=>(cancelPassModal())}
           onProceed={()=>(onProceed())} isinput={true} isInpSecure={true} inpLabel={'Prevoius password'}
            inpValue={prevPassword} onInpChange={(text)=>(setPrevPassword(text))}
            proceedLabel={'Proceed'} title={'Verify'} />

          <Modall content={'Are you sure to logout ?'} isVisible={isLogOutModalVisible} onBackdropPress={cancelLogoutModal}
           onCancel={()=>(cancelLogoutModal())} onProceed={()=>(logout())} proceedLabel={'Logout'} proceedColor={'red'}
           title={'Confirmation'} />

          <Modall isVisible={isNewPassModalVisible} onBackdropPress={cancelNewPassModal} onCancel={()=>(cancelNewPassModal())}
           onProceed={()=>(onDone())} isinput={true} isInpSecure={true} inpLabel={' New password'}
            inpValue={newPassword} onInpChange={(text)=>(setNewPassword(text))}
            proceedLabel={'Done'} title={'Enter new password'} />

        {/* <Modal isVisible={isModalVisible} animationIn={'fadeInUpBig'} animationOut={'bounceOut'}  animationInTiming={200}
        onBackdropPress={()=>(cancelPassModal())}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Verify</Text>

            <InputField label={'Previous password'} isSecureTextEntry={true} value={password} onChangeText={(text)=>(setPassword(text))}/>

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:20}}>


            <TouchableOpacity style={styles.btn} onPress={()=>(cancelPassModal())}>
              <Text style={{color:colors.darkestBlue}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={()=>(onProceed())} >
              <Text style={{color:colors.green}}>proceed</Text>
            </TouchableOpacity>
            </View>
         
          </View>
        </Modal> */}

    </ScrollView>

  )
}


const styles = StyleSheet.create({

  container:{flex:1,flexDirection:'column',paddingTop:StatusBar.height,
  backgroundColor:colors.grey},
  dp:{
    height: 100,
    width: 100,
    resizeMode: "cover",
    borderRadius: 50,
    marginBottom: 5,
  },
  text:{
    color:colors.darkestBlue
  },
  emailText:{color:colors.lightGrey,marginBottom:5,marginLeft:5},
  
  label:{
   fontSize:16,fontWeight:'bold',marginTop:'5%',marginLeft:5,marginBottom:10
  },
 
  
    sectionHeaderView:{
      height:45,paddingHorizontal:18,backgroundColor:'transparent',alignItems:'flex-start',justifyContent:'center'
    },
    logoutText:{
      marginLeft:10,
      fontSize: 16,
      color:colors.darkestBlue
    },
    sectionText:{
      marginLeft:10,
      fontSize: 16,
      color:colors.darkGrey
    },
    sectionOptions:{
      flexDirection:'row',height:45,paddingHorizontal:18,backgroundColor:colors.white,alignItems:'center',justifyContent:'space-between',
      borderBottomWidth:1,borderBottomColor:colors.white,marginVertical:'2%',marginHorizontal:'3%',borderRadius:20

    },
    logoutBtn:{
      flexDirection:'row',height:45,paddingHorizontal:26,backgroundColor:'transparent',alignItems:'flex-start',justifyContent:'flex-start',
      alignItems:'center'
    },
    modalContent: {
      backgroundColor: 'white',
      // marginHorizontal:10,
      padding: 20,
      borderRadius: 10,
      // alignItems: 'center',
    },
    modalTitle: {
      fontSize: 16,
      fontWeight:'bold',
      marginBottom: 15,
      color:colors.darkestBlue
    },
    input: {
      width: '100%',
      padding: 10,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
    },
   btn:{
    justifyContent:'center',height:30,
  }
});