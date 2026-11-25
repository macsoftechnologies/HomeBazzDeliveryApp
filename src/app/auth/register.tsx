import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { GradientButton } from '@/components/common/GradientButton';
import { HomeBazzLogo } from '@/components/common/HomeBazLogo';
import { SuccessToast } from '@/components/common/SuccessToast';
import { Colors } from '@/constants/theme';
import {
  Phone,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Bike,
  CircleCheck,
  Zap,
} from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Multi-color festive celebration particles
const SPARKLE_PARTICLES = [
  { id: 1, top: 12, right: 28, size: 14, color: '#FFD700' },
  { id: 2, top: 50, left: 24, size: 11, color: '#38BDF8' },
  { id: 3, top: 115, right: 32, size: 13, color: '#34D399' },
  { id: 4, top: 160, left: 28, size: 10, color: '#F472B6' },
  { id: 5, top: 220, right: 60, size: 11, color: '#FBBF24' },
];

export default function MobileRegistrationScreen() {
  const insets = useSafeAreaInsets();
  const { regProgress, setRegProgress } = useApp();
  const [phone, setPhone] = useState(regProgress.mobile || '9876543210');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  // 1. Floating ambient orbs pulse animation
  const [pulseAnim] = useState(() => new Animated.Value(1));

  // 2. Continuous diagonal flash sweep beam across Hero card
  const [shimmerFlash] = useState(() => new Animated.Value(0));

  // 3. Delivery driver micro-transit across the road
  const [driverMove] = useState(() => new Animated.Value(0));

  // 4. Moving road dashes
  const [roadDashAnim] = useState(() => new Animated.Value(0));

  // 5. Festive cracker & sparkles twinkle animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Ambient pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2400,
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

    // 3. Driver transit animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(driverMove, {
          toValue: 1,
          duration: 4800,
          useNativeDriver: true,
        }),
        Animated.timing(driverMove, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 4. Road dashes speed loop
    Animated.loop(
      Animated.timing(roadDashAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      })
    ).start();

    // 5. Sparkles twinkle
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
  }, [pulseAnim, shimmerFlash, driverMove, roadDashAnim, crackerAnim]);

  const shimmerTranslateX = shimmerFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 480],
  });

  const bikeTranslateX = driverMove.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, SCREEN_WIDTH - 60],
  });

  const roadTranslateX = roadDashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -28],
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

  const isValidPhone = phone.trim().length === 10;

  const handleSendOtp = () => {
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setRegProgress((prev) => ({ ...prev, mobile: phone }));
    setShowToast(true);
    setTimeout(() => {
      router.push('/auth/otp');
    }, 1100);
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      {/* Success Toast Notification */}
      <SuccessToast
        visible={showToast}
        title="OTP Sent Successfully!"
        message={`We sent a 6-digit verification code to +91 ${phone}`}
        type="otp"
      />

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

      <Header title="Partner Registration" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 24) + 16 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Top Logo & Onboarding Step Progress Tracker */}
        <View style={styles.topLogoSection}>
          <HomeBazzLogo size="small" showSubtitle={false} />
          
          {/* 4-Step Visual Progress Bar */}
          <View style={styles.stepsContainer}>
            <View style={styles.stepPillActive}>
              <View style={styles.stepDotActive} />
              <Text style={styles.stepTextActive}>1. Mobile</Text>
            </View>
            <View style={styles.stepPillInactive}>
              <Text style={styles.stepTextInactive}>2. OTP</Text>
            </View>
            <View style={styles.stepPillInactive}>
              <Text style={styles.stepTextInactive}>3. Details</Text>
            </View>
            <View style={styles.stepPillInactive}>
              <Text style={styles.stepTextInactive}>4. Docs</Text>
            </View>
          </View>
        </View>

        {/* Dynamic Hero Transit Card with Flash Shimmer & Bike Motion */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={['#2E1065', '#4C1D95', '#6D28D9', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Flash Shimmer Beam Sweep Across Hero Card */}
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

          {/* Hero Content Header */}
          <View style={styles.heroHeaderRow}>
            <View style={styles.heroTagBadge}>
              <Zap size={11} color="#FBBF24" strokeWidth={2.6} />
              <Text style={styles.heroTagText}>⚡ QUICK 3-MIN ONBOARDING</Text>
            </View>
            <View style={styles.heroRatingBadge}>
              <Text style={styles.heroRatingText}>⭐ 4.9 Fleet Rating</Text>
            </View>
          </View>

          <Text style={styles.heroHeading}>Become a Delivery Hero</Text>
          <Text style={styles.heroSubheading}>
            Earn up to <Text style={styles.heroEarningHighlight}>₹35,000+/mo</Text> with guaranteed daily instant payouts & surge incentives.
          </Text>

          {/* Road Speed Strip with Animated Transit Bike */}
          <View style={styles.roadTrack}>
            <Animated.View
              style={[
                styles.roadDashesContainer,
                { transform: [{ translateX: roadTranslateX }] },
              ]}>
              {Array.from({ length: 22 }).map((_, i) => (
                <View key={i} style={styles.roadDash} />
              ))}
            </Animated.View>

            {/* Micro Delivery Bike with Trail Light */}
            <Animated.View
              style={[
                styles.bikeDriver,
                { transform: [{ translateX: bikeTranslateX }] },
              ]}>
              <View style={styles.bikeHalo} />
              <Bike size={20} color="#FBBF24" strokeWidth={2.4} />
            </Animated.View>
          </View>
        </View>

        {/* Elevated Frosted Form Card */}
        <View style={styles.formCard}>
          <View style={styles.formCardHeader}>
            <Text style={styles.formTitle}>Enter Mobile Number</Text>
            <Text style={styles.formDesc}>
              We will send a 6-digit verification code to confirm your number.
            </Text>
          </View>

          {/* Upgraded Mobile Number Input */}
          <Input
            label="10-Digit Mobile Number"
            placeholder="98765 43210"
            keyboardType="phone-pad"
            maxLength={10}
            prefix="🇮🇳 +91"
            value={phone}
            onChangeText={(txt) => {
              setPhone(txt.replace(/[^0-9]/g, ''));
              if (error) setError('');
            }}
            error={error}
            leftIcon={<Phone size={18} color={isValidPhone ? '#059669' : Colors.primary} />}
            rightIcon={
              isValidPhone ? (
                <CircleCheck size={18} color="#059669" />
              ) : undefined
            }
          />

          {/* Partner Advantages: Compact Single-Line Highlights */}
          <View style={styles.benefitsSection}>
            <Text style={styles.benefitsSectionTitle}>PARTNER ADVANTAGES</Text>

            {/* 1. Emerald Green Single-Line Card */}
            <View style={[styles.benefitSingleRow, styles.benefitRowEmerald]}>
              <View style={[styles.miniIconBox, styles.miniIconEmerald]}>
                <TrendingUp size={14} color="#059669" strokeWidth={2.4} />
              </View>
              <Text style={[styles.singleLineText, styles.textEmerald]} numberOfLines={1}>
                Daily Instant Payouts directly to your bank account
              </Text>
            </View>

            {/* 2. Warm Amber Single-Line Card */}
            <View style={[styles.benefitSingleRow, styles.benefitRowAmber]}>
              <View style={[styles.miniIconBox, styles.miniIconAmber]}>
                <Clock size={14} color="#D97706" strokeWidth={2.4} />
              </View>
              <Text style={[styles.singleLineText, styles.textAmber]} numberOfLines={1}>
                Flexible Self-Chosen Shifts — Work anytime you want
              </Text>
            </View>

            {/* 3. Royal Violet Single-Line Card */}
            <View style={[styles.benefitSingleRow, styles.benefitRowViolet]}>
              <View style={[styles.miniIconBox, styles.miniIconViolet]}>
                <ShieldCheck size={14} color="#6D28D9" strokeWidth={2.4} />
              </View>
              <Text style={[styles.singleLineText, styles.textViolet]} numberOfLines={1}>
                ₹5,00,000 Free Accidental & Medical Insurance Cover
              </Text>
            </View>
          </View>

          {/* Primary Action Button */}
          <GradientButton
            title="Send Verification Code"
            icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
            onPress={handleSendOtp}
            style={styles.submitBtn}
          />
        </View>

        {/* Bottom Login Redirect Strip */}
        <View style={styles.bottomBlock}>
          <View style={styles.loginRedirect}>
            <Text style={styles.redirectText}>Already registered as a partner? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')} activeOpacity={0.7}>
              <Text style={styles.loginLink}>Login Here</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.termsNote}>
            By continuing, you agree to HomeBazz Express Partner Terms & Policies
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  glowOrbTopRight: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  glowOrbBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
  },
  sparkleParticle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  topLogoSection: {
    alignItems: 'center',
    marginBottom: 12,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ECE4FF',
  },
  stepPillActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#6D28D9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  stepDotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
  },
  stepTextActive: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepPillInactive: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stepTextInactive: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
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
  heroHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heroTagBadge: {
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
  heroTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  heroRatingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  heroRatingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroHeading: {
    fontSize: 21,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  heroSubheading: {
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: 18,
    marginBottom: 14,
  },
  heroEarningHighlight: {
    fontWeight: '900',
    color: '#FDE047',
  },
  roadTrack: {
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 15,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  roadDashesContainer: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 1.5,
    alignItems: 'center',
    gap: 12,
  },
  roadDash: {
    width: 14,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
    borderRadius: 2,
  },
  bikeDriver: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bikeHalo: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(251, 191, 36, 0.22)',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 6,
    marginBottom: 18,
  },
  formCardHeader: {
    marginBottom: 14,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111447',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  formDesc: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 17,
  },
  benefitsSection: {
    marginTop: 10,
    marginBottom: 16,
    gap: 8,
  },
  benefitsSectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  benefitSingleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 13,
    borderWidth: 1.2,
    gap: 10,
  },
  benefitRowEmerald: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  benefitRowAmber: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  benefitRowViolet: {
    backgroundColor: '#F5F3FF',
    borderColor: '#DDD6FE',
  },
  miniIconBox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniIconEmerald: {
    backgroundColor: '#DCFCE7',
  },
  miniIconAmber: {
    backgroundColor: '#FEF3C7',
  },
  miniIconViolet: {
    backgroundColor: '#EDE9FE',
  },
  singleLineText: {
    fontSize: 12,
    fontWeight: '700',
    flex: 1,
  },
  textEmerald: {
    color: '#065F46',
  },
  textAmber: {
    color: '#92400E',
  },
  textViolet: {
    color: '#5B21B6',
  },
  submitBtn: {
    width: '100%',
  },
  bottomBlock: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  loginRedirect: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redirectText: {
    fontSize: 13.5,
    color: '#64748B',
    fontWeight: '500',
  },
  loginLink: {
    fontSize: 13.5,
    color: '#6D28D9',
    fontWeight: '800',
  },
  termsNote: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 15,
  },
});
