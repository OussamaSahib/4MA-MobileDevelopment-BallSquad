import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function MatchCard({match, userId}: {match: any; userId?: number}){
  const router= useRouter();

  const isCreator= match.id_creator===userId;

  const formatDate= (date: string)=>{
    const str = new Date(date).toLocaleDateString("fr-FR",{
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return str.charAt(0).toUpperCase() +str.slice(1);
  };

  const formatHour= (date: string)=>{
    return new Date(date).toLocaleTimeString("fr-FR",{
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sportIcons: Record<string, any>={
    football: require("@/assets/images/sporticons/football.png"),
    basketball: require("@/assets/images/sporticons/basketball.png"),
    volleyball: require("@/assets/images/sporticons/volleyball.png"),
    badminton: require("@/assets/images/sporticons/badminton.png"),
  };

  const getSportIcon= (sport: string)=>{
    const key= sport.toLowerCase();
    return sportIcons[key] || require("@/assets/images/sporticons/sport_default.png");
  };


  return (
    <TouchableOpacity onPress={() => router.push(`/matchs/${match.id}`)} style={styles.card}>
      {/* Icône créateur */}
      {isCreator && (
        <Image
          source={require("@/assets/images/creator_icon.png")} // remplace par ta propre étoile si besoin
          style={styles.creatorIcon}
        />
      )}

      <View style={styles.header}>
        <Image source={getSportIcon(match.sport)} style={styles.icon} />
        <Text style={styles.sport}>{match.sport}</Text>
      </View>

      <Text style={styles.text}>📅  {formatDate(match.date)}</Text>
      <Text style={styles.text}>⏰  {formatHour(match.start_time)} → {formatHour(match.end_time)}</Text>
      <Text style={styles.text}>📍  {match.place}</Text>
      <Text style={styles.text}>🏟️  {match.field}</Text>
    </TouchableOpacity>
  );
}

const styles= StyleSheet.create({
  card:{
    backgroundColor: "#c5ff36",
    borderRadius: 16,
    padding: 20,
    marginBottom: 22,
    position: "relative",
  },
  creatorIcon:{
    position: "absolute",
    top: 10,
    right: 10,
    width: 28,
    height: 28,
  },
  header:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  icon:{
    width: 38,
    height: 38,
    marginRight: 12,
  },
  sport:{
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#000",
  },
  text:{
    color: "#000",
    fontSize: 20,
    marginTop: 6,
    fontWeight: "bold",
  },
});
