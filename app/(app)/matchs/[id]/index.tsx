import BackButton from "@/components/BackButton";
import MatchCardDetails from "@/components/MatchCardDetails";
import { BASE_URL } from "@/lib/api/base_url";
import { getMatchById } from "@/lib/api/matchs/detailsmatch/idmatch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function MatchDetailsPage(){
  const {id}= useLocalSearchParams();
  const router= useRouter();
  const [match, setMatch]= useState<any>(null);
  const [user, setUser]= useState<any>(null);

  useEffect(()=>{
    const loadData= async()=>{
      const email= await AsyncStorage.getItem("userEmail");
      if (!email || typeof id !== "string") return;

      const matchData= await getMatchById(id);
      const userRes= await fetch(`${BASE_URL}/api/authentification/getuser?email=${email}`);
      const userData= await userRes.json();

      setMatch(matchData);
      setUser(userData);
    };
    loadData();
  }, [id]);

  if (!match || !user) {
    return <Text style={styles.loading}>Chargement...</Text>;
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <BackButton/>
        <TouchableOpacity onPress={()=>router.push(`/matchs/${match.id}/editmatch`)}>
          <Image source={require("@/assets/images/buttons/edit_button.png")} style={styles.icon}/>
        </TouchableOpacity>
      </View>

      {/* Match Info */}
      <MatchCardDetails match={match} user={user}/>
    </ScrollView>
  );
}

const styles= StyleSheet.create({
  container:{
    padding: 20,
    backgroundColor: "#1c1c1c",
    flexGrow: 1,
  },
  headerRow:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loading:{
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
  },
  icon:{
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    color: "#c5ff36",
    marginBottom: 20,
  },
  text:{
    color: "#fff",
    fontSize: 18,
    marginVertical: 4,
  },
});
