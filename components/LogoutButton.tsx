// components/LogoutButton.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";



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
      <Image
        source={require("@/assets/images/buttons/logout_button.png")}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}



const styles= StyleSheet.create({
  button:{
    padding: 10,
  },
  icon:{
    width: 40,
    height: 40,
  },
});
