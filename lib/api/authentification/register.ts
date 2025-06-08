import { BASE_URL } from "../base_url";


type RegisterParams={
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  iban: string;
};

export async function registerUser(data: RegisterParams){
  const formData= new FormData();
  Object.entries(data).forEach(([key, value])=>{
    formData.append(key, value);
  });


  try{
    const response= await fetch(`${BASE_URL}/api/authentification/register`, {
      method: "POST",
      body: formData,
    });
    console.log("Statut de la réponse : ", response.status);

    const contentType= response.headers.get("Content-Type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Réponse non-JSON");
    }


    const result= await response.json();
    if (!response.ok || result.success !== true){
      throw new Error(result.error || "Erreur inconnue");
    }
    return result;
  } 


  catch (err: any){
    console.error("Erreur réseau ou serveur :", err.message);
    throw err;
  }
}
