// Path: app/(tabs)/profile.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSobrietyStore } from '@/hooks/useSobrietyStore';
import { ResetDataButton } from '@/components/ResetDataButton';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { profile, updateProfile } = useSobrietyStore();
  const [name, setName] = React.useState(profile?.name ?? '');

  const handleSave = () => {
    updateProfile({ name });
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Mon Prénom</ThemedText>
        
        <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
          <MaterialIcons name="person" size={24} color={colors.icon} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Votre nom"
            placeholderTextColor={colors.icon}
            value={name}
            onChangeText={setName}
            onEndEditing={handleSave}
          />
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Paramètres</ThemedText>
        <ResetDataButton />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 32,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
});