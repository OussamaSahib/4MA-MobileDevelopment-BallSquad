import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../base_url";


export async function getMatchs(email: string | null){
  const response= await fetch(`${BASE_URL}/api/match/match?email=${email}`);

  if (!response.ok) throw new Error("Impossible de charger les matchs");
  return await response.json();
}





type AddMatchParams = {
  sport: string;
  date: string;
  start_time: string;
  end_time: string;
  place: string;
  field: string;
  price_euros: string;
  price_cents: string;
  quantity_players: string;
};

export async function addMatch(data: AddMatchParams){
  try {
    const email= await AsyncStorage.getItem("userEmail");
    if (!email) throw new Error("Email manquant");

    const formData= new FormData();
    formData.append("sport", data.sport);
    formData.append("date", data.date);
    formData.append("start_time", data.start_time);
    formData.append("end_time", data.end_time);
    formData.append("place", data.place);
    formData.append("field", data.field);
    formData.append("price_euros", data.price_euros);
    formData.append("price_cents", data.price_cents);
    formData.append("quantity_players", data.quantity_players);
    formData.append("email", email);

    const response= await fetch(`${BASE_URL}/api/match/match`,{
      method: "POST",
      body: formData,
    });

    if (!response.ok){
      throw new Error("Erreur lors de la création du match");
    }

    return await response.json();
  } 
  catch (err){
    console.error("Erreur addMatch:", err);
    throw err;
  }
}
