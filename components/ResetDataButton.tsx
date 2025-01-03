// Path : components/ResetDataButton.tsx

import React from "react";
import { Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useSobrietyStore } from "@/hooks/useSobrietyStore";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function ResetDataButton() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { resetData } = useSobrietyStore();

  const handleReset = () => {
    Alert.alert(
      "Réinitialiser les données",
      "Êtes-vous sûr de vouloir effacer tous vos progrès ? Cette action est irréversible.",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Réinitialiser",
          style: "destructive",
          onPress: resetData
        }
      ]
    );
  };

  return (
    <TouchableOpacity 
      style={[
        styles.resetButton,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.divider
        }
      ]}
      onPress={handleReset}
    >
      <MaterialIcons
        name="delete-forever"
        size={24}
        color={colors.error}
      />
      <Text style={[styles.resetButtonText, { color: colors.error }]}>
        Réinitialiser mes progrès
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  }
});