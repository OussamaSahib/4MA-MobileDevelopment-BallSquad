import { getUser } from "@/lib/api/authentification/getuser";
import { loginUser } from "@/lib/api/authentification/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import InputForm from "../components/InputForm";



export default function LoginScreen(){
  //NAVIGATION
  const router= useRouter();

  //VALEURS DU FORMULAIRE
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");

  //ÉTATS DE GESTION D'ERREURS ET DE CONFIRMATION
  //Message Email non-existant, Mauvais Mot de passe, Remplir Champs
  const [loginError, setLoginError]= useState("");

  //FCT POUR TENTATIVE DE CONNEXION
  const SubmitLogin= async()=>{
    setLoginError("");

    //VÉRIFICATION DES CHAMPS REMPLIS
    if (!email || !password){
      setLoginError("Veuillez remplir tous les champs");
      return;
    }

    //API LOGIN +GETUSER
    const response= await loginUser(email, password);
    if (response.success){
      //Stockage de l’email localement
      await AsyncStorage.setItem("userEmail", email);

      //Récupérer et afficher les infos du user
      const user= await getUser(email);
      console.log("Utilisateur connecté :", user);

      //Redirection MATCH
      router.push("/matchs");
    }

    //MSGS D'ERREUR
    else if (response.error==="EMAIL_NOT_FOUND"){
      setLoginError("Ce compte n'existe pas");
    } 
    else if (response.error==="WRONG_PASSWORD"){
      setLoginError("Mot de passe incorrect");
    } 
    else{
      setLoginError("Erreur inconnue");
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/*BOUTON CRÉER UN COMPTE*/}
        <View style={styles.topRight}>
          <TouchableOpacity
            style={styles.createAccount}
            onPress={() => router.push("/register")}
          >
            <Text style={styles.createAccountText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>

        {/*FORMULAIRE*/}
        <View style={styles.card}>
          {/*Logo*/}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/ballsquad_logo/ballsquad_logo_green.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/*Form*/}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Connexion</Text>

            <InputForm
              label="Email"
              value={email}
              onChangeText={setEmail}
              required
              showRequiredMark={false}
              keyboardType="email-address"
            />

            <InputForm
              label="Mot de passe"
              value={password}
              onChangeText={setPassword}
              secure
              required
              showRequiredMark={false}
            />

            {loginError!=="" && (<Text style={styles.errorText}>{loginError}</Text>)}

            <TouchableOpacity style={styles.button} onPress={SubmitLogin}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}



const styles= StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent:{
    padding: 20,
    paddingTop: 50,
  },
  topRight:{
    alignItems: "flex-end",
    marginBottom: 30,
  },
  createAccount:{
    backgroundColor: "#72777d",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createAccountText:{
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  card:{
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  logoContainer:{
    alignItems: "center",
    padding: 10,
  },
  logo:{
    width: 200,
    height: 200,
  },
  formContainer:{
    padding: 20,
    paddingTop: 0,
  },
  title:{
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  errorText:{
    color: "#ff4d4d",
    fontSize: 16,
    marginBottom: 10,
  },
  button:{
    backgroundColor: "#c5ff36",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText:{
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
  },
});
