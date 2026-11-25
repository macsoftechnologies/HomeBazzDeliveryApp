import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronRight,
  TrendingUp,
  Clock,
  MapPin,
  Sparkles,
  Wallet,
  Zap,
  ShieldCheck,
  Calendar,
  Bike,
  Award,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HighlightPill {
  id: string;
  icon: any;
  label: string;
  color: string;
  bg: string;
  border: string;
}

interface SlideTheme {
  primary: string;
  accent: string;
  tagBg: string;
  tagBorder: string;
  tagText: string;
  cardBorder: string;
  cardGradient: readonly [string, string, string];
  pedestalGlow: string;
  buttonGradient: readonly [string, string, string];
  buttonShadow: string;
  highlights: HighlightPill[];
}

interface SlideData {
  id: string;
  tag: string;
  tagIcon: any;
  titlePrimary: string;
  titleAccent: string;
  subtitleLine1: string;
  subtitleLine2: string;
  image: any;
  theme: SlideTheme;
}

// 3 Distinct Multi-Color Card Themes for the 3 Onboarding / Splash Screens
const SLIDES: SlideData[] = [
  {
    id: '1',
    tag: 'DAILY PAYOUTS & INCENTIVES',
    tagIcon: TrendingUp,
    titlePrimary: 'Earn with',
    titleAccent: 'HomeBazz Express',
    subtitleLine1: 'Deliver orders in your area',
    subtitleLine2: 'and earn great daily income.',
    image: require('@/assets/images/onboarding/onboarding_hero1.png'),
    // Color 1: Emerald Green & Mint Theme (Wealth, Payouts, Earnings)
    theme: {
      primary: '#059669',
      accent: '#10B981',
      tagBg: '#ECFDF5',
      tagBorder: '#A7F3D0',
      tagText: '#047857',
      cardBorder: 'rgba(167, 243, 208, 0.9)',
      cardGradient: ['#FFFFFF', '#F0FDF4', '#ECFDF5'] as const,
      pedestalGlow: 'rgba(16, 185, 129, 0.22)',
      buttonGradient: ['#047857', '#059669', '#10B981'] as const,
      buttonShadow: '#059669',
      highlights: [
        {
          id: 'h1',
          icon: Wallet,
          label: 'Daily Payouts',
          color: '#059669',
          bg: '#ECFDF5',
          border: '#A7F3D0',
        },
        {
          id: 'h2',
          icon: Zap,
          label: '₹800+/Day Potential',
          color: '#D97706',
          bg: '#FFFBEB',
          border: '#FDE68A',
        },
        {
          id: 'h3',
          icon: ShieldCheck,
          label: '₹0 Commission',
          color: '#2563EB',
          bg: '#EFF6FF',
          border: '#BFDBFE',
        },
      ],
    },
  },
  {
    id: '2',
    tag: 'CHOOSE YOUR OWN TIMINGS',
    tagIcon: Clock,
    titlePrimary: 'Flexible Working',
    titleAccent: 'Hours',
    subtitleLine1: 'Be your own boss.',
    subtitleLine2: 'Work when you are free.',
    image: require('@/assets/images/onboarding/onboarding_hero2.png'),
    // Color 2: Royal Purple & Electric Violet Theme (Freedom, Flexibility, Control)
    theme: {
      primary: '#6D28D9',
      accent: '#7C3AED',
      tagBg: '#FAF5FF',
      tagBorder: '#DDD6FE',
      tagText: '#6D28D9',
      cardBorder: 'rgba(221, 214, 254, 0.9)',
      cardGradient: ['#FFFFFF', '#FAF5FF', '#F3E8FF'] as const,
      pedestalGlow: 'rgba(124, 58, 237, 0.22)',
      buttonGradient: ['#4318B4', '#5925D4', '#6D28D9'] as const,
      buttonShadow: '#4318B4',
      highlights: [
        {
          id: 'h1',
          icon: Calendar,
          label: 'Choose Your Slots',
          color: '#6D28D9',
          bg: '#FAF5FF',
          border: '#DDD6FE',
        },
        {
          id: 'h2',
          icon: Bike,
          label: 'Part / Full Time',
          color: '#0284C7',
          bg: '#F0F9FF',
          border: '#BAE6FD',
        },
        {
          id: 'h3',
          icon: Sparkles,
          label: 'Zero Min Hours',
          color: '#DB2777',
          bg: '#FDF2F8',
          border: '#FBCFE8',
        },
      ],
    },
  },
  {
    id: '3',
    tag: 'NEIGHBORHOOD DELIVERIES',
    tagIcon: MapPin,
    titlePrimary: 'Deliver Locally',
    titleAccent: '& Grow',
    subtitleLine1: 'Serve your community',
    subtitleLine2: 'and earn weekly bonus rewards.',
    image: require('@/assets/images/onboarding/onboarding_hero3.png'),
    // Color 3: Sunset Coral & Amber Orange Theme (Community, Local, Growth)
    theme: {
      primary: '#EA580C',
      accent: '#F97316',
      tagBg: '#FFF7ED',
      tagBorder: '#FED7AA',
      tagText: '#C2410C',
      cardBorder: 'rgba(254, 215, 170, 0.9)',
      cardGradient: ['#FFFFFF', '#FFF7ED', '#FFEDD5'] as const,
      pedestalGlow: 'rgba(234, 88, 12, 0.22)',
      buttonGradient: ['#C2410C', '#EA580C', '#F97316'] as const,
      buttonShadow: '#EA580C',
      highlights: [
        {
          id: 'h1',
          icon: MapPin,
          label: 'Within 3–5 km',
          color: '#EA580C',
          bg: '#FFF7ED',
          border: '#FED7AA',
        },
        {
          id: 'h2',
          icon: Award,
          label: 'Weekly Bonuses',
          color: '#059669',
          bg: '#ECFDF5',
          border: '#A7F3D0',
        },
        {
          id: 'h3',
          icon: ShieldCheck,
          label: '₹5L Insurance',
          color: '#7C3AED',
          bg: '#FAF5FF',
          border: '#DDD6FE',
        },
      ],
    },
  },
];

