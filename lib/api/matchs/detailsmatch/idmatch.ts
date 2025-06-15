import { BASE_URL } from "../../base_url";


export async function getMatchById(id: string){
  const response= await fetch(`${BASE_URL}/api/match/detailsmatch/idmatch?id=${id}`);
  if (!response.ok) throw new Error("Échec récupération match");
  return await response.json();
}


export async function editMatch(form: any){
  const formData= new FormData();
  for (const key in form){
    formData.append(key, form[key]);
  }

  const response= await fetch(`${BASE_URL}/api/match/detailsmatch/idmatch`,{
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Erreur lors de la mise à jour du match");

  return await response.json();
}