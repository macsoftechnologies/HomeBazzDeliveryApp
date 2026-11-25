import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { useApp } from '@/context/AppContext';
import {
  Star,
  Clock,
  CheckCircle2,
  Award,
  ThumbsUp,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Zap,
  Package,
  Heart,
  Flame,
  ArrowUpRight,
} from 'lucide-react-native';

// Multi-color ambient sparkle particles
const SPARKLE_PARTICLES = [
  { id: 1, top: 16, right: 30, size: 12, color: '#FFD700' },
  { id: 2, top: 60, left: 24, size: 10, color: '#38BDF8' },
  { id: 3, top: 110, right: 28, size: 13, color: '#34D399' },
  { id: 4, top: 160, left: 32, size: 9, color: '#F472B6' },
  { id: 5, top: 190, right: 50, size: 11, color: '#FBBF24' },
];

const STAR_BREAKDOWN = [
  { stars: 5, count: 218, percent: 85, color: '#10B981' },
  { stars: 4, count: 28, percent: 11, color: '#3B82F6' },
  { stars: 3, count: 7, percent: 3, color: '#F59E0B' },
  { stars: 2, count: 2, percent: 0.8, color: '#F97316' },
  { stars: 1, count: 1, percent: 0.2, color: '#EF4444' },
];

const COMPLIMENTS = [
  { id: 1, icon: '⚡', label: 'Super Fast Delivery', count: 142, color: '#EDE9FE', border: '#DDD6FE' },
  { id: 2, icon: '🤝', label: 'Polite & Professional', count: 98, color: '#ECFDF5', border: '#A7F3D0' },
  { id: 3, icon: '📦', label: 'Careful Package Handling', count: 85, color: '#EFF6FF', border: '#BFDBFE' },
  { id: 4, icon: '🧭', label: 'Accurate Navigation', count: 64, color: '#FFFBEB', border: '#FDE68A' },
  { id: 5, icon: '🌟', label: 'Great Communication', count: 52, color: '#FDF2F8', border: '#FBCFE8' },
];

const RECENT_REVIEWS = [
  {
    id: 1,
    customerName: 'Priya Sharma',
    date: 'Yesterday, 02:45 PM',
    rating: 5,
    tag: 'Gongura Pickle & Sweets',
    comment: 'Super fast delivery! Package was intact, tamper seal was completely intact, and partner was very polite.',
  },
  {
    id: 2,
    customerName: 'Sankar Rao',
    date: '24 Nov, 07:15 PM',
    rating: 5,
    tag: 'Coastal Spices Order',
    comment: 'Handled fragile glass jars with extreme care. Ring the bell twice as requested in delivery notes. 5 stars!',
  },
  {
    id: 3,
    customerName: 'Anita Roy',
    date: '23 Nov, 01:20 PM',
    rating: 4.8,
    tag: 'Terracotta Decor Lamp',
    comment: 'Very professional partner. Arrived on time despite evening rain. Thank you!',
  },
];

