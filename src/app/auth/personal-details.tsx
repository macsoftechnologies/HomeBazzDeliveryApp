import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { GradientButton } from '@/components/common/GradientButton';
import { SuccessToast } from '@/components/common/SuccessToast';
import { Colors } from '@/constants/theme';
import {
  User,
  Calendar,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Info,
  CircleCheck,
} from 'lucide-react-native';
import { useApp } from '@/context/AppContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Multi-color celebratory sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 18, right: 30, size: 13, color: '#FFD700' },
  { id: 2, top: 65, left: 26, size: 11, color: '#38BDF8' },
  { id: 3, top: 130, right: 35, size: 12, color: '#34D399' },
  { id: 4, top: 190, left: 30, size: 10, color: '#F472B6' },
  { id: 5, top: 250, right: 45, size: 11, color: '#FBBF24' },
];

export default function PersonalDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { partnerProfile, updateProfile, setRegProgress } = useApp();
  const [fullName, setFullName] = useState(partnerProfile.name || 'Rajesh Kumar');
  const [dob, setDob] = useState(partnerProfile.dob || '12/04/1995');
  const [email, setEmail] = useState(partnerProfile.email || 'rajesh.express@gmail.com');
  const [city, setCity] = useState(partnerProfile.city || 'Visakhapatnam');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showToast, setShowToast] = useState(false);

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

  const validate = () => {
    const err: { [key: string]: string } = {};
    if (!fullName.trim()) err.name = 'Please enter your full legal name';
    if (!dob.trim()) err.dob = 'Please enter date of birth';
    if (!city.trim()) err.city = 'Please enter your operating city';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;
    updateProfile({ name: fullName, dob, email, city });
    setRegProgress((prev) => ({ ...prev, personalInfoFilled: true }));
    setShowToast(true);
    setTimeout(() => {
      router.push('/verification/identity');
    }, 1100);
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      {/* Success Toast Notification */}
      <SuccessToast
        visible={showToast}
        title="Personal Details Saved!"
        message="Loading Aadhaar & identity verification step..."
        type="welcome"
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

      <Header title="Personal Details" showBack />

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
            <Text style={styles.stepDoneText}>1. Mobile</Text>
          </View>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>2. OTP</Text>
          </View>
          <View style={styles.stepActivePill}>
            <View style={styles.activeDot} />
            <Text style={styles.stepActiveText}>3. Details</Text>
          </View>
          <View style={styles.stepInactivePill}>
            <Text style={styles.stepInactiveText}>4. Docs</Text>
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
              <Text style={styles.heroBadgeText}>STEP 3 OF 4 • BASIC INFORMATION</Text>
            </View>
            <View style={styles.privacyBadge}>
              <Text style={styles.privacyBadgeText}>🔒 100% Private</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Tell Us About Yourself</Text>
          <Text style={styles.heroSubtitle}>
            Please provide your official legal name and contact details exactly as printed on your government ID.
          </Text>
        </View>

        {/* Elevated Frosted Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.formSectionHeader}>LEGAL PROFILE DETAILS</Text>

          {/* Full Legal Name */}
          <Input
            label="Full Legal Name *"
            placeholder="e.g. Rajesh Kumar"
            value={fullName}
            onChangeText={(txt) => {
              setFullName(txt);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            leftIcon={<User size={18} color={Colors.primary} />}
          />

          {/* Date of Birth */}
          <Input
            label="Date of Birth (DD/MM/YYYY) *"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChangeText={(txt) => {
              setDob(txt);
              if (errors.dob) setErrors((prev) => ({ ...prev, dob: '' }));
            }}
            error={errors.dob}
            leftIcon={<Calendar size={18} color={Colors.primary} />}
          />

          {/* Gender Selector */}
          <View style={styles.genderContainer}>
            <Text style={styles.inputLabel}>Gender *</Text>
            <View style={styles.genderRow}>
              {(['Male', 'Female', 'Other'] as const).map((g) => {
                const active = gender === g;
                return (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genderPill, active && styles.genderPillActive]}
                    onPress={() => setGender(g)}
                    activeOpacity={0.75}>
                    <Text style={[styles.genderText, active && styles.genderTextActive]}>
                      {g}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Email Address */}
          <Input
            label="Email Address (Optional)"
            placeholder="rajesh.express@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Mail size={18} color={Colors.primary} />}
          />

          {/* City */}
          <Input
            label="Operating City *"
            placeholder="e.g. Visakhapatnam"
            value={city}
            onChangeText={(txt) => {
              setCity(txt);
              if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
            }}
            error={errors.city}
            leftIcon={<MapPin size={18} color={Colors.primary} />}
          />

          {/* Quick Guidance Tip */}
          <View style={styles.tipBox}>
            <Info size={15} color="#6D28D9" strokeWidth={2.2} />
            <Text style={styles.tipText}>
              Ensure your name matches your Aadhaar/PAN Card for instant verification approval.
            </Text>
          </View>

          {/* Primary Action Button */}
          <GradientButton
            title="Save & Proceed to ID Verification"
            icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
            onPress={handleContinue}
            style={styles.continueBtn}
          />
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
  stepInactivePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stepInactiveText: {
    fontSize: 10,
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
  privacyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  privacyBadgeText: {
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
  },
  formSectionHeader: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  genderContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 8,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderPillActive: {
    borderColor: '#6D28D9',
    backgroundColor: '#F5F3FF',
  },
  genderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  genderTextActive: {
    fontWeight: '800',
    color: '#6D28D9',
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F5F3FF',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 18,
    marginTop: 4,
  },
  tipText: {
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
