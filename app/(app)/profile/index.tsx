import LogoutButton from "@/components/LogoutButton";
import ProfileCard from "@/components/ProfileCard";
import { getUser } from "@/lib/api/authentification/getuser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function ProfilePage(){
  //NAVIGATION
  const router= useRouter();

  //GET TT LES INFOS DU USER
  const [user, setUser]= useState<any | null>(null);
  useEffect(()=>{
    (async ()=>{
      const email= await AsyncStorage.getItem("userEmail");
      if (!email){
        router.replace("/");
        return;
      }

      const u= await getUser(email);
      if (!u){
        await AsyncStorage.removeItem("userEmail");
        router.replace("/");
        return;
      }

      setUser(u);
    })();
  }, []);

  if (!user){
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#c5ff36" />
        <Text style={styles.loading}>Chargement…</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>

      {/*TITRE*/}
      <View style={styles.header}>
        <Text style={styles.title}>PROFILE</Text>
        <View style={styles.logoutContainer}>
          <LogoutButton />
        </View>
      </View>

      {/*PROFILE CARD*/}
      <ProfileCard user={user}>
        <TouchableOpacity
          onPress={()=>router.push("/profile")}
          style={styles.editButton}
        >
          <Text style={styles.editText}>Modifier mon profile</Text>
        </TouchableOpacity>
      </ProfileCard>

      {/*BOUTON SUPRESSION DU COMPTE*/}
      <View style={styles.deleteRow}>
        <TouchableOpacity
          onPress={()=>Alert.alert("Suppression", "Fonction à implémenter")}
          style={styles.deleteTouch}
        >
          <Image
            source={require("@/assets/images/buttons/trash_button.png")}
            style={styles.trashIcon}
          />
          <Text style={styles.deleteText}>Supprimer le compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles= StyleSheet.create({
  container:{
    padding: 16,
    paddingTop: 10,
    backgroundColor: "#000",
    flex: 1,
  },
  header:{
    position: "relative",
    height: 60,
    justifyContent: "center",
    marginBottom: 25,
  },
  title:{
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -75 }],
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  logoutContainer:{
    position: "absolute",
    right: 0,
    top: "35%",
    transform: [{translateY: -20}],
  },
  center:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loading:{
    color: "#fff",
    marginTop: 12,
  },
editButton:{
  backgroundColor: "#72777d",
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 6,
  marginTop: 12,
  alignSelf: "center", 
  minWidth: 180,       
  alignItems: "center", 
},
editText:{
  color: "#fff",
  fontWeight: "600",
  fontSize: 16
},
deleteRow:{
  alignItems: "flex-end",
  marginTop: 40,
},
deleteTouch:{
  flexDirection: "row",
  alignItems: "center",
},
trashIcon:{
  width: 25,
  height: 25,
  marginRight: 8,
  tintColor: "#ea3323",
},
deleteText:{
  color: "#ea3323",
  fontWeight: "600",
  fontSize: 16,
},
});
