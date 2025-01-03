// components/progress/StatCard.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color: string;
  suffix: string;
}

export function StatCard({ label, value, icon, color, suffix }: StatCardProps) {
  return (
    <View style={[styles.card, { backgroundColor: `${color}15` }]}>
      <MaterialIcons 
        name={icon}
        size={24}
        color={color}
        style={styles.icon}
      />
      <ThemedText style={styles.value}>
        {value}
        <ThemedText style={styles.suffix}> {suffix}</ThemedText>
      </ThemedText>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '30%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  suffix: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
});