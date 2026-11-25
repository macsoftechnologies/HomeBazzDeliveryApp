import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Colors } from '@/constants/theme';
import {
  Bell,
  MapPin,
  Globe,
  Info,
  LogOut,
  ChevronRight,
  Shield,
  Volume2,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifs, setNotifs] = useState(true);
  const [locationAlways, setLocationAlways] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [language, setLanguage] = useState('English');

  const handleLogout = () => {
    Alert.alert('Logout Confirmation', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => router.replace('/auth/login') },
    ]);
  };

  const handleSelectLanguage = () => {
    Alert.alert('Select Language', 'Choose preferred app language', [
      { text: 'English', onPress: () => setLanguage('English') },
      { text: 'Telugu (తెలుగు)', onPress: () => setLanguage('Telugu') },
      { text: 'Hindi (हिंदी)', onPress: () => setLanguage('Hindi') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <ScreenWrapper scrollable>
      <Header title="Settings" showBack />

      <View style={styles.content}>
        {/* Preferences Section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>App Preferences</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingIconWrap}>
              <Bell size={18} color={Colors.primary} />
            </View>
            <View style={styles.settingMeta}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingDesc}>Order alerts & status updates</Text>
            </View>
            <Switch
              value={notifs}
              onValueChange={setNotifs}
              trackColor={{ false: '#DDD', true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingIconWrap}>
              <MapPin size={18} color={Colors.primary} />
            </View>
            <View style={styles.settingMeta}>
              <Text style={styles.settingLabel}>Location Access</Text>
              <Text style={styles.settingDesc}>Background GPS for accurate routing</Text>
            </View>
            <Switch
              value={locationAlways}
              onValueChange={setLocationAlways}
              trackColor={{ false: '#DDD', true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingIconWrap}>
              <Volume2 size={18} color={Colors.primary} />
            </View>
            <View style={styles.settingMeta}>
              <Text style={styles.settingLabel}>High-Volume Order Chimes</Text>
              <Text style={styles.settingDesc}>Audible notification for incoming orders</Text>
            </View>
            <Switch
              value={soundAlerts}
              onValueChange={setSoundAlerts}
              trackColor={{ false: '#DDD', true: Colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={handleSelectLanguage}
            activeOpacity={0.7}>
            <View style={styles.settingIconWrap}>
              <Globe size={18} color={Colors.primary} />
            </View>
            <View style={styles.settingMeta}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingDesc}>{language}</Text>
            </View>
            <ChevronRight size={18} color={Colors.secondaryText} />
          </TouchableOpacity>
        </View>

        {/* About App */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingIconWrap}>
              <Info size={18} color={Colors.primary} />
            </View>
            <View style={styles.settingMeta}>
              <Text style={styles.settingLabel}>App Version</Text>
              <Text style={styles.settingDesc}>v1.0.0 (Production)</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingIconWrap}>
              <Shield size={18} color={Colors.primary} />
            </View>
            <View style={styles.settingMeta}>
              <Text style={styles.settingLabel}>Privacy & Terms</Text>
              <Text style={styles.settingDesc}>Partner agreement & policies</Text>
            </View>
            <ChevronRight size={18} color={Colors.secondaryText} />
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <LogOut size={18} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 18,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.secondaryText,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingMeta: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryText,
  },
  settingDesc: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Colors.errorBg,
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.error,
  },
});
