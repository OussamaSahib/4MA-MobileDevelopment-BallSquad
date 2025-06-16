import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import { BASE_URL } from "@/lib/api/base_url";
import { addFriend, getAllUsers, getFriends } from "@/lib/api/friends/friend";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function AddFriendPage(){
  const router= useRouter();
  const [allUsers, setAllUsers]= useState<any[]>([]);
  const [friends, setFriends]= useState<any[]>([]);
  const [search, setSearch]= useState("");

  useEffect(()=>{
    getAllUsers().then(setAllUsers).catch(console.error);
    getFriends().then(setFriends).catch(console.error);
  }, []);

  const filtered= allUsers.filter(
    (u) =>
      !friends.some((f)=> f.friend.id===u.id) &&
      `${u.firstname} ${u.lastname ?? ""}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <BackButton />

        <Text style={styles.title}>Ajouter un ami</Text>
        <View style={styles.side}/>
      </View>

        <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Rechercher un utilisateur..."
        style={{marginBottom: 22}}
        />

      {search.trim().length>0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item)=> item.id.toString()}
          renderItem={({ item })=> (
            <View style={styles.userRow}>
              <Image
                source={
                  item.photo
                    ? { uri: item.photo.startsWith("http") ? item.photo : `${BASE_URL}${item.photo}` }
                    : require("@/assets/images/profile_photos/profile_icon.png")
                }
                style={styles.avatar}
              />
              <Text style={styles.name}>
                {item.firstname} {item.lastname}
              </Text>
              <TouchableOpacity
                onPress={() => addFriend(item.id).then(() => router.push("/friends"))}
                style={styles.addButton}
              >
                <Text style={styles.addText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}



const styles= StyleSheet.create({
  header:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  title:{
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  side:{
    width: 20, 
    alignItems: "flex-start",
  },
  userRow:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar:{
    width: 55,
    height: 55,
    borderRadius: 20,
    marginRight: 12,
  },
  name:{
    flex: 1,
    color: "#fff",
    fontSize: 24,
  },
  addButton:{
    backgroundColor: "#c5ff36",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 20
  },
  addText:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
