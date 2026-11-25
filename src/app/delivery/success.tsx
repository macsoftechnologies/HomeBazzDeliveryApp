import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { GradientButton } from '@/components/common/GradientButton';
import { useApp } from '@/context/AppContext';
import {
  Check,
  Home,
  Star,
  Award,
  Sparkles,
  ShieldCheck,
} from 'lucide-react-native';

const CRACKER_PARTICLES = [
  { id: 1, color: '#F59E0B', x: -80, y: -90, size: 10, delay: 0 },
  { id: 2, color: '#10B981', x: 85, y: -80, size: 12, delay: 100 },
  { id: 3, color: '#EC4899', x: -110, y: -20, size: 8, delay: 50 },
  { id: 4, color: '#8B5CF6', x: 105, y: -30, size: 11, delay: 150 },
  { id: 5, color: '#3B82F6', x: -70, y: 70, size: 10, delay: 200 },
  { id: 6, color: '#F97316', x: 80, y: 75, size: 9, delay: 80 },
  { id: 7, color: '#14B8A6', x: -40, y: -120, size: 14, delay: 120 },
  { id: 8, color: '#EAB308', x: 50, y: -115, size: 10, delay: 180 },
  { id: 9, color: '#A855F7', x: -120, y: 40, size: 12, delay: 160 },
  { id: 10, color: '#06B6D4', x: 115, y: 35, size: 8, delay: 220 },
  { id: 11, color: '#EF4444', x: 0, y: -130, size: 11, delay: 90 },
  { id: 12, color: '#10B981', x: -20, y: 95, size: 13, delay: 140 },
];

export default function DeliverySuccessScreen() {
  const { activeOrder } = useApp();
  const insets = useSafeAreaInsets();

  // Cracker burst animations
  const [burstAnim] = useState(() => new Animated.Value(0));
  const [checkScale] = useState(() => new Animated.Value(0.3));
  const [sparkleRot] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Checkmark pop in
    Animated.spring(checkScale, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();

    // 2. Cracker fireworks burst outwards
    Animated.sequence([
      Animated.delay(200),
      Animated.timing(burstAnim, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Sparkle rotating loop
    Animated.loop(
      Animated.timing(sparkleRot, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      })
    ).start();
  }, [burstAnim, checkScale, sparkleRot]);

  const spin = sparkleRot.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 90 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Animated Celebration Section with Fireworks Crackers */}
        <View style={styles.celebrationArena}>
          {/* Animated Cracker Confetti Particles */}
          {CRACKER_PARTICLES.map((p) => {
            const translateX = burstAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, p.x],
            });
            const translateY = burstAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, p.y],
            });
            const opacity = burstAnim.interpolate({
              inputRange: [0, 0.7, 1],
              outputRange: [0, 1, 0.85],
            });
            const scale = burstAnim.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.2, 1.4, 1],
            });

            return (
              <Animated.View
                key={p.id}
                style={[
                  styles.crackerDot,
                  {
                    backgroundColor: p.color,
                    width: p.size,
                    height: p.size,
                    borderRadius: p.size / 2,
                    opacity,
                    transform: [{ translateX }, { translateY }, { scale }],
                  },
                ]}
              />
            );
          })}

          {/* Central Pulsating Celebration Checkmark */}
          <View style={styles.checkGlowRing}>
            <Animated.View style={{ transform: [{ scale: checkScale }] }}>
              <View style={styles.centralCheckCircle}>
                <Check size={52} color="#FFFFFF" strokeWidth={3.8} />
              </View>
            </Animated.View>
          </View>

          {/* Rotating Sparkle Badge */}
          <Animated.View style={[styles.sparkleBadge, { transform: [{ rotate: spin }] }]}>
            <Sparkles size={22} color="#F59E0B" />
          </Animated.View>

          <Text style={styles.headingTitle}>Delivery Completed! 🎉</Text>
          <Text style={styles.subtitle}>
            Order #{activeOrder?.displayId || 'HB123456'} successfully handed over to{' '}
            <Text style={{ fontWeight: '800', color: '#111447' }}>
              {activeOrder?.customerName || 'Sankar Rao'}
            </Text>
          </Text>
        </View>

        {/* Trip Earnings Highlight Card */}
        <View style={styles.earningsCard}>
          <View style={styles.earningsTopRow}>
            <Text style={styles.earningsCardLabel}>TRIP PAYOUT CREDITED</Text>
            <View style={styles.creditedPill}>
              <ShieldCheck size={12} color="#059669" />
              <Text style={styles.creditedPillText}>Instant Wallet Transfer</Text>
            </View>
          </View>

          <View style={styles.amountTotalRow}>
            <Text style={styles.rupeeSign}>₹</Text>
            <Text style={styles.amountLarge}>120</Text>
          </View>
          <Text style={styles.addedNotice}>
            Added to your Today{"'"}s Payout Balance
          </Text>

          <View style={styles.divider} />

          {/* Earnings Breakdown */}
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Base Delivery Fee</Text>
            <Text style={styles.breakdownVal}>₹65</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>On-Time Surge Incentive</Text>
            <Text style={[styles.breakdownVal, { color: '#059669' }]}>+ ₹25</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Customer Appreciation Tip</Text>
            <Text style={[styles.breakdownVal, { color: '#059669' }]}>+ ₹30</Text>
          </View>
        </View>

        {/* Performance & Customer Rating Feedback */}
        <View style={styles.feedbackCard}>
          <View style={styles.feedbackLeft}>
            <View style={styles.starCircle}>
              <Star size={20} color="#F59E0B" fill="#F59E0B" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.feedbackTitle}>5.0 ★ Rating Expected</Text>
              <Text style={styles.feedbackSub}>
                Delivered 6 minutes ahead of estimated schedule!
              </Text>
            </View>
          </View>
          <View style={styles.streakBadge}>
            <Award size={14} color="#6C3AE8" />
            <Text style={styles.streakText}>10 Streak</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar (Guaranteed Safe from NavTab Overlap) */}
      <View
        style={[
          styles.bottomActionBar,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}>
        <GradientButton
          title="Back to Home Dashboard"
          icon={<Home size={18} color="#FFFFFF" />}
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.homeBtn}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 18,
    alignItems: 'center',
  },
  celebrationArena: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
    position: 'relative',
  },
  crackerDot: {
    position: 'absolute',
    zIndex: 1,
  },
  checkGlowRing: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#A7F3D0',
    marginBottom: 16,
    zIndex: 5,
  },
  centralCheckCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  sparkleBadge: {
    position: 'absolute',
    top: 6,
    right: '30%',
    zIndex: 6,
  },
  headingTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111447',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: 16,
  },
  earningsCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#D1FAE5',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 14,
  },
  earningsTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  earningsCardLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.6,
  },
  creditedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  creditedPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  amountTotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  rupeeSign: {
    fontSize: 28,
    fontWeight: '800',
    color: '#059669',
    marginRight: 4,
  },
  amountLarge: {
    fontSize: 48,
    fontWeight: '900',
    color: '#059669',
  },
  addedNotice: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  breakdownLabel: {
    fontSize: 13,
    color: '#4B5563',
  },
  breakdownVal: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111447',
  },
  feedbackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    marginBottom: 14,
  },
  feedbackLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  starCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111447',
  },
  feedbackSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  streakText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECE4FF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  homeBtn: {
    width: '100%',
  },
});
