import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  Animated,
  Modal,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { HomeBazzLogo } from '@/components/common/HomeBazLogo';
import { TabScreenLoader } from '@/components/common/TabScreenLoader';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import {
  Bell,
  Wallet,
  ShoppingBag,
  CheckCircle2,
  Clock,
  Play,
  TrendingUp,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Star,
  Layers,
  BarChart2,
  Sparkles,
  Flame,
  Bike,
} from 'lucide-react-native';

const FOOD_IMAGES = [
  require('@/assets/images/Food/Food1.jpg'),
  require('@/assets/images/Food/Food2.jpg'),
  require('@/assets/images/Food/Food3.jpg'),
  require('@/assets/images/Food/Food4.jpg'),
  require('@/assets/images/Food/Food5.jpg'),
  require('@/assets/images/Food/Food6.jpg'),
];

// Festive cracker & sparkle particles for hero card animation
const HERO_CRACKER_PARTICLES = [
  { id: 1, top: 12, right: 38, size: 14, color: '#FFD700' },
  { id: 2, top: 22, right: 88, size: 11, color: '#38BDF8' },
  { id: 3, top: 50, right: 22, size: 10, color: '#34D399' },
  { id: 4, bottom: 20, right: 120, size: 12, color: '#F472B6' },
  { id: 5, top: 14, left: 168, size: 12, color: '#FBBF24' },
  { id: 6, bottom: 16, left: 135, size: 9, color: '#60A5FA' },
  { id: 7, top: 52, left: 195, size: 11, color: '#FF6B6B' },
];