export default function RatingsPerformanceScreen() {
  const { partnerProfile } = useApp();
  const insets = useSafeAreaInsets();

  const [activeFilter, setActiveFilter] = useState<'today' | 'week' | 'month' | 'all'>('week');

  // Sparkle and pulse animations
  const [pulseAnim] = useState(() => new Animated.Value(1));
  const [shimmerFlash] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Ambient pulse loop
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

    // 2. Continuous shimmer flash beam
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
  }, [pulseAnim, shimmerFlash]);

  const shimmerTranslateX = shimmerFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 480],
  });

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      <Header title="Ratings & Performance" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 40 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* ======================================================== */}
        {/* 1. TIME FILTER TABS                                      */}
        {/* ======================================================== */}
        <View style={styles.filterTabsRow}>
          {[
            { id: 'today', label: 'Today' },
            { id: 'week', label: 'This Week' },
            { id: 'month', label: 'This Month' },
            { id: 'all', label: 'All Time' },
          ].map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.filterTab,
                  isSelected && styles.filterTabActive,
                ]}
                onPress={() => setActiveFilter(tab.id as any)}
                activeOpacity={0.8}>
                <Text
                  style={[
                    styles.filterTabText,
                    isSelected && styles.filterTabTextActive,
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ======================================================== */}
        {/* 2. DYNAMIC SHIMMER HERO CARD                             */}
        {/* ======================================================== */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={['#1E1B4B', '#31104B', '#4C1D95', '#6D28D9']}
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
                'rgba(255, 255, 255, 0.5)',
                'rgba(255, 255, 255, 0.9)',
                'rgba(255, 255, 255, 0.5)',
                'rgba(255, 255, 255, 0.08)',
                'rgba(255, 255, 255, 0)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shimmerFlashBeam}
            />
          </Animated.View>

          {/* Ambient Sparkles */}
          {SPARKLE_PARTICLES.map((p) => (
            <Animated.View
              key={p.id}
              style={[
                styles.sparkleDot,
                {
                  top: p.top,
                  left: (p as any).left,
                  right: (p as any).right,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  transform: [{ scale: pulseAnim }],
                },
              ]}
            />
          ))}

          {/* Top Status Badges */}
          <View style={styles.heroTopRow}>
            <View style={styles.tierPill}>
              <Award size={13} color="#FBBF24" />
              <Text style={styles.tierPillText}>VIP GOLD PARTNER</Text>
            </View>
            <View style={styles.satisfactionPill}>
              <ShieldCheck size={12} color="#34D399" />
              <Text style={styles.satisfactionPillText}>98.4% POSITIVE</Text>
            </View>
          </View>

          {/* Hero Score Display */}
          <View style={styles.scoreRow}>
            <View style={styles.bigScoreWrap}>
              <Text style={styles.bigScoreText}>{partnerProfile.rating || '4.8'}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={15} color="#FFB800" fill="#FFB800" />
                ))}
              </View>
            </View>

            <View style={styles.scoreDivider} />

            <View style={styles.scoreMetaCol}>
              <View style={styles.scoreBadgeMini}>
                <Sparkles size={11} color="#FFD700" />
                <Text style={styles.scoreBadgeMiniText}>Top 5% Partner</Text>
              </View>
              <Text style={styles.reviewTotalText}>256 Customer Ratings</Text>
              <Text style={styles.reviewSubText}>2,480 total deliveries completed</Text>
            </View>
          </View>

          {/* Tier Progress Bar to Platinum */}
          <View style={styles.tierProgressBox}>
            <View style={styles.tierProgressLabelRow}>
              <Text style={styles.tierCurrentText}>Current: Gold Tier</Text>
              <Text style={styles.tierTargetText}>88 / 100 to Platinum 👑</Text>
            </View>
            <View style={styles.tierTrack}>
              <View style={[styles.tierFill, { width: '88%' }]} />
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 3. 4-CARD KEY METRICS GRID                               */}
        {/* ======================================================== */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>OPERATIONAL PERFORMANCE</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live Stats</Text>
          </View>
        </View>

        <View style={styles.metricsGrid}>
          {/* Metric 1 */}
          <View style={styles.metricCard}>
            <View style={[styles.metricIconWrap, { backgroundColor: '#EDE9FE' }]}>
              <Clock size={18} color="#6C3AE8" />
            </View>
            <Text style={styles.metricBigValue}>98.6%</Text>
            <Text style={styles.metricCardTitle}>On-Time Deliveries</Text>
            <View style={styles.metricTagRow}>
              <Text style={styles.metricStatusGood}>● Excellent</Text>
              <Text style={styles.metricTarget}>Target: 95%</Text>
            </View>
          </View>

          {/* Metric 2 */}
          <View style={styles.metricCard}>
            <View style={[styles.metricIconWrap, { backgroundColor: '#ECFDF5' }]}>
              <CheckCircle2 size={18} color="#059669" />
            </View>
            <Text style={styles.metricBigValue}>99.1%</Text>
            <Text style={styles.metricCardTitle}>Completion Rate</Text>
            <View style={styles.metricTagRow}>
              <Text style={styles.metricStatusGood}>● Flawless</Text>
              <Text style={styles.metricTarget}>Target: 98%</Text>
            </View>
          </View>

          {/* Metric 3 */}
          <View style={styles.metricCard}>
            <View style={[styles.metricIconWrap, { backgroundColor: '#FFFBEB' }]}>
              <TrendingUp size={18} color="#D97706" />
            </View>
            <Text style={styles.metricBigValue}>96.2%</Text>
            <Text style={styles.metricCardTitle}>Order Acceptance</Text>
            <View style={styles.metricTagRow}>
              <Text style={styles.metricStatusGood}>● High Priority</Text>
              <Text style={styles.metricTarget}>Target: 90%</Text>
            </View>
          </View>

          {/* Metric 4 */}
          <View style={styles.metricCard}>
            <View style={[styles.metricIconWrap, { backgroundColor: '#EFF6FF' }]}>
              <ThumbsUp size={18} color="#2563EB" />
            </View>
            <Text style={styles.metricBigValue}>4.9/5</Text>
            <Text style={styles.metricCardTitle}>Customer Feedback</Text>
            <View style={styles.metricTagRow}>
              <Text style={styles.metricStatusGood}>● Top Rated</Text>
              <Text style={styles.metricTarget}>256 votes</Text>
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 4. STAR RATING BREAKDOWN HISTOGRAM                       */}
        {/* ======================================================== */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Rating Breakdown</Text>
            <Text style={styles.cardSubRight}>256 Reviews</Text>
          </View>

          <View style={styles.histogramList}>
            {STAR_BREAKDOWN.map((item) => (
              <View key={item.stars} style={styles.histogramRow}>
                <View style={styles.starLabelWrap}>
                  <Text style={styles.starLabelNum}>{item.stars}</Text>
                  <Star size={12} color="#FFB800" fill="#FFB800" />
                </View>

                <View style={styles.histogramTrack}>
                  <View
                    style={[
                      styles.histogramFill,
                      { width: `${item.percent}%`, backgroundColor: item.color },
                    ]}
                  />
                </View>

                <Text style={styles.histogramCount}>{item.count}</Text>
                <Text style={styles.histogramPercent}>({item.percent}%)</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ======================================================== */}
        {/* 5. PARTNER BADGES & COMPLIMENTS                          */}
        {/* ======================================================== */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Sparkles size={16} color="#6C3AE8" />
              <Text style={styles.cardTitle}>Customer Compliments</Text>
            </View>
            <View style={styles.badgeCountPill}>
              <Text style={styles.badgeCountText}>441 Total</Text>
            </View>
          </View>

          <View style={styles.complimentsList}>
            {COMPLIMENTS.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.complimentCard,
                  { backgroundColor: item.color, borderColor: item.border },
                ]}>
                <Text style={styles.complimentEmoji}>{item.icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.complimentTitle}>{item.label}</Text>
                  <Text style={styles.complimentCountText}>{item.count} customers thanked you</Text>
                </View>
                <CheckCircle2 size={16} color="#059669" />
              </View>
            ))}
          </View>
        </View>

        {/* ======================================================== */}
        {/* 6. RECENT VERIFIED CUSTOMER REVIEWS                      */}
        {/* ======================================================== */}
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Heart size={16} color="#EC4899" />
              <Text style={styles.cardTitle}>Recent Customer Feedback</Text>
            </View>
            <Text style={styles.cardSubRight}>Verified</Text>
          </View>

          <View style={styles.reviewsList}>
            {RECENT_REVIEWS.map((review, idx) => (
              <View
                key={review.id}
                style={[
                  styles.reviewItem,
                  idx !== RECENT_REVIEWS.length - 1 && styles.reviewItemBorder,
                ]}>
                <View style={styles.reviewTopRow}>
                  <View style={styles.reviewerAvatar}>
                    <Text style={styles.avatarInitial}>
                      {review.customerName.charAt(0)}
                    </Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewerName}>{review.customerName}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>

                  <View style={styles.reviewStarsPill}>
                    <Star size={11} color="#FFB800" fill="#FFB800" />
                    <Text style={styles.reviewStarsText}>{review.rating}</Text>
                  </View>
                </View>

                <View style={styles.orderTagPill}>
                  <Package size={11} color="#6C3AE8" />
                  <Text style={styles.orderTagText}>{review.tag}</Text>
                </View>

                <Text style={styles.reviewComment}>
                  &ldquo;{review.comment}&rdquo;
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ======================================================== */}
        {/* 7. GOLD TIER PERKS CARD                                  */}
        {/* ======================================================== */}
        <View style={styles.perksCard}>
          <LinearGradient
            colors={['#FFFBEB', '#FEF3C7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.perksHeader}>
            <View style={styles.flameIconWrap}>
              <Flame size={20} color="#D97706" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.perksTitle}>Active Gold Tier Perks</Text>
              <Text style={styles.perksSub}>Unlocked by maintaining 4.8+ rating</Text>
            </View>
          </View>

          <View style={styles.perksList}>
            <View style={styles.perkRow}>
              <Zap size={14} color="#D97706" />
              <Text style={styles.perkText}>+₹10 Instant Peak-Hour surge bonus on all orders</Text>
            </View>
            <View style={styles.perkRow}>
              <ShieldCheck size={14} color="#059669" />
              <Text style={styles.perkText}>Priority order assignment within 3 km radius</Text>
            </View>
            <View style={styles.perkRow}>
              <ArrowUpRight size={14} color="#2563EB" />
              <Text style={styles.perkText}>Fast-track instant daily wallet withdrawals</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  filterTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ECE4FF',
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  filterTabActive: {
    backgroundColor: '#6C3AE8',
  },
  filterTabText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#64748B',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(167, 139, 250, 0.4)',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  shimmerFlashWrap: {
    position: 'absolute',
    top: -100,
    bottom: -100,
    width: 90,
  },
  shimmerFlashBeam: {
    flex: 1,
  },
  sparkleDot: {
    position: 'absolute',
    borderRadius: 8,
    zIndex: 1,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tierPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(251, 191, 36, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.35)',
  },
  tierPillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FBBF24',
    letterSpacing: 0.5,
  },
  satisfactionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(52, 211, 153, 0.18)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.35)',
  },
  satisfactionPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#34D399',
    letterSpacing: 0.5,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bigScoreWrap: {
    alignItems: 'center',
    paddingRight: 16,
  },
  bigScoreText: {
    fontSize: 46,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 52,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 2,
  },
  scoreDivider: {
    width: 1,
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 16,
  },
  scoreMetaCol: {
    flex: 1,
  },
  scoreBadgeMini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  scoreBadgeMiniText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFD700',
  },
  reviewTotalText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  reviewSubText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 2,
  },
  tierProgressBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  tierProgressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tierCurrentText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FCD34D',
  },
  tierTargetText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  tierTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  tierFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  metricCard: {
    width: '48.4%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  metricIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  metricBigValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
  },
  metricCardTitle: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#475569',
    marginTop: 2,
    marginBottom: 6,
  },
  metricTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  metricStatusGood: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  metricTarget: {
    fontSize: 9.5,
    color: '#94A3B8',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 14,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  cardSubRight: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  histogramList: {
    gap: 8,
  },
  histogramRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    width: 24,
  },
  starLabelNum: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
  },
  histogramTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  histogramFill: {
    height: '100%',
    borderRadius: 4,
  },
  histogramCount: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E293B',
    width: 28,
    textAlign: 'right',
  },
  histogramPercent: {
    fontSize: 10,
    color: '#64748B',
    width: 38,
    textAlign: 'right',
  },
  badgeCountPill: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeCountText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  complimentsList: {
    gap: 8,
  },
  complimentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  complimentEmoji: {
    fontSize: 22,
  },
  complimentTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  complimentCountText: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 1,
  },
  reviewsList: {
    gap: 12,
  },
  reviewItem: {
    paddingVertical: 4,
  },
  reviewItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
  },
  reviewTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  reviewerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  reviewerName: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  reviewDate: {
    fontSize: 10.5,
    color: '#94A3B8',
  },
  reviewStarsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  reviewStarsText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
  },
  orderTagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  orderTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  reviewComment: {
    fontSize: 11.5,
    color: '#475569',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  perksCard: {
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  perksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  flameIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  perksTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#92400E',
  },
  perksSub: {
    fontSize: 10.5,
    color: '#B45309',
    marginTop: 1,
  },
  perksList: {
    gap: 6,
  },
  perkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perkText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#78350F',
    flex: 1,
  },
});
