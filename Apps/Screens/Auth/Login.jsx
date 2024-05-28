import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { SvgXml, SvgUri } from "react-native-svg";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

// ******************************************* Importing Own components
import Colors from "../../Constants/Colors";
import InputField from "../../Components/InputField";
import SubmitButton from "../../Components/SubmitButton";
import Loader from "../../Components/Loader";
import Modall from "../../Components/Modall";
import { auth } from "../../DataBase/FirebaseConfig";
import BottomTabNavigation from "../../Navigations//BottomTabNavigation/BottomTabNavigation";
import { useAuth } from "../../Contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/compat/app";

const LoginScreen = ({ navigation }) => {
  const { login,setUserLoginPassword } = useAuth();
  const [isChngPassModalVisible, setIsChngPassModalVisible] = useState(false);
  // const [password, setPassword] = useState('');
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const xml = ` <svg width="69" height="71" viewBox="0 0 69 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.106934 0.616329L19.1311 18.6841V71.0005L0.106934 51V0.616329Z" fill="#FBD758"/>
    <path d="M49.0261 19.3635H68.0503V71.0005H49.0261V19.3635Z" fill="#543199"/>
    <path d="M19.1311 71.0005L19.1311 51.0005L49.0262 51.0005L68.0503 51.0005V71.0005L19.1311 71.0005Z" fill="#543199"/>
    <path d="M0.107018 0.621006L49.1333 0.621005L68.051 19.31L19.2383 19.31L0.107018 0.621006Z" fill="#FBD758"/>
  </svg>`;

  useEffect(() => {
    // Trigger form validation when name,
    // email, or password changes
    validateForm();
  }, [email, password]);

  // ---------------------------------------- HANDLE LOGIN --------------------------------
  const handleLogin = async () => {
    console.log("Logging in with:", email, password);

    if (isFormValid) {
      setIsLoading(true);
      setUserLoginPassword(password)
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setIsLoading(false);
          Toast.show({ type: "success", text1: " Welcome Back!" });
        })
        .catch((error) => {
          setIsLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Loggin in error ==> ", errorMessage);
          if (errorCode === "auth/invalid-credential") {
            Toast.show({ type: "error", text1: "Invalid credentials" });
          } else {
            Toast.show({ type: "error", text1: errorCode });
          }
        });
    } else {
      // Alert.alert("Please fill the form correctly  ")
      console.log("insidedfdfafa object", errors);
      {
        Object.values(errors).map((error, index) =>
          // <Text key={index} style={styles.error}>
          //             {error}
          //         </Text>
          Toast.show({ type: "error", text1: error })
        );
      }
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Please enter password ";
    } else if (password.length < 6) {
      errors.password = "Password is at least 6 characters";
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const onForgetPass = () => {
    setIsChngPassModalVisible(true);
    console.log("fogototttt");
  };

  const cancelPassModal = () => {
    setPassword("");
    setIsChngPassModalVisible(!isChngPassModalVisible);
  };
  const cancelLogoutModal = () => {
    setIsLogOutModalVisible(!isLogOutModalVisible);
  };

  const onProceed = () => {
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        // alert('Password reset link has been sent to ',resetEmail);
        setIsChngPassModalVisible(false);
        setResetEmail("");
        Toast.show({
          type: "success",
          text1: "Password reset link has been sent",
        });
      })
      .catch((err) => {
        setIsChngPassModalVisible(false);
        setResetEmail("");
        console.log(" Error sending reset link => ", err);
        if (err.code === "auth/invalid-email") {
          Toast.show({ type: "error", text1: "Enter correct email adress" });
        } else if (err.code === "auth/missing-email") {
          Toast.show({ type: "error", text1: "Provide an email adress" });
        } else {
          Toast.show({ type: "error", text1: err.code });
        }
      });

    console.log("Previous password is ", password);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar animated={true} translucent={true}  />  */}
      <SvgXml
        xml={xml}
        width="40%"
        height="8%"
        style={{ justifyContent: "center", alignItems: "center" }}
      />

      <Text style={styles.header}>Log In.</Text>

      <View
        style={{
          alignItems: "stretch",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text style={styles.label}>EMAIL</Text>
        <InputField
          label={"Enter email"}
          maxLength={50}
          isSecureTextEntry={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>PASSWORD</Text>
        <InputField
          label={"Enter password"}
          maxLength={50}
          isSecureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity
        style={{
          width: "95%",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
        onPress={() => onForgetPass()}
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <SubmitButton label={"Log In"} mgv={30} onPress={handleLogin} />

      <Text
        style={{ fontSize: 12, fontWeight: "bold", color: Colors.darkestBlue }}
      >
        OR SIGIN IN WITH
      </Text>

      <View
        style={{
          width: "65%",
          marginVertical: 12,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 8,
        }}
      >
        <TouchableOpacity>
          <Image
            style={{
              height: 38,
              width: 38,
              resizeMode: "cover",
              borderRadius: 50,
              marginBottom: 5,
            }}
            source={require("../../../assets/images/fbb.jpg")}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={{
              height: 38,
              width: 38,
              resizeMode: "cover",
              borderRadius: 50,
              marginBottom: 5,
            }}
            source={require("../../../assets/images/X.jpeg")}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            style={{
              height: 30,
              width: 30,
              resizeMode: "cover",
              borderRadius: 50,
              marginBottom: 5,
            }}
            source={require("../../../assets/images/google.png")}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "80%",
          height: "25%",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "20%",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: Colors.grey }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
            <Text style={styles.signupLinkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Password reset modal */}
      <Modall
        isVisible={isChngPassModalVisible}
        onBackdropPress={cancelPassModal}
        onCancel={() => cancelPassModal()}
        onProceed={() => onProceed()}
        isinput={true}
        inpValue={resetEmail}
        onInpChange={(text) => setResetEmail(text)}
        proceedLabel={"Send"}
        title={"Enter email to send reset link "}
        inpLabel={"Current email"}
      />
      {/* <Text style={styles.footer}>Terms of Service | Privacy Policy</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 65,
    paddingHorizontal: 23,
    backgroundColor: Colors.lightbg,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 20,
    marginBottom: 20,
    color: Colors.purple,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: "10%",
    marginLeft: 5,
    marginBottom: 10,
    color: Colors.darkestBlue,
  },
  forgotPassword: {
    color: Colors.grey,
    marginVertical: 10,
  },
  signupLinkText: {
    marginHorizontal: 5,
    color: Colors.green,
    marginBottom: 20,
  },
});

export default LoginScreen;
