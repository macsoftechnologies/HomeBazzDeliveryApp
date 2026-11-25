import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Bike, ShieldCheck, ChevronRight } from 'lucide-react-native';

export default function GoOnlineScreen() {
  const { isOnline, setIsOnline } = useApp();
  const [autoAccept, setAutoAccept] = useState(true);

  return (
    <ScreenWrapper>
      <Header title="Go Online" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Rider Illustration Section */}
        <View style={styles.riderSection}>
          <View style={styles.glowCircle}>
            <View style={styles.riderCircle}>
              <Bike size={54} color={Colors.primary} />
              <View style={styles.verifiedShield}>
                <ShieldCheck size={20} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <Text style={styles.statusTitle}>
            {isOnline ? 'You are Online' : 'You are Offline'}
          </Text>
          <Text style={styles.statusSub}>
            {isOnline
              ? 'You will receive new delivery orders.'
              : 'Turn on availability to receive delivery orders in your area.'}
          </Text>
        </View>

        {/* Settings Card */}
        <View style={styles.settingsCard}>
          {/* Online Status Toggle */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Online Status</Text>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: '#E2DEEC', true: Colors.success }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          {/* Auto Accept Orders Toggle */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto Accept Orders</Text>
            <Switch
              value={autoAccept}
              onValueChange={setAutoAccept}
              trackColor={{ false: '#E2DEEC', true: Colors.success }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          {/* Working Hours */}
          <TouchableOpacity style={styles.clickableRow} activeOpacity={0.7}>
            <View>
              <Text style={styles.settingLabel}>Working Hours</Text>
              <Text style={styles.settingSub}>9:00 AM - 10:00 PM</Text>
            </View>
            <ChevronRight size={18} color="#A0A5BA" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Ride Preferences */}
          <TouchableOpacity style={styles.clickableRow} activeOpacity={0.7}>
            <View>
              <Text style={styles.settingLabel}>Ride Preferences</Text>
              <Text style={styles.settingSub}>Pickup & Delivery</Text>
            </View>
            <ChevronRight size={18} color="#A0A5BA" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  riderSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  glowCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F3EEFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  riderCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  verifiedShield: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryText,
    marginBottom: 6,
  },
  statusSub: {
    fontSize: 13,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ECEAF5',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  clickableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primaryText,
  },
  settingSub: {
    fontSize: 13,
    color: Colors.secondaryText,
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F4FA',
  },
});
