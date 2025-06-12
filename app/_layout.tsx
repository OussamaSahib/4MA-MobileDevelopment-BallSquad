import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";



export default function PublicLayout(){
  //NAVIGATION
  const router= useRouter();

  //VÉRIFICATION SI USER CONNECTÉ
  useEffect(()=>{
    (async()=>{
      //SI MAIL DEJA STOCKÉ: MATCH
      const email= await AsyncStorage.getItem("userEmail");
      if (email){
        router.replace("/matchs");
      }
    })();
  }, []);


  return (
    <View style={styles.root}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </View>
  );
}



const styles= StyleSheet.create({
  root:{
    flex: 1,
    backgroundColor: "#000",
  },
});