const TWENTY_ORDERS = [
  {
    id: 'hb_1',
    displayId: 'HB123456',
    title: 'Gongura Pickle & Sweets Box',
    price: 720,
    itemsCount: 3,
    store: 'HomeBazz Gourmet Store',
    destination: 'Beach Road (2.4 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    priorityBadge: '🔥 High Priority Pickup',
    isPriority: true,
    image: require('@/assets/images/Food/Food1.jpg'),
  },
  {
    id: 'hb_2',
    displayId: 'HB123455',
    title: 'Mango Avakaya Pickle Traditional',
    price: 470,
    itemsCount: 2,
    store: 'Sri Balaji Pickles',
    destination: 'MVP Colony (3.1 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    priorityBadge: '⚡ Express Pickup',
    isPriority: true,
    image: require('@/assets/images/Food/Food2.jpg'),
  },
  {
    id: 'hb_3',
    displayId: 'HB123454',
    title: 'Lemon Pickle Traditional Homemade',
    price: 250,
    itemsCount: 1,
    store: 'Amma Vantalu Kitchen',
    destination: 'Waltair Uplands (1.8 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/Food/Food3.jpg'),
  },
  {
    id: 'hb_4',
    displayId: 'HB123453',
    title: 'Andhra Spice Podi & Masala Combo',
    price: 580,
    itemsCount: 4,
    store: 'Andhra Spices Depot',
    destination: 'Gajuwaka Main Rd (5.2 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/Food/Food4.jpg'),
  },
  {
    id: 'hb_5',
    displayId: 'HB123452',
    title: 'Pootharekulu Special Ghee Sweets',
    price: 650,
    itemsCount: 2,
    store: 'Godavari Sweets House',
    destination: 'Dwarakanagar (1.2 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    priorityBadge: '🔥 High Priority Pickup',
    isPriority: true,
    image: require('@/assets/images/Food/Food5.jpg'),
  },
  {
    id: 'hb_6',
    displayId: 'HB123451',
    title: 'Murukku & Jantarikalu Snacks Box',
    price: 320,
    itemsCount: 3,
    store: 'HomeBazz Snack Corner',
    destination: 'Siripuram Circle (2.0 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/Food/Food6.jpg'),
  },
  {
    id: 'hb_7',
    displayId: 'HB123450',
    title: 'Pure Buffalo Ghee & Bellam Laddu',
    price: 890,
    itemsCount: 2,
    store: 'Ksheera Dairy Products',
    destination: 'Madhurawada (6.5 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    priorityBadge: '⚡ Express Pickup',
    isPriority: true,
    image: require('@/assets/images/Food/Food7.jpg'),
  },
  {
    id: 'hb_8',
    displayId: 'HB123449',
    title: 'Crispy Ribbon Pakoda & Chekkalu',
    price: 410,
    itemsCount: 2,
    store: 'Rayalaseema Home Foods',
    destination: 'Akkayyapalem (2.8 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/Food/Food8.jpg'),
  },
  {
    id: 'hb_9',
    displayId: 'HB123448',
    title: 'Garlic Karampodi & Kandi Podi',
    price: 340,
    itemsCount: 3,
    store: 'Traditional Spices Depo',
    destination: 'Seethammadhara (3.4 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    image: require('@/assets/images/Food/Food9.jpg'),
  },
  {
    id: 'hb_10',
    displayId: 'HB123447',
    title: 'Tomato & Red Chilli Chutney Jar',
    price: 290,
    itemsCount: 1,
    store: 'Coastal Flavour Kitchen',
    destination: 'Rushikonda IT SEZ (8.1 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/Food/Food10.jpg'),
  },
  {
    id: 'hb_11',
    displayId: 'HB123446',
    title: 'Kaju Katli & Dry Fruit Gift Box',
    price: 780,
    itemsCount: 2,
    store: 'Mithai Mandir Special',
    destination: 'Jagadamba Junction (1.5 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    image: require('@/assets/images/Food/Food11.jpg'),
  },
  {
    id: 'hb_12',
    displayId: 'HB123445',
    title: 'Spicy Corn Mixture & Dal Moth',
    price: 260,
    itemsCount: 1,
    store: 'Visakha Namkeen Centre',
    destination: 'Railway New Colony (2.1 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/Food/Food12.jpg'),
  },
  {
    id: 'hb_13',
    displayId: 'HB123444',
    title: 'Handmade Terracotta Diya Set',
    price: 540,
    itemsCount: 4,
    store: 'Visakha Clay Works',
    destination: 'Lawsons Bay Colony (3.9 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    image: require('@/assets/images/handmade/handmade1.jpg'),
  },
  {
    id: 'hb_14',
    displayId: 'HB123443',
    title: 'Artisan Terracotta Garden Planter',
    price: 820,
    itemsCount: 2,
    store: 'Mitti Arts & Crafts',
    destination: 'Pendurthi Highway (7.4 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    image: require('@/assets/images/handmade/handmade2.jpg'),
  },
  {
    id: 'hb_15',
    displayId: 'HB123442',
    title: 'Brass Pooja Bell & Oil Lamp',
    price: 1250,
    itemsCount: 2,
    store: 'Heritage Metalcraft',
    destination: 'Simhachalam Temple Rd (9.2 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/handmade/handmade3.jpg'),
  },
  {
    id: 'hb_16',
    displayId: 'HB123441',
    title: 'Carved Wooden Spice Storage Box',
    price: 950,
    itemsCount: 1,
    store: 'Rustic Woodcrafts',
    destination: 'Kommadi Junction (10.0 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    image: require('@/assets/images/handmade/handmade4.jpg'),
  },
  {
    id: 'hb_17',
    displayId: 'HB123440',
    title: 'Handcrafted Jute Storage Baskets',
    price: 680,
    itemsCount: 3,
    store: 'EcoCraft Natural Fibers',
    destination: 'Waltair Station Rd (2.5 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/handmade/handmade5.jpg'),
  },
  {
    id: 'hb_18',
    displayId: 'HB123439',
    title: 'Handloom Cotton Ikat Table Runner',
    price: 620,
    itemsCount: 2,
    store: 'Pochampally Weaves Emporium',
    destination: 'Yendada Beach View (5.8 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/art-decor/decor1.jpg'),
  },
  {
    id: 'hb_19',
    displayId: 'HB123438',
    title: 'Traditional Kalamkari Wall Hanging',
    price: 1400,
    itemsCount: 1,
    store: 'Kalamkari Art Studio',
    destination: 'Sagar Nagar (6.2 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    image: require('@/assets/images/art-decor/decor2.jpg'),
  },
  {
    id: 'hb_20',
    displayId: 'HB123437',
    title: 'Handmade Brass Wind Chime',
    price: 750,
    itemsCount: 1,
    store: 'Symphony Crafts',
    destination: 'Old Post Office Area (3.0 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/art-decor/decor3.jpg'),
  },
  {
    id: 'hb_21',
    displayId: 'HB123436',
    title: 'Kundan & Pearl Studded Bangles',
    price: 1850,
    itemsCount: 2,
    store: 'Aabharan Heritage Jewellery',
    destination: 'Kurupam Market Rd (2.2 km)',
    badge: 'Pick Up',
    badgeType: 'purple',
    image: require('@/assets/images/jewellery/jewellery1.jpg'),
  },
  {
    id: 'hb_22',
    displayId: 'HB123435',
    title: 'Silver Filigree Jhumka Earrings',
    price: 1120,
    itemsCount: 1,
    store: 'Silver Shine Ornaments',
    destination: 'Kancharapalem (4.0 km)',
    badge: 'Deliver',
    badgeType: 'green',
    image: require('@/assets/images/jewellery/jewellery2.jpg'),
  },
];

