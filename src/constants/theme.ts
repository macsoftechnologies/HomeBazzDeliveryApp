import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  primary: '#6C3AE8', // Official HomeBazz Royal Purple
  primaryDark: '#5122B8', // Deep Purple
  secondary: '#7B52E8', // Logo Bright Purple
  accent: '#F1ECFF', // Light Lavender tint
  accentPurple: '#8257E6',
  background: '#F8F7FF', // Crisp clean background
  card: '#FFFFFF', // Clean White Cards
  primaryText: '#1B1744', // Dark Navy Brand Text
  secondaryText: '#777B9C', // Muted Slate
  border: '#E8E5F5',
  borderLight: '#F0EEFA',
  success: '#22B573', // Green
  successBg: '#E8F8F0',
  error: '#E74C3C', // Red
  errorBg: '#FDEEED',
  warning: '#FF9F24', // Amber
  warningBg: '#FFF7EC',
  info: '#3498DB',
  infoBg: '#EBF5FB',
  white: '#FFFFFF',
  black: '#000000',
  gradientPrimary: ['#6C3AE8', '#5122B8'] as const,
  gradientLogo: ['#9B72F2', '#6C3AE8'] as const,
  gradientLight: ['#F6F3FF', '#EDE8FF'] as const,
  gradientSuccess: ['#2ECC71', '#22B573'] as const,

  // Compatibility with starter template
  light: {
    text: '#1B1744',
    background: '#F8F7FF',
    backgroundElement: '#F1ECFF',
    backgroundSelected: '#6C3AE8',
    textSecondary: '#777B9C',
  },
  dark: {
    text: '#FFFFFF',
    background: '#1B1744',
    backgroundElement: '#26215A',
    backgroundSelected: '#6C3AE8',
    textSecondary: '#A0A4B8',
  },
};

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const Shadows = {
  small: {
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  card: {
    shadowColor: '#1B1744',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  glow: {
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const Typography = {
  titleLarge: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.primaryText,
    letterSpacing: -0.5,
  },
  titleMedium: {
    fontSize: 20,
    fontWeight: '800' as const,
    color: Colors.primaryText,
  },
  titleSmall: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primaryText,
  },
  bodyLarge: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: Colors.primaryText,
    lineHeight: 22,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: Colors.secondaryText,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: Colors.secondaryText,
  },
};
