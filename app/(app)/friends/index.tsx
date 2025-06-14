import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import { getFriends } from "@/lib/api/friends/friend";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function FriendsPage(){
  const [friends, setFriends]= useState<any[]>([]);
  const [loading, setLoading]= useState(true);
  const [search, setSearch]= useState(""); 
  const router = useRouter();

  useEffect(()=>{
    getFriends()
      .then((data)=> setFriends(data))
      .catch((err)=> console.error(err))
      .finally(()=> setLoading(false));
  }, []);

  const filteredFriends= friends.filter((f)=>
    `${f.friend.firstname} ${f.friend.lastname ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mes amis</Text>

      <View style={styles.searchRow}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Rechercher un ami..."
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={() => router.push("/friends/friend/addfriend")}>
          <Image
            source={require("@/assets/images/buttons/add_button.png")}
            style={styles.addImage}
          />
        </TouchableOpacity>
      </View>



      {loading ? (
        <ActivityIndicator size="large" color="#c5ff36" />
      ) : filteredFriends.length === 0 ? (
        <Text style={styles.emptyText}>Aucun ami trouvé.</Text>
      ) : (
        <View style={styles.cardsContainer}>
          {filteredFriends.map((friendObj) => (
            <UserCard
              key={friendObj.friend.id}
              id={friendObj.friend.id}
              photo={friendObj.friend.photo}
              firstname={friendObj.friend.firstname}
              lastname={friendObj.friend.lastname}
            />
            
          ))}
        </View>
      )}


    </ScrollView>
  );
}



const styles= StyleSheet.create({
  container:{
    padding: 20,
    paddingBottom: 120
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  addButton:{
    backgroundColor: "#c5ff36",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  searchRow:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10, 
    marginBottom: 16,
  },
  addImage:{
    width: 45,
    height: 45,
    marginLeft: 10,
    resizeMode: "contain",
  },
  emptyText:{
    color: "#aaa",
    fontSize: 20,
    paddingLeft: 10
  },
  cardsContainer:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
