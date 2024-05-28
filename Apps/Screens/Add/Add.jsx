import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import * as ImagePicker from "expo-image-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import CheckBox from "react-native-check-box";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as FileSystem from "expo-file-system";
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
  serverTimestamp
} from "firebase/firestore";
// import { getStorage } from 'firebase/storage';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../DataBase/FirebaseConfig";

// -----------------------------------------Importing own compnents
import db from "../../DataBase/FirebaseConfig";
import colors from "../../Constants/Colors";
import InputField from "../../Components/InputField";
import SubmitButton from "../../Components/SubmitButton";
import DropDown from "../../Components/DropDown";
import PickImageButton from "../../Components/PickImageButton";
import { useAuth } from "../../Contexts/AuthContext";
import Loader from '../../Components/Loader';


const categories = [
  { label: "Phone", value: "Phone" },
  { label: "Watch", value: "Watch" },
  { label: "Keys", value: "Key" },
  { label: "wallet", value: "wallet" },
  { label: "chain", value: "chain" },
  { label: "other", value: "other" },
];
const locationCategories = [
  { label: "Use current location", value: "curent" },
  { label: "open map ", value: "Watch" },
];

// *************************************************************Default functional component
const Add = () => {
  const { user } = useAuth();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image1URL, setImage1URL] = useState("");
  const [image2URL, setImage2URL] = useState("");
  const [image3URL, setImage3URL] = useState("");
  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [selectedPostType, setSelectedPostType] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const [locationFrom, setLocationFrom] = useState(null);
  const [color,setColor] = useState('');
  const [brand,setBrand] = useState('');

  // Function to pick image from device
  const pickImage = async (imageNo) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      if (imageNo == 1) {
        setImage1(result.assets[0].uri);
      } else if (imageNo == 2) {
        setImage2(result.assets[0].uri);
      } else if (imageNo == 3) {
        setImage3(result.assets[0].uri);
      }
    }
  };

  const uploadImage = async (img, setImageURL) => {
    console.log("Uploading image ...");
    const response = await fetch(img);
    const blob = await response.blob();
    const filename = img.substring(img.lastIndexOf("/") + 1);
    const storageRef = ref(storage, `itemImages/${filename}`);

    setIsPosting(true);

    try{

      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);
      console.log("\n\n\t\timage URL returned ==>", url.trim());
      
      return url.trim();
    }
    catch(error){
      console.log(new Error(error));
    }

  };

  const onSubmit = async () => {
    const setItem = async () => {
      try {
        // uploadImage(image1)
        if (!image1 && !image2 && !image3) {
          return Toast.show({
            type: "error",
            text1: "Please select atleast one image to upload",
          });
        }

        let urls = ['','',''] 
        if (image1) {
          urls[0] = await uploadImage(image1, setImage1URL);
        }
      
        if (image2) {
          urls[1] = await uploadImage(image2, setImage2URL);
        }
     
        if (image3) {
          urls[2] = await uploadImage(image3, setImage3URL);
        }
      

   
        const itemData = {
          title: title,
          category: category,
          status: selectedPostType,
          color:color,
          brand:brand,
          desc: desc,
          // createdAt: serverTimestamp(),
          email: user.email,
          images:[  
            urls[0],
            urls[1],
            urls[2]
          ]
        }
  

        const dbfs = getFirestore();
        const snapShot = collection(dbfs, "Items");
        // const q = query(snapShot)
        await addDoc(snapShot,itemData );
        // await addDoc(collection(db, 'items'), itemData);
        
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setTitle("");
        setCategory("");
        setDesc("");
        setSelectedPostType("");
        setColor('')
        setBrand('')
        Toast.show({ type: "success", text1: "Item Posted " });
        setIsPosting(false);
      } catch (err) {
        Toast.show({ type: "error", text1: "Error settig item to dataBase " });
        console.error("Error settig items to collection ", err);
      }
    };

    await setItem();
  };

  if(isPosting){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Loader />
      </View>
    );
  }

  return (
    <ScrollView style={{ opacity: isPosting ? 0.4 : 1 }}>
      {/* <StatusBar style='light' backgroundColor='black'/> */}
      <View style={styles.container} keyboardShouldPersistTaps="never">
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Create ad +</Text>

        {/* View container for images block   */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Select picture *</Text>
          <Text style={styles.text}>
            Add upto 3 pictures. Use real pictures and not catalogs
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              marginVertical: 10,
            }}
          >
            <PickImageButton image={image1} onPress={() => pickImage(1)} />
            {image1 != null ? 
              <PickImageButton image={image2} onPress={() => pickImage(2)} />
            :null}
            {image1 && image2 != null ? 
              <PickImageButton image={image3} onPress={() => pickImage(3)} />
            :null}

          </View>
        </View>

        <View>
          <Text style={styles.label}>category *</Text>
          <DropDown
            data={categories}
            placeholder={"select a category"}
            isSearch={true}
            value={category}
            onChange={(item) => {
              setCategory(item.value);
            }}
            renderLeftIcon={() => (
              <MaterialIcons
                style={styles.icon}
                name="category"
                size={20}
                color="black"
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.label}>Post Type *</Text>

          <CheckBox
            isChecked={selectedPostType === "lost"}
            onClick={() => setSelectedPostType("lost")}
            rightText="Lost"
            rightTextStyle={{
              fontSize: 18,
              color: selectedPostType === "lost" ? colors.purple : colors.black,
            }}
            checkedCheckBoxColor={colors.purple}
          />
          <CheckBox
            isChecked={selectedPostType === "found"}
            onClick={() => setSelectedPostType("found")}
            rightText="Found"
            rightTextStyle={{
              fontSize: 18,
              color:
                selectedPostType === "found" ? colors.yellow : colors.black,
            }}
            checkedCheckBoxColor={colors.yellow}
          />
        </View>

        <Text style={styles.label}>Title *</Text>
        <InputField
          label={"Enter title of the product"}
          maxLength={25}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <Text style={styles.label}>Description</Text>
        <InputField
          label={"Enter an engaging description"}
          maxLength={255}
          value={desc}
          onChangeText={(text) => setDesc(text)}
        />

        <Text style={styles.label}>Color *</Text>
        <InputField
          label={"Enter item color"}
          maxLength={255}
          value={color}
          onChangeText={(text) => setColor(text)}
        />

        <Text style={styles.label}>Brand</Text>
        <InputField
          label={"Enter item Brand "}
          maxLength={255}
          value={brand}
          onChangeText={(text) => setBrand(text)}
        />

        <View>
          <Text style={styles.label}>Location *</Text>
          <DropDown
            data={locationCategories}
            placeholder={"select Location"}
            isSearch={false}
            renderLeftIcon={() => (
              <MaterialCommunityIcons
                name="google-maps"
                size={24}
                color="black"
              />
            )}
          />
        </View>

        <View style={{ alignItems: "center", marginVertical: 12 }}>
          <SubmitButton
            label={isPosting ? "Posting ..." : "Done"}
            mgv={8}
            disabled={isPosting ? true : false}
            onPress={() => onSubmit()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: "15%",
    paddingHorizontal: "7%",
    backgroundColor: colors.lightbg,
  },
  opacity: 0.3,
  // field: {
  //   marginBottom: 10,
  //   padding: 12,
  //   height: 50,
  //   borderRadius:10,
  //   borderColor: colors.grey,
  //   borderWidth: 0.5,
  // },
  text: { color: colors.grey, marginBottom: 5, marginLeft: 5 },
  icon: {
    marginRight: 5,
  },
  // placeholderStyle: {
  //   fontSize: 16,
  //   paddingLeft:5,
  //   color:colors.grey
  // },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 5,
    color: colors.yellow,
  },

  inputSearchStyle: {
    height: 35,
    fontSize: 13,
    borderRadius: 10,
    borderColor: colors.purple,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "5%",
    marginLeft: 5,
    marginBottom: 10,
  },
  // addImageBtn:{
  //   borderRadius:20,height:90,width:90,backgroundColor:colors.lightPurple,
  //   alignItems:'center',justifyContent:'center',opacity:0.8
  // },
  //   itemImage:{
  //     height:90,
  //     width:90,
  //     borderRadius:20,
  //   },
});
