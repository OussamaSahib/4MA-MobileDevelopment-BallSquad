import { BASE_URL } from "../base_url";


export async function getUser(email: string){
  const response= await fetch(`${BASE_URL}/api/authentification/getuser?email=${email}`);
  if (!response.ok) return null;

  const user= await response.json();
  if (user.photo && !user.photo.startsWith("http")) {
    user.photo= `${BASE_URL}${user.photo}`;
  }

  return user;
}
