import { View, Text } from 'react-native'
import React from 'react'
import {getFirestore,collection,getDoc,addDoc,onSnapshot,doc,deleteDoc,updateDoc,query,where} from 'firebase/firestore'



const fetchItems =  (collectionName,callback)=>{
    const db = getFirestore()
    const snapShot = collection(db,collectionName)
    const q = query(snapShot)
    onSnapshot(q,snapShot =>{
        console.log('running snapshot ...')
       const items =snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      console.log('\n\n\n Items data inSide HOOK ==>',items)
      callback(items);
      console.log("\n\t\t Items being Set in hook")
    })
  }


//   const setItem =async ()=>{
      
//     try{
      
//     //   const dbfs = getFirestore()
//       const snapShot = collection(db,'Items')
//       // const q = query(snapShot)

//      await addDoc(snapShot ,{
//         category: 'Watch', date: '21-05-2024', email: 'huzaifa@gmail.com',
//         name: 'Let us C', status: 'Lost'
//       })
//     }
//     catch(err){
//       console.error("Error settig items to collection ",err);
//     }
//   }
//   setItem();

export {fetchItems}