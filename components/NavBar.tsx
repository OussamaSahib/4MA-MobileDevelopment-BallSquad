import { usePathname, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";



export default function NavBar(){
  //NAVIGATION
  const router= useRouter();
  //PAGE ACTIVE
  const pathname= usePathname();
  //MARGE DE SÉCURITÉ
  const insets= useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom || 16, height: 60 +(insets.bottom || 16)}]}>

      {/*MATCHS*/}
      <TouchableOpacity onPress={()=>router.push("/matchs")}>
        <View style={styles.iconWrapper}>
          <Image source={require("@/assets/images/navbar/matchs_icon.png")} style={[styles.icon,
              pathname==="/matchs" && styles.activeIcon]}
          />
          <Text style={[styles.label, pathname==="/matchs" && styles.activeLabel]}>
            Matchs
          </Text>
        </View>
      </TouchableOpacity>


      {/*MONEY*/}
      <TouchableOpacity onPress={()=>router.push("/matchs")}>
        <View style={styles.iconWrapper}>
          <Image
            source={require("@/assets/images/navbar/money_icon.png")}
            style={[
              styles.icon,
              pathname==="/matchs" && styles.activeIcon,
            ]}
          />
          <Text
            style={[
              styles.label,
              pathname==="/matchs" && styles.activeLabel,
            ]}
          >
            Argent
          </Text>
        </View>
      </TouchableOpacity>


      {/*FRIENDS*/}
      <TouchableOpacity onPress={()=>router.push("/profile")}>
        <View style={styles.iconWrapper}>
          <Image
            source={require("@/assets/images/navbar/friends_icon.png")}
            style={[
              styles.icon,
              pathname==="/profile" && styles.activeIcon,
            ]}
          />
          <Text
            style={[
              styles.label,
              pathname==="/profile" && styles.activeLabel,
            ]}
          >
            Amis
          </Text>
        </View>
      </TouchableOpacity>


      {/*PROFILE*/}
      <TouchableOpacity onPress={()=>router.push("/profile")}>
        <View style={styles.iconWrapper}>
          <Image
            source={require("@/assets/images/navbar/profile_icon.png")}
            style={[
              styles.icon,
              pathname==="/profile" && styles.activeIcon,
            ]}
          />
          <Text
            style={[
              styles.label,
              pathname==="/profile" && styles.activeLabel,
            ]}
          >
            Profile
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}



const styles= StyleSheet.create({
  container:{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    paddingTop: 10,
    zIndex: 10,
    borderTopWidth: 2,
    borderTopColor: "#333",
  },
  iconWrapper:{
    alignItems: "center", 
  },
  icon:{
    width: 38,
    height: 38,
    tintColor: "#888",
  },
  activeIcon:{
    tintColor: "#c5ff36",
  },
  label:{
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  activeLabel:{
    color: "#c5ff36",
    fontWeight: "600",
  },
});
