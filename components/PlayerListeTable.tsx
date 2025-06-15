// components/PlayerListMobile.tsx
import { BASE_URL } from "@/lib/api/base_url";
import { Image, StyleSheet, Text, View } from "react-native";
import AddButton from "./AddButton";



export default function PlayerListTable({match}: {match: any}){
    
  const getStatusLabel= (status: string | undefined)=>{
    switch (status) {
      case "CONFIRMED":
        return {label: "Confirmé ✅", color: "#4ade80"};
      case "WAITING":
        return {label: "En attente ⏳", color: "#facc15"};
      case "NOT_ASKED":
        return {label: "Pas demandé ❓", color: "#ccc"};
      default:
        return {label: "-", color: "#ccc"};
    }
  };

  const players= Array.from({ length: match.quantity_players }).map((_, i)=>{
    const joueur= match.matchPlayers[i]?.user;
    const status= match.matchPlayers[i]?.status;
    const guestData= match.matchGuests?.[i -match.matchPlayers.length];
    const invite= guestData?.guest;
    const guestStatus= guestData?.status;

    return{
      key: i+1,
      prenom: joueur?.firstname || invite?.firstname || "-",
      nom: joueur?.lastname || invite?.lastname || "",
      photo: joueur?.photo
        ? joueur.photo.startsWith("http")
            ? joueur.photo
            : `${BASE_URL}${joueur.photo}`
        : null,
      isGuest: !joueur && !!invite,
      status: getStatusLabel(status || guestStatus),
    };
  });


  return (
    <View style={styles.container}>
      {/* Ligne Titre + Bouton */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Joueurs</Text>
        <AddButton route={`/matchs/${match.id}/addplayers`}/>
      </View>

      {/* Liste des joueurs */}
      {players.map((item) => (
        <View key={item.key} style={styles.row}>
          <View style={styles.numberCell}>
            <Text style={styles.numberText}>{item.key}</Text>
          </View>
          <View style={styles.nameCell}>
            <Image
              source={
                item.photo
                  ? {uri: item.photo}
                  : require("@/assets/images/profile_photos/profile_icon.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.nameText}>
              {item.prenom} {item.nom} {item.isGuest && <Text style={styles.guestMark}>(Invité)</Text>}
            </Text>
          </View>
          <View style={styles.statusCell}>
            <Text style={{ color: item.status.color, fontWeight: "bold" }}>{item.status.label}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}


const styles= StyleSheet.create({
  container:{
    marginTop: 20,
    paddingHorizontal: 10,
  },
  titleRow:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    },
  title:{
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  row:{
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#333",
    borderWidth: 1,
    marginBottom: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: "#2d2f36",
  },
  numberCell:{
    width: 30,
    alignItems: "center",
  },
  numberText:{
    color: "#000",
    backgroundColor: "#c5ff36",
    borderRadius: 4,
    paddingHorizontal: 6,
    fontWeight: "bold",
  },
  nameCell:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginLeft: 10,
  },
  nameText:{
    color: "#fff",
    fontSize: 16,
  },
  guestMark:{
    fontSize: 12,
    color: "#ccc",
  },
  statusCell:{
    width: 120,
    alignItems: "center",
  },
  avatar:{
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: "#666",
  },
});
