import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { HomeBazzLogo } from '@/components/common/HomeBazLogo';
import { Bike, Sparkles } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SplashScreen() {
  const [pulseAnim] = useState(() => new Animated.Value(1));
  const [floatAnim] = useState(() => new Animated.Value(0));
  const [progressAnim] = useState(() => new Animated.Value(0));
  const [roadAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // Ambient glowing orb pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
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

    // Floating rider card
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
          duration: 1300,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1300,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Road motion loop
    Animated.loop(
      Animated.timing(roadAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ).start();

    // Progress bar fill animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2600,
      useNativeDriver: false,
    }).start();

    // Auto-transition to onboarding
    const timer = setTimeout(() => {
      router.replace('/onboarding/1');
    }, 2800);

    return () => clearTimeout(timer);
  }, [pulseAnim, floatAnim, progressAnim, roadAnim]);

  const roadTranslateX = roadAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.screen}>
      {/* Dynamic Multi-Stop Gradient Background */}
      <LinearGradient
        colors={['#170B3B', '#341375', '#5824B8', '#7337DC']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Ambient Glowing Gradient Orbs */}
      <Animated.View
        style={[
          styles.glowOrbTop,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
      <Animated.View
        style={[
          styles.glowOrbBottom,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />

      <View style={styles.container}>
        {/* Top: Official HomeBazz Logo in Floating Card */}
        <View style={styles.headerBlock}>
          <View style={styles.logoFrostedCard}>
            <HomeBazzLogo size="medium" lightMode subtitle="Delivery App" />
          </View>
        </View>

        {/* Center: 3D Animated Hero Rider Card (Placed squarely in the center) */}
        <View style={styles.centerHeroContainer}>
          <Animated.View
            style={[
              styles.heroSection,
              { transform: [{ translateY: floatAnim }] },
            ]}>
            {/* Glowing Aura Ring */}
            <View style={styles.auraRingOuter}>
              <View style={styles.auraRingInner} />
            </View>

            {/* Elevated Glassmorphic Card */}
            <View style={styles.glassRiderCard}>
              <View style={styles.riderGraphicWrap}>
                <Bike size={84} color="#FFFFFF" strokeWidth={2.4} />

                {/* Headlight Glow Beam */}
                <View style={styles.headlightGlow} />

                {/* Yellow Delivery Box with H Logo */}
                <View style={styles.yellowDeliveryBox}>
                  <Text style={styles.deliveryBoxH}>H</Text>
                </View>

                {/* Floating Speed Sparkles */}
                <View style={styles.sparkle1}>
                  <Sparkles size={14} color="#FFD700" />
                </View>
                <View style={styles.sparkle2}>
                  <Sparkles size={11} color="#FFFFFF" />
                </View>
              </View>

              {/* Dynamic Road Dash Animation */}
              <View style={styles.roadTrack}>
                <Animated.View
                  style={[
                    styles.roadDashes,
                    { transform: [{ translateX: roadTranslateX }] },
                  ]}>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <View key={i} style={styles.roadDash} />
                  ))}
                </Animated.View>
              </View>
            </View>

            <View style={styles.cardShadowPill} />
          </Animated.View>
        </View>

        {/* Bottom: Tagline, Carousel Dots, and Loading Progress Bar */}
        <View style={styles.footerBlock}>
          <Text style={styles.tagline}>Delivering Happiness</Text>
          <Text style={styles.taglineSub}>Door to Door</Text>

          {/* 3-Dot Carousel Indicator (Matches Showcase Design) */}
          <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Glowing Loading Progress Bar (Auto transitions when filled) */}
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressBar,
                { width: progressWidth },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#170B3B',
    position: 'relative',
    overflow: 'hidden',
  },
  glowOrbTop: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(139, 92, 246, 0.28)',
  },
  glowOrbBottom: {
    position: 'absolute',
    bottom: -60,
    left: -50,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(88, 36, 184, 0.35)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 54,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  headerBlock: {
    alignItems: 'center',
    width: '100%',
  },
  logoFrostedCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerHeroContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  auraRingOuter: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  auraRingInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  glassRiderCard: {
    width: SCREEN_WIDTH * 0.76,
    height: 196,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  riderGraphicWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
  },
  headlightGlow: {
    position: 'absolute',
    top: 24,
    right: -24,
    width: 38,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 241, 153, 0.45)',
    transform: [{ rotate: '15deg' }],
  },
  yellowDeliveryBox: {
    position: 'absolute',
    top: -8,
    left: -4,
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFBE1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
  },
  deliveryBoxH: {
    fontSize: 18,
    fontWeight: '900',
    color: '#7139DB',
  },
  sparkle1: {
    position: 'absolute',
    top: -12,
    right: 20,
  },
  sparkle2: {
    position: 'absolute',
    bottom: -6,
    left: 10,
  },
  roadTrack: {
    position: 'absolute',
    bottom: 22,
    width: '78%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  roadDashes: {
    flexDirection: 'row',
    width: 300,
    gap: 16,
  },
  roadDash: {
    width: 18,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  cardShadowPill: {
    width: 160,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    marginTop: 12,
  },
  footerBlock: {
    alignItems: 'center',
    width: '100%',
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  taglineSub: {
    color: 'rgba(255, 255, 255, 0.88)',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  dotActive: {
    width: 26,
    backgroundColor: '#FFFFFF',
  },
  progressTrack: {
    width: 150,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFBE1A',
    borderRadius: 2,
  },
});
