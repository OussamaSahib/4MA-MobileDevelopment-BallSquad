import BackButton from "@/components/BackButton";
import MatchCard from "@/components/MatchCard";
import { BASE_URL } from "@/lib/api/base_url";
import { getMatchs } from "@/lib/api/matchs/match";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function MatchListPage(){
  const [matchs, setMatchs] = useState([]);
  const [activeTab, setActiveTab] = useState<"prochains" | "anciens">("prochains");
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMatchs = async () => {
      const email = await AsyncStorage.getItem("userEmail");
      if (!email) return;

      // 1. Récupérer les matchs
      const response = await getMatchs(email);
      setMatchs(response);

      // 2. Récupérer le userId
      const userRes = await fetch(`${BASE_URL}/api/authentification/getuser?email=${email}`);
      const userJson = await userRes.json();
      setUserId(userJson.id);
    };
    fetchMatchs();
  }, []);

  const filtered = matchs
    .filter((m: any) =>
      activeTab === "prochains"
        ? new Date(m.end_time).getTime() > Date.now()
        : new Date(m.end_time).getTime() <= Date.now()
    )
    .sort((a: any, b: any) =>
      activeTab === "prochains"
        ? new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
        : new Date(b.end_time).getTime() - new Date(a.end_time).getTime()
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/*TITRE*/}
      <View style={styles.header}>
        <Text style={styles.title}>MATCHS</Text>
        <View style={styles.AddMatchContainer}>
          <BackButton />
        </View>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("prochains")}
          style={[styles.tabButton, activeTab === "prochains" && styles.activeTabButton]}
        >
          <Text style={[styles.tabText, activeTab === "prochains" && styles.activeTabText]}>
            Prochains
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("anciens")}
          style={[styles.tabButton, activeTab === "anciens" && styles.activeTabButton]}
        >
          <Text style={[styles.tabText, activeTab === "anciens" && styles.activeTabText]}>
            Anciens
          </Text>
        </TouchableOpacity>
      </View>

      {filtered.length > 0 ? (
        filtered.map((match: any) => (
          <MatchCard key={match.id} match={match} userId={userId ?? undefined} />
        ))
      ) : (
        <Text style={styles.empty}>Aucun match</Text>
      )}
    </ScrollView>
  );
}


const styles= StyleSheet.create({
  container:{
    backgroundColor: "#1c1c1c",
    padding: 16,
    paddingBottom: 100,
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
    transform: [{translateX: -75}],
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
  },
  AddMatchContainer:{
    position: "absolute",
    right: 0,
    top: "35%",
    transform: [{translateY: -20}],
  },
  tabs:{
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 20,
  },
  tabButton:{
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTabButton:{
    backgroundColor: "#9933ff",
  },
  activeTabText:{
    color: "#fff",
  },
  tabText:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  empty:{
    color: "#ccc",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
