import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { Colors } from '@/constants/theme';
import { MapPin, Bell, Camera, ShieldCheck } from 'lucide-react-native';

export default function AppPermissionsScreen() {
  const [locationPerm, setLocationPerm] = useState(true);
  const [notifPerm, setNotifPerm] = useState(true);
  const [cameraPerm, setCameraPerm] = useState(true);

  return (
    <ScreenWrapper scrollable>
      <Header title="App Permissions" showBack />

      <View style={styles.content}>
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Allow Essential Permissions</Text>
          <Text style={styles.subtitle}>
            To provide an accurate and seamless delivery experience, HomeBaz Express requires the following permissions.
          </Text>
        </View>

        <View style={styles.cardsList}>
          {/* Location */}
          <View style={styles.permCard}>
            <View style={styles.iconCircle}>
              <MapPin size={22} color={Colors.primary} />
            </View>
            <View style={styles.permInfo}>
              <Text style={styles.permTitle}>Location Access</Text>
              <Text style={styles.permDesc}>
                Required for real-time order routing, store pickups, and customer doorstep navigation.
              </Text>
            </View>
            <Switch
              value={locationPerm}
              onValueChange={setLocationPerm}
              trackColor={{ false: '#DDD', true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Notifications */}
          <View style={styles.permCard}>
            <View style={styles.iconCircle}>
              <Bell size={22} color={Colors.primary} />
            </View>
            <View style={styles.permInfo}>
              <Text style={styles.permTitle}>Notifications</Text>
              <Text style={styles.permDesc}>
                Receive instant alerts for high-value orders, payment payouts, and urgent route changes.
              </Text>
            </View>
            <Switch
              value={notifPerm}
              onValueChange={setNotifPerm}
              trackColor={{ false: '#DDD', true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Camera */}
          <View style={styles.permCard}>
            <View style={styles.iconCircle}>
              <Camera size={22} color={Colors.primary} />
            </View>
            <View style={styles.permInfo}>
              <Text style={styles.permTitle}>Camera</Text>
              <Text style={styles.permDesc}>
                Take doorstep photo proof, scan seller QR codes, and capture parcel conditions.
              </Text>
            </View>
            <Switch
              value={cameraPerm}
              onValueChange={setCameraPerm}
              trackColor={{ false: '#DDD', true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.securityNote}>
          <ShieldCheck size={18} color={Colors.success} />
          <Text style={styles.securityText}>
            Your privacy is respected. GPS is only active while you are online.
          </Text>
        </View>

        <GradientButton
          title="Allow & Continue"
          onPress={() => router.push('/partner/training')}
          style={styles.continueBtn}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flex: 1,
  },
  headerBlock: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryText,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    lineHeight: 20,
  },
  cardsList: {
    gap: 12,
    marginBottom: 20,
  },
  permCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  permInfo: {
    flex: 1,
    marginRight: 8,
  },
  permTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primaryText,
  },
  permDesc: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 2,
    lineHeight: 16,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.successBg,
    padding: 14,
    borderRadius: 14,
    marginBottom: 24,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
  },
  continueBtn: {
    marginTop: 'auto',
  },
});
