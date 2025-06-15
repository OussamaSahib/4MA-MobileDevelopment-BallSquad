import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";


export default function AddButton({route}: {route: string}){
  const router= useRouter();

  return (
    <TouchableOpacity onPress={()=> router.push(route as any)}>
      <Image
        source={require("@/assets/images/buttons/add_button.png")}
        style={styles.addImage}
      />
    </TouchableOpacity>
  );
}



const styles= StyleSheet.create({
  addImage:{
    width: 45,
    height: 45,
    marginLeft: 10,
    resizeMode: "contain",
  },
});
