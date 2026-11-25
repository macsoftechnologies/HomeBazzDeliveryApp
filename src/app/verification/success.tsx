import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { GradientButton } from '@/components/common/GradientButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  LogIn,
  CircleCheck,
} from 'lucide-react-native';

// Multi-color celebratory sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 25, right: 30, size: 14, color: '#FFD700' },
  { id: 2, top: 80, left: 26, size: 12, color: '#38BDF8' },
  { id: 3, top: 150, right: 35, size: 13, color: '#34D399' },
  { id: 4, top: 220, left: 30, size: 11, color: '#F472B6' },
  { id: 5, top: 290, right: 45, size: 12, color: '#FBBF24' },
];

export default function ApprovedSuccessScreen() {
  const insets = useSafeAreaInsets();

  // 1. Concentric halo pulsing animation
  const [pulseAnim] = useState(() => new Animated.Value(1));
  const [haloScale] = useState(() => new Animated.Value(1));

  // 2. Continuous diagonal flash sweep beam across Hero Card
  const [shimmerFlash] = useState(() => new Animated.Value(0));

  // 3. Twinkling sparkles animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Halo & Icon pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(haloScale, {
          toValue: 1.2,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(haloScale, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Shimmer Flash Sweep
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerFlash, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.delay(1200),
        Animated.timing(shimmerFlash, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3. Sparkles twinkle
    Animated.loop(
      Animated.sequence([
        Animated.timing(crackerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(crackerAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim, haloScale, shimmerFlash, crackerAnim]);

  const shimmerTranslateX = shimmerFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 480],
  });

  const crackerScale = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.25],
  });

  const crackerRotate = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const crackerOpacity = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  const handleProceedToLogin = () => {
    // Redirect directly to the login page as requested by user
    router.replace('/auth/login');
  };

  return (
    <ScreenWrapper edges={['top', 'bottom', 'left', 'right']} backgroundColor="#FFFFFF">
      {/* Dynamic Multi-Stop Gradient Background */}
      <LinearGradient
        colors={['#FFFFFF', '#FAF7FF', '#F4EEFF', '#EBE0FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Ambient Pulsing Glow Orbs */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glowOrbTopCenter,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
      <View style={styles.glowOrbBottomCenter} pointerEvents="none" />

      {/* Festive Twinkling Sparkles */}
      {SPARKLE_PARTICLES.map((p) => (
        <Animated.View
          key={p.id}
          pointerEvents="none"
          style={[
            styles.sparkleParticle,
            {
              top: p.top,
              left: p.left,
              right: p.right,
              transform: [{ scale: crackerScale }, { rotate: crackerRotate }],
              opacity: crackerOpacity,
            },
          ]}>
          <Sparkles size={p.size} color={p.color} />
        </Animated.View>
      ))}

      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 20) + 16 }]}>
        <View style={styles.centerSection}>
          {/* Concentric Pulsing Halo Ring */}
          <View style={styles.badgeWrapper}>
            <Animated.View
              style={[
                styles.concentricHaloOuter,
                { transform: [{ scale: haloScale }] },
              ]}
            />
            <Animated.View
              style={[
                styles.concentricHaloMiddle,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />

            {/* Circular Green Checkmark Badge */}
            <View style={styles.successInnerCircle}>
              <LinearGradient
                colors={['#059669', '#10B981', '#34D399']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <Check size={52} color="#FFFFFF" strokeWidth={3.8} />
            </View>
          </View>

          {/* Status Badge */}
          <View style={styles.approvedPill}>
            <CircleCheck size={13} color="#059669" strokeWidth={2.5} />
            <Text style={styles.approvedPillText}>APPLICATION VERIFIED & APPROVED</Text>
          </View>

          {/* Heading requested: Registration Completed Successfully */}
          <Text style={styles.heading}>Registration Completed Successfully!</Text>
          <Text style={styles.subheading}>
            Your HomeBazz delivery partner account has been verified and activated. Please log in with your registered mobile number to start accepting orders.
          </Text>

          {/* Features Card with Flash Shimmer */}
          <View style={styles.cardFeatures}>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.shimmerFlashWrap,
                { transform: [{ translateX: shimmerTranslateX }, { rotate: '25deg' }] },
              ]}>
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0)',
                  'rgba(255, 255, 255, 0.08)',
                  'rgba(255, 255, 255, 0.45)',
                  'rgba(255, 255, 255, 0.85)',
                  'rgba(255, 255, 255, 0.45)',
                  'rgba(255, 255, 255, 0.08)',
                  'rgba(255, 255, 255, 0)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.shimmerFlashBeam}
              />
            </Animated.View>

            <View style={styles.featureRow}>
              <View style={styles.featureIconBox}>
                <ShieldCheck size={18} color="#059669" strokeWidth={2.4} />
              </View>
              <View style={styles.featureTextCol}>
                <Text style={styles.featureTitle}>Government ID & Documents Approved</Text>
                <Text style={styles.featureSub}>Aadhaar, Driving Licence and Vehicle papers verified</Text>
              </View>
            </View>

            <View style={styles.featureRow}>
              <View style={styles.featureIconBox}>
                <Zap size={18} color="#6D28D9" strokeWidth={2.4} />
              </View>
              <View style={styles.featureTextCol}>
                <Text style={styles.featureTitle}>Fleet Partner Account Activated</Text>
                <Text style={styles.featureSub}>Instant order assignments & weekly payouts enabled</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Action: Redirect to Login */}
        <View style={styles.bottomBar}>
          <GradientButton
            title="Login to Partner Account"
            icon={<LogIn size={18} color="#FFFFFF" strokeWidth={2.5} />}
            onPress={handleProceedToLogin}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  glowOrbTopCenter: {
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
  },
  glowOrbBottomCenter: {
    position: 'absolute',
    bottom: -40,
    alignSelf: 'center',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
  },
  sparkleParticle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  centerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeWrapper: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  concentricHaloOuter: {
    position: 'absolute',
    width: 146,
    height: 146,
    borderRadius: 73,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  concentricHaloMiddle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
  },
  successInnerCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  approvedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 12,
  },
  approvedPillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.6,
  },
  heading: {
    fontSize: 23,
    fontWeight: '900',
    color: '#111447',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subheading: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  cardFeatures: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
    gap: 14,
    position: 'relative',
    overflow: 'hidden',
  },
  shimmerFlashWrap: {
    position: 'absolute',
    top: -100,
    bottom: -100,
    width: 80,
  },
  shimmerFlashBeam: {
    flex: 1,
    width: '100%',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  featureTextCol: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E1B4B',
    marginBottom: 2,
  },
  featureSub: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  bottomBar: {
    width: '100%',
  },
});
