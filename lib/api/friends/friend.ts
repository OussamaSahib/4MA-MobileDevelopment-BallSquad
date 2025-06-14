import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../base_url";



export const getFriends= async()=>{
  const email= await AsyncStorage.getItem("userEmail");
  if (!email) throw new Error("Email introuvable");

  const response= await fetch(`${BASE_URL}/api/friends/friend/friend?email=${encodeURIComponent(email)}`);
  if (!response.ok) throw new Error("Erreur lors du chargement des amis");

  const friends= await response.json();
  for (const f of friends){
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



export const getAllUsers= async ()=>{
  const email= await AsyncStorage.getItem("userEmail");
  if (!email) throw new Error("Email introuvable");

  const response= await fetch(`${BASE_URL}/api/friends/friend/allusers?email=${email}`);
  if (!response.ok) throw new Error("Erreur lors du chargement des utilisateurs");

  return await response.json();
};



export const addFriend= async (friendId: number)=>{
  const email= await AsyncStorage.getItem("userEmail");
  if (!email) throw new Error("Email introuvable");

  const formData= new FormData();
  formData.append("friendId", String(friendId));
  formData.append("email", email);

  const response= await fetch(`${BASE_URL}/api/friends/friend/friend`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok){
    throw new Error("Erreur lors de l'ajout de l'ami");
  }
};

