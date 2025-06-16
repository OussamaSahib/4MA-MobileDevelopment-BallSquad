import BackButton from "@/components/BackButton"; // 👈 importe le bouton
import ProfileCard from "@/components/ProfileCard";
import { getFriendById } from "@/lib/api/friends/friend";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function FriendProfilePage(){
  const {id}= useLocalSearchParams();
  const [user, setUser]= useState<any | null>(null);
  const [loading, setLoading]= useState(true);

  useEffect(()=>{
    if (id){
      getFriendById(Number(id))
        .then((u)=> setUser(u))
        .catch((err)=> console.error(err))
        .finally(()=> setLoading(false));
    }
  }, [id]);

  if (loading){
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#c5ff36" />
      </View>
    );
  }

  if (!user){
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Utilisateur introuvable</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backContainer}>
        <BackButton />
      </View>

      <ProfileCard user={user}/>
    </SafeAreaView>
  );
}


const styles= StyleSheet.create({
  container:{
    padding: 20,
    backgroundColor: "#000",
    flex: 1,
  },
  center:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  error:{
    color: "#fff",
    fontSize: 18,
  },
  backButton:{
    marginBottom: 10,
    width: 40,
    height: 40,
  },
  backIcon:{
    width: 35,
    height: 35,
    resizeMode: "contain",
  },
  backContainer:{
  marginBottom: 20,
},
});
