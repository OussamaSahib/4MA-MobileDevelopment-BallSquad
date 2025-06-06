import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';




export default function LoginScreen(){
  return (
    <View style={styles.container}>
      {/* Bouton Créer un compte */}
      <View style={styles.topRight}>
        <TouchableOpacity style={styles.createAccount}>
          <Text style={styles.createAccountText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>

      {/* Carte de connexion */}
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/ballsquad_logo_green.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Formulaire */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Connexion</Text>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            style={styles.input}
          />
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#ccc"
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingTop: 60,
  },
  topRight: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  createAccount: {
    backgroundColor: '#72777d',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createAccountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  logoContainer: {
    alignItems: 'center',
    padding: 10
    ,
  },
  logo: {
    width: 200,
    height: 200,
  },
  formContainer: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: 16,
    padding: 16,
    borderRadius: 6,
    marginBottom: 12,
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
