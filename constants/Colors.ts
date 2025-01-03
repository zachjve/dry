// Path : constants/Colors.ts

// Couleurs principales
const indigo = {
  50: "#EEF2FF",
  100: "#E0E7FF",
  200: "#C7D2FE",
  400: "#818CF8",
  500: "#6366F1",
  600: "#4F46E5",
  700: "#4338CA",
  800: "#3730A3",
  900: "#312E81"
};

const violet = {
  50: "#F5F3FF",
  100: "#EDE9FE",
  200: "#DDD6FE",
  400: "#A78BFA",
  500: "#8B5CF6",
  600: "#7C3AED",
  700: "#6D28D9",
  800: "#5B21B6",
  900: "#4C1D95"
};

const emerald = {
  400: "#34D399",
  500: "#10B981",
  600: "#059669"
};

const rose = {
  400: "#FB7185",
  500: "#F43F5E",
  600: "#E11D48"
};

// Ajout d'un dégradé plus prononcé pour le header parallax
const headerGradient = {
  light: `linear-gradient(160deg, ${indigo[400]}, ${violet[500]})`,
  dark: `linear-gradient(160deg, ${indigo[800]}, ${violet[900]})`
};

export const Colors = {
  light: {
    // Couleurs principales avec plus de contraste
    text: "#1F2937",              // Gray-800
    background: "#F3F4F6",        // Gray-100 au lieu de blanc
    tint: indigo[600],           
    
    // Navigation et icônes
    icon: "#4B5563",             // Gray-600 pour plus de contraste
    tabIconDefault: "#6B7280",   // Gray-500
    tabIconSelected: indigo[600],
    
    // Modals et headers
    modalBackground: "#FFFFFF",
    headerBackground: headerGradient.light,
    modalText: "#1F2937",        // Gray-800

    // États et progression
    achievementActive: violet[500],
    achievementInactive: "#D1D5DB", // Gray-300
    success: emerald[500],
    error: rose[500],
    
    // Calendrier
    calendarText: "#374151",      // Gray-700
    calendarDisabled: "#9CA3AF",  // Gray-400
    calendarToday: indigo[100],
    calendarSelected: indigo[600],
    
    // Progress bars et indicateurs
    progressBackground: indigo[100],
    progressFill: indigo[600],
    
    // Éléments supplémentaires
    cardBackground: "#FFFFFF",    // Garde le blanc pour les cartes
    cardBorder: "#E5E7EB",       // Gray-200
    divider: "#E5E7EB",          // Gray-200
    placeholder: "#9CA3AF",      // Gray-400
    highlight: violet[100],
  },
  dark: {
    // Couleurs principales
    text: "#F9FAFB",             // Gray-50
    background: "#111827",       // Gray-900
    tint: indigo[400],
    
    // Navigation et icônes
    icon: "#D1D5DB",            // Gray-300
    tabIconDefault: "#6B7280",  // Gray-500
    tabIconSelected: indigo[400],
    
    // Modals et headers
    modalBackground: "#1F2937",  // Gray-800
    headerBackground: headerGradient.dark,
    modalText: "#F9FAFB",       // Gray-50
    
    // États et progression
    achievementActive: violet[400],
    achievementInactive: "#4B5563", // Gray-600
    success: emerald[400],
    error: rose[400],
    
    // Calendrier
    calendarText: "#E5E7EB",     // Gray-200
    calendarDisabled: "#4B5563", // Gray-600
    calendarToday: indigo[900],
    calendarSelected: indigo[400],
    
    // Progress bars et indicateurs
    progressBackground: "#374151", // Gray-700
    progressFill: indigo[400],
    
    // Éléments supplémentaires
    cardBackground: "#1F2937",    // Gray-800
    cardBorder: "#374151",       // Gray-700
    divider: "#374151",          // Gray-700
    placeholder: "#6B7280",      // Gray-500
    highlight: violet[900],
  },
};