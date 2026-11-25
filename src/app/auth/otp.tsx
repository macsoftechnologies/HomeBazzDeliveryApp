import { GradientButton } from '@/components/common/GradientButton';
import { Header } from '@/components/common/Header';
import { OtpInput } from '@/components/common/OtpInput';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { SuccessToast } from '@/components/common/SuccessToast';
import { useApp } from '@/context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  ArrowRight,
  CircleCheck,
  Clock,
  Lock,
  MessageSquare,
  Pencil,
  RotateCw,
  ShieldCheck,
  Sparkles,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Multi-color ambient celebration sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 20, right: 30, size: 14, color: '#FFD700' },
  { id: 2, top: 70, left: 25, size: 12, color: '#38BDF8' },
  { id: 3, top: 140, right: 28, size: 13, color: '#34D399' },
  { id: 4, top: 210, left: 32, size: 11, color: '#F472B6' },
  { id: 5, top: 270, right: 40, size: 10, color: '#FBBF24' },
];

export default function OtpVerificationScreen() {
  const insets = useSafeAreaInsets();
  const { regProgress, setRegProgress } = useApp();
  const [otp, setOtp] = useState('426391');
  const [timeLeft, setTimeLeft] = useState(28);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  // 1. Concentric halo pulsing animation
  const [pulseAnim] = useState(() => new Animated.Value(1));
  const [haloScale] = useState(() => new Animated.Value(1));

  // 2. Diagonal flash sweep beam across OTP Card
  const [shimmerFlash] = useState(() => new Animated.Value(0));

  // 3. Twinkling sparkles animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

  // 4. Pulsing dot for auto-reading SMS
  const [dotPulse] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    // 1. Halo & Icon pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(haloScale, {
          toValue: 1.22,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(haloScale, {
          toValue: 1,
          duration: 2000,
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
        Animated.delay(1400),
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

    // 4. Auto-detect dot pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotPulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(dotPulse, {
          toValue: 0.35,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim, haloScale, shimmerFlash, crackerAnim, dotPulse]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

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

  const handleVerify = () => {
    if (otp.length < 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }
    setError('');
    setRegProgress((prev) => ({ ...prev, otpVerified: true }));
    setShowToast(true);
    setTimeout(() => {
      router.push('/auth/personal-details');
    }, 1100);
  };

  const handleResend = () => {
    setTimeLeft(30);
    setError('');
  };

  const formattedMobile = regProgress.mobile || '9876543210';

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      {/* Success Toast Notification */}
      <SuccessToast
        visible={showToast}
        title="Mobile Verified!"
        message="OTP verified successfully. Loading profile setup..."
        type="success"
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
          styles.glowOrbTopCenter,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
      <View style={styles.glowOrbBottomRight} pointerEvents="none" />

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

      <Header title="Verify Mobile" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom, 24) + 16 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Step 2 Progress Pill */}
        <View style={styles.stepBadge}>
          <View style={styles.stepDot} />
          <Text style={styles.stepText}>STEP 2 OF 4: PHONE VERIFICATION</Text>
        </View>

        {/* Center-Aligned Animated Security Badge */}
        <View style={styles.centerShieldArea}>
          {/* Concentric Halo Outer Ring */}
          <Animated.View
            style={[
              styles.concentricHaloOuter,
              { transform: [{ scale: haloScale }] },
            ]}
          />
          {/* Concentric Halo Middle Ring */}
          <Animated.View
            style={[
              styles.concentricHaloMiddle,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />

          {/* Central Circular Gradient Shield Badge */}
          <View style={styles.shieldBadge}>
            <LinearGradient
              colors={['#4318B4', '#6D28D9', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
            <ShieldCheck size={38} color="#FFFFFF" strokeWidth={2.4} />
          </View>
        </View>

        {/* Center Title & Recipient Pill */}
        <View style={styles.titleBlock}>
          <Text style={styles.titlePrimary}>Enter 6-Digit Code</Text>
          <Text style={styles.subtitle}>
            We have sent a one-time verification code to
          </Text>

          {/* Interactive Recipient Pill with Edit Action */}
          <TouchableOpacity
            style={styles.phonePill}
            onPress={() => router.back()}
            activeOpacity={0.75}>
            <Text style={styles.phonePillText}>🇮🇳 +91 {formattedMobile}</Text>
            <View style={styles.editIconBadge}>
              <Pencil size={11} color="#6D28D9" strokeWidth={2.4} />
              <Text style={styles.editText}>Change</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Elevated Frosted Verification Card */}
        <View style={styles.verifyCard}>
          {/* Flash Shimmer Beam Sweep Across Card */}
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

          {/* Auto-detect SMS Live Indicator Chip */}
          <View style={styles.autoDetectChip}>
            <Animated.View style={[styles.pulseDot, { opacity: dotPulse }]} />
            <Text style={styles.autoDetectText}>Auto-detecting SMS verification code...</Text>
          </View>

          {/* Responsive Centered 6-Digit OtpInput */}
          <OtpInput length={6} value={otp} onChange={(val) => {
            setOtp(val);
            if (error) setError('');
          }} />

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Timer & Resend Row (with vibrant colors) */}
          <View style={styles.timerSection}>
            {timeLeft > 0 ? (
              <View style={styles.timerPill}>
                <Clock size={13} color="#D97706" strokeWidth={2.4} />
                <Text style={styles.timerText}>
                  Resend code in{' '}
                  <Text style={styles.timerSec}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </Text>
                </Text>
              </View>
            ) : (
              <View style={styles.resendActionsRow}>
                {/* 1. Purple SMS Resend Pill */}
                <TouchableOpacity
                  style={[styles.resendActionBtn, styles.resendBtnSms]}
                  onPress={handleResend}
                  activeOpacity={0.75}>
                  <RotateCw size={13} color="#6D28D9" strokeWidth={2.4} />
                  <Text style={styles.resendSmsText}>Resend via SMS</Text>
                </TouchableOpacity>

                {/* 2. WhatsApp Emerald Resend Pill */}
                <TouchableOpacity
                  style={[styles.resendActionBtn, styles.resendBtnWhatsapp]}
                  onPress={handleResend}
                  activeOpacity={0.75}>
                  <MessageSquare size={13} color="#059669" strokeWidth={2.4} />
                  <Text style={styles.resendWhatsappText}>Get via WhatsApp</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Primary Action Button */}
          <GradientButton
            title="Verify & Proceed"
            icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
            onPress={handleVerify}
            style={styles.verifyBtn}
          />

          {/* Instant Verification Features */}
          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <CircleCheck size={12} color="#059669" />
              <Text style={styles.featureText}>Instant Activation</Text>
            </View>
            <View style={styles.featureDot} />
            <View style={styles.featureItem}>
              <Lock size={12} color="#6D28D9" />
              <Text style={styles.featureText}>256-Bit Encrypted</Text>
            </View>
            <View style={styles.featureDot} />
            <View style={styles.featureItem}>
              <CircleCheck size={12} color="#D97706" />
              <Text style={styles.featureText}>Safe & Secure</Text>
            </View>
          </View>
        </View>

        {/* Bottom Support & Help Redirect */}
        <View style={styles.supportBlock}>
          <Text style={styles.supportText}>Having trouble receiving the code? </Text>
          <TouchableOpacity onPress={() => router.push('/support')} activeOpacity={0.7}>
            <Text style={styles.supportLink}>Partner Help Desk</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  glowOrbBottomRight: {
    position: 'absolute',
    bottom: -40,
    right: -40,
    width: 250,
    height: 250,
    borderRadius: 125,
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
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  stepBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 12,
    paddingVertical: 4.5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 16,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6D28D9',
  },
  stepText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6D28D9',
    letterSpacing: 0.8,
  },
  centerShieldArea: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 130,
    marginBottom: 14,
  },
  concentricHaloOuter: {
    position: 'absolute',
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.15)',
  },
  concentricHaloMiddle: {
    position: 'absolute',
    width: 102,
    height: 102,
    borderRadius: 51,
    backgroundColor: 'rgba(124, 58, 237, 0.14)',
  },
  shieldBadge: {
    width: 78,
    height: 78,
    borderRadius: 39,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titlePrimary: {
    fontSize: 23,
    fontWeight: '900',
    color: '#111447',
    letterSpacing: -0.3,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 10,
  },
  phonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  phonePillText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  editIconBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F3EEFF',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 10,
  },
  editText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6D28D9',
  },
  verifyCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 22,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 7,
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
  autoDetectChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginBottom: 8,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#059669',
  },
  autoDetectText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginVertical: 6,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  timerSection: {
    alignItems: 'center',
    marginVertical: 12,
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  timerText: {
    fontSize: 12.5,
    color: '#92400E',
    fontWeight: '600',
  },
  timerSec: {
    fontWeight: '800',
    color: '#B45309',
  },
  resendActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resendActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
  },
  resendBtnSms: {
    backgroundColor: '#F5F3FF',
    borderColor: '#DDD6FE',
  },
  resendBtnWhatsapp: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  resendSmsText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6D28D9',
  },
  resendWhatsappText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  verifyBtn: {
    width: '100%',
    marginTop: 6,
  },
  featuresRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#CBD5E1',
  },
  featureText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#64748B',
  },
  supportBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  supportText: {
    fontSize: 12.5,
    color: '#64748B',
  },
  supportLink: {
    fontSize: 12.5,
    color: '#6D28D9',
    fontWeight: '800',
  },
});
