import LogoutButton from "@/components/LogoutButton";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function MatchScreen(){
  return (
    <SafeAreaView>
      <Text>Page Match</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/profile")}
      >
        <Text style={styles.buttonText}>Aller vers la page Profil</Text>
      </TouchableOpacity>

      <LogoutButton/>
    </SafeAreaView>
  );
}



const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title:{
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
  },
  button:{
    backgroundColor: "#c5ff36",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText:{
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
