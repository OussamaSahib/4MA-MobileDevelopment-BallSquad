import InputForm from "@/components/InputForm";
import { getUser } from "@/lib/api/authentification/getuser";
import { updateUser } from "@/lib/api/authentification/updateuser";
import { BASE_URL } from "@/lib/api/base_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function EditProfilePage(){
  const [user, setUser] = useState<any>(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);


  const router = useRouter();

  useEffect(()=>{
    (async ()=>{
      const email = await AsyncStorage.getItem("userEmail");
      if (!email) return router.replace("/");

      const u = await getUser(email);
      if (!u) return router.replace("/");

      setUser({
        firstname: u.firstname || "",
        lastname: u.lastname || "",
        email: u.email || "",
        phone: u.phone || "",
        iban: u.iban || "",
        password: "",
        photo: u.photo || "",
        newPhoto: undefined,
        previewUri:
          u.photo?.startsWith("http")
            ? u.photo
            : BASE_URL + (u.photo || "/images/profile_photos/profile_icon.png"),
      });
    })();
  }, []);

  const handleChange= (key: string, value: string) => {
    setUser((prev: any) => ({ ...prev, [key]: value }));
  };




  const chooseImageOption = () => {
    Alert.alert(
      "Changer la photo",
      "Choisissez une option",
      [
        {
          text: "Prendre une photo",
          onPress: pickFromCamera,
        },
        {
          text: "Choisir depuis la galerie",
          onPress: pickFromGallery,
        },
        {
          text: "Annuler",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };


  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    handleImageResult(result);
  };

  const pickFromCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();

    if (!cameraPermission.granted) {
      Alert.alert("Permission refusée", "L'accès à la caméra est nécessaire.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    handleImageResult(result);
  };



  const handleImageResult = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      setRemovePhoto(false);
      setUser((prev: any) => ({
        ...prev,
        newPhoto: {
          uri: asset.uri,
          type: "image/jpeg",
          name: asset.fileName || `photo_${Date.now()}.jpg`,
        },
        previewUri: asset.uri,
      }));
    }
  };



  

  const handleSave = async () => {
    setTriedSubmit(true);

    // Validation des champs obligatoires
    if (
      !user.firstname ||
      !user.lastname ||
      !user.email ||
      !user.phone ||
      !user.iban
    ) {
      return;
    }

    try {
      const response = await updateUser({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        iban: user.iban,
        password: user.password,
        removePhoto: removePhoto,
        photo: removePhoto ? undefined : user.newPhoto,
      });

      if (response.ok) {
        Alert.alert("Succès", "Profil mis à jour");
        router.push("/profile");
      } else {
        Alert.alert("Erreur", "Échec de la mise à jour");
      }
    } catch (e) {
      Alert.alert("Erreur", "Problème réseau ou serveur");
    }
  };



  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Chargement…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>

      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("@/assets/images/buttons/back_button.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Modifier mon profile</Text>

      <View style={styles.card}>
        {/* Photo */}
        <View style={styles.photoContainer}>
          <Image
            source={{ uri: user.previewUri }}
            style={styles.photo}
          />
          {/* BOUTON SUPPRESSION */}
          {!removePhoto && (user.photo || user.newPhoto) && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                setRemovePhoto(true);
                setUser((prev: any) => ({
                  ...prev,
                  newPhoto: undefined,
                  previewUri: BASE_URL + "/images/profile_photos/profile_icon.png",
                }));
              }}
            >
              <Image
                source={require("@/assets/images/buttons/deletephoto_button.png")}
                style={styles.removeIcon}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={chooseImageOption}>
            <Text style={styles.photoButtonText}>Changer la photo</Text>
          </TouchableOpacity>

        </View>



        <InputForm
          label="Prénom"
          value={user.firstname}
          onChangeText={(text) => handleChange("firstname", text)}
          required
          error={triedSubmit && user.firstname === "" ? "Champ requis" : ""}
        />

        <InputForm
          label="Nom"
          value={user.lastname}
          onChangeText={(text) => handleChange("lastname", text)}
          required
          error={triedSubmit && user.lastname === "" ? "Champ requis" : ""}
        />

        <InputForm
          label="Email"
          value={user.email}
          onChangeText={(text) => handleChange("email", text)}
          required
          keyboardType="email-address"
          error={triedSubmit && user.email === "" ? "Champ requis" : ""}
        />

        <InputForm
          label="Téléphone"
          value={user.phone}
          onChangeText={(text) => handleChange("phone", text)}
          required
          keyboardType="phone-pad"
          error={triedSubmit && user.phone === "" ? "Champ requis" : ""}
        />

        <InputForm
          label="IBAN"
          value={user.iban}
          onChangeText={(text) => handleChange("iban", text)}
          required
          error={triedSubmit && user.iban === "" ? "Champ requis" : ""}
        />

        <InputForm
          label="Mot de passe"
          placeholder="Laisser vide si inchangé"
          value={user.password}
          onChangeText={(text) => handleChange("password", text)}
          secure
        />


        {/* Bouton */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}



const styles= StyleSheet.create({
  scroll:{
    padding: 20,
    paddingBottom: 120,
    backgroundColor: "#000",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "flex-start",
    marginBottom: 0,
  },
  backIcon: {
    width: 45,
    height: 45,
  },
  title:{
    fontSize: 28,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  card:{
    backgroundColor: "#1c1c1c",
    padding: 24,
    borderRadius: 20,
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  photoContainer:{
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  removeButton:{
    position: "absolute",
    top: -10,
    right: 100,

    borderRadius: 999,
    padding: 4,
    elevation: 4,
  },
  removeIcon:{
    width: 30,
    height: 30,
  },
  photo:{
    width: 120,
    height: 120,
    borderRadius: 50,
    marginBottom: 10,
  },
  photoButtonText:{
    color: "#c5ff36",
    fontWeight: "600",
  },
  input:{
    backgroundColor: "#2a2a2a",
    color: "#fff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#444",
  },
  button:{
    backgroundColor: "#c5ff36",
    padding: 16,
    borderRadius: 6,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText:{
    fontWeight: "bold",
    color: "#000",
    fontSize: 16,
  },
  center:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
