import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function UserCard({
  photo,
  firstname,
  lastname,
  id,
}: {
  id: number;
  photo?: string;
  firstname: string;
  lastname?: string;
}) {
  const router= useRouter();

  return (
    <TouchableOpacity onPress={() => router.push(`/friends/friend/${id}`)}>
      <View style={styles.card}>
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
    </TouchableOpacity>
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
});
