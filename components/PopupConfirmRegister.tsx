import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Modal, StyleSheet, Text, View } from "react-native";



type CustomAlertProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};


export default function PopupConfirmRegister({ visible, message, onClose }: CustomAlertProps) {
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(onClose, 5000); // auto-close après 2 sec
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.fullscreen}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.overlay}>
          <Animated.View style={[styles.alertBox, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.message}>{message}</Text>
            <Image
              source={require("../assets/images/check_circle_register.png")}
              style={styles.icon}
            />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}




const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // 🔥 un peu plus sombre qu’avant
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 180,
  },
  alertBox: {
    backgroundColor: "#0a0a0acc", // ✅ plus sombre et plus opaque
    padding: 30,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 12,
  },
  message: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 16, // espace au-dessus de l'image
  },
  icon: {
    width: 50,
    height: 50,
  },
});
