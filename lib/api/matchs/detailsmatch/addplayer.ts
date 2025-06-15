import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../base_url";



export async function addPlayerToMatch(matchId: string, userId: number){
  const email= await AsyncStorage.getItem("userEmail");
  if (!email) throw new Error("Utilisateur non connecté");

  const form= new FormData();
  form.append("matchId", matchId);
  form.append("userId", userId.toString());
  form.append("email", email);

  const res= await fetch(`${BASE_URL}/api/match/detailsmatch/addplayer`,{
    method: "POST",
    body: form,
  });

  if (!res.ok){
    throw new Error("Erreur lors de l'ajout du joueur");
  }

  return await res.json();
}
