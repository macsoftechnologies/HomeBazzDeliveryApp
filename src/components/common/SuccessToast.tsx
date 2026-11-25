import React, { useEffect, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CircleCheck, Sparkles, AlertCircle } from 'lucide-react-native';

export interface SuccessToastProps {
  visible: boolean;
  title: string;
  message?: string;
  type?: 'success' | 'welcome' | 'otp' | 'info';
  onDismiss?: () => void;
  duration?: number;
}

export function SuccessToast({
  visible,
  title,
  message,
  type = 'success',
  onDismiss,
  duration = 2200,
}: SuccessToastProps) {
  const insets = useSafeAreaInsets();
  const [translateY] = useState(() => new Animated.Value(-120));
  const [opacity] = useState(() => new Animated.Value(0));
  const [scale] = useState(() => new Animated.Value(0.9));
  const [pulseAnim] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (!visible) return;

    translateY.setValue(-120);
    opacity.setValue(0);
    scale.setValue(0.9);

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: insets.top + 12,
        damping: 14,
        stiffness: 140,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -120,
          duration: 240,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss?.();
      });
    }, duration);

    return () => {
      clearTimeout(timer);
      pulseLoop.stop();
    };
  }, [visible, insets.top, translateY, opacity, scale, pulseAnim, duration, onDismiss]);

  if (!visible) {
    return null;
  }

  // Color schemes based on type
  const getGradientColors = (): [string, string, ...string[]] => {
    switch (type) {
      case 'welcome':
      case 'otp':
        return ['#1E1B4B', '#4C1D95', '#6D28D9']; // Royal Indigo Purple
      case 'info':
        return ['#0F172A', '#1E293B', '#334155']; // Slate Dark
      case 'success':
      default:
        return ['#064E3B', '#047857', '#059669']; // Emerald Forest Green
    }
  };

  const getBadgeBg = () => {
    switch (type) {
      case 'welcome':
      case 'otp':
        return '#8B5CF6';
      case 'info':
        return '#38BDF8';
      case 'success':
      default:
        return '#10B981';
    }
  };

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.container,
        {
          transform: [{ translateY }, { scale }],
          opacity,
        },
      ]}>
      <View style={styles.cardWrapper}>
        <LinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}>
          {/* Subtle Glow Overlay */}
          <View style={styles.glowTop} />

          {/* Left Animated Icon Badge */}
          <Animated.View
            style={[
              styles.iconBadge,
              { backgroundColor: getBadgeBg(), transform: [{ scale: pulseAnim }] },
            ]}>
            {type === 'otp' ? (
              <Sparkles size={18} color="#FFFFFF" strokeWidth={2.5} />
            ) : type === 'info' ? (
              <AlertCircle size={18} color="#FFFFFF" strokeWidth={2.5} />
            ) : (
              <CircleCheck size={18} color="#FFFFFF" strokeWidth={2.5} />
            )}
          </Animated.View>

          {/* Message Content */}
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.titleText}>{title}</Text>
              <Sparkles size={12} color="#FBBF24" strokeWidth={2.5} />
            </View>
            {message ? <Text style={styles.messageText}>{message}</Text> : null}
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    top: 0,
    zIndex: 99999,
    alignItems: 'center',
    elevation: 24,
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 18,
    elevation: 16,
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.22)',
    overflow: 'hidden',
  },
  glowTop: {
    position: 'absolute',
    top: -30,
    right: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  messageText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.88)',
    marginTop: 2,
    lineHeight: 16,
  },
});
