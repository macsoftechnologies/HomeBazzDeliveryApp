import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Shadows } from '@/constants/theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
  icon,
}) => {
  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.outlineBtn, disabled && styles.disabled, style]}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator color={Colors.primary} size="small" />
        ) : (
          <View style={styles.contentRow}>
            {icon && <View style={styles.iconWrap}>{icon}</View>}
            <Text style={[styles.outlineText, textStyle]}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.secondaryBtn, disabled && styles.disabled, style]}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator color={Colors.primary} size="small" />
        ) : (
          <View style={styles.contentRow}>
            {icon && <View style={styles.iconWrap}>{icon}</View>}
            <Text style={[styles.secondaryText, textStyle]}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === 'danger') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.dangerBtn, disabled && styles.disabled, style]}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.contentRow}>
            {icon && <View style={styles.iconWrap}>{icon}</View>}
            <Text style={[styles.primaryText, textStyle]}>{title}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.container, disabled && styles.disabled, style]}
      activeOpacity={0.85}>
      <LinearGradient
        colors={Colors.gradientPrimary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.contentRow}>
            {icon && <View style={styles.iconWrap}>{icon}</View>}
            <Text style={[styles.primaryText, textStyle]}>{title}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: 'hidden',
    ...Shadows.glow,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    marginRight: 8,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  secondaryBtn: {
    backgroundColor: Colors.accent,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  outlineBtn: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  outlineText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  dangerBtn: {
    backgroundColor: Colors.error,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
