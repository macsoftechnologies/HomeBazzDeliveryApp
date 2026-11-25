import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'purple';
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'purple',
  size = 'small',
  style,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: Colors.successBg, text: Colors.success };
      case 'warning':
        return { bg: Colors.warningBg, text: Colors.warning };
      case 'error':
        return { bg: Colors.errorBg, text: Colors.error };
      case 'info':
        return { bg: Colors.infoBg, text: Colors.info };
      default:
        return { bg: Colors.accent, text: Colors.primary };
    }
  };

  const { bg, text } = getColors();

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg },
        size === 'medium' ? styles.medium : styles.small,
        style,
      ]}>
      <Text
        style={[
          styles.text,
          { color: text },
          size === 'medium' ? styles.textMedium : styles.textSmall,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  medium: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  text: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  textSmall: {
    fontSize: 10,
    letterSpacing: 0.5,
  },
  textMedium: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
