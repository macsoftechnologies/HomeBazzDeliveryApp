import { GradientButton } from '@/components/common/GradientButton';
import { HomeBazzLogo } from '@/components/common/HomeBazLogo';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Colors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  ArrowRight,
  Clock,
  LogIn,
  Package,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Multi-color cracker sparkles for festive delivery atmosphere
const CRACKER_PARTICLES = [
  { id: 1, top: 40, left: 30, size: 14, color: '#FFD700' },
  { id: 2, top: 75, right: 35, size: 12, color: '#38BDF8' },
  { id: 3, top: 130, left: 20, size: 10, color: '#34D399' },
  { id: 4, top: 160, right: 40, size: 13, color: '#F472B6' },
  { id: 5, top: 220, left: 45, size: 11, color: '#FBBF24' },
  { id: 6, top: 245, right: 28, size: 10, color: '#A78BFA' },
];

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  // Floating delivery hero illustration animation
  const [heroFloat] = useState(() => new Animated.Value(0));
  // Cracker sparkle twinkle animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Hero floating loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(heroFloat, {
          toValue: -8,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(heroFloat, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Cracker twinkle loop
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
  }, [heroFloat, crackerAnim]);

  const crackerScale = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1.25],
  });
  const crackerRotate = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '35deg'],
  });
  const crackerOpacity = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      {/* Background Soft Purple Gradient */}
      <LinearGradient
        colors={['#FFFFFF', '#F8F5FF', '#F1E9FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Delivery-Themed Floating Cracker Sparkles (Replacing generic balls) */}
      {CRACKER_PARTICLES.map((p) => (
        <Animated.View
          key={p.id}
          style={[
            styles.crackerParticle,
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

      <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 20) + 10 }]}>
        {/* Top Header: Compact Decreased Logo & Verified Badge */}
        <View style={styles.topHeaderSection}>
          <HomeBazzLogo size="small" showSubtitle={false} />
          <View style={styles.badgeRow}>
            <ShieldCheck size={14} color="#059669" />
            <Text style={styles.badgeText}>Verified Delivery Network</Text>
          </View>
        </View>

        {/* Top Seamless Full-Width 3D Hero Artwork (Open, full-screen, no card box) */}
        <Animated.View
          style={[
            styles.deliveryFullVisualArea,
            { transform: [{ translateY: heroFloat }] },
          ]}>
          <Image
            source={require('@/assets/images/onboarding/onboarding_hero1.png')}
            style={styles.fullHeroImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Join as Delivery Partner Interactive Card */}
        <View style={styles.cardSection}>
          <Text style={styles.welcomeHeading}>Join as Delivery Partner</Text>
          <Text style={styles.welcomeDesc}>
            Accept nearby food and parcel orders, get flexible working hours, and receive guaranteed instant payouts.
          </Text>

          {/* Quick Perks Strip */}
          <View style={styles.perksRow}>
            <View style={styles.perkPill}>
              <Clock size={12} color="#6C3AE8" />
              <Text style={styles.perkText}>Flexible Hours</Text>
            </View>
            <View style={styles.perkPill}>
              <TrendingUp size={12} color="#059669" />
              <Text style={styles.perkText}>Daily Payouts</Text>
            </View>
            <View style={styles.perkPill}>
              <Package size={12} color="#D97706" />
              <Text style={styles.perkText}>Local Orders</Text>
            </View>
          </View>

          {/* Primary Action Buttons */}
          <View style={styles.actionButtons}>
            <GradientButton
              title="Login to Partner Account"
              icon={<LogIn size={18} color="#FFFFFF" />}
              onPress={() => router.push('/auth/login')}
            />

            <GradientButton
              title="Register as New Partner"
              variant="outline"
              icon={<UserPlus size={18} color={Colors.primary} />}
              onPress={() => router.push('/auth/register')}
            />
          </View>

          {/* Demo Mode Link */}
          <TouchableOpacity
            style={styles.guestLink}
            onPress={() => router.push('/(tabs)/home')}
            activeOpacity={0.8}>
            <Text style={styles.guestText}>Continue as Partner (Demo Mode)</Text>
            <ArrowRight size={14} color="#6C3AE8" />
          </TouchableOpacity>
        </View>

        {/* Footer Terms */}
        <View style={styles.footerNote}>
          <Text style={styles.footerText}>
            By continuing, you agree to HomeBazz Express Partner Terms & Policies
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  crackerParticle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  topHeaderSection: {
    alignItems: 'center',
    marginTop: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  deliveryFullVisualArea: {
    width: SCREEN_WIDTH,
    marginHorizontal: -20,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  fullHeroImage: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  cardSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  welcomeHeading: {
    fontSize: 21,
    fontWeight: '900',
    color: '#111447',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  welcomeDesc: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  perksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 18,
  },
  perkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8F6FF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECE4FF',
  },
  perkText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4B5563',
  },
  actionButtons: {
    gap: 10,
  },
  guestLink: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
  },
  guestText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  footerNote: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  footerText: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 15,
  },
});
