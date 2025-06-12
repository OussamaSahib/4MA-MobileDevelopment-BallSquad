import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function ProfileCard({user, children}: {user: any; children?: any}){
  //ZOOM IMAGE  
  const [showImage, setShowImage]= useState(false);

    //COPIE IBAN
    const copyToClipboard= async (text: string)=>{
    await Clipboard.setStringAsync(text);
    };


  return (
    <>
      <View style={styles.card}>
        {/*PHOTO USER*/}
        <TouchableOpacity onPress={()=>setShowImage(true)} style={styles.avatarContainer}>
            <Image
            source={
                user.photo
                ? { uri: user.photo }
                : require("@/assets/images/profile_photos/profile_icon.png")
            }
            style={styles.avatar}
            />
        </TouchableOpacity>

        {/*PRÉNOM + NOM*/}
        <Text style={styles.name}>{user.firstname} {user.lastname}</Text>


        {/*INFOS*/}
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Mail :</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Téléphone :</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>IBAN :</Text>
          <TouchableOpacity onPress={() => copyToClipboard(user.iban)} style={styles.ibanRow}>
            <Image source={require("@/assets/images/buttons/copy_button.png")} style={styles.copyIcon} />
            <Text style={styles.value}>{user.iban}</Text>
          </TouchableOpacity>
        </View>


        {/*BOUTON PERSONNALISÉ*/}
        <View style={{marginTop: 20}}>{children}</View>
      </View>



      {/*ZOOM IMAGE*/}
      <Modal visible={showImage} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={()=>setShowImage(false)} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
            <Image
            source={
                user.photo
                ? { uri: user.photo }
                : require("@/assets/images/profile_photos/profile_icon.png")
            }
            style={styles.zoomedAvatar}
            />
        </View>
      </Modal>
    </>
  );
}



const styles= StyleSheet.create({
  card:{
    backgroundColor: "#1c1c1c",
    padding: 28,
    borderRadius: 20,
    borderColor: "#333",
    borderWidth: 1,
  },
  avatarContainer:{
    alignItems: "center",
    marginBottom: 0,
  },
  avatar:{
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  name:{
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    fontWeight: "bold",
  },
  infoBlock:{
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#444",
    paddingVertical: 12,
  },
  label:{
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  value:{
    color: "#c5ff36",
    fontSize: 18,
  },
  ibanRow:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  copyIcon:{
    width: 22,
    height: 22,
    marginRight: 6,
  },
  modalContainer:{
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomedAvatar:{
    width: 350,
    height: 350,
    borderRadius: 25,
  },
  closeButton:{
    position: "absolute",
    top: 50,
    right: 30,
  },
  closeText:{
    color: "#fff",
    fontSize: 52,
    fontWeight: "bold",
  },
});
