import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { Colors, Shadows } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'elevated' | 'flat' | 'outlined' | 'purpleTint';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'elevated',
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'outlined':
        return styles.outlined;
      case 'purpleTint':
        return styles.purpleTint;
      case 'flat':
        return styles.flat;
      default:
        return styles.elevated;
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.base, getVariantStyle(), style]}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.base, getVariantStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
  },
  elevated: {
    ...Shadows.card,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  flat: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  outlined: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: '#FFFFFF',
  },
  purpleTint: {
    backgroundColor: Colors.accent,
    borderWidth: 1,
    borderColor: '#DFD5F8',
  },
});
