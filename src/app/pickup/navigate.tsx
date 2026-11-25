import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { useApp } from '@/context/AppContext';
import { openDirectGoogleMap } from '@/utils/mapNavigation';
import {
  Navigation,
  MapPin,
  Phone,
  ExternalLink,
  Compass,
  Store,
  ChevronRight,
  ShieldCheck,
  Bike,
} from 'lucide-react-native';

export default function NavigateToSellerScreen() {
  const { activeOrder } = useApp();
  const insets = useSafeAreaInsets();

  // Active target switch: 'pickup' | 'drop'
  const [selectedTarget, setSelectedTarget] = useState<'pickup' | 'drop'>('pickup');

  // Pulsing animation for scooter rider along the route
  const [pulseAnim] = useState(() => new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const pickupLocation = {
    title: activeOrder?.sellerName || 'HomeBaz Store (Dwarakanagar)',
    address: activeOrder?.sellerAddress || 'Dwarakanagar Main Road, Visakhapatnam',
    latitude: 17.7294,
    longitude: 83.3089,
  };

  const dropLocation = {
    title: activeOrder?.customerName || 'Customer Drop (Beach Road)',
    address: activeOrder?.customerAddress || 'Beach Road, Kirlampudi Layout, Visakhapatnam',
    latitude: 17.7126,
    longitude: 83.3155,
  };

  const currentTarget = selectedTarget === 'pickup' ? pickupLocation : dropLocation;

  const handleOpenGoogleMaps = () => {
    openDirectGoogleMap(currentTarget, 'two_wheeler');
  };

  const handleCall = () => {
    const phone =
      selectedTarget === 'pickup'
        ? activeOrder?.sellerPhone || '+91 9123456789'
        : activeOrder?.customerPhone || '+91 9876543210';
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      <Header
        title={selectedTarget === 'pickup' ? 'Navigate to Seller' : 'Navigate to Customer'}
        showBack
        rightAction={
          <TouchableOpacity
            style={styles.headerMapBtn}
            onPress={handleOpenGoogleMaps}
            activeOpacity={0.8}>
            <ExternalLink size={15} color="#6C3AE8" />
            <Text style={styles.headerMapBtnText}>Direct Maps</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.container}>
        {/* ======================================================== */}
        {/* 1. PICKUP vs DROP LOCATION SELECTOR BAR                  */}
        {/* Partner can tap either to see route & launch Google Maps */}
        {/* ======================================================== */}
        <View style={styles.selectorBarContainer}>
          <TouchableOpacity
            style={[
              styles.selectorTab,
              selectedTarget === 'pickup' && styles.selectorTabActive,
            ]}
            onPress={() => setSelectedTarget('pickup')}
            activeOpacity={0.8}>
            <Store
              size={16}
              color={selectedTarget === 'pickup' ? '#6C3AE8' : '#64748B'}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.selectorTabTitle,
                  selectedTarget === 'pickup' && styles.selectorTabTitleActive,
                ]}>
                1. Pickup Store
              </Text>
              <Text style={styles.selectorTabSub} numberOfLines={1}>
                {pickupLocation.title}
              </Text>
            </View>
            {selectedTarget === 'pickup' && (
              <View style={styles.activeDot} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.selectorTab,
              selectedTarget === 'drop' && styles.selectorTabActive,
            ]}
            onPress={() => setSelectedTarget('drop')}
            activeOpacity={0.8}>
            <MapPin
              size={16}
              color={selectedTarget === 'drop' ? '#10B981' : '#64748B'}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.selectorTabTitle,
                  selectedTarget === 'drop' && styles.selectorTabTitleActiveDrop,
                ]}>
                2. Drop Customer
              </Text>
              <Text style={styles.selectorTabSub} numberOfLines={1}>
                {dropLocation.title}
              </Text>
            </View>
            {selectedTarget === 'drop' && (
              <View style={[styles.activeDot, { backgroundColor: '#10B981' }]} />
            )}
          </TouchableOpacity>
        </View>

        {/* Turn-by-Turn Guidance Banner */}
        <View style={styles.turnBanner}>
          <View style={styles.turnIconWrap}>
            <Navigation
              size={22}
              color="#FFFFFF"
              style={{ transform: [{ rotate: '45deg' }] }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.turnDistance}>
              {selectedTarget === 'pickup' ? 'In 180 meters' : 'In 2.4 km'}
            </Text>
            <Text style={styles.turnInstruction}>
              {selectedTarget === 'pickup'
                ? 'Turn Left into Dwarakanagar 4th Lane'
                : 'Head straight along Beach Road Coastal Line'}
            </Text>
          </View>
          <View style={styles.etaPill}>
            <Text style={styles.etaMinutes}>
              {selectedTarget === 'pickup' ? '5 min' : '16 min'}
            </Text>
            <Text style={styles.etaDist}>
              {selectedTarget === 'pickup' ? '1.2 km' : '2.4 km'}
            </Text>
          </View>
        </View>

        {/* High-Fidelity Google Maps Vector / Route View */}
        <View style={styles.mapCanvas}>
          {/* Map Base Blocks */}
          <View style={styles.mapGrid}>
            <View style={[styles.landBlock, { top: 10, left: 10, width: '45%', height: 110 }]} />
            <View style={[styles.parkBlock, { top: 10, right: 10, width: '42%', height: 110 }]}>
              <Text style={styles.parkLabel}>🌿 Central Park</Text>
            </View>

            <View style={[styles.landBlock, { top: 140, left: 10, width: '38%', height: 130 }]} />
            <View style={[styles.landBlock, { top: 140, right: 10, width: '48%', height: 130 }]} />

            {/* Roads */}
            <View style={[styles.roadHorizontal, { top: 125 }]} />
            <View style={[styles.roadHorizontal, { top: 275 }]} />
            <View style={[styles.roadVertical, { left: '46%' }]} />

            {/* Street Names */}
            <View style={[styles.streetPill, { top: 120, left: 24 }]}>
              <Text style={styles.streetName}>Dwarakanagar Main Rd</Text>
            </View>
            <View style={[styles.streetPill, { top: 210, right: 20 }]}>
              <Text style={styles.streetName}>Station Road</Text>
            </View>
          </View>

          {/* Polyline Route Overlay */}
          <View style={styles.polylineOverlay} pointerEvents="none">
            {/* Origin Pin A */}
            <View style={styles.originPin}>
              <Bike size={14} color="#FFFFFF" />
            </View>

            {/* SVG style polyline segments */}
            <View style={styles.polySegment1} />
            <View style={styles.polySegment2} />

            {/* Live Scooter Rider with animated pulse */}
            <Animated.View
              style={[
                styles.scooterMarker,
                { transform: [{ scale: pulseAnim }] },
              ]}>
              <View style={styles.scooterHalo} />
              <View style={styles.scooterCenter}>
                <Navigation size={14} color="#FFFFFF" />
              </View>
            </Animated.View>

            {/* Target Destination Pin B */}
            <View
              style={[
                styles.destinationPin,
                selectedTarget === 'drop' && { backgroundColor: '#10B981' },
              ]}>
              {selectedTarget === 'pickup' ? (
                <Store size={16} color="#FFFFFF" />
              ) : (
                <MapPin size={16} color="#FFFFFF" />
              )}
            </View>
          </View>

          {/* Google Maps Brand Badge & Recenter Compass */}
          <View style={styles.mapControls}>
            <TouchableOpacity
              style={styles.googleBrandBadge}
              onPress={handleOpenGoogleMaps}
              activeOpacity={0.85}>
              <Text style={styles.googleBrandText}>Open in Google Maps</Text>
              <ExternalLink size={12} color="#1E293B" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.compassBtn}
              onPress={handleOpenGoogleMaps}
              activeOpacity={0.8}>
              <Compass size={20} color="#111447" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Destination Card */}
        <View
          style={[
            styles.bottomCard,
            { paddingBottom: Math.max(insets.bottom, 16) + 10 },
          ]}>
          <View style={styles.targetRow}>
            <View
              style={[
                styles.targetIconWrap,
                selectedTarget === 'drop' && { backgroundColor: '#ECFDF5' },
              ]}>
              {selectedTarget === 'pickup' ? (
                <Store size={22} color="#6C3AE8" />
              ) : (
                <MapPin size={22} color="#10B981" />
              )}
            </View>

            <View style={styles.targetMeta}>
              <View style={styles.targetBadgeRow}>
                <Text
                  style={[
                    styles.targetTypeBadge,
                    selectedTarget === 'drop' && { color: '#059669' },
                  ]}>
                  {selectedTarget === 'pickup'
                    ? 'PICKUP LOCATION (STORE)'
                    : 'DROP LOCATION (CUSTOMER)'}
                </Text>
                {selectedTarget === 'pickup' && (
                  <View style={styles.verifiedBadge}>
                    <ShieldCheck size={11} color="#059669" />
                    <Text style={styles.verifiedText}>Ready for Handover</Text>
                  </View>
                )}
              </View>

              <Text style={styles.targetName}>{currentTarget.title}</Text>
              <Text style={styles.targetAddress} numberOfLines={2}>
                {currentTarget.address}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.callCircleBtn}
              onPress={handleCall}
              activeOpacity={0.8}>
              <Phone size={18} color="#6C3AE8" />
            </TouchableOpacity>
          </View>

          {/* Action Buttons Row */}
          <View style={styles.buttonActionRow}>
            <TouchableOpacity
              style={styles.openDirectMapsBtn}
              onPress={handleOpenGoogleMaps}
              activeOpacity={0.85}>
              <ExternalLink size={16} color="#6C3AE8" />
              <Text style={styles.openDirectMapsText}>Direct Google Map</Text>
            </TouchableOpacity>

            <View style={{ flex: 1.5 }}>
              <GradientButton
                title={selectedTarget === 'pickup' ? 'Reached Seller' : 'I Have Arrived'}
                icon={<ChevronRight size={18} color="#FFFFFF" />}
                onPress={() => {
                  if (selectedTarget === 'pickup') {
                    router.push('/pickup/verify');
                  } else {
                    router.push('/delivery/verify');
                  }
                }}
                style={styles.arrivedBtn}
              />
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerMapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  headerMapBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  selectorBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  selectorTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  selectorTabActive: {
    backgroundColor: '#FAF5FF',
    borderColor: '#6C3AE8',
  },
  selectorTabTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  selectorTabTitleActive: {
    color: '#6C3AE8',
    fontWeight: '800',
  },
  selectorTabTitleActiveDrop: {
    color: '#059669',
    fontWeight: '800',
  },
  selectorTabSub: {
    fontSize: 10.5,
    color: '#1E293B',
    fontWeight: '600',
    marginTop: 1,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6C3AE8',
  },
  turnBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    zIndex: 10,
  },
  turnIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6C3AE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  turnDistance: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A78BFA',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  turnInstruction: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  etaPill: {
    alignItems: 'flex-end',
  },
  etaMinutes: {
    fontSize: 14,
    fontWeight: '900',
    color: '#34D399',
  },
  etaDist: {
    fontSize: 11,
    color: '#94A3B8',
  },
  mapCanvas: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E5E7EB',
  },
  landBlock: {
    position: 'absolute',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
  parkBlock: {
    position: 'absolute',
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    padding: 8,
  },
  parkLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
  },
  roadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CBD5E1',
  },
  roadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 24,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#CBD5E1',
  },
  streetPill: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  streetName: {
    fontSize: 9,
    fontWeight: '700',
    color: '#475569',
  },
  polylineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  originPin: {
    position: 'absolute',
    top: 60,
    left: 60,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  polySegment1: {
    position: 'absolute',
    top: 74,
    left: 74,
    width: 4,
    height: 100,
    backgroundColor: '#6C3AE8',
    borderRadius: 2,
  },
  polySegment2: {
    position: 'absolute',
    top: 174,
    left: 74,
    width: 140,
    height: 4,
    backgroundColor: '#6C3AE8',
    borderRadius: 2,
  },
  scooterMarker: {
    position: 'absolute',
    top: 160,
    left: 130,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scooterHalo: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(108, 58, 232, 0.3)',
  },
  scooterCenter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6C3AE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationPin: {
    position: 'absolute',
    top: 160,
    left: 210,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  mapControls: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  googleBrandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  googleBrandText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E293B',
  },
  compassBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  targetIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  targetMeta: {
    flex: 1,
  },
  targetBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  targetTypeBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6C3AE8',
    letterSpacing: 0.5,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  verifiedText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#059669',
  },
  targetName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111447',
  },
  targetAddress: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  callCircleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  buttonActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  openDirectMapsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F5F3FF',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },
  openDirectMapsText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  arrivedBtn: {
    width: '100%',
  },
});
