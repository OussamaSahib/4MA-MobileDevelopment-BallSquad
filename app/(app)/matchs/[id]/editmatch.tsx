import BackButton from "@/components/BackButton";
import InputForm from "@/components/InputForm";
import { editMatch, getMatchById } from "@/lib/api/matchs/detailsmatch/idmatch";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function EditMatchPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [form, setForm] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const sports = ["Football", "Volleyball", "Badminton", "Basketball"];
  const places = ["Centre sportif Mounier", "Fit Five Bockstael"];

  useEffect(() => {
    (async () => {
      if (!id || typeof id !== "string") return;
      const match = await getMatchById(id);
      const [euro, cent] = match.total_price.toFixed(2).split(".");
      setForm({
        id,
        sport: match.sport,
        quantity_players: match.quantity_players.toString(),
        date: match.date.split("T")[0],
        start_time: match.start_time.slice(11, 16),
        end_time: match.end_time.slice(11, 16),
        place: match.place,
        field: match.field,
        price_euros: euro,
        price_cents: cent,
      });
    })();
  }, [id]);

  if (!form) return <Text style={styles.loading}>Chargement...</Text>;

  const updateField = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
    setErrors((prev: any) => ({ ...prev, [key]: "" }));
  };

  const validateForm = () => {
    const newErrors: any = {};
    for (const key in form) {
      if (!form[key]) newErrors[key] = "Ce champ est requis.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setSubmitting(true);
      await editMatch(form);
      Alert.alert("Match mis à jour !");
      router.replace(`/matchs/${id}`);
    } catch {
      Alert.alert("Erreur", "Impossible de mettre à jour le match.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      updateField("date", selectedDate.toISOString().split("T")[0]);
    }
  };

  const handleStartTimeChange = (_: any, selectedTime?: Date) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      const h = selectedTime.getHours().toString().padStart(2, "0");
      const m = selectedTime.getMinutes().toString().padStart(2, "0");
      updateField("start_time", `${h}:${m}`);
    }
  };

  const handleEndTimeChange = (_: any, selectedTime?: Date) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      const h = selectedTime.getHours().toString().padStart(2, "0");
      const m = selectedTime.getMinutes().toString().padStart(2, "0");
      updateField("end_time", `${h}:${m}`);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <BackButton />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Modifier le Match</Text>
        </View>

        {/* SPORT */}
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

        {/* QUANTITY */}
        <Text style={styles.label}>Nombre de joueurs <Text style={styles.required}>*</Text></Text>
        <View style={styles.radioGroup}>
          {Array.from({ length: 14 }, (_, i) => (i + 1).toString()).map((num) => (
            <TouchableOpacity
              key={num}
              style={[styles.radio, form.quantity_players === num && styles.radioSelected]}
              onPress={() => updateField("quantity_players", num)}
            >
              <Text style={[styles.radioText, form.quantity_players === num && styles.radioTextSelected]}>
                {num}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.quantity_players && <Text style={styles.error}>{errors.quantity_players}</Text>}

        {/* DATE */}
        <Text style={styles.label}>Date <Text style={styles.required}>*</Text></Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={form.date ? styles.inputText : styles.placeholderText}>
            {form.date || "Choisir une date"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date(form.date)}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
        {errors.date && <Text style={styles.error}>{errors.date}</Text>}

        {/* HEURE */}
        <Text style={styles.label}>Heures <Text style={styles.required}>*</Text></Text>
        <View style={styles.timeRow}>
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.input}>
            <Text style={form.start_time ? styles.inputText : styles.placeholderText}>
              {form.start_time || "Début"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.arrow}>→</Text>
          <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.input}>
            <Text style={form.end_time ? styles.inputText : styles.placeholderText}>
              {form.end_time || "Fin"}
            </Text>
          </TouchableOpacity>
        </View>
        {showStartTimePicker && (
          <DateTimePicker
            value={new Date(`1970-01-01T${form.start_time}`)}
            mode="time"
            is24Hour={true}
            onChange={handleStartTimeChange}
          />
        )}
        {showEndTimePicker && (
          <DateTimePicker
            value={new Date(`1970-01-01T${form.end_time}`)}
            mode="time"
            is24Hour={true}
            onChange={handleEndTimeChange}
          />
        )}

        {/* LIEU */}
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

        {/* TERRAIN */}
        <InputForm
          label="Terrain"
          value={form.field}
          onChangeText={(text) => updateField("field", text)}
          required
          error={errors.field}
        />

        {/* PRIX */}
        <Text style={styles.label}>Prix total <Text style={styles.required}>*</Text></Text>
        <View style={styles.timeRow}>
          <InputForm
            label="Euros"
            value={form.price_euros}
            onChangeText={(text) => updateField("price_euros", text)}
            required
            keyboardType="numeric"
            error={errors.price_euros}
            showRequiredMark={false}
          />
          <Text style={styles.arrow}>,</Text>
          <InputForm
            label="Cents"
            value={form.price_cents}
            onChangeText={(text) => updateField("price_cents", text)}
            required
            keyboardType="numeric"
            error={errors.price_cents}
            showRequiredMark={false}
          />
          <Text style={styles.arrow}>€</Text>
        </View>

        {/* BOUTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.buttonText}>
            {submitting ? "Mise à jour..." : "Mettre à jour"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#1c1c1c", padding: 20, paddingBottom: 120 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  backButton: { zIndex: 1 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 32, fontWeight: "bold", color: "#fff", marginLeft: -36 },
  loading: { color: "#fff", fontSize: 18, textAlign: "center", marginTop: 40 },
  label: { fontWeight: "bold", fontSize: 18, color: "white", marginTop: 12, marginBottom: 10 },
  required: { color: "#ff4d4d" },
  input: { backgroundColor: "#333", borderRadius: 6, padding: 12 },
  inputText: { color: "#fff", fontSize: 16 },
  placeholderText: { color: "#888", fontSize: 16 },
  radioGroup: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  radio: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12, marginBottom: 8 },
  radioSelected: { backgroundColor: "#c5ff36" },
  radioText: { color: "white", fontSize: 16 },
  radioTextSelected: { color: "black", fontWeight: "bold" },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  arrow: { color: "white", fontSize: 20 },
  button: { backgroundColor: "#c5ff36", borderRadius: 6, paddingVertical: 14, marginTop: 24 },
  buttonText: { color: "#000", fontWeight: "bold", textAlign: "center", fontSize: 18 },
  error: { color: "#ff4d4d", fontSize: 14, marginTop: 4 },
});
