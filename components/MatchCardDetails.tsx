import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";



export default function MatchCardDetails({ match, user }: { match: any; user: any }) {
  const isCreator = user?.id === match.id_creator;
  const pricePerPlayer = ((match.total_price / match.quantity_players) || 0).toFixed(2);
  const [modalVisible, setModalVisible] = useState(false);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).replace(/^\w/, (c) => c.toUpperCase());

  const formatHour = (d: string) =>
    new Date(d).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const sportIcons: Record<string, any> = {
    football: require("@/assets/images/sporticons/football.png"),
    basketball: require("@/assets/images/sporticons/basketball.png"),
    volleyball: require("@/assets/images/sporticons/volleyball.png"),
    badminton: require("@/assets/images/sporticons/badminton.png"),
  };

  const getSportIcon = (sport: string) => {
    const key = sport.toLowerCase();
    return sportIcons[key] || require("@/assets/images/sporticons/sport_default.png");
  };

  const copyIBAN = async () => {
    await Clipboard.setStringAsync(match.creator.iban);
  };

  return (
    <View style={styles.card}>
      {/* Titre */}
      <View style={styles.header}>
        <Image source={getSportIcon(match.sport)} style={styles.icon} />
        <Text style={styles.title}>{match.sport.toUpperCase()} - {match.quantity_players} joueurs</Text>
      </View>

      <Text style={styles.line}>📅  {formatDate(match.date)}</Text>
      <Text style={styles.line}>⏰  {formatHour(match.start_time)} → {formatHour(match.end_time)}</Text>
      <Text style={styles.line}>📍  {match.place}</Text>
      <Text style={styles.line}>🏟️  {match.field}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.line}>💰 {pricePerPlayer} € / joueur</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Image source={require("@/assets/images/buttons/info_button.png")} style={styles.infoIcon} />
        </Pressable>
      </View>

      <Text style={styles.line}>
        👤 Organisé par {match.creator.firstname} {match.creator.lastname}
        {isCreator && <Image source={require("@/assets/images/creator_icon.png")} style={styles.creatorIcon} />}
      </Text>

      {/* MODAL */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Détails du paiement</Text>
            <Text style={styles.modalText}>💰 Prix : {pricePerPlayer} € / joueur</Text>
            <Text style={styles.modalText}>👤 {match.creator.firstname} {match.creator.lastname}</Text>
            <Text style={styles.modalText}>🏦 IBAN : {match.creator.iban}</Text>
            <Pressable onPress={copyIBAN} style={styles.copyBtn}>
              <Text style={styles.copyText}>Copier l'IBAN</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕ Fermer</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#c5ff36",
    borderRadius: 12,
    padding: 20,
    marginBottom: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  line: {
    fontSize: 18,
    color: "#000",
    marginVertical: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  infoIcon: {
    width: 22,
    height: 22,
    marginLeft: 10,
  },
  creatorIcon: {
    width: 18,
    height: 18,
    marginLeft: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 14,
    textAlign: "center",
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  copyBtn: {
    backgroundColor: "#c5ff36",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  copyText: {
    color: "#000",
    fontWeight: "bold",
  },
  closeBtn: {
    marginTop: 20,
    alignItems: "center",
  },
  closeText: {
    color: "#ccc",
    fontSize: 16,
  },
});
