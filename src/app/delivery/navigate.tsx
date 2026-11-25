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
  Clock,
  Phone,
  ExternalLink,
  Compass,
  Store,
  ChevronRight,
  ShieldAlert,
  Bike,
} from 'lucide-react-native';

export default function NavigateToCustomerScreen() {
  const { activeOrder } = useApp();
  const insets = useSafeAreaInsets();

  // Floating rider pulse animation along the map route
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

  const handleOpenGoogleMaps = () => {
    openDirectGoogleMap(
      {
        title: activeOrder?.customerName || 'Customer Drop (Beach Road)',
        address: activeOrder?.customerAddress || 'Beach Road, Visakhapatnam',
        latitude: 17.7126,
        longitude: 83.3155,
      },
      'two_wheeler'
    );
  };

  const handleCallCustomer = () => {
    Linking.openURL(`tel:${activeOrder?.customerPhone || '+919876543210'}`);
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      <Header
        title="Live Navigation"
        showBack
        rightAction={
          <TouchableOpacity
            style={styles.headerMapBtn}
            onPress={handleOpenGoogleMaps}
            activeOpacity={0.8}>
            <ExternalLink size={16} color="#6C3AE8" />
            <Text style={styles.headerMapBtnText}>Maps</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.container}>
        {/* Turn-by-Turn Guidance Banner */}
        <View style={styles.turnBanner}>
          <View style={styles.turnIconWrap}>
            <Navigation size={22} color="#FFFFFF" style={{ transform: [{ rotate: '45deg' }] }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.turnDistance}>In 250 meters</Text>
            <Text style={styles.turnInstruction}>Turn Right onto Beach Road</Text>
          </View>
          <View style={styles.etaPill}>
            <Text style={styles.etaMinutes}>8 min</Text>
            <Text style={styles.etaDist}>2.4 km</Text>
          </View>
        </View>

        {/* High-Fidelity Google Maps Vector / Route View */}
        <View style={styles.mapCanvas}>
          {/* Map Base Blocks */}
          <View style={styles.mapGrid}>
            <View style={[styles.landBlock, { top: 10, left: 10, width: '45%', height: 110 }]} />
            <View style={[styles.parkBlock, { top: 10, right: 10, width: '42%', height: 110 }]}>
              <Text style={styles.parkLabel}>🌿 Shivaji Park</Text>
            </View>

            <View style={[styles.landBlock, { top: 140, left: 10, width: '38%', height: 130 }]} />
            <View style={[styles.landBlock, { top: 140, right: 10, width: '48%', height: 130 }]} />

            <View style={[styles.seaBlock, { bottom: 10, left: 10, right: 10, height: 80 }]}>
              <Text style={styles.seaLabel}>🌊 Bay of Bengal Coastal Road</Text>
            </View>

            {/* Roads */}
            <View style={[styles.roadHorizontal, { top: 125 }]} />
            <View style={[styles.roadHorizontal, { top: 275 }]} />
            <View style={[styles.roadVertical, { left: '46%' }]} />

            {/* Street Names */}
            <View style={[styles.streetPill, { top: 120, left: 24 }]}>
              <Text style={styles.streetName}>Dwarakanagar Main Rd</Text>
            </View>
            <View style={[styles.streetPill, { top: 210, right: 20 }]}>
              <Text style={styles.streetName}>Beach Road</Text>
            </View>
          </View>

          {/* Polyline Route */}
          <View style={styles.polylineOverlay} pointerEvents="none">
            {/* Store Origin Pin A */}
            <View style={styles.originPin}>
              <Store size={14} color="#FFFFFF" />
            </View>

            {/* SVG style polyline segments */}
            <View style={styles.polySegment1} />
            <View style={styles.polySegment2} />
            <View style={styles.polySegment3} />

            {/* Live Scooter Rider with animated pulse */}
            <Animated.View
              style={[
                styles.scooterMarker,
                { transform: [{ scale: pulseAnim }] },
              ]}>
              <View style={styles.scooterHalo} />
              <View style={styles.scooterCenter}>
                <Bike size={16} color="#FFFFFF" />
              </View>
            </Animated.View>

            {/* Destination Customer Pin B */}
            <View style={styles.destinationPin}>
              <MapPin size={16} color="#FFFFFF" />
            </View>
          </View>

          {/* Google Maps Watermark & Recenter Compass */}
          <View style={styles.mapControls}>
            <View style={styles.googleBrandBadge}>
              <Text style={styles.googleBrandText}>Google Maps</Text>
            </View>

            <TouchableOpacity
              style={styles.compassBtn}
              onPress={handleOpenGoogleMaps}
              activeOpacity={0.8}>
              <Compass size={20} color="#111447" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Destination Card (Guaranteed Safe from NavTab Overlap) */}
        <View
          style={[
            styles.bottomCard,
            { paddingBottom: Math.max(insets.bottom, 16) + 10 },
          ]}>
          <View style={styles.customerRow}>
            <View style={styles.customerPinBg}>
              <MapPin size={20} color="#10B981" />
            </View>

            <View style={styles.customerMeta}>
              <Text style={styles.customerName}>
                {activeOrder?.customerName || 'Sankar Rao'}
              </Text>
              <Text style={styles.customerAddress} numberOfLines={2}>
                {activeOrder?.customerAddress || '12-4-45, Oceanview Apts, Beach Road, Visakhapatnam'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.callCircleBtn}
              onPress={handleCallCustomer}
              activeOpacity={0.8}>
              <Phone size={18} color="#6C3AE8" />
            </TouchableOpacity>
          </View>

          {/* Quick Stats Pill */}
          <View style={styles.tripMetricsBar}>
            <View style={styles.metricItem}>
              <Clock size={14} color="#6B7280" />
              <Text style={styles.metricText}>ETA: 8 Mins</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Navigation size={14} color="#6B7280" />
              <Text style={styles.metricText}>Distance: 2.4 km</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <ShieldAlert size={14} color="#10B981" />
              <Text style={[styles.metricText, { color: '#059669' }]}>OTP Required</Text>
            </View>
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
                title="I Have Arrived"
                icon={<ChevronRight size={18} color="#FFFFFF" />}
                onPress={() => router.push('/delivery/verify')}
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
  headerMapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  headerMapBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  turnBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111447',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  turnIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6C3AE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  turnDistance: {
    fontSize: 11,
    color: '#A5B4FC',
    fontWeight: '600',
  },
  turnInstruction: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 1,
  },
  etaPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  etaMinutes: {
    fontSize: 13,
    fontWeight: '800',
    color: '#34D399',
  },
  etaDist: {
    fontSize: 10,
    color: '#E0E7FF',
  },
  mapCanvas: {
    flex: 1,
    backgroundColor: '#E8ECF2',
    position: 'relative',
    overflow: 'hidden',
  },
  mapGrid: {
    ...StyleSheet.absoluteFill,
  },
  landBlock: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DFE5EC',
  },
  parkBlock: {
    position: 'absolute',
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    padding: 8,
  },
  parkLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
  },
  seaBlock: {
    position: 'absolute',
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    padding: 8,
  },
  seaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0369A1',
  },
  roadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 22,
    backgroundColor: '#F3F4F6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D1D5DB',
  },
  roadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 22,
    backgroundColor: '#F3F4F6',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#D1D5DB',
  },
  streetPill: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  streetName: {
    fontSize: 9,
    fontWeight: '700',
    color: '#4B5563',
  },
  polylineOverlay: {
    ...StyleSheet.absoluteFill,
  },
  originPin: {
    position: 'absolute',
    top: 60,
    left: '20%',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6C3AE8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 5,
  },
  polySegment1: {
    position: 'absolute',
    top: 74,
    left: '23%',
    width: 100,
    height: 6,
    backgroundColor: '#4F46E5',
    borderRadius: 3,
  },
  polySegment2: {
    position: 'absolute',
    top: 74,
    left: '46%',
    width: 6,
    height: 160,
    backgroundColor: '#4F46E5',
    borderRadius: 3,
  },
  polySegment3: {
    position: 'absolute',
    top: 230,
    left: '46%',
    width: 120,
    height: 6,
    backgroundColor: '#4F46E5',
    borderRadius: 3,
  },
  scooterMarker: {
    position: 'absolute',
    top: 150,
    left: '43%',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  scooterHalo: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
  },
  scooterCenter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  destinationPin: {
    position: 'absolute',
    top: 218,
    left: '74%',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 5,
  },
  mapControls: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  googleBrandBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  googleBrandText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4B5563',
  },
  compassBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECE4FF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerPinBg: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  customerMeta: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111447',
  },
  customerAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
    lineHeight: 16,
  },
  callCircleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  tripMetricsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8F7FF',
    borderRadius: 12,
    paddingVertical: 8,
    marginBottom: 14,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metricText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
  },
  metricDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#E5E7EB',
  },
  buttonActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  openDirectMapsBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F3E8FF',
    borderRadius: 16,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  openDirectMapsText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  arrivedBtn: {
    width: '100%',
  },
});
