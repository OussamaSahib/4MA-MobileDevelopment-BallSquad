import BackButton from "@/components/BackButton";
import InputForm from "@/components/InputForm";
import { addGuest } from "@/lib/api/friends/guest";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function AddGuestPage(){
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!firstname.trim()) {
      Alert.alert("Erreur", "Le prénom est requis.");
      return;
    }

    try {
      await addGuest({ firstname, lastname, phone });
      router.replace("/friends");
    } catch (err) {
      Alert.alert("Erreur", "Impossible d’ajouter l’invité.");
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
              <BackButton />

              <Text style={styles.title}>Ajouter un ami</Text>
          <View style={styles.side}/>
          </View>

        <InputForm
          label="Prénom"
          value={firstname}
          onChangeText={setFirstname}
          required
          placeholder="Jean"
        />

        <InputForm
          label="Nom"
          value={lastname}
          onChangeText={setLastname}
          placeholder="Dupont"
        />

        <InputForm
          label="Numéro GSM"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="0470..."
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ajouter l'invité</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    padding: 24,
    flexGrow: 1,
  },
  header:{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 60,
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
  button: {
    backgroundColor: "#c5ff36",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
  },
});
