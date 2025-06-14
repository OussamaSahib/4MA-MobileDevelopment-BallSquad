import { StyleSheet, TextInput } from "react-native";


export default function SearchBar({
  value,
  onChange,
  placeholder,
  style,
}: {
  value: string;
  onChange: (text: string)=>void;
  placeholder?: string;
  style?: any;
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder || "Rechercher..."}
      placeholderTextColor="#ccc"
    />
  );
}


const styles= StyleSheet.create({
  input:{
    backgroundColor: "#5f6368",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 8,
    fontSize: 17,
    color: "#fff",
  },
});
