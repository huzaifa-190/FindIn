import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image,TextInput,ScrollView,KeyboardAvoidingView ,StatusBar,Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

// firebase imports
import {createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";

// *************************************************** Importing Own components *********************************************************
import Colors from '../../Constants/Colors'
import InputField from '../../Components/InputField'
import SubmitButton from '../../Components/SubmitButton';
import Loader from '../../Components/Loader'
import {auth} from  '../../DataBase/FirebaseConfig'

const SignupScreen = ({navigation}) => {

  // ************************************************ Declarations **************************************
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid,setIsFormValid] = useState(false)
  const [errors, setErrors] = useState({}); 
  const[isLoading,setIsLoading] = useState(false)
  useEffect(() => { 
  
    // Trigger form validation when name,  
    // email, or password changes 
    validateForm(); 
}, [email,password,confirmPassword,username]);


//           Form validation

const validateForm = () => { 
 
  let errors = {}; 
 
  // Validate email field 
  if (username.length < 3) { 
    errors.username = 'Username must be at least 3 characters '; 
    setErrors(errors)
    // setErrors([...errors,errors.username ]); 
} else if(!email) { 
      errors.email = 'Email is required'; 
      // setErrors([...errors,errors.email ]); 

  } else if (!/\S+@\S+\.\S+/.test(email)) { 
      errors.email = 'Invalid email address'; 
      // setErrors([...errors,errors.email ]); 

  } 
  // else if (!password) { 
  //     errors.password = 'Password is required'; 
  //     // setErrors([...errors,errors.password ]); 
  //   } 
    else if (password.length < 6) { 
      errors.password = 'Password must be at least 6 characters'; 
      // setErrors([...errors,errors.password ]); 
    } 
  else if(!(password == confirmPassword)){
      errors.password = 'Both Passwords must match  '
      // setErrors([...errors,errors.password ]); 
  }
  // Set the errors and update form validity 
  // console.log('username changed',username)
  setErrors(errors); 
  setIsFormValid(Object.keys(errors).length === 0); 
}; 


  //  On press of create account button
  const onSignUp = async ()=>{

    if(isFormValid){
      setIsLoading(true)
      await createUserWithEmailAndPassword(auth, email,password)
      .then((userCredential) => {
        console.log("Succesfull",userCredential);
        // Toast.show({
        //   type: 'success',
        //   text1: 'Account created successfully',
        // });
        setIsLoading(false)
        Toast.show({type:'success',text1:'Account created successfully'})     
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        setIsLoading(false)
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error Code == ',errorCode)
      console.log('Error Message == ',errorMessage)
      // Alert.alert(errorMessage)
      Toast.show({type:'error',text1:errorCode})
      
      
    });
  }
  else{
    // Alert.alert("Please fill the form correctly  ")
     {Object.values(errors).map((error, index) => ( 
          // <Text key={index} style={styles.error}> 
          //             {error} 
          //         </Text> 
          
          Toast.show({type:'error',text1:error})
      ))}  
  }
}

  useEffect(()=>{
    console.log("sigupp useeffect ")
  },[navigation])
  if(isLoading){
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Loader/>
      </View>
    )
  }
return (
  
  
  <ScrollView > 
  <KeyboardAvoidingView style={styles.container}>
          {/* <StatusBar style='light' backgroundColor='black'/> */}
    <Text style={styles.header}>Sign Up.</Text>
   
    <View style={{alignItems:'stretch',justifyContent:'center' ,width:'100%'}}>

      <Text style={styles.label}>User name</Text>
      <InputField label={'Select a user name'} maxLength={50} value={username} onChangeText={text => setUsername(text)}     />

      <Text style={styles.label}>email</Text>
      <InputField label={'Enter email'} maxLength={50} value={email} onChangeText={text => setEmail(text)}         />

      <Text style={styles.label}>Password</Text>
      <InputField label={'Choose a password'} maxLength={50} isSecureTextEntry={true} value={password} onChangeText={password => (setPassword(password))} />

      <Text style={styles.label}>Confirm password</Text>
      <InputField label={'Confirm password'} maxLength={50} isSecureTextEntry={true} value={confirmPassword} onChangeText={confirmPassword => (setConfirmPassword(confirmPassword))} />
    </View>

    <SubmitButton label={!isLoading ? 'Sign Up':'loading'} mgv={50} onPress={onSignUp} />

    <View style={{flexDirection:'row',width:'80%',height:40 ,alignItems:'center',justifyContent:'center',}}>

      <View style={{flexDirection:'row',}}>
        <Text style={{color:Colors.grey}} >Already have an account?  </Text>
        <TouchableOpacity onPress={() => (    navigation.navigate('LoginScreen'))}>
          <Text style={styles.signupLinkText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
    {/* <Text style={styles.footer}>Terms of Service | Privacy Policy</Text> */}
   </KeyboardAvoidingView>
   </ScrollView> 


);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical:65,
    paddingHorizontal: 23,
    backgroundColor:Colors.lightbg
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.purple,
  },
  label:{
    fontSize:15,fontWeight:'bold',marginVertical:'10%',marginLeft:5,marginBottom:10,color:Colors.darkestBlue
   },
  forgotPassword: {
    color: Colors.grey,
    marginVertical: 10,
  },
  signupLinkText: {
    marginHorizontal:5,
    color: Colors.green,
    marginBottom: 20,
  },
 
});

export default SignupScreen;
