import { getUser } from "@/lib/api/authentification/getuser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';



export default function AppLayout(){
  //NAVIGATION
  const router= useRouter();

  //VÉRIFICATION SI USER CONNECTÉ
  const [isChecking, setIsChecking]= useState(true);
  useEffect(()=>{
    (async()=>{
      const email= await AsyncStorage.getItem("userEmail");
      console.log("Email récupéré depuis AsyncStorage :", email);

      //SI PAS MAIL TROUVÉ: LOGIN
      if (!email){
        router.replace("/");
        return;
      }

      //USER
      const user= await getUser(email);
      //SI USER EXISTE PAS: NETTOYAGE MAIL et LOGIN
      if (!user){
        await AsyncStorage.removeItem("userEmail");
        router.replace("/");
        return;
      }

      //STOP PHASE DE VÉRIFICATION
      setIsChecking(false);
    })();
  }, []);

  //PDT VÉRIFICATION, ON RETOURNE RIEN
  if (isChecking) return null; 

  

  return (
    <View style={styles.root}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none", 
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
