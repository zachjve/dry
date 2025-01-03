// components/onboarding/Onboarding.tsx
import React, { useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, TextInput, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSobrietyStore } from '@/hooks/useSobrietyStore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

const SLIDES = [
  {
    id: 'welcome',
    title: 'Bienvenue',
    icon: 'waving-hand',
    description: 'Commencez votre parcours vers une vie plus saine',
    isNameInput: true,
  },
  {
    id: 'daily',
    title: 'Suivi quotidien',
    icon: 'check-circle',
    description: 'Validez chaque journée sobre et construisez votre série',
  },
  {
    id: 'achievements',
    title: 'Objectifs',
    icon: 'emoji-events',
    description: 'Débloquez des succès et suivez votre progression',
  },
  {
    id: 'stats',
    title: 'Statistiques',
    icon: 'insights',
    description: 'Visualisez vos performances et votre évolution',
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [name, setName] = useState('');
  const { updateProfile } = useSobrietyStore();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      if (name.trim()) {
        updateProfile({ name: name.trim() });
      }
      onComplete();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        scrollEnabled={false}
      >
        {SLIDES.map((slide, index) => (
          <ThemedView key={slide.id} style={[styles.slide, { width }]}>
            <Animated.View style={styles.content}>
              <ThemedView style={[styles.iconContainer, { backgroundColor: `${colors.tint}15` }]}>
                <MaterialIcons name={slide.icon} size={48} color={colors.tint} />
              </ThemedView>

              <ThemedText style={styles.title}>{slide.title}</ThemedText>
              <ThemedText style={[styles.description, { color: colors.icon }]}>
                {slide.description}
              </ThemedText>

              {slide.isNameInput && (
                <TextInput
                  style={[styles.input, { 
                    backgroundColor: colors.cardBackground,
                    color: colors.text,
                    borderColor: colors.cardBorder
                  }]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Votre prénom (optionnel)"
                  placeholderTextColor={colors.placeholder}
                />
              )}
            </Animated.View>
          </ThemedView>
        ))}
      </Animated.ScrollView>

      <ThemedView style={styles.footer}>
        <ThemedView style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <ThemedView
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentIndex ? colors.tint : colors.progressBackground,
                },
              ]}
            />
          ))}
        </ThemedView>

        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.tint }]}
          onPress={handleNext}
        >
          <ThemedText style={styles.nextButtonText}>
            {currentIndex === SLIDES.length - 1 ? 'Commencer' : 'Suivant'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  title: {
    paddingTop: 16,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    marginTop: 16,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  nextButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});