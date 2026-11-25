import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  PhoneCall,
} from 'lucide-react-native';

// Multi-color celebration sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 18, right: 30, size: 13, color: '#FFD700' },
  { id: 2, top: 70, left: 26, size: 11, color: '#38BDF8' },
  { id: 3, top: 135, right: 32, size: 12, color: '#34D399' },
  { id: 4, top: 200, left: 30, size: 10, color: '#F472B6' },
  { id: 5, top: 260, right: 44, size: 11, color: '#FBBF24' },
];

export default function VerificationStatusScreen() {
  const insets = useSafeAreaInsets();

  // 1. Floating ambient orbs pulse
  const [pulseAnim] = useState(() => new Animated.Value(1));

  // 2. Continuous diagonal flash sweep beam across Hero Card
  const [shimmerFlash] = useState(() => new Animated.Value(0));

  // 3. Twinkling sparkles animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

  // 4. In-progress clock rotate/pulse
  const [inProgressPulse] = useState(() => new Animated.Value(1));

  useEffect(() => {
    // 1. Ambient pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
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

    // 4. In-progress pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(inProgressPulse, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(inProgressPulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim, shimmerFlash, crackerAnim, inProgressPulse]);

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

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
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
          styles.glowOrbTopRight,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
      <View style={styles.glowOrbBottomLeft} pointerEvents="none" />

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

      <Header title="Verification Status" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom, 24) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Dynamic Hero Card with Flash Shimmer */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={['#2E1065', '#4C1D95', '#6D28D9', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Flash Shimmer Beam Sweep */}
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

          <View style={styles.heroTopRow}>
            <View style={styles.heroBadge}>
              <ShieldCheck size={11} color="#34D399" strokeWidth={2.5} />
              <Text style={styles.heroBadgeText}>COMPLIANCE TEAM • APPLICATION PROGRESS</Text>
            </View>
            <View style={styles.reviewBadge}>
              <Text style={styles.reviewBadgeText}>In Review</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Application Under Review</Text>
          <Text style={styles.heroSubtitle}>
            Your documents are being processed by our safety compliance team for fleet authorization.
          </Text>
        </View>

        {/* Stepper Timeline Card */}
        <View style={styles.timelineCard}>
          <Text style={styles.timelineHeader}>VERIFICATION TIMELINE</Text>

          {/* Step 1: Completed */}
          <View style={styles.stepRow}>
            <View style={styles.indicatorCol}>
              <View style={[styles.circle, styles.circleDone]}>
                <Check size={16} color="#FFFFFF" strokeWidth={3} />
              </View>
              <View style={[styles.timelineLine, styles.lineDone]} />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Registration & Personal Details</Text>
              <Text style={styles.stepSubtitle}>Mobile, legal profile & contact verified</Text>
              <View style={styles.statusPillGreen}>
                <Check size={10} color="#059669" strokeWidth={3} />
                <Text style={styles.statusTextGreen}>Completed</Text>
              </View>
            </View>
          </View>

          {/* Step 2: Completed */}
          <View style={styles.stepRow}>
            <View style={styles.indicatorCol}>
              <View style={[styles.circle, styles.circleDone]}>
                <Check size={16} color="#FFFFFF" strokeWidth={3} />
              </View>
              <View style={[styles.timelineLine, styles.lineDone]} />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitle}>Government ID & Vehicle Papers</Text>
              <Text style={styles.stepSubtitle}>Aadhaar, Driving Licence & RC uploaded</Text>
              <View style={styles.statusPillGreen}>
                <Check size={10} color="#059669" strokeWidth={3} />
                <Text style={styles.statusTextGreen}>Uploaded</Text>
              </View>
            </View>
          </View>

          {/* Step 3: In Review (Active) */}
          <View style={styles.stepRow}>
            <View style={styles.indicatorCol}>
              <Animated.View
                style={[
                  styles.circle,
                  styles.circleActive,
                  { transform: [{ scale: inProgressPulse }] },
                ]}>
                <Clock size={16} color="#FFFFFF" strokeWidth={2.4} />
              </Animated.View>
              <View style={styles.timelineLine} />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitleActive}>Safety & Background Verification</Text>
              <Text style={styles.stepSubtitle}>AI face match & transport compliance check</Text>
              <View style={styles.statusPillPurple}>
                <Clock size={10} color="#6D28D9" strokeWidth={2.4} />
                <Text style={styles.statusTextPurple}>In Progress</Text>
              </View>
            </View>
          </View>

          {/* Step 4: Pending */}
          <View style={styles.stepRow}>
            <View style={styles.indicatorCol}>
              <View style={styles.circle}>
                <View style={styles.pendingDot} />
              </View>
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTitleMuted}>Fleet Account Activation</Text>
              <Text style={styles.stepSubtitle}>Driver account login & order assignment enabled</Text>
              <View style={styles.statusPillMuted}>
                <Text style={styles.statusTextMuted}>Pending</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Processing Estimate Box */}
        <View style={styles.estimateBox}>
          <Sparkles size={16} color="#6D28D9" />
          <Text style={styles.estimateText}>
            Usually approved within <Text style={styles.estimateBold}>2–4 hours</Text>. You will receive an SMS and WhatsApp notification once active.
          </Text>
        </View>

        {/* Support Help Strip */}
        <View style={styles.supportRow}>
          <PhoneCall size={14} color="#6D28D9" />
          <Text style={styles.supportText}>
            Need expedited onboarding? Contact <Text style={styles.supportLink}>Partner Help Desk</Text>
          </Text>
        </View>

        {/* Fast-Track Demo Approval Button */}
        <GradientButton
          title="Fast-Track Approval (Demo Mode)"
          icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
          onPress={() => router.push('/verification/success')}
          style={styles.continueBtn}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  glowOrbTopRight: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  glowOrbBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: -50,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  sparkleParticle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  heroCard: {
    borderRadius: 24,
    padding: 18,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(167, 139, 250, 0.4)',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
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
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  heroBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  reviewBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  reviewBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: 18,
  },
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  timelineHeader: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  indicatorCol: {
    alignItems: 'center',
    width: 38,
    marginRight: 10,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  circleDone: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  circleActive: {
    backgroundColor: '#6D28D9',
    borderColor: '#8B5CF6',
    borderWidth: 2,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  pendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#94A3B8',
  },
  timelineLine: {
    width: 2.5,
    flex: 1,
    minHeight: 28,
    backgroundColor: '#E2E8F0',
    marginVertical: 4,
  },
  lineDone: {
    backgroundColor: '#059669',
  },
  stepInfo: {
    flex: 1,
    paddingBottom: 14,
  },
  stepTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  stepTitleActive: {
    fontSize: 14,
    fontWeight: '900',
    color: '#6D28D9',
  },
  stepTitleMuted: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#64748B',
  },
  stepSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 6,
  },
  statusPillGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  statusTextGreen: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  statusPillPurple: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  statusTextPurple: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6D28D9',
  },
  statusPillMuted: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusTextMuted: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  estimateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F5F3FF',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 14,
  },
  estimateText: {
    fontSize: 11.5,
    color: '#5B21B6',
    flex: 1,
    lineHeight: 16,
    fontWeight: '600',
  },
  estimateBold: {
    fontWeight: '900',
    color: '#371388',
  },
  supportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
  },
  supportText: {
    fontSize: 11.5,
    color: '#64748B',
  },
  supportLink: {
    fontWeight: '800',
    color: '#6D28D9',
  },
  continueBtn: {
    width: '100%',
  },
});
