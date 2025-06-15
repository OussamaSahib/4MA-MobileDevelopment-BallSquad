import BackButton from "@/components/BackButton";
import InputForm from "@/components/InputForm";
import { addMatch } from "@/lib/api/matchs/match";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function NewMatchPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    sport: "",
    quantity_players: "",
    date: "",
    start_time: "",
    end_time: "",
    place: "Centre sportif Mounier",
    field: "",
    price_euros: "",
    price_cents: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const sports = ["Football", "Volleyball", "Badminton", "Basketball"];
  const places = ["Centre sportif Mounier", "Fit Five Bockstael"];

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" })); // Clear error
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value) newErrors[key] = "Ce champ est requis.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setSubmitting(true);
      await addMatch(form);
      Alert.alert("Match créé !");
      router.replace("/matchs");
    } catch {
      Alert.alert("Erreur", "Impossible de créer le match.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      updateField("date", formatted);
    }
  };

  const handleStartTimeChange = (_: any, selectedTime?: Date) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      updateField("start_time", `${hours}:${minutes}`);
    }
  };

  const handleEndTimeChange = (_: any, selectedTime?: Date) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      updateField("end_time", `${hours}:${minutes}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <BackButton />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Nouveau Match</Text>
        </View>

      {/* Sport */}
      <Text style={styles.label}>Sport <Text style={styles.required}>*</Text></Text>
      <View style={styles.radioGroup}>
        {sports.map((sport) => (
          <TouchableOpacity
            key={sport}
            style={[styles.radio, form.sport === sport && styles.radioSelected]}
            onPress={() => updateField("sport", sport)}
          >
            <Text style={[styles.radioText, form.sport === sport && styles.radioTextSelected]}>
              {sport}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.sport && <Text style={styles.error}>{errors.sport}</Text>}

      {/* Nombre de joueurs */}
      <Text style={styles.label}>Nombre de joueurs <Text style={styles.required}>*</Text></Text>
      <View style={styles.radioGroup}>
        {Array.from({ length: 14 }, (_, i) => (i + 1).toString()).map((num) => (
          <TouchableOpacity
            key={num}
            style={[styles.radioSmall, form.quantity_players === num && styles.radioSelected]}
            onPress={() => updateField("quantity_players", num)}
          >
            <Text style={[styles.radioText, form.quantity_players === num && styles.radioTextSelected]}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.quantity_players && <Text style={styles.error}>{errors.quantity_players}</Text>}

      {/* Date */}
      <Text style={styles.label}>Date <Text style={styles.required}>*</Text></Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={form.date ? styles.inputText : styles.placeholderText}>
                {form.date || "Choisir une date"}
            </Text>
        </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={form.date ? new Date(form.date) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
      {errors.date && <Text style={styles.error}>{errors.date}</Text>}


        <Text style={styles.label}>
        Heures<Text style={styles.required}>*</Text> 
        </Text>

        <View style={styles.timeRow}>
        <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.inputTime}>
            <Text style={form.start_time ? styles.inputText : styles.placeholderText}>
                {form.start_time || "Début"}
            </Text>
        </TouchableOpacity>
        <Text style={styles.arrow}>→</Text>

        <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.inputTime}>
            <Text style={form.end_time ? styles.inputText : styles.placeholderText}>
                {form.end_time || "Fin"}
            </Text>
        </TouchableOpacity>
        </View>

        {errors.start_time && <Text style={styles.error}>{errors.start_time}</Text>}
        {errors.end_time && <Text style={styles.error}>{errors.end_time}</Text>}

        {showStartTimePicker && (
        <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleStartTimeChange}
        />
        )}

        {showEndTimePicker && (
        <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleEndTimeChange}
        />
        )}


      {/* Lieu */}
      <Text style={styles.label}>Lieu <Text style={styles.required}>*</Text></Text>
      <View style={styles.radioGroup}>
        {places.map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.radio, form.place === p && styles.radioSelected]}
            onPress={() => updateField("place", p)}
          >
            <Text style={[styles.radioText, form.place === p && styles.radioTextSelected]}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Terrain */}
      <InputForm
        label="Terrain"
        value={form.field}
        onChangeText={(text) => updateField("field", text)}
        required
        error={errors.field}
      />

      {/* Prix */}
      <Text style={styles.label}>Prix total <Text style={styles.required}>*</Text></Text>
      <View style={styles.priceRow}>
        <InputForm
          label="Euros"
          value={form.price_euros}
          onChangeText={(text) => updateField("price_euros", text)}
          required
          keyboardType="numeric"
          error={errors.price_euros}
          showRequiredMark={false}
        />
        <Text style={styles.priceSeparator}>,</Text>
        <InputForm
          label="Cents"
          value={form.price_cents}
          onChangeText={(text) => updateField("price_cents", text)}
          required
          keyboardType="numeric"
          error={errors.price_cents}
          showRequiredMark={false}
        />
        <Text style={styles.priceSeparator}>€</Text>
      </View>

      {/* Bouton */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={submitting}
      >
        <Text style={styles.buttonText}>
          {submitting ? "Création..." : "Créer le Match"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1c",
    padding: 20,
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: 400,
    marginBottom: 30,
    position: "relative",
  },
  backButton: {
    zIndex: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: -36,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    marginTop: 12,
    marginBottom: 10,
  },
  required: {
    color: "#ff4d4d",
  },
  input:{
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: 6,
    padding: 14,
    marginBottom: 8,
  },
inputText: {
  color: "#fff",       
  fontSize: 16, 
},
placeholderText: {
  color: "#888",       
  fontSize: 16,
},
inputTime: {
flex: 1,
backgroundColor: "#333",
borderRadius: 6,
padding: 12,
fontSize: 16,
},

arrow: {
color: "white",
fontSize: 24,
paddingHorizontal: 4,
},
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  radio: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
    marginBottom: 8,
  },
  radioSmall: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  radioSelected: {
    backgroundColor: "#c5ff36",
  },
  radioText: {
    color: "white",
    fontSize: 16,
  },
  radioTextSelected: {
    color: "black",
    fontWeight: "bold",
  },
  timeRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  marginBottom: 10,
},


  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,

    marginBottom: 10,
  },
  priceSeparator: {
    fontSize: 20,
    color: "white",
  },
  button: {
    backgroundColor: "#c5ff36",
    borderRadius: 6,
    paddingVertical: 14,
    marginTop: 24,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  error: {
    color: "#ff4d4d",
    fontSize: 14,
    marginTop: 4,
  },
});
