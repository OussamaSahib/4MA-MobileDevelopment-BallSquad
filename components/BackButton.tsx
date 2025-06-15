import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity } from "react-native";



export default function BackButton({to}: {to?: string}){
  const router= useRouter();

  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => {
        if (to) {
          router.push(to as any);
        } else {
          router.back();
        }
      }}
    >
      <Image
        source={require("../assets/images/buttons/back_button.png")}
        style={styles.backIcon}
      />
    </TouchableOpacity>
  );
}


const styles= StyleSheet.create({
  backButton:{
    alignSelf: "flex-start",
  },
  backIcon:{
    width: 48,
    height: 48,
  },
});