// Festive cracker & sparkle twinkle particles
const SPARKLE_PARTICLES = [
  { id: 1, top: 75, right: 38, size: 14, color: '#FFD700' },
  { id: 2, top: 110, left: 34, size: 12, color: '#38BDF8' },
  { id: 3, top: 240, right: 28, size: 13, color: '#34D399' },
  { id: 4, top: 290, left: 32, size: 11, color: '#F472B6' },
  { id: 5, top: 95, right: 110, size: 10, color: '#A78BFA' },
  { id: 6, top: 290, right: 75, size: 10, color: '#FBBF24' },
];

interface OnboardingSliderProps {
  initialIndex?: number;
}

export const OnboardingSlider: React.FC<OnboardingSliderProps> = ({ initialIndex = 0 }) => {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Floating & subtle breathing animation for 3D illustrations
  const [floatAnim] = useState(() => new Animated.Value(0));
  const [pulseAnim] = useState(() => new Animated.Value(1));
  // Continuous diagonal flash light sweep beam animation
  const [shimmerFlash] = useState(() => new Animated.Value(0));
  // Festive cracker & sparkles twinkle animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Smooth floating translation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Subtle scale breathing
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.04,
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

    // 3. Shimmer flash light sweep
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

    // 4. Cracker sparkle twinkle
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
  }, [floatAnim, pulseAnim, shimmerFlash, crackerAnim]);

  // Initial scroll if initialIndex > 0
  useEffect(() => {
    if (initialIndex > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
        setActiveIndex(initialIndex);
      }, 50);
    }
  }, [initialIndex]);

  const shimmerTranslateX = shimmerFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 440],
  });

  const crackerScale = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1.25],
  });
  const crackerRotate = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });
  const crackerOpacity = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== activeIndex && index >= 0 && index < SLIDES.length) {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
      setActiveIndex(activeIndex + 1);
    } else {
      router.replace('/auth/welcome');
    }
  };

  const handleSkip = () => {
    router.replace('/auth/welcome');
  };

  const activeTheme = SLIDES[activeIndex]?.theme || SLIDES[0].theme;

  const renderItem = ({ item }: { item: SlideData }) => {
    const TagIcon = item.tagIcon;
    const theme = item.theme;

    return (
      <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
        {/* Floating 3D Hero Illustration with Theme Colored Pedestal Halo & Flash Beam */}
        <Animated.View
          style={[
            styles.illustrationArea,
            {
              transform: [
                { translateY: floatAnim },
                { scale: pulseAnim },
              ],
            },
          ]}>
          {/* Ambient Glowing Pedestal Halo matching Card Theme Color */}
          <View
            style={[
              styles.pedestalGlow,
              { backgroundColor: theme.pedestalGlow },
            ]}
          />

          {/* 3D Hero Illustration Image */}
          <Image
            source={item.image}
            style={styles.heroImage}
            resizeMode="contain"
          />

          {/* Flash Shimmer Beam Sweep Across Hero */}
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
                'rgba(255, 255, 255, 0.75)',
                'rgba(255, 255, 255, 0.45)',
                'rgba(255, 255, 255, 0.08)',
                'rgba(255, 255, 255, 0)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shimmerFlashBeam}
            />
          </Animated.View>
        </Animated.View>

        {/* Distinct Colored Elevated Card Container with 3 Colors for the 3 Screens */}
        <View
          style={[
            styles.textCardContainer,
            {
              borderColor: theme.cardBorder,
              shadowColor: theme.primary,
            },
          ]}>
          <LinearGradient
            colors={theme.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />

          {/* Category Pill Tag matching Card Theme Color */}
          <View
            style={[
              styles.categoryPill,
              {
                backgroundColor: theme.tagBg,
                borderColor: theme.tagBorder,
              },
            ]}>
            <TagIcon size={11} color={theme.tagText} strokeWidth={2.4} />
            <Text style={[styles.categoryText, { color: theme.tagText }]}>{item.tag}</Text>
          </View>

          {/* Distinct Two-Tone Typography */}
          <Text style={styles.titlePrimary}>{item.titlePrimary}</Text>
          <Text style={[styles.titleAccent, { color: theme.primary }]}>{item.titleAccent}</Text>

          {/* Clean Subtitle */}
          <View style={styles.subtitleWrap}>
            <Text style={styles.subtitleText}>{item.subtitleLine1}</Text>
            <Text style={styles.subtitleText}>{item.subtitleLine2}</Text>
          </View>

          {/* 3 Colorful Feature Highlight Mini Cards */}
          <View style={styles.highlightsRow}>
            {theme.highlights.map((h) => {
              const HIcon = h.icon;
              return (
                <View
                  key={h.id}
                  style={[
                    styles.highlightChip,
                    {
                      backgroundColor: h.bg,
                      borderColor: h.border,
                    },
                  ]}>
                  <HIcon size={10.5} color={h.color} strokeWidth={2.5} />
                  <Text style={[styles.highlightText, { color: h.color }]}>{h.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {/* Dynamic Multi-Stop Gradient Background */}
      <LinearGradient
        colors={['#FFFFFF', '#FAF7FF', '#F4EEFF', '#EBE0FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Ambient Glowing Orbs */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.bgOrbTopLeft,
          {
            backgroundColor: `${activeTheme.primary}15`,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      <View
        style={[
          styles.bgOrbCenterRight,
          { backgroundColor: `${activeTheme.accent}18` },
        ]}
        pointerEvents="none"
      />

      {/* Animated Festive Cracker & Sparkle Particles */}
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

      {/* Top Header: Centered Logo + Top Right Skip > */}
      <View style={[styles.topHeader, { paddingTop: Math.max(insets.top, 10) + 6 }]}>
        <View style={styles.topHeaderCenter}>
          <Image
            source={require('@/assets/images/homebazz_logo.png')}
            style={styles.headerLogoImage}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
          onPress={handleSkip}
          style={styles.topSkipBtn}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}>
          <Text style={[styles.topSkipText, { color: activeTheme.primary }]}>Skip</Text>
          <ChevronRight size={15} color={activeTheme.primary} strokeWidth={2.6} />
        </TouchableOpacity>
      </View>

      {/* Swipeable FlatList */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
        style={styles.flatList}
      />

      {/* Bottom Fixed Navigation Block with Active Color Coordination */}
      <View style={[styles.bottomControlArea, { paddingBottom: Math.max(insets.bottom, 16) + 12 }]}>
        {/* Dynamic 3-Dot Carousel Indicator with Active Card Color */}
        <View style={styles.dotsRow}>
          {SLIDES.map((s, idx) => {
            const isActive = activeIndex === idx;
            return (
              <View
                key={idx}
                style={[
                  styles.dot,
                  isActive
                    ? [styles.dotActive, { backgroundColor: s.theme.primary, width: 22 }]
                    : styles.dotInactive,
                ]}
              />
            );
          })}
        </View>

        {/* Dynamic Action Button Styled with Active Card Theme Gradient */}
        <TouchableOpacity
          style={[
            styles.nextBtnContainer,
            { shadowColor: activeTheme.buttonShadow },
          ]}
          onPress={handleNext}
          activeOpacity={0.88}>
          <LinearGradient
            colors={activeTheme.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextBtnGradient}>
            <Text style={styles.nextBtnText}>Next →</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Skip Text Link */}
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={handleSkip}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 24, right: 24 }}>
          <Text style={[styles.skipBtnText, { color: activeTheme.primary }]}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  bgOrbTopLeft: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  bgOrbCenterRight: {
    position: 'absolute',
    top: 210,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  sparkleParticle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
    position: 'relative',
    zIndex: 10,
  },
  topHeaderCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoImage: {
    width: 130,
    height: 48,
  },
  topSkipBtn: {
    position: 'absolute',
    right: 20,
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  topSkipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  flatList: {
    flex: 1,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  illustrationArea: {
    width: SCREEN_WIDTH * 0.88,
    height: 235,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  pedestalGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  shimmerFlashWrap: {
    position: 'absolute',
    top: -80,
    bottom: -80,
    width: 70,
  },
  shimmerFlashBeam: {
    flex: 1,
    width: '100%',
  },
  textCardContainer: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
    zIndex: 1,
  },
  categoryText: {
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  titlePrimary: {
    fontSize: 21,
    fontWeight: '900',
    color: '#111447',
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 27,
    zIndex: 1,
  },
  titleAccent: {
    fontSize: 21,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 27,
    marginBottom: 4,
    zIndex: 1,
  },
  subtitleWrap: {
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 10,
    zIndex: 1,
  },
  subtitleText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 18,
  },
  highlightsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
    zIndex: 1,
  },
  highlightChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
  },
  highlightText: {
    fontSize: 10,
    fontWeight: '700',
  },
  bottomControlArea: {
    paddingHorizontal: 28,
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  dot: {
    height: 7,
    borderRadius: 3.5,
  },
  dotActive: {
    height: 7,
  },
  dotInactive: {
    width: 7,
    backgroundColor: '#CBD5E1',
  },
  nextBtnContainer: {
    width: '100%',
    borderRadius: 28,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 8,
  },
  nextBtnGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  skipBtn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  skipBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
  },
});