export default function HomeDashboardScreen() {
  const insets = useSafeAreaInsets();
  const { isOnline, setIsOnline, partnerProfile } = useApp();
  const [homeFilter, setHomeFilter] = useState<'all' | 'pickup' | 'deliver'>('all');

  // Multi-color page transition loader on tab navigation
  const [isTabLoading, setIsTabLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsTabLoading(true);
      const timer = setTimeout(() => {
        setIsTabLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }, [])
  );

  const filteredOrders = TWENTY_ORDERS.filter((item) => {
    if (homeFilter === 'pickup') return item.badge === 'Pick Up';
    if (homeFilter === 'deliver') return item.badge === 'Deliver';
    return true;
  });
  // User request: sample 8 orders on home page, remaining all on orders page
  const sampleOrders = filteredOrders.slice(0, 8);

  // Duty Status Toggle Modal Popup State
  const [showDutyModal, setShowDutyModal] = useState(false);
  const [dutyModalMsg, setDutyModalMsg] = useState({
    title: 'You are Now Online! 🚀',
    subtitle: 'You will receive nearby delivery pickup requests in real time.',
  });

  const handleToggleDuty = (val: boolean) => {
    setIsOnline(val);
    setDutyModalMsg({
      title: val ? 'You are Now Online! 🚀' : 'You are Now Offline 🌙',
      subtitle: val
        ? 'You will now receive nearby delivery pickup requests in real time.'
        : 'Order assignments are paused. Take a well-deserved rest!',
    });
    setShowDutyModal(true);
  };

  // Subtle floating pulse & shimmer animation for hero card
  const [pulseAnim] = useState(() => new Animated.Value(1));
  // Festive cracker & sparkle twinkle animation for hero card
  const [crackerAnim] = useState(() => new Animated.Value(0));
  // Continuous diagonal flash shaded beam animation for hero card
  const [shimmerFlash] = useState(() => new Animated.Value(0));
  // Micro delivery silhouette transit animation across lower hero card
  const [heroTransitAnim] = useState(() => new Animated.Value(0));
  // Subtle rhythmic breathing animation for the 4 stat cards
  const [cardsPulseAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Hero pulse glow
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

    // 2. Festive cracker sparkles twinkle
    Animated.loop(
      Animated.sequence([
        Animated.timing(crackerAnim, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(crackerAnim, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3. Hero flash light sweep shimmer
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

    // 4. Hero micro delivery transit glide
    Animated.loop(
      Animated.timing(heroTransitAnim, {
        toValue: 1,
        duration: 5200,
        useNativeDriver: true,
      })
    ).start();

    // 5. Stat cards subtle breathing pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(cardsPulseAnim, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(cardsPulseAnim, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim, crackerAnim, shimmerFlash, heroTransitAnim, cardsPulseAnim]);

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

  // Hero flash light beam sweep
  const shimmerTranslateX = shimmerFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 440],
  });

  // Hero micro delivery bike transit
  const heroTransitTranslateX = heroTransitAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, 390],
  });

  // Stat cards breathing animations
  const cardsGlowOpacity = cardsPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.12, 0.42],
  });

  const cardsIconScale = cardsPulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  // Decreased size, sleek 7-day weekly mini-bar sparkline
  const weeklyBars = [
    { day: 'M', height: 16, active: false },
    { day: 'T', height: 26, active: false },
    { day: 'W', height: 22, active: false },
    { day: 'T', height: 30, active: false },
    { day: 'F', height: 36, active: false },
    { day: 'S', height: 44, active: true }, // Today (Active bar)
    { day: 'S', height: 18, active: false },
  ];

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      {/* Multi-Color Small Card Page Loader on Tab Navigation */}
      <TabScreenLoader visible={isTabLoading} tabName="home" />

      {/* Top Header with Compact Sleek Logo */}
      <View style={styles.topHeader}>
        {/* Left: Compact HomeBazz Logo */}
        <View style={styles.headerLeftLogo}>
          <HomeBazzLogo size="mini" showSubtitle={false} />
        </View>

        {/* Right: Notification Bell & Partner Avatar Button */}
        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.notifIconCircle}
            onPress={() => router.push('/notifications')}
            activeOpacity={0.8}>
            <Bell size={18} color="#111447" />
            <View style={styles.notifDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.partnerAvatarCircle}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.8}>
            <LinearGradient
              colors={['#7E49EE', '#5A23C8']}
              style={styles.partnerAvatarGradient}>
              <Text style={styles.partnerAvatarText}>RK</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 95 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* 1. Main Purple Hero Card with Smooth Luminous Radiant Gradient */}
        <TouchableOpacity
          activeOpacity={0.92}
          onPress={() => router.push('/(tabs)/earnings')}>
          <LinearGradient
            colors={['#240778', '#3C0F96', '#591EC4', '#7B3BF2', '#9F5CFF']}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 1, y: 0.95 }}
            style={styles.heroCard}>
            {/* Ambient Background Glowing Diffusion (Top-Right Radiant Light) */}
            <Animated.View
              style={[
                styles.heroGlowOrb,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />

            {/* Secondary Golden-Amber Radiant Ambient Halo (Bottom-Right Glow) */}
            <Animated.View
              style={[
                styles.heroGlowOrb2,
                { transform: [{ scale: pulseAnim }] },
              ]}
            />

            {/* Micro Delivery Silhouette Transit (Moving across lower hero background) */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.heroBgMicroTransit,
                { transform: [{ translateX: heroTransitTranslateX }] },
              ]}>
              <Bike size={18} color="rgba(255, 255, 255, 0.32)" strokeWidth={2.2} />
              <View style={styles.heroTransitSpeedLine} />
            </Animated.View>

            {/* Continuous Diagonal Flash Shaded Sweep Beam (Light shine animation) */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.heroFlashBeamWrap,
                { transform: [{ translateX: shimmerTranslateX }, { rotate: '25deg' }] },
              ]}>
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0)',
                  'rgba(255, 255, 255, 0.05)',
                  'rgba(255, 255, 255, 0.35)',
                  'rgba(255, 255, 255, 0.70)',
                  'rgba(255, 255, 255, 0.35)',
                  'rgba(255, 255, 255, 0.05)',
                  'rgba(255, 255, 255, 0)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.heroFlashBeam}
              />
            </Animated.View>

            {/* Animated Festive Cracker Sparkle Particles */}
            {HERO_CRACKER_PARTICLES.map((p) => (
              <Animated.View
                key={p.id}
                style={[
                  styles.heroCrackerParticle,
                  {
                    top: p.top,
                    bottom: p.bottom,
                    left: p.left,
                    right: p.right,
                    transform: [{ scale: crackerScale }, { rotate: crackerRotate }],
                    opacity: crackerOpacity,
                  },
                ]}>
                <Sparkles size={p.size} color={p.color} />
              </Animated.View>
            ))}

            {/* Sparkles Decoration */}
            <View style={styles.sparkleDecoration1}>
              <Sparkles size={14} color="rgba(255, 255, 255, 0.6)" />
            </View>
            <View style={styles.sparkleDecoration2}>
              <Sparkles size={16} color="rgba(255, 215, 0, 0.85)" />
            </View>

            {/* Hero Top Greeting Row */}
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroGreeting}>Hi, Rajesh Kumar 👋</Text>
                <View style={styles.verifiedRow}>
                  <Text style={styles.partnerLabel}>HomeBazz Express</Text>
                  <View style={styles.verifiedBadge}>
                    <ShieldCheck size={11} color="#10B981" />
                    <Text style={styles.verifiedBadgeText}>Verified Partner</Text>
                  </View>
                </View>
              </View>

              {/* Wallet Round Button on Right */}
              <TouchableOpacity
                style={styles.heroWalletBtn}
                onPress={() => router.push('/(tabs)/earnings')}
                activeOpacity={0.8}>
                <Wallet size={17} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Hero Middle Content: Today's Earnings & Decreased-Size Mini Sparkline Chart */}
            <View style={styles.heroMiddleRow}>
              <View style={styles.heroEarningsCol}>
                <View style={styles.earningsTagPill}>
                  <Sparkles size={11} color="#FFD700" />
                  <Text style={styles.earningsTagText}>{"TODAY'S EARNINGS"}</Text>
                </View>
                <Text style={styles.heroAmount}>₹{partnerProfile.todayEarnings}</Text>
                <View style={styles.heroTrendPill}>
                  <TrendingUp size={11} color="#10B981" />
                  <Text style={styles.heroTrendText}>+12.5% vs yesterday</Text>
                </View>
              </View>

              {/* Compact Mini 7-Day Sparkline Bar Chart Widget */}
              <View style={styles.weeklyChartContainer}>
                <View style={styles.chartBarsRow}>
                  {weeklyBars.map((item, idx) => (
                    <View key={idx} style={styles.chartBarCol}>
                      <View style={styles.barTrack}>
                        <View
                          style={[
                            styles.barFill,
                            {
                              height: item.height,
                              backgroundColor: item.active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.38)',
                            },
                            item.active && styles.barFillActive,
                          ]}
                        />
                      </View>
                      <Text
                        style={[
                          styles.barDayText,
                          item.active && styles.barDayTextActive,
                        ]}>
                        {item.day}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* 2. 4 Modern Vibrant Stat Cards with Rich Differentiated Gradient Colors */}
        <View style={styles.statGridRow}>
          {/* Card 1: Orders (Rich Royal Violet Gradient) */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(tabs)/orders')}
            style={styles.statCardOuter}>
            <LinearGradient
              colors={['#F5EEFF', '#E9D6FF', '#D2B3FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.coloredStatCard, styles.cardViolet]}>
              {/* Subtle background watermark icon */}
              <View style={styles.cardWatermark} pointerEvents="none">
                <ShoppingBag size={58} color="#7C3AED" strokeWidth={1.4} />
              </View>
              {/* Corner ambient glow */}
              <Animated.View
                pointerEvents="none"
                style={[styles.cardCornerGlow, { backgroundColor: '#8B5CF6', opacity: cardsGlowOpacity }]}
              />

              <View style={styles.statCardHeader}>
                <Animated.View
                  style={[
                    styles.statIconWrap,
                    { backgroundColor: '#7C3AED', transform: [{ scale: cardsIconScale }] },
                  ]}>
                  <ShoppingBag size={17} color="#FFFFFF" strokeWidth={2.4} />
                </Animated.View>
                <View style={styles.statTrendPillViolet}>
                  <Text style={styles.statTrendTextViolet}>▲ +12% today</Text>
                </View>
              </View>
              <View style={styles.statCardFooter}>
                <View>
                  <Text style={[styles.statCardLabel, { color: '#6B21A8' }]}>Orders</Text>
                  <Text style={[styles.statCardValue, { color: '#2E1065' }]}>{partnerProfile.totalOrders}</Text>
                </View>
                <ChevronRight size={18} color="#6D28D9" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Card 2: Delivered (Rich Fresh Mint / Emerald Gradient) */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(tabs)/earnings')}
            style={styles.statCardOuter}>
            <LinearGradient
              colors={['#ECFDF5', '#D1FAE5', '#86EFAC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.coloredStatCard, styles.cardEmerald]}>
              {/* Subtle background watermark icon */}
              <View style={styles.cardWatermark} pointerEvents="none">
                <CheckCircle2 size={58} color="#059669" strokeWidth={1.4} />
              </View>
              {/* Corner ambient glow */}
              <Animated.View
                pointerEvents="none"
                style={[styles.cardCornerGlow, { backgroundColor: '#10B981', opacity: cardsGlowOpacity }]}
              />

              <View style={styles.statCardHeader}>
                <Animated.View
                  style={[
                    styles.statIconWrap,
                    { backgroundColor: '#059669', transform: [{ scale: cardsIconScale }] },
                  ]}>
                  <CheckCircle2 size={17} color="#FFFFFF" strokeWidth={2.4} />
                </Animated.View>
                <View style={styles.statTrendPillEmerald}>
                  <Text style={styles.statTrendTextEmerald}>▲ 98% Success</Text>
                </View>
              </View>
              <View style={styles.statCardFooter}>
                <View>
                  <Text style={[styles.statCardLabel, { color: '#065F46' }]}>Delivered</Text>
                  <Text style={[styles.statCardValue, { color: '#022C22' }]}>{partnerProfile.completedOrders}</Text>
                </View>
                <ChevronRight size={18} color="#047857" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.statGridRow}>
          {/* Card 3: Pending (Rich Solar Amber / Golden Sunset Gradient) */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/(tabs)/orders')}
            style={styles.statCardOuter}>
            <LinearGradient
              colors={['#FFFBEB', '#FEF3C7', '#FCD34D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.coloredStatCard, styles.cardAmber]}>
              {/* Subtle background watermark icon */}
              <View style={styles.cardWatermark} pointerEvents="none">
                <Clock size={58} color="#D97706" strokeWidth={1.4} />
              </View>
              {/* Corner ambient glow */}
              <Animated.View
                pointerEvents="none"
                style={[styles.cardCornerGlow, { backgroundColor: '#F59E0B', opacity: cardsGlowOpacity }]}
              />

              <View style={styles.statCardHeader}>
                <Animated.View
                  style={[
                    styles.statIconWrap,
                    { backgroundColor: '#D97706', transform: [{ scale: cardsIconScale }] },
                  ]}>
                  <Clock size={17} color="#FFFFFF" strokeWidth={2.4} />
                </Animated.View>
                <View style={styles.statTrendPillAmber}>
                  <Text style={styles.statTrendTextAmber}>⚡ 2 active</Text>
                </View>
              </View>
              <View style={styles.statCardFooter}>
                <View>
                  <Text style={[styles.statCardLabel, { color: '#92400E' }]}>Pending</Text>
                  <Text style={[styles.statCardValue, { color: '#451A03' }]}>{partnerProfile.pendingDeliveries}</Text>
                </View>
                <ChevronRight size={18} color="#B45309" />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Card 4: Rating (Rich Arctic Cyan / Ocean Teal Gradient) */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push('/profile/performance')}
            style={styles.statCardOuter}>
            <LinearGradient
              colors={['#F0F9FF', '#E0F2FE', '#7DD3FC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.coloredStatCard, styles.cardCyan]}>
              {/* Subtle background watermark icon */}
              <View style={styles.cardWatermark} pointerEvents="none">
                <Star size={58} color="#0284C7" fill="#0284C7" strokeWidth={1.4} />
              </View>
              {/* Corner ambient glow */}
              <Animated.View
                pointerEvents="none"
                style={[styles.cardCornerGlow, { backgroundColor: '#0284C7', opacity: cardsGlowOpacity }]}
              />

              <View style={styles.statCardHeader}>
                <Animated.View
                  style={[
                    styles.statIconWrap,
                    { backgroundColor: '#0284C7', transform: [{ scale: cardsIconScale }] },
                  ]}>
                  <Star size={17} color="#FFFFFF" fill="#FFFFFF" />
                </Animated.View>
                <View style={styles.statTrendPillCyan}>
                  <Text style={styles.statTrendTextCyan}>⚡ Top 1%</Text>
                </View>
              </View>
              <View style={styles.statCardFooter}>
                <View>
                  <Text style={[styles.statCardLabel, { color: '#0369A1' }]}>Rating</Text>
                  <Text style={[styles.statCardValue, { color: '#082F49' }]}>4.9 ★</Text>
                </View>
                <ChevronRight size={18} color="#0369A1" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 3. Quick Action Button Row */}
        <View style={styles.quickActionRow}>
          <TouchableOpacity
            style={styles.primaryActionBtn}
            onPress={() => router.push('/orders/new-request')}
            activeOpacity={0.85}>
            <LinearGradient
              colors={['#7E49EE', '#6530E4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryActionGradient}>
              <Play size={13} color="#FFFFFF" fill="#FFFFFF" />
              <Text style={styles.primaryActionText}>Start Delivery</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryActionBtn}
            onPress={() => router.push('/(tabs)/orders')}
            activeOpacity={0.8}>
            <Layers size={14} color={Colors.primary} />
            <Text style={styles.secondaryActionText}>Queue</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryActionBtn}
            onPress={() => router.push('/earnings/payouts')}
            activeOpacity={0.8}>
            <BarChart2 size={14} color={Colors.primary} />
            <Text style={styles.secondaryActionText}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* 4. Availability Status Toggle Bar */}
        <View style={styles.onlineToggleRow}>
          <View style={styles.onlineLeft}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isOnline ? Colors.success : Colors.secondaryText },
              ]}
            />
            <View>
              <Text style={styles.onlineText}>
                {isOnline ? 'You are Online' : 'You are Offline'}
              </Text>
              <Text style={styles.onlineSub}>
                {isOnline ? 'Receiving instant delivery assignments' : 'Go online to receive nearby orders'}
              </Text>
            </View>
          </View>
          <Switch
            value={isOnline}
            onValueChange={handleToggleDuty}
            trackColor={{ false: '#E2DEEC', true: Colors.success }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* 5. Recent Delivery Orders (Sample 8 of 22 with High Priority Pickups) */}
        <View style={styles.sectionHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={styles.sectionTitle}>Home Orders</Text>
            <View style={styles.twentyBadge}>
              <Text style={styles.twentyBadgeText}>Sample ({sampleOrders.length} of {TWENTY_ORDERS.length})</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/orders')} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All ({TWENTY_ORDERS.length}) →</Text>
          </TouchableOpacity>
        </View>

        {/* Category Pills */}
        <View style={styles.homeCategoryFilterRow}>
          <TouchableOpacity
            style={[styles.homeFilterPill, homeFilter === 'all' && styles.homeFilterPillActive]}
            onPress={() => setHomeFilter('all')}>
            <Text
              style={[
                styles.homeFilterPillText,
                homeFilter === 'all' && styles.homeFilterPillTextActive,
              ]}>
              All ({TWENTY_ORDERS.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.homeFilterPill, homeFilter === 'pickup' && styles.homeFilterPillActive]}
            onPress={() => setHomeFilter('pickup')}>
            <Text
              style={[
                styles.homeFilterPillText,
                homeFilter === 'pickup' && styles.homeFilterPillTextActive,
              ]}>
              Pick Up (12)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.homeFilterPill, homeFilter === 'deliver' && styles.homeFilterPillActive]}
            onPress={() => setHomeFilter('deliver')}>
            <Text
              style={[
                styles.homeFilterPillText,
                homeFilter === 'deliver' && styles.homeFilterPillTextActive,
              ]}>
              Deliver (10)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sample Orders Rendered (6-8 items with High Priority Pickups highlight) */}
        <View style={styles.twentyOrdersList}>
          {sampleOrders.map((item) => {
            const isGreen = item.badgeType === 'green';
            const isPriority = !!item.isPriority;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.recentOrderCard,
                  isPriority && styles.recentOrderCardPriority,
                ]}
                onPress={() => router.push('/orders/details')}
                activeOpacity={0.85}>
                <Image source={item.image} style={styles.productThumb} resizeMode="cover" />
                <View style={styles.orderInfoCol}>
                  <View style={styles.orderIdBadgeRow}>
                    <Text style={styles.orderIdText}>#{item.displayId}</Text>
                    <View
                      style={[
                        styles.newBadgePill,
                        { backgroundColor: isGreen ? '#D1FAE5' : '#EDE9FE' },
                      ]}>
                      <Text
                        style={[
                          styles.newBadgeText,
                          { color: isGreen ? '#059669' : '#6C3AE8' },
                        ]}>
                        {item.badge}
                      </Text>
                    </View>
                    {item.priorityBadge && (
                      <View style={styles.priorityBadgePill}>
                        <Flame size={10} color="#EA580C" />
                        <Text style={styles.priorityBadgeText}>
                          {item.priorityBadge}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.productTitleText} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.orderMetaText}>
                    ₹{item.price} • {item.itemsCount} items • {item.store}
                  </Text>
                  <View style={styles.locationSmallRow}>
                    <MapPin size={11} color="#6C3AE8" />
                    <Text style={styles.locationSmallText} numberOfLines={1}>
                      {item.destination}
                    </Text>
                  </View>
                </View>
                <ChevronRight size={18} color="#A0A5BA" />
              </TouchableOpacity>
            );
          })}

          {/* View Remaining Orders Queue Button */}
          <TouchableOpacity
            style={styles.viewMoreOrdersCard}
            onPress={() => router.push('/(tabs)/orders')}
            activeOpacity={0.85}>
            <LinearGradient
              colors={['#F5F3FF', '#EDE9FE']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.viewMoreOrdersGradient}>
              <Layers size={16} color="#6C3AE8" />
              <Text style={styles.viewMoreOrdersText}>
                View All {TWENTY_ORDERS.length} Orders in Queue
              </Text>
              <ChevronRight size={16} color="#6C3AE8" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* 6. High Priority Pickups Carousel */}
        <View style={[styles.sectionHeaderRow, { marginTop: 18 }]}>
          <View style={styles.fireHeaderRow}>
            <Text style={styles.fireEmoji}>🔥</Text>
            <Text style={styles.sectionTitle}>High Priority Pickups</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/orders')} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All (6) →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalProductsRow}>
          {/* Card 1 */}
          <TouchableOpacity
            style={styles.topProductCard}
            onPress={() => router.push('/orders/details')}
            activeOpacity={0.85}>
            <Image source={FOOD_IMAGES[2]} style={styles.topProductImage} resizeMode="cover" />
            <View style={styles.productRatingPill}>
              <Star size={11} color="#FFB800" fill="#FFB800" />
              <Text style={styles.productRatingText}>4.9</Text>
            </View>
            <View style={styles.topProductMeta}>
              <Text style={styles.topProductTitle} numberOfLines={1}>Avakaya Pickle Box</Text>
              <Text style={styles.topProductStore}>HomeBazz Store</Text>
              <Text style={styles.topProductFee}>+₹65 Earned</Text>
            </View>
          </TouchableOpacity>

          {/* Card 2 */}
          <TouchableOpacity
            style={styles.topProductCard}
            onPress={() => router.push('/orders/details')}
            activeOpacity={0.85}>
            <Image source={FOOD_IMAGES[3]} style={styles.topProductImage} resizeMode="cover" />
            <View style={styles.productRatingPill}>
              <Star size={11} color="#FFB800" fill="#FFB800" />
              <Text style={styles.productRatingText}>4.8</Text>
            </View>
            <View style={styles.topProductMeta}>
              <Text style={styles.topProductTitle} numberOfLines={1}>Andhra Sweets Special</Text>
              <Text style={styles.topProductStore}>Dwarakanagar Kitchen</Text>
              <Text style={styles.topProductFee}>+₹75 Earned</Text>
            </View>
          </TouchableOpacity>

          {/* Card 3 */}
          <TouchableOpacity
            style={styles.topProductCard}
            onPress={() => router.push('/orders/details')}
            activeOpacity={0.85}>
            <Image source={FOOD_IMAGES[4]} style={styles.topProductImage} resizeMode="cover" />
            <View style={styles.productRatingPill}>
              <Star size={11} color="#FFB800" fill="#FFB800" />
              <Text style={styles.productRatingText}>5.0</Text>
            </View>
            <View style={styles.topProductMeta}>
              <Text style={styles.topProductTitle} numberOfLines={1}>Handmade Snack Pack</Text>
              <Text style={styles.topProductStore}>Beach Road Store</Text>
              <Text style={styles.topProductFee}>+₹60 Earned</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      {/* Interactive Duty Status Confirmation Modal Popup (Matching Profile Screen) */}
      <Modal
        visible={showDutyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDutyModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.dutyModalCard}>
            <View
              style={[
                styles.modalIconRing,
                { backgroundColor: isOnline ? '#ECFDF5' : '#FEE2E2' },
              ]}>
              {isOnline ? (
                <CheckCircle2 size={44} color="#10B981" />
              ) : (
                <Clock size={40} color="#EF4444" />
              )}
            </View>
            <Text style={styles.dutyModalTitle}>{dutyModalMsg.title}</Text>
            <Text style={styles.dutyModalSub}>{dutyModalMsg.subtitle}</Text>
            <TouchableOpacity
              style={[
                styles.dutyModalDoneBtn,
                { backgroundColor: isOnline ? '#6C3AE8' : '#374151' },
              ]}
              onPress={() => setShowDutyModal(false)}
              activeOpacity={0.85}>
              <Text style={styles.dutyModalDoneText}>Got It, Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3EEFF',
  },
  headerLeftLogo: {
    justifyContent: 'center',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notifIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F6F2FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  partnerAvatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: 'hidden',
  },
  partnerAvatarGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  partnerAvatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 40,
  },
  heroCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
  heroGlowOrb: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  heroGlowOrb2: {
    position: 'absolute',
    bottom: -45,
    right: 35,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(167, 139, 250, 0.22)',
  },
  heroFlashBeamWrap: {
    position: 'absolute',
    top: -80,
    bottom: -80,
    width: 75,
  },
  heroFlashBeam: {
    flex: 1,
    width: '100%',
  },
  heroBgMicroTransit: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  heroTransitSpeedLine: {
    width: 24,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  cardWatermark: {
    position: 'absolute',
    right: -8,
    bottom: -8,
    opacity: 0.12,
  },
  cardCornerGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 74,
    height: 74,
    borderRadius: 37,
  },
  sparkleDecoration1: {
    position: 'absolute',
    top: 14,
    right: 60,
  },
  sparkleDecoration2: {
    position: 'absolute',
    bottom: 18,
    right: 120,
  },
  heroCrackerParticle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  heroGreeting: {
    fontSize: 19,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 3,
  },
  partnerLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '600',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.22)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#34D399',
  },
  heroWalletBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroMiddleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  heroEarningsCol: {
    flex: 1,
  },
  earningsTagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  earningsTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFD700',
    letterSpacing: 0.8,
  },
  heroAmount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  heroTrendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  heroTrendText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#34D399',
  },
  weeklyChartContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    marginLeft: 10,
  },
  chartBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  chartBarCol: {
    alignItems: 'center',
  },
  barTrack: {
    width: 6,
    height: 44,
    justifyContent: 'flex-end',
  },
  barFill: {
    width: 6,
    borderRadius: 3,
  },
  barFillActive: {
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  barDayText: {
    fontSize: 8,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.55)',
    marginTop: 3,
  },
  barDayTextActive: {
    color: '#A78BFA',
    fontWeight: '900',
  },
  statGridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCardOuter: {
    flex: 1,
  },
  coloredStatCard: {
    flex: 1,
    borderRadius: 20,
    padding: 15,
    borderWidth: 1.5,
    position: 'relative',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 4,
  },
  cardViolet: {
    borderColor: '#A855F7',
    shadowColor: '#7C3AED',
  },
  cardEmerald: {
    borderColor: '#10B981',
    shadowColor: '#059669',
  },
  cardAmber: {
    borderColor: '#F59E0B',
    shadowColor: '#D97706',
  },
  cardCyan: {
    borderColor: '#0284C7',
    shadowColor: '#0284C7',
  },
  cardBlue: {
    borderColor: '#0284C7',
    shadowColor: '#0284C7',
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 2,
  },
  statTrendPillViolet: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C4B5FD',
  },
  statTrendTextViolet: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6B21A8',
  },
  statTrendPillEmerald: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  statTrendTextEmerald: {
    fontSize: 10,
    fontWeight: '800',
    color: '#065F46',
  },
  statTrendPillAmber: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  statTrendTextAmber: {
    fontSize: 10,
    fontWeight: '800',
    color: '#92400E',
  },
  statTrendPillCyan: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  statTrendTextCyan: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0369A1',
  },
  statTrendPillBlue: {
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  statTrendTextBlue: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0369A1',
  },
  statCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statCardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 2,
  },
  statCardValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111447',
  },
  quickActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
  },
  primaryActionBtn: {
    flex: 1.4,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  secondaryActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F6F2FF',
    borderRadius: 16,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  secondaryActionText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  onlineToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    marginBottom: 18,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  onlineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  statusDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
  },
  onlineText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111447',
  },
  onlineSub: {
    fontSize: 11,
    color: '#777B9C',
    marginTop: 1,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111447',
    letterSpacing: -0.3,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.primary,
  },
  twentyBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  twentyBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  homeCategoryFilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  homeFilterPill: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ECE4FF',
  },
  homeFilterPillActive: {
    backgroundColor: '#6C3AE8',
    borderColor: '#6C3AE8',
  },
  homeFilterPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  homeFilterPillTextActive: {
    color: '#FFFFFF',
  },
  twentyOrdersList: {
    marginBottom: 8,
  },
  productTitleText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111447',
    marginBottom: 2,
  },
  recentOrderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    marginBottom: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  recentOrderCardPriority: {
    borderColor: '#FDBA74',
    backgroundColor: '#FFFDF9',
    shadowColor: '#EA580C',
    shadowOpacity: 0.1,
  },
  priorityBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FED7AA',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  priorityBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EA580C',
  },
  viewMoreOrdersCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 4,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  viewMoreOrdersGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    backgroundColor: '#F8F6FF',
  },
  viewMoreOrdersText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  productThumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    marginRight: 12,
  },
  orderInfoCol: {
    flex: 1,
  },
  orderIdBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  orderIdText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111447',
  },
  newBadgePill: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  orderMetaText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 3,
  },
  locationSmallRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationSmallText: {
    fontSize: 11,
    color: '#777B9C',
    flex: 1,
  },
  fireHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fireEmoji: {
    fontSize: 16,
  },
  horizontalProductsRow: {
    gap: 12,
    paddingBottom: 6,
  },
  topProductCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  topProductImage: {
    width: '100%',
    height: 90,
  },
  productRatingPill: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  productRatingText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#111447',
  },
  topProductMeta: {
    padding: 10,
  },
  topProductTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111447',
    marginBottom: 2,
  },
  topProductStore: {
    fontSize: 10,
    color: '#777B9C',
    marginBottom: 4,
  },
  topProductFee: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.success,
  },
  // Duty Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  dutyModalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconRing: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dutyModalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111447',
    textAlign: 'center',
    marginBottom: 8,
  },
  dutyModalSub: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  dutyModalDoneBtn: {
    width: '100%',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dutyModalDoneText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
