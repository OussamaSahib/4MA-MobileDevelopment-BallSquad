import BackButton from "@/components/BackButton";
import GuestProfileCard from "@/components/ProfileCardGuest";
import { getGuestById } from "@/lib/api/friends/guest";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";



export default function GuestProfilePage(){
  const {id}= useLocalSearchParams();
  const [user, setUser]= useState<any | null>(null);
  const [loading, setLoading]= useState(true);

  useEffect(()=>{
    if (id){
      getGuestById(Number(id))
        .then(setUser)
        .catch(console.error)
        .finally(()=> setLoading(false));
    }
  }, [id]);

  if (loading){
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#c5ff36"/>
      </View>
    );
  }

  if (!user){
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Invité introuvable</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <BackButton />
      </View>
      <GuestProfileCard user={user}/>
    </View>
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
  backContainer:{
    marginBottom: 20,
  },
});
