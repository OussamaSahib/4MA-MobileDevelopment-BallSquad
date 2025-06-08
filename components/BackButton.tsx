import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";



export default function BackButton(){
  const router= useRouter();

  return (
    <TouchableOpacity style={styles.backButton} onPress={()=>router.back()}>
      <Image
        source={require("../assets/images/buttons/back_button.png")}
        style={styles.backIcon}
      />
    </TouchableOpacity>
  );
}


const styles= StyleSheet.create({
  backButton:{
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  backIcon:{
    width: 48,
    height: 48,
  },
});
