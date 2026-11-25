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
import { Input } from '@/components/common/Input';
import { GradientButton } from '@/components/common/GradientButton';
import { HomeBazzLogo } from '@/components/common/HomeBazLogo';
import { SuccessToast } from '@/components/common/SuccessToast';
import { Colors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Bike,
  Package,
  TrendingUp,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Multi-color cracker sparkles for festive delivery scene
const CRACKER_PARTICLES = [
  { id: 1, top: 18, right: 34, size: 13, color: '#FFD700' },
  { id: 2, top: 40, left: 30, size: 11, color: '#38BDF8' },
  { id: 3, top: 85, right: 28, size: 12, color: '#34D399' },
  { id: 4, top: 110, left: 36, size: 10, color: '#F472B6' },
  { id: 5, top: 60, right: 75, size: 11, color: '#FBBF24' },
];

export default function PartnerLoginScreen() {
  const insets = useSafeAreaInsets();
  const [mobile, setMobile] = useState('9876543210');
  const [password, setPassword] = useState('Partner@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  // 1. Moving delivery driver (scooter) across the road
  const [driverMove] = useState(() => new Animated.Value(0));

  // 2. Continuous road dash animation
  const [roadDashAnim] = useState(() => new Animated.Value(0));

  // 3. Floating parcel animation
  const [parcelFloat] = useState(() => new Animated.Value(0));

  // 4. Cracker sparkle twinkle animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Delivery Driver drives across the screen continuously
    Animated.loop(
      Animated.sequence([
        Animated.timing(driverMove, {
          toValue: 1,
          duration: 5200,
          useNativeDriver: true,
        }),
        Animated.timing(driverMove, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Road speed dashes loop
    Animated.loop(
      Animated.timing(roadDashAnim, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      })
    ).start();

    // 3. Floating parcel subtle float
    Animated.loop(
      Animated.sequence([
        Animated.timing(parcelFloat, {
          toValue: -6,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(parcelFloat, {
          toValue: 6,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 4. Cracker sparkles twinkle loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(crackerAnim, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(crackerAnim, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [driverMove, roadDashAnim, parcelFloat, crackerAnim]);

  // Driver translates across the width
  const driverTranslateX = driverMove.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, SCREEN_WIDTH + 40],
  });

  // Road dash translation
  const roadDashTranslateX = roadDashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -36],
  });

  // Cracker sparkle interpolations
  const crackerScale = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1.25],
  });
  const crackerOpacity = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  const handleLogin = () => {
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setShowToast(true);
    setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 1100);
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      {/* Success Toast Notification */}
      <SuccessToast
        visible={showToast}
        title="Login Successful!"
        message="Welcome back, partner! Loading delivery hub..."
        type="success"
      />

      {/* Background Soft Purple Gradient */}
      <LinearGradient
        colors={['#FFFFFF', '#F8F5FF', '#F1E9FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 24) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* ======================================================== */}
        {/* 1. TOP ANIMATED DELIVERY SCENE                           */}
        {/* Clean, spacious view with moving driver & sparkles       */}
        {/* ======================================================== */}
        <View style={styles.deliverySceneContainer}>
          {/* Ambient Glowing Background Layer */}
          <LinearGradient
            colors={['#FAF7FF', '#F3EDFE', '#EAE0FD']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.deliverySceneGradient}
          />

          {/* Twinkling Cracker Sparkles */}
          {CRACKER_PARTICLES.map((p) => (
            <Animated.View
              key={p.id}
              style={[
                styles.crackerParticle,
                {
                  top: p.top,
                  left: p.left,
                  right: p.right,
                  transform: [{ scale: crackerScale }],
                  opacity: crackerOpacity,
                },
              ]}>
              <Sparkles size={p.size} color={p.color} />
            </Animated.View>
          ))}

          {/* Floating 3D Golden Parcel Box */}
          <Animated.View
            style={[
              styles.floatingParcelBox,
              { transform: [{ translateY: parcelFloat }] },
            ]}>
            <Package size={17} color="#B45309" />
          </Animated.View>

          {/* Floating Earnings Strip Badge */}
          <View style={styles.floatingEarningBadge}>
            <TrendingUp size={11} color="#059669" />
            <Text style={styles.floatingEarningText}>+₹1,240 / Day Guaranteed</Text>
          </View>

          {/* Animated Delivery Driver on Scooter Moving Across Road */}
          <Animated.View
            style={[
              styles.movingDriverWrapper,
              { transform: [{ translateX: driverTranslateX }] },
            ]}>
            <View style={styles.riderBikeWrap}>
              <Bike size={46} color="#6C3AE8" strokeWidth={2.4} />

              {/* Yellow HomeBazz Delivery Box with H Logo */}
              <View style={styles.riderYellowBox}>
                <Text style={styles.riderYellowBoxH}>H</Text>
              </View>

              {/* Speed Trails */}
              <View style={styles.speedLine1} />
              <View style={styles.speedLine2} />
            </View>
          </Animated.View>

          {/* Road Track with Animated Moving Dashes */}
          <View style={styles.roadTrack}>
            <Animated.View
              style={[
                styles.roadDashesRow,
                { transform: [{ translateX: roadDashTranslateX }] },
              ]}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
                <View key={i} style={styles.roadDash} />
              ))}
            </Animated.View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 2. LOGO AND CARD PLACED DOWN GRACEFULLY                 */}
        {/* ======================================================== */}
        <View style={styles.lowerContentSection}>
          {/* Logo Section */}
          <View style={styles.logoDownWrap}>
            <HomeBazzLogo size="small" showSubtitle subtitle="Delivery Partner" />
          </View>

          {/* Screen Title & Subtitle */}
          <View style={styles.headerTextBlock}>
            <Text style={styles.screenHeading}>Delivery Partner Login</Text>
            <Text style={styles.screenSub}>Access your real-time delivery dashboard</Text>
          </View>

          {/* Elevated Gradient Login Form Card with Rich Gradient Corners & Border */}
          <LinearGradient
            colors={['#8B5CF6', '#C4B5FD', '#E9D5FF', '#A78BFA', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradientBorderOuter}>
            <LinearGradient
              colors={['#FFFFFF', '#FCFAFF', '#F7F0FF', '#EDE3FE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.formCardGradient}>
              {/* Corner Ambient Glow Accents */}
              <View style={styles.cardCornerGlowTopRight} />
              <View style={styles.cardCornerGlowBottomLeft} />

              <Input
                label="Mobile Number"
                placeholder="Mobile Number"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={(txt) => {
                  setMobile(txt);
                  if (error) setError('');
                }}
                prefix="🇮🇳 +91"
                leftIcon={<Phone size={18} color={Colors.primary} />}
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={(txt) => {
                  setPassword(txt);
                  if (error) setError('');
                }}
                secureTextEntry={!showPassword}
                leftIcon={<Lock size={18} color={Colors.primary} />}
                rightIcon={
                  showPassword ? (
                    <EyeOff size={18} color="#6C3AE8" />
                  ) : (
                    <Eye size={18} color={Colors.secondaryText} />
                  )
                }
                onRightIconPress={() => setShowPassword(!showPassword)}
              />

              <View style={styles.forgotRow}>
                <TouchableOpacity onPress={() => router.push('/auth/otp')} activeOpacity={0.7}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              {/* Login Button with Gradient */}
              <GradientButton
                title="Login to Account"
                icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
                onPress={handleLogin}
                style={styles.loginBtn}
              />

              {/* Or Divider */}
              <View style={styles.orDivider}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.orLine} />
              </View>

              {/* Continue with OTP Button */}
              <TouchableOpacity
                style={styles.otpBtn}
                onPress={() => router.push('/auth/otp')}
                activeOpacity={0.8}>
                <MessageSquare size={17} color={Colors.primary} />
                <Text style={styles.otpBtnText}>Continue with OTP</Text>
              </TouchableOpacity>
            </LinearGradient>
          </LinearGradient>

          {/* Bottom Register Prompt & Security Badge */}
          <View style={styles.bottomBlock}>
            <View style={styles.registerBlock}>
              <Text style={styles.registerPrompt}>{"Don't have a partner account? "}</Text>
              <TouchableOpacity onPress={() => router.push('/auth/register')} activeOpacity={0.7}>
                <Text style={styles.registerLink}>Register Now</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.securityRow}>
              <ShieldCheck size={14} color="#059669" />
              <Text style={styles.securityText}>Official HomeBaz Express Partner Platform</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    flexGrow: 1,
  },
  // Animated Top Scene Container
  deliverySceneContainer: {
    width: '100%',
    height: 145,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: '#D8CEFD',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  deliverySceneGradient: {
    ...StyleSheet.absoluteFill,
  },
  crackerParticle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  floatingParcelBox: {
    position: 'absolute',
    top: 20,
    left: 24,
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: '#FEF3C7',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#B45309',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 2,
  },
  floatingEarningBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 2,
  },
  floatingEarningText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  movingDriverWrapper: {
    position: 'absolute',
    bottom: 22,
    zIndex: 3,
  },
  riderBikeWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderYellowBox: {
    position: 'absolute',
    top: -4,
    left: 4,
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#FFBE1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  riderYellowBoxH: {
    color: '#6530E4',
    fontSize: 11,
    fontWeight: '900',
  },
  speedLine1: {
    position: 'absolute',
    bottom: 2,
    left: -12,
    width: 12,
    height: 2,
    backgroundColor: '#C4B5FD',
    borderRadius: 1,
  },
  speedLine2: {
    position: 'absolute',
    bottom: -3,
    left: -8,
    width: 10,
    height: 2,
    backgroundColor: '#DDD6FE',
    borderRadius: 1,
  },
  roadTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 26,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  roadDashesRow: {
    flexDirection: 'row',
    width: SCREEN_WIDTH * 2,
    gap: 16,
    paddingLeft: 6,
  },
  roadDash: {
    width: 18,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 1.5,
  },
  // Lower Content Section (Placed Down)
  lowerContentSection: {
    width: '100%',
  },
  logoDownWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTextBlock: {
    alignItems: 'center',
    marginBottom: 14,
  },
  screenHeading: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111447',
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  screenSub: {
    fontSize: 13,
    color: '#777B9C',
    fontWeight: '600',
    textAlign: 'center',
  },
  // Form Card with Rich Gradient Border & Stylish Rounded Corners
  cardGradientBorderOuter: {
    borderRadius: 28,
    padding: 2,
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 7,
    marginBottom: 18,
  },
  formCardGradient: {
    borderRadius: 26,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  cardCornerGlowTopRight: {
    position: 'absolute',
    top: -24,
    right: -24,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
  },
  cardCornerGlowBottomLeft: {
    position: 'absolute',
    bottom: -24,
    left: -24,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(167, 139, 250, 0.12)',
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginBottom: 18,
    marginTop: -4,
  },
  forgotText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  loginBtn: {
    width: '100%',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ECEAF5',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: Colors.secondaryText,
    fontWeight: '600',
  },
  otpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#E2DCF8',
    backgroundColor: '#FAF8FF',
    paddingVertical: 13,
    borderRadius: 16,
  },
  otpBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  bottomBlock: {
    alignItems: 'center',
    paddingTop: 4,
  },
  registerBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  registerPrompt: {
    fontSize: 13,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  registerLink: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  securityText: {
    fontSize: 11,
    color: '#059669',
    fontWeight: '700',
  },
});
