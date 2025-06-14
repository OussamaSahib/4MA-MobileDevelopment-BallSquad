import SearchBar from "@/components/SearchBar";
import UserCard from "@/components/UserCard";
import { getFriends } from "@/lib/api/friends/friend";
import { getGuests } from "@/lib/api/friends/guest";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FriendsPage() {
  const [friends, setFriends] = useState<any[]>([]);
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchGuest, setSearchGuest] = useState("");
  const router = useRouter();

  useEffect(() => {
    Promise.all([getFriends(), getGuests()])
      .then(([friendsData, guestsData]) => {
        setFriends(friendsData);
        setGuests(guestsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredFriends = friends.filter((f) =>
    `${f.friend.firstname} ${f.friend.lastname ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredGuests = guests.filter((g) =>
    `${g.firstname} ${g.lastname ?? ""}`
      .toLowerCase()
      .includes(searchGuest.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* SECTION AMIS */}
      <Text style={styles.title}>Mes Amis</Text>

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
        <Text style={styles.emptyText}>Aucun ami trouvé</Text>
      ) : (
        <View style={styles.cardsContainer}>
          {filteredFriends.map((friendObj) => (
          <UserCard
            key={friendObj.friend.id}
            id={friendObj.friend.id}
            photo={friendObj.friend.photo}
            firstname={friendObj.friend.firstname}
            lastname={friendObj.friend.lastname}
            type="friend" // 👈 ici
          />
          ))}
        </View>
      )}





      {/* SECTION INVITÉS */}
      <Text style={[styles.title, { marginTop: 40 }]}>Mes Invités</Text>

      <View style={styles.searchRow}>
        <SearchBar
          value={searchGuest}
          onChange={setSearchGuest}
          placeholder="Rechercher un invité..."
          style={{ flex: 1 }}
        />
        <TouchableOpacity onPress={()=> router.push("/friends/guest/addguest")}>
          <Image
            source={require("@/assets/images/buttons/add_button.png")}
            style={styles.addImage}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#c5ff36" />
      ) : filteredGuests.length === 0 ? (
        <Text style={styles.emptyText}>Aucun invité trouvé</Text>
      ) : (
        <View style={styles.cardsContainer}>
          {filteredGuests.map((guestObj) => (
            <UserCard
              key={guestObj.id}
              id={guestObj.id}
              firstname={guestObj.firstname}
              lastname={guestObj.lastname}
              type="guest" // 👈 ici
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 120,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  addImage: {
    width: 45,
    height: 45,
    marginLeft: 10,
    resizeMode: "contain",
  },
  emptyText: {
    color: "#aaa",
    fontSize: 20,
    paddingLeft: 10,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});
