import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



export default function InputForm({label, value, onChangeText, required= false, secure= false, error= "", keyboardType= "default", placeholder = "", showRequiredMark = true,}:{
  label: string;
  value: string;
  onChangeText: (text: string)=> void;
  required?: boolean;
  secure?: boolean;
  error?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  placeholder?: string;
  showRequiredMark?: boolean;
}) {
  const [showPassword, setShowPassword]= useState(false);

  
  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.label}>
      {label}
      {required && showRequiredMark && <Text style={styles.required}> *</Text>}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            error !== "" && { borderColor: "#ff4d4d", borderWidth: 1 },
          ]}
          secureTextEntry={secure && !showPassword}
          keyboardType={keyboardType}
          placeholder={placeholder || label}      
          placeholderTextColor="#888"                 
        />

        {secure && (
          <TouchableOpacity
            style={styles.icon}
            onPress={()=> setShowPassword((prev)=> !prev)}
          >
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={30}
              color="#ccc"
            />
          </TouchableOpacity>
        )}
      </View>

      {error!=="" && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}



const styles= StyleSheet.create({
  label:{
    color: "#fff",
    fontSize: 16,
    marginBottom: 6,
  },
  required:{
    color: "#ff4d4d",
  },
  inputContainer:{
    position: "relative",
  },
  input:{
    backgroundColor: "#333",
    color: "#fff",
    fontSize: 16,
    padding: 16,
    borderRadius: 6,
    paddingRight: 44,
    paddingTop: 14
  },
  icon:{
    position: "absolute",
    right: 12,
    top: "40%",
    transform: [{ translateY: -10 }],
  },
  error:{
    color: "#ff4d4d",
    fontSize: 14,
    marginTop: 4,
  },
});
