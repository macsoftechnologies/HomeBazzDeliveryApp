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
  User,
  CreditCard,
  UserCheck,
  Bike,
  Landmark,
  ShieldCheck,
  Sparkles,
  CircleCheck,
  ArrowRight,
  Check,
  Lock,
} from 'lucide-react-native';

// Multi-color celebration sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 18, right: 30, size: 13, color: '#FFD700' },
  { id: 2, top: 70, left: 26, size: 11, color: '#38BDF8' },
  { id: 3, top: 135, right: 32, size: 12, color: '#34D399' },
  { id: 4, top: 200, left: 30, size: 10, color: '#F472B6' },
  { id: 5, top: 260, right: 44, size: 11, color: '#FBBF24' },
];

interface ReviewItem {
  id: string;
  title: string;
  sub: string;
  icon: any;
  color: string;
  bgColor: string;
}

const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: 'personal',
    title: 'Personal Details',
    sub: 'Rajesh Kumar • Visakhapatnam • +91 9876543210',
    icon: User,
    color: '#6D28D9',
    bgColor: '#EDE9FE',
  },
  {
    id: 'identity',
    title: 'Government Identity Proof',
    sub: 'Aadhaar Card (UIDAI Verified Front & Back)',
    icon: CreditCard,
    color: '#0284C7',
    bgColor: '#E0F2FE',
  },
  {
    id: 'selfie',
    title: 'Biometric Face Verification',
    sub: 'Live Selfie Captured (99.4% AI Face Match)',
    icon: UserCheck,
    color: '#059669',
    bgColor: '#DCFCE7',
  },
  {
    id: 'vehicle',
    title: 'Vehicle & Driving Licence',
    sub: 'Motorbike (AP31CZ4920) • Valid DL & RC Papers',
    icon: Bike,
    color: '#D97706',
    bgColor: '#FEF3C7',
  },
  {
    id: 'bank',
    title: 'Payout Bank Account',
    sub: 'State Bank of India • ****9012 (Penny-Drop Passed)',
    icon: Landmark,
    color: '#7C3AED',
    bgColor: '#F5F3FF',
  },
];

export default function DocumentReviewScreen() {
  const insets = useSafeAreaInsets();

  // 1. Floating ambient orbs pulse
  const [pulseAnim] = useState(() => new Animated.Value(1));

  // 2. Continuous diagonal flash sweep beam across Hero Card
  const [shimmerFlash] = useState(() => new Animated.Value(0));

  // 3. Twinkling sparkles animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

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
  }, [pulseAnim, shimmerFlash, crackerAnim]);

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

      <Header title="Document Review" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom, 24) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Step Progress Tracker */}
        <View style={styles.stepsContainer}>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>1. Personal</Text>
          </View>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>2. Documents</Text>
          </View>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>3. Bank</Text>
          </View>
          <View style={styles.stepActivePill}>
            <View style={styles.activeDot} />
            <Text style={styles.stepActiveText}>4. Review</Text>
          </View>
        </View>

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
              <Text style={styles.heroBadgeText}>FINAL SUBMISSION • APPLICATION REVIEW</Text>
            </View>
            <View style={styles.readyTagBadge}>
              <Text style={styles.readyTagText}>5/5 Ready</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Review Your Application</Text>
          <Text style={styles.heroSubtitle}>
            All your submitted details and documents are verified and ready for compliance approval.
          </Text>
        </View>

        {/* Verification Summary List Section */}
        <View style={styles.summarySection}>
          <Text style={styles.summarySectionTitle}>VERIFICATION CHECKLIST</Text>

          <View style={styles.summaryList}>
            {REVIEW_ITEMS.map((item) => {
              const IconComp = item.icon;
              return (
                <View key={item.id} style={styles.summaryCard}>
                  <View style={[styles.itemIconWrap, { backgroundColor: item.bgColor }]}>
                    <IconComp size={18} color={item.color} strokeWidth={2.4} />
                  </View>

                  <View style={styles.itemInfoCol}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.sub}</Text>
                  </View>

                  <View style={styles.verifiedBadge}>
                    <Check size={12} color="#059669" strokeWidth={3} />
                    <Text style={styles.verifiedBadgeText}>Ready</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Declaration & Privacy Note */}
        <View style={styles.declarationBox}>
          <Lock size={15} color="#6D28D9" strokeWidth={2.2} />
          <Text style={styles.declarationText}>
            By submitting, you confirm that all documents and information provided are authentic and legally valid.
          </Text>
        </View>

        {/* Primary Action Button */}
        <GradientButton
          title="Submit Application for Review"
          icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
          onPress={() => router.push('/verification/status')}
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
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    alignSelf: 'center',
  },
  stepDonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 10,
  },
  stepDoneText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  stepActivePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#6D28D9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
  },
  stepActiveText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
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
  readyTagBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  readyTagText: {
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
  summarySection: {
    marginBottom: 16,
  },
  summarySectionTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  summaryList: {
    gap: 10,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  itemIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfoCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E1B4B',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    lineHeight: 15,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  declarationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F5F3FF',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 18,
  },
  declarationText: {
    fontSize: 11.5,
    color: '#5B21B6',
    flex: 1,
    lineHeight: 16,
    fontWeight: '600',
  },
  continueBtn: {
    width: '100%',
  },
});
