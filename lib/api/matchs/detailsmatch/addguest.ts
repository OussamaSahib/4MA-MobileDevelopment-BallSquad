import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../base_url";



export async function addGuestToMatch(matchId: string, guestId: number){
  const email= await AsyncStorage.getItem("userEmail");
  if (!email) throw new Error("Utilisateur non connecté");

  const form= new FormData();
  form.append("matchId", matchId);
  form.append("guestId", guestId.toString());
  form.append("email", email);

  const res= await fetch(`${BASE_URL}/api/match/detailsmatch/addguest`,{
    method: "POST",
    body: form,
  });

  if (!res.ok){
    throw new Error("Erreur lors de l'ajout de l'invité");
  }

  return await res.json();
}
