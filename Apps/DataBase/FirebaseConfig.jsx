// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth,initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBDutUKWSaRv6AMXaJUirWQnm6jG991HsY",
  authDomain: "find-it-233a1.firebaseapp.com",
  projectId: "find-it-233a1",
  storageBucket: "find-it-233a1.appspot.com",
  messagingSenderId: "572725598699",
  appId: "1:572725598699:web:d2dbe57e4cb70182db61ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
const auth = getAuth(app);
const storage = getStorage(app);

// const db = getFirestore(app);

// const analytics = getAnalytics(app);
  

export { app,auth,storage};
