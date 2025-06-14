import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../base_url";



export async function getGuests(){
  try{
    const email= await AsyncStorage.getItem("userEmail");
    const response= await fetch(`${BASE_URL}/api/friends/guest/guest?email=${email}`);

    if (!response.ok) throw new Error("Erreur lors de la récupération des invités");
      return await response.json();
  } 
  catch (error){
    console.error("Erreur getGuests:", error);
    return [];
  }
}


export async function getGuestById(id: number){
  try{
    const email= await AsyncStorage.getItem("userEmail");
    const response= await fetch(`${BASE_URL}/api/friends/guest/${id}?email=${email}`);

    if (!response.ok) throw new Error("Erreur lors de la récupération de l'invité");
    return await response.json();
  } 
  catch (error){
    console.error("Erreur getGuestById:", error);
    return null;
  }
}



type AddGuestParams={
  firstname: string;
  lastname?: string;
  phone?: string;
};

export async function addGuest(data: AddGuestParams){
  try{
    const email= await AsyncStorage.getItem("userEmail");
    if (!email) throw new Error("Email introuvable (utilisateur non connecté)");

    const formData= new FormData();
    formData.append("firstname", data.firstname);
    if (data.lastname) formData.append("lastname", data.lastname);
    if (data.phone) formData.append("phone", data.phone);
    formData.append("email", email);

    const response= await fetch(`${BASE_URL}/api/friends/guest/guest`,{
      method: "POST",
      body: formData,
    });

    if (!response.ok){
      const errorText = await response.text();
      console.error("Réponse serveur:", errorText);
      throw new Error("Erreur lors de l’ajout de l’invité");
    }

    return await response.json();
  } catch (err) {
    console.error("Erreur addGuest:", err);
    throw err;
  }
}