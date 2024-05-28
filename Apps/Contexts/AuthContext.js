// src/context/AuthContext.js
import React, { createContext, useState, useContext,useEffect } from 'react';
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { auth } from '../DataBase/FirebaseConfig';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoginPassword,setUserLoginPassword] = useState(null);


  useEffect(() => {
    const unsubscribe =onAuthStateChanged(auth,(user) => {
      if (user) {
        // User is signed in
        // const user = userCredential.user;
        const userData = {email:user.email,password:userLoginPassword,uid:user.uid,username:user.email.split('@')[0]};
        console.log("user signed in with data==>", userData)
        setUser(userData);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
      try {
        await signOut(auth);
        setUser(null);
        console.log("User signed out");
      } catch (error) {
        console.error("Error signing out:", error);
    };
  };
  
  return (
    <AuthContext.Provider value={{ user, userLoginPassword, setUserLoginPassword, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
