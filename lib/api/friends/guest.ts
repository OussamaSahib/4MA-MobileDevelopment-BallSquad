import { BASE_URL } from "../base_url";

export const getGuests = async () => {
  const res = await fetch(`${BASE_URL}/api/guests`);
  if (!res.ok) throw new Error("Erreur lors du chargement des invités");
  return res.json();
};

export const addGuest = async ({
  firstname,
  lastname,
  phone,
}: {
  firstname: string;
  lastname?: string;
  phone?: string;
}) => {
  const form = new FormData();
  form.append("firstname", firstname);
  if (lastname) form.append("lastname", lastname);
  if (phone) form.append("phone", phone);
  const res = await fetch(`${BASE_URL}/api/guests`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error("Erreur lors de l’ajout d’un invité");
};