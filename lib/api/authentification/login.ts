import { BASE_URL } from "../base_url";


export async function loginUser(email: string, password: string){
  const formData= new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const response = await fetch(`${BASE_URL}/api/authentification/login`,{
    method: "POST",
    body: formData,
  });
  console.log("Statut de la réponse : ", response.status);

  const result= await response.json();
  return result;
}