import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function UserCardPlayers({photo, firstname, lastname, isAdded, onPress,}:{
  id: number;
  photo?: string;
  firstname: string;
  lastname?: string;
  type: "friend" | "guest";
  isAdded?: boolean;
  onPress?: () => void;
}){


  return (
<View style={styles.card}>
    <View style={styles.infoBlock}>
        <Image
            source={
            photo
                ? { uri: photo }
                : require("@/assets/images/profile_photos/profile_icon.png")
            }
            style={styles.image}
        />
        <Text style={styles.firstname}>{firstname}</Text>
        <Text style={styles.lastname}>{lastname || "\u00A0"}</Text>
    </View>

  {isAdded ? (
    <Text style={styles.addedText}>✔ Ajouté</Text>
  ) : (
    <TouchableOpacity onPress={onPress} style={styles.addButton}>
      <Text style={styles.addButtonText}>Ajouter</Text>
    </TouchableOpacity>
  )}
</View>
  );
}




const styles= StyleSheet.create({
  card:{
    backgroundColor: "#2e2e2e",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "space-between",
    width: 155,
    margin: 13,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  infoBlock:{
  alignItems: "center",
},
  image:{
    width: 120,
    height: 120,
    borderRadius: 999,
    marginBottom: 12,
  },
  firstname:{
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  lastname:{
    color: "#fff",
    fontSize: 18,
  },
  addButton:{
  backgroundColor: "#c5ff36",
  borderRadius: 6,
  paddingVertical: 6,
  paddingHorizontal: 12,
  marginTop: 10,
},
addButtonText:{
  color: "#000",
  fontWeight: "bold",
  fontSize: 14,
},
addedText: {
  color: "#c5ff36",
  fontWeight: "bold",
  fontSize: 14,
  marginTop: 10,
},
});
