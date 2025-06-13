import { BASE_URL } from "../base_url";


type UpdateUserParams={
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  iban: string;
  password?: string;
  photo?:{
    uri: string;
    name: string;
    type: string;
  };
  removePhoto?: boolean;
};


export async function updateUser(data: UpdateUserParams): Promise<Response>{
  const formData= new FormData();

  formData.append("firstname", data.firstname);
  formData.append("lastname", data.lastname);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("iban", data.iban);

  if (data.password && data.password.trim() !== ""){
    formData.append("password", data.password);
  }

  formData.append("removePhoto", data.removePhoto ? "true" : "false");

  if (data.photo){
    formData.append("photo", {
      uri: data.photo.uri,
      type: data.photo.type || "image/jpeg", // corrige ici
      name: data.photo.name || `photo_${Date.now()}.jpg`, // corrige ici
    } as any);
  }

  try{
    console.log("=== Données envoyées à updateUser ===");
    for (const [key, value] of formData as any) {
      console.log(`${key}:`, value);
    }

    const response= await fetch(`${BASE_URL}/api/authentification/updateuser`, {
      method: "POST",
      body: formData,
    });

    return response;
  } catch (err: any){
    console.error("Erreur updateUser:", err.message);
    throw err;
  }
}
