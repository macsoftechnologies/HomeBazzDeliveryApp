import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { GradientButton } from '@/components/common/GradientButton';
import { useApp } from '@/context/AppContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Landmark,
  User,
  Hash,
  ShieldCheck,
  Sparkles,
  CircleCheck,
  ArrowRight,
  CreditCard,
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

export default function BankDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { setRegProgress } = useApp();

  const [holderName, setHolderName] = useState('Rajesh Kumar');
  const [accountNo, setAccountNo] = useState('123456789012');
  const [confirmAcc, setConfirmAcc] = useState('123456789012');
  const [ifsc, setIfsc] = useState('SBIN0001234');
  const [bankName, setBankName] = useState('State Bank of India');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    if (!holderName.trim()) err.holderName = 'Please enter Account Holder Name';
    if (!accountNo.trim()) err.accountNo = 'Please enter Account Number';
    if (accountNo !== confirmAcc) err.confirmAcc = 'Account Numbers do not match';
    if (!ifsc.trim() || ifsc.length < 11) err.ifsc = 'Please enter a valid 11-digit IFSC code';
    if (!bankName.trim()) err.bankName = 'Please enter Bank Name';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) {
      Alert.alert('Verification Error', 'Please correct the highlighted bank fields to continue.');
      return;
    }

    setRegProgress((prev) => ({ ...prev, bankDetailsAdded: true }));
    router.push('/verification/document-review');
  };

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

      <Header title="Bank Account" showBack />

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
          <View style={styles.stepActivePill}>
            <View style={styles.activeDot} />
            <Text style={styles.stepActiveText}>3. Bank Account</Text>
          </View>
          <View style={styles.stepInactivePill}>
            <Text style={styles.stepInactiveText}>4. Review</Text>
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
              <Text style={styles.heroBadgeText}>SECURE PAYOUTS • DIRECT BANK DEPOSIT</Text>
            </View>
            <View style={styles.bankStatusBadge}>
              <Text style={styles.bankStatusBadgeText}>⚡ Instant Payouts</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Payout Bank Account</Text>
          <Text style={styles.heroSubtitle}>
            Your weekly earnings, order incentives, and customer tips will be deposited directly into this account.
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.formSectionHeader}>BANK ACCOUNT DETAILS</Text>

          {/* Account Holder Name */}
          <Input
            label="Account Holder Name *"
            placeholder="As per bank passbook or statement"
            value={holderName}
            onChangeText={(txt) => {
              setHolderName(txt);
              if (errors.holderName) setErrors((prev) => ({ ...prev, holderName: '' }));
            }}
            error={errors.holderName}
            leftIcon={<User size={18} color="#6D28D9" />}
          />

          {/* Bank Name */}
          <Input
            label="Bank Name *"
            placeholder="e.g. State Bank of India, HDFC Bank"
            value={bankName}
            onChangeText={(txt) => {
              setBankName(txt);
              if (errors.bankName) setErrors((prev) => ({ ...prev, bankName: '' }));
            }}
            error={errors.bankName}
            leftIcon={<Landmark size={18} color="#6D28D9" />}
          />

          {/* Account Number */}
          <Input
            label="Account Number *"
            placeholder="e.g. 123456789012"
            value={accountNo}
            onChangeText={(txt) => {
              setAccountNo(txt.replace(/[^0-9]/g, ''));
              if (errors.accountNo) setErrors((prev) => ({ ...prev, accountNo: '' }));
            }}
            error={errors.accountNo}
            keyboardType="number-pad"
            leftIcon={<Hash size={18} color="#6D28D9" />}
          />

          {/* Confirm Account Number */}
          <Input
            label="Confirm Account Number *"
            placeholder="Re-enter bank account number"
            value={confirmAcc}
            onChangeText={(txt) => {
              setConfirmAcc(txt.replace(/[^0-9]/g, ''));
              if (errors.confirmAcc) setErrors((prev) => ({ ...prev, confirmAcc: '' }));
            }}
            error={errors.confirmAcc}
            keyboardType="number-pad"
            leftIcon={<Hash size={18} color="#6D28D9" />}
          />

          {/* IFSC Code */}
          <Input
            label="IFSC Code *"
            placeholder="e.g. SBIN0001234"
            value={ifsc}
            onChangeText={(txt) => {
              setIfsc(txt.toUpperCase());
              if (errors.ifsc) setErrors((prev) => ({ ...prev, ifsc: '' }));
            }}
            error={errors.ifsc}
            autoCapitalize="characters"
            maxLength={11}
            leftIcon={<CreditCard size={18} color="#6D28D9" />}
          />

          {/* Penny-Drop Verification Badge */}
          <View style={styles.verifiedBankBadge}>
            <CircleCheck size={16} color="#059669" strokeWidth={2.4} />
            <View style={styles.verifiedBankTextCol}>
              <Text style={styles.verifiedBankTitle}>Penny-Drop Test Passed</Text>
              <Text style={styles.verifiedBankSubtitle}>
                Account verified active & eligible for instant IMPS / NEFT transfers
              </Text>
            </View>
          </View>

          {/* Security Assurance */}
          <View style={styles.securityNoteRow}>
            <Lock size={13} color="#6D28D9" />
            <Text style={styles.securityNoteText}>
              256-Bit Bank-Grade Encryption • RBI Compliant Direct Settlement
            </Text>
          </View>

          {/* Primary Action Button */}
          <GradientButton
            title="Save & Review Application"
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
  bankStatusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  bankStatusBadgeText: {
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
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 16,
  },
  formSectionHeader: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  verifiedBankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginVertical: 12,
  },
  verifiedBankTextCol: {
    flex: 1,
  },
  verifiedBankTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#065F46',
  },
  verifiedBankSubtitle: {
    fontSize: 11,
    color: '#047857',
    marginTop: 1,
  },
  securityNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 16,
  },
  securityNoteText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
  },
  continueBtn: {
    width: '100%',
  },
});
