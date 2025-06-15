import { BASE_URL } from "../base_url";


export async function getMatchs(email: string | null){
  const response= await fetch(`${BASE_URL}/api/match/match?email=${email}`);

  if (!response.ok) throw new Error("Impossible de charger les matchs");
  return await response.json();
}