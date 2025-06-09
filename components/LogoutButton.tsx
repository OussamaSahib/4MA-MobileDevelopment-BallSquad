// components/LogoutButton.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";



export default function LogoutButton(){
  //NAVIGATION
  const router= useRouter();

  //FCT LOGOUT: SUPPRESSION MAIL STOCKÉ +LOGIN
  const SubmitLogout= async()=>{
    await AsyncStorage.removeItem("userEmail");
    router.replace("/");
  };

  
  return (
    <TouchableOpacity style={styles.button} onPress={SubmitLogout}>
      <Text style={styles.text}>Se déconnecter</Text>
    </TouchableOpacity>
  );
}



const styles= StyleSheet.create({
  button:{
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  text:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
