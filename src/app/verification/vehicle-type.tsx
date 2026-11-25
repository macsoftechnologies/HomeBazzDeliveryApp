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
import { GradientButton } from '@/components/common/GradientButton';
import { useApp } from '@/context/AppContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bike,
  Zap,
  Check,
  ShieldCheck,
  Sparkles,
  CircleCheck,
  ArrowRight,
  Truck,
} from 'lucide-react-native';

// Multi-color celebration sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 18, right: 32, size: 13, color: '#FFD700' },
  { id: 2, top: 70, left: 28, size: 11, color: '#38BDF8' },
  { id: 3, top: 140, right: 30, size: 12, color: '#34D399' },
  { id: 4, top: 200, left: 34, size: 10, color: '#F472B6' },
  { id: 5, top: 260, right: 48, size: 11, color: '#FBBF24' },
];

interface VehicleOption {
  id: string;
  title: string;
  desc: string;
  tag: string;
  icon: 'bike' | 'scooter' | 'ev' | 'cycle' | 'other';
}

const VEHICLES: VehicleOption[] = [
  {
    id: 'bike',
    title: 'Motorbike / Motorcycle',
    desc: 'Standard petrol two-wheeler (Hero, Bajaj, Honda)',
    tag: 'MOST POPULAR',
    icon: 'bike',
  },
  {
    id: 'scooter',
    title: 'Gearless Scooter',
    desc: 'Activa, Jupiter, Access, Dio or similar scooter',
    tag: 'RECOMMENDED',
    icon: 'scooter',
  },
  {
    id: 'ebike',
    title: 'Electric Vehicle (EV)',
    desc: 'Ola, Ather, TVS iQube or electric delivery scooter',
    tag: 'LOW RUNNING COST',
    icon: 'ev',
  },
  {
    id: 'bicycle',
    title: 'Pedal Bicycle',
    desc: 'Short-range neighborhood delivery within 3 km',
    tag: 'ZERO FUEL',
    icon: 'cycle',
  },
  {
    id: 'other',
    title: 'Three-Wheeler / Commercial',
    desc: 'Auto or small cargo commercial carrier',
    tag: 'BULK ORDERS',
    icon: 'other',
  },
];

export default function VehicleTypeScreen() {
  const insets = useSafeAreaInsets();
  const { updateProfile, setRegProgress } = useApp();
  const [selected, setSelected] = useState<string>('bike');

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

  const handleContinue = () => {
    const matched = VEHICLES.find((v) => v.id === selected);
    const vehicleName = matched ? matched.title : 'Motorbike / Motorcycle';
    updateProfile({ vehicleType: vehicleName });
    setRegProgress((prev) => ({ ...prev, vehicleSelected: vehicleName }));
    router.push('/verification/driving-licence');
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

      <Header title="Vehicle Setup" showBack />

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
            <Text style={styles.stepDoneText}>1. Details</Text>
          </View>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>2. ID Proof</Text>
          </View>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>3. Face Match</Text>
          </View>
          <View style={styles.stepActivePill}>
            <View style={styles.activeDot} />
            <Text style={styles.stepActiveText}>4. Vehicle</Text>
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
              <Text style={styles.heroBadgeText}>STEP 4 OF 4 • FLEET SETUP</Text>
            </View>
            <View style={styles.instantBadge}>
              <Text style={styles.instantBadgeText}>⚡ Quick Matching</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Select Delivery Vehicle</Text>
          <Text style={styles.heroSubtitle}>
            Choose the primary vehicle you will use for delivering orders with HomeBazz Express.
          </Text>
        </View>

        {/* Vehicle Selection List */}
        <View style={styles.listSection}>
          <Text style={styles.listSectionTitle}>AVAILABLE DELIVERY FLEETS</Text>

          <View style={styles.list}>
            {VEHICLES.map((item) => {
              const isSelected = selected === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.card, isSelected && styles.cardActive]}
                  onPress={() => setSelected(item.id)}
                  activeOpacity={0.85}>
                  <View style={[styles.iconWrap, isSelected && styles.iconWrapActive]}>
                    {item.icon === 'ev' ? (
                      <Zap size={22} color={isSelected ? '#FFFFFF' : '#6D28D9'} strokeWidth={2.4} />
                    ) : item.icon === 'other' ? (
                      <Truck size={22} color={isSelected ? '#FFFFFF' : '#6D28D9'} strokeWidth={2.4} />
                    ) : (
                      <Bike size={22} color={isSelected ? '#FFFFFF' : '#6D28D9'} strokeWidth={2.4} />
                    )}
                  </View>

                  <View style={styles.info}>
                    <View style={styles.titleBadgeRow}>
                      <Text style={[styles.itemTitle, isSelected && styles.itemTitleActive]}>
                        {item.title}
                      </Text>
                      {item.tag ? (
                        <View style={[styles.tagBadge, isSelected && styles.tagBadgeActive]}>
                          <Text style={[styles.tagText, isSelected && styles.tagTextActive]}>
                            {item.tag}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <Text style={styles.itemDesc}>{item.desc}</Text>
                  </View>

                  <View style={[styles.checkCircle, isSelected && styles.checkCircleActive]}>
                    {isSelected && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Primary Action Button */}
        <GradientButton
          title="Save & Continue to Driving Licence"
          icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
          onPress={handleContinue}
          style={styles.continueBtn}
        />
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
  instantBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  instantBadgeText: {
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
  listSection: {
    marginBottom: 18,
  },
  listSectionTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  list: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardActive: {
    borderColor: '#6D28D9',
    backgroundColor: '#FAF7FF',
    borderWidth: 2,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconWrapActive: {
    backgroundColor: '#6D28D9',
  },
  info: {
    flex: 1,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  itemTitleActive: {
    color: '#6D28D9',
  },
  tagBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagBadgeActive: {
    backgroundColor: '#EDE9FE',
  },
  tagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.4,
  },
  tagTextActive: {
    color: '#6D28D9',
  },
  itemDesc: {
    fontSize: 11.5,
    color: '#64748B',
    lineHeight: 15,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.8,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  checkCircleActive: {
    borderColor: '#6D28D9',
    backgroundColor: '#6D28D9',
  },
  continueBtn: {
    width: '100%',
  },
});
