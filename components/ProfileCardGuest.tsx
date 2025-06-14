import { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";



export default function ProfileCardGuest({ user, children }: { user: any; children?: any }) {
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <View style={styles.card}>
        {/* PHOTO */}
        <TouchableOpacity onPress={() => setShowImage(true)} style={styles.avatarContainer}>
          <Image
            source={
              user.photo
                ? { uri: user.photo }
                : require("@/assets/images/profile_photos/profile_icon.png")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>

        {/* NOM */}
        <Text style={styles.name}>{user.firstname} {user.lastname ?? ""}</Text>

        {/* INFOS */}
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Téléphone :</Text>
          <Text style={styles.value}>{user.phone || "-"}</Text>
        </View>

        {/* BOUTONS */}
        <View style={{ marginTop: 20 }}>{children}</View>
      </View>

      {/* ZOOM IMAGE */}
      <Modal visible={showImage} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setShowImage(false)} style={styles.closeButton}>
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1c1c1c",
    padding: 28,
    paddingBottom: 10,
    borderRadius: 20,
    borderColor: "#333",
    borderWidth: 1,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  name: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    fontWeight: "bold",
  },
  infoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#444",
    paddingVertical: 12,
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 18,
  },
  value: {
    color: "#c5ff36",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomedAvatar: {
    width: 350,
    height: 350,
    borderRadius: 25,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 30,
  },
  closeText: {
    color: "#fff",
    fontSize: 52,
    fontWeight: "bold",
  },
});
