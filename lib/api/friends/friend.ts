import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../base_url";



export const getFriends= async()=>{
  const email= await AsyncStorage.getItem("userEmail");
  if (!email) throw new Error("Email introuvable");

  const response= await fetch(`${BASE_URL}/api/friends/friend/friend?email=${encodeURIComponent(email)}`);
  if (!response.ok) throw new Error("Erreur lors du chargement des amis");

  const friends= await response.json();
  for (const f of friends) {
    if (f.friend.photo && !f.friend.photo.startsWith("http")){
      f.friend.photo= `${BASE_URL}${f.friend.photo}`;
    }
  }

  return friends;
};


export const getFriendById= async (id: number)=>{
  const email= await AsyncStorage.getItem("userEmail");

  const response= await fetch(`${BASE_URL}/api/friends/friend/${id}?email=${email}`);
  if (!response.ok) return null;

  const user= await response.json();
  if (user.photo && !user.photo.startsWith("http")){
    user.photo= `${BASE_URL}${user.photo}`;
  }

  return user;
};



export const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`);
  if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs");
  return response.json();
};


export const addFriend = async (friendId: number) => {
  const form = new FormData();
  form.append("friendId", friendId.toString());
  const response = await fetch(`${BASE_URL}/api/friends`, {
    method: "POST",
    body: form,
  });
  if (!response.ok) throw new Error("Erreur lors de l’ajout d’un ami");
};


