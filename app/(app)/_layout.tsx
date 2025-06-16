import NavBar from "@/components/NavBar";
import { getUser } from "@/lib/api/authentification/getuser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";



export default function AppLayout(){
  //NAVIGATION
  const router= useRouter();

  //MARGE DE SÉCURITÉ NAVBAR
  const insets = useSafeAreaInsets();

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
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <View style={[styles.background]}>
        <View style={styles.root}>
          <View style={[styles.stackContainer, {paddingBottom: insets.bottom}]}>
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "none",
                contentStyle:{
                  backgroundColor: "#1c1c1c",
                },
              }}
            />
          </View>
          <NavBar/>
        </View>
      </View>
    </>
  );
}



const styles= StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: "#000", 
  },
  root:{
    flex: 1,
  },
  stackContainer:{
    flex: 1,
  },
});