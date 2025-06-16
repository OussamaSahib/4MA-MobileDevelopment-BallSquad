import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import UserCardPlayers from "@/components/UserCardPlayers";
import { getFriends } from "@/lib/api/friends/friend";
import { getGuests } from "@/lib/api/friends/guest";
import { addGuestToMatch } from "@/lib/api/matchs/detailsmatch/addguest";
import { addPlayerToMatch } from "@/lib/api/matchs/detailsmatch/addplayer";
import { getMatchById } from "@/lib/api/matchs/detailsmatch/idmatch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddPlayersPage() {
  const { id } = useLocalSearchParams();
  const [match, setMatch] = useState<any>(null);
  const [friends, setFriends] = useState([]);
  const [guests, setGuests] = useState([]);
  const [searchFriend, setSearchFriend] = useState("");
  const [searchGuest, setSearchGuest] = useState("");
  const [addedPlayers, setAddedPlayers] = useState<number[]>([]);
  const [addedGuests, setAddedGuests] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
    if (typeof id !== "string") return;

    const matchData = await getMatchById(id);
    const email = await AsyncStorage.getItem("userEmail");
    if (!email) return;

    const friendsList = await getFriends();
    const guestsList = await getGuests();

    setMatch(matchData);
    setFriends(friendsList);
    setGuests(guestsList);

    // ✅ Mémoriser les joueurs déjà ajoutés
    const addedIds = matchData.matchPlayers.map((p: any) => p.userId);
    setAddedPlayers(addedIds);
    const addedGuestIds = matchData.matchGuests.map((g: any) => g.guestId);
    setAddedGuests(addedGuestIds);
    };
    fetchData();
  }, [id]);

  if (!match) return <Text style={styles.loading}>Chargement...</Text>;

  const filteredFriends = friends.filter((f: any) =>
    `${f.friend.firstname} ${f.friend.lastname}`
      .toLowerCase()
      .includes(searchFriend.toLowerCase())
  );

  const filteredGuests = guests.filter((g: any) =>
    `${g.firstname} ${g.lastname}`
      .toLowerCase()
      .includes(searchGuest.toLowerCase())
  );



const handleAddFriend = async (userId: number) => {
  try {
    await addPlayerToMatch(id as string, userId);
    setAddedPlayers((prev) => [...prev, userId]); // 🔁 Ajoute à la liste
    Alert.alert("Succès", "Joueur ajouté !");
  } catch (err) {
    console.error(err);
    Alert.alert("Erreur", "Impossible d’ajouter le joueur.");
  }
};

const handleAddGuest = async (guestId: number) => {
  try {
    await addGuestToMatch(id as string, guestId);
    setAddedGuests((prev) => [...prev, guestId]);
    Alert.alert("Succès", "Invité ajouté !");
  } catch (err) {
    console.error(err);
    Alert.alert("Erreur", "Impossible d’ajouter l’invité.");
  }
};




  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {/* En-tête */}
        <View style={styles.header}>
          <BackButton to={`/matchs/${id}`} />
          <Text style={styles.title}>Ajouter des joueurs</Text>
        </View>

        {/* Section Amis */}
        <Text style={styles.sectionTitle}>Amis</Text>
        <SearchBar
          value={searchFriend}
          onChange={setSearchFriend}
          placeholder="Rechercher un ami..."
          style={styles.searchInput}
        />
        {filteredFriends.length === 0 ? (
          <Text style={styles.emptyText}>Aucun ami trouvé</Text>
        ) : (
          <View style={styles.grid}>
            {filteredFriends.map((f: any) => (
  <UserCardPlayers
    key={f.friend.id}
    id={f.friend.id}
    firstname={f.friend.firstname}
    lastname={f.friend.lastname}
    photo={f.friend.photo}
    type="friend"
    onPress={() => handleAddFriend(f.friend.id)}
    isAdded={addedPlayers.includes(f.friend.id)}
  />
            ))}
          </View>
        )}

        {/* Section Invités */}
        <Text style={styles.sectionTitle}>Invités</Text>
        <SearchBar
          value={searchGuest}
          onChange={setSearchGuest}
          placeholder="Rechercher un invité..."
          style={styles.searchInput}
        />
        {filteredGuests.length === 0 ? (
          <Text style={styles.emptyText}>Aucun invité trouvé</Text>
        ) : (
          <View style={styles.grid}>
            {filteredGuests.map((g: any) => (
              <UserCardPlayers
                  key={g.id}
                  id={g.id}
                  firstname={g.firstname}
                  lastname={g.lastname}
                  photo={undefined}
                  type="guest"
                  onPress={() => handleAddGuest(g.id)}
                  isAdded={addedGuests.includes(g.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    padding: 16,
    paddingBottom: 120,
  },
  loading: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textDecorationLine: "underline",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 24,
    marginBottom: 12,
  },
  searchInput: {
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emptyText: {
    color: "#aaa",
    fontSize: 18,
    marginBottom: 12,
    paddingLeft: 6,
  },
});
