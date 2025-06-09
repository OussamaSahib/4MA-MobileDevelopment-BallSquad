import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../components/BackButton";
import InputAuthentification from "../components/InputAuthentification";
import CustomAlert from "../components/PopupConfirmRegister";
import { registerUser } from "../lib/api/authentification/register";



export default function RegisterScreen(){
  //NAVIGATION
  const router= useRouter();

  //VALEURS DU FORMULAIRE
  const [email, setEmail]= useState("");
  const [firstname, setFirstname]= useState("");
  const [lastname, setLastname]= useState("");
  const [password, setPassword]= useState("");
  const [phone, setPhone]= useState("");
  const [iban, setIban]= useState("");


  //ÉTATS DE GESTION D'ERREURS ET DE CONFIRMATION
  //Message Email déjà utilisé
  const [emailError, setEmailError]= useState("");
  //Affichage Popup de confirmation (ou autre)
  const [popupVisible, setPopupVisible]= useState(false);
  //Texte à afficher dans le Popup
  const [popupMessage, setPopupMessage]= useState("");
  //Click sur bouton (+Utile pour Champs requis)
  const [triedSubmit, setTriedSubmit]= useState(false);

  //FCT POUR TENTATIVE DE REGISTER
  const SubmitRegister= async()=>{
    setEmailError("");
    setTriedSubmit(true);

    if (!firstname || !lastname || !email || !password || !phone || !iban){
      setTriedSubmit(true);
      return;
    }

    try{
      await registerUser({firstname, lastname, email, password, phone, iban});
      setPopupMessage("Compte créé avec succès !");
      setPopupVisible(true);
    } 
    catch (error: any){
      if (error.message==="EMAIL_EXISTS") {
        setEmailError("Cette adresse email est déjà utilisée");
      } 
      else{
        setPopupMessage("Erreur : " + error.message);
        setPopupVisible(true);
      }
    }
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>


        {/*BOUTON BACK*/}
        <BackButton/>

        {/*FORMULAIRE*/}
        <View style={styles.card}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Création du compte</Text>

            <View style={styles.row}>
              <View style={{flex: 1, marginRight: 6}}>
                <InputAuthentification
                  label="Prénom"
                  value={firstname}
                  onChangeText={setFirstname}
                  required
                  error={triedSubmit && firstname === "" ? "Champ requis" : ""}
                />
              </View>

              <View style={{flex: 1, marginLeft: 6}}>
                <InputAuthentification
                  label="Nom"
                  value={lastname}
                  onChangeText={setLastname}
                  required
                  error={triedSubmit && lastname === "" ? "Champ requis" : ""}
                />
              </View>
            </View>

            <InputAuthentification
              label="Numéro GSM"
              value={phone}
              onChangeText={setPhone}
              required
              keyboardType="phone-pad"
              error={triedSubmit && phone === "" ? "Champ requis" : ""}
            />

            <InputAuthentification
              label="IBAN"
              value={iban}
              onChangeText={setIban}
              required
              error={triedSubmit && iban === "" ? "Champ requis" : ""}
            />

            <InputAuthentification
              label="Email"
              value={email}
              onChangeText={(text)=>{
                setEmail(text);
                setEmailError("");
              }}
              required
              keyboardType="email-address"
              error={triedSubmit && email === "" ? "Champ requis" : emailError}
            />

            <InputAuthentification
              label="Mot de passe"
              value={password}
              onChangeText={setPassword}
              required
              secure
              error={triedSubmit && password === "" ? "Champ requis" : ""}
            />

            <TouchableOpacity style={styles.button} onPress={SubmitRegister}>
              <Text style={styles.buttonText}>Créer le compte</Text>
            </TouchableOpacity>

            
            {/*POPUP DE CONFIRMATION (OU AUTRE)*/}
            <CustomAlert
              visible={popupVisible}
              message={popupMessage}
              onClose={()=>{
                setPopupVisible(false);
                if (popupMessage==="Compte créé avec succès !"){
                  setTimeout(()=>{
                    router.back();
                  });
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}




const styles= StyleSheet.create({
  safeArea:{
    flex: 1,
    backgroundColor: "#000",
  },
  container:{
    flexGrow: 1,
    backgroundColor: "#000",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 100,
  },
  card:{
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  formContainer:{
    padding: 20,
  },
  title:{
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  row:{
    flexDirection: "row",
    marginBottom: 0,
  },
  button:{
    backgroundColor: "#c5ff36",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText:{
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
