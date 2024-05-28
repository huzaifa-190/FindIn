// src/context/ItemsContext.js
import React, { createContext,useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
// import { firestore } from '../firebaseConfig';
import {getFirestore,collection,getDoc,addDoc,onSnapshot,doc,deleteDoc,updateDoc,query,where} from 'firebase/firestore'

import {fetchItems} from '../Hooks/FireStoreHooks/FireStoreHooks'
const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState(null);

  // useEffect(() => {
  //   let unsubscribe;

  //   if (user) {
  //     unsubscribe = fetchItems('Items', setItems);
  //   }
  //   // Cleanup subscription on unmount
  //   return () => {
  //     if (unsubscribe) {
  //       unsubscribe(); // Stop listening to Firestore updates
  //     }
  //   };
  // }, [user]);

  return (
    <ItemsContext.Provider value={{ items ,setItems}}>
      {children}
    </ItemsContext.Provider>
  );
};

export const useItems = () => {
  return useContext(ItemsContext);
};
