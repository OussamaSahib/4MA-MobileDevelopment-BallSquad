import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackButton from '../components/BackButton';
import { registerUser } from "../lib/api/register";





export default function RegisterScreen() {

  // Champs simulés
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [iban, setIban] = useState('');

const handleRegister = async () => {
  
  try {
    console.log("Bouton pressé");
    await registerUser({ firstname, lastname, email, password, phone, iban });
    alert("Compte créé avec succès !");
    // 👉 ici tu peux naviguer vers login
    // navigation.navigate("Login");  <-- si tu utilises React Navigation
  } catch (error: any) {
    if (error.message === "EMAIL_EXISTS") {
      alert("Cette adresse email est déjà utilisée.");
    } else {
      alert("Erreur : " + error.message);
    }
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bouton retour */}
        
      <BackButton />

      {/* Carte d'inscription */}
      <View style={styles.card}>


        {/* Formulaire */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Création du comptee</Text>

          <View style={styles.row}>
            <TextInput
              placeholder="Prénom"
              placeholderTextColor="#ccc"
              value={firstname}
              onChangeText={setFirstname}
              style={[styles.input, { flex: 1, marginRight: 6 }]}
            />
            <TextInput
              placeholder="Nom"
              placeholderTextColor="#ccc"
              value={lastname}
              onChangeText={setLastname}
              style={[styles.input, { flex: 1, marginLeft: 6 }]}
            />
          </View>

          <TextInput
            placeholder="Numéro GSM"
            placeholderTextColor="#ccc"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />

          <TextInput
            placeholder="IBAN"
            placeholderTextColor="#ccc"
            value={iban}
            onChangeText={setIban}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />

          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Créer le compte</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },

  formContainer: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#c5ff36',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
