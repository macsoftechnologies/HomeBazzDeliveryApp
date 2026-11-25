import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Colors } from '@/constants/theme';
import { AlertTriangle, Phone, ShieldAlert, HeartPulse } from 'lucide-react-native';

export default function EmergencySosScreen() {
  const triggerSos = (type: string, number: string) => {
    Alert.alert(
      `Trigger ${type}?`,
      `This will immediately dispatch emergency assistance and alert HomeBaz safety central monitoring.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Now', style: 'destructive', onPress: () => Linking.openURL(`tel:${number}`) },
      ]
    );
  };

  return (
    <ScreenWrapper scrollable>
      <Header title="Emergency SOS" showBack />

      <View style={styles.content}>
        <View style={styles.dangerBanner}>
          <AlertTriangle size={36} color="#FFFFFF" />
          <Text style={styles.dangerTitle}>Emergency SOS Mode</Text>
          <Text style={styles.dangerSub}>
            Use in case of severe road accident, medical emergency, physical threat, or immediate danger during your shift.
          </Text>
        </View>

        <View style={styles.sosButtons}>
          <TouchableOpacity
            style={styles.sosCardRed}
            onPress={() => triggerSos('HomeBaz Safety Helpline', '1800123456')}
            activeOpacity={0.85}>
            <View style={styles.sosIconCircle}>
              <ShieldAlert size={28} color="#FFFFFF" />
            </View>
            <View style={styles.sosTextCol}>
              <Text style={styles.sosHead}>HomeBaz 24x7 Safety Desk</Text>
              <Text style={styles.sosDesc}>Immediate safety agent dispatch & live GPS trace</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sosCardBlue}
            onPress={() => triggerSos('Ambulance (108)', '108')}
            activeOpacity={0.85}>
            <View style={styles.sosIconCircle}>
              <HeartPulse size={28} color="#FFFFFF" />
            </View>
            <View style={styles.sosTextCol}>
              <Text style={styles.sosHead}>Ambulance & Medical (108)</Text>
              <Text style={styles.sosDesc}>Call local emergency hospital dispatch</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sosCardDark}
            onPress={() => triggerSos('Police Emergency (112)', '112')}
            activeOpacity={0.85}>
            <View style={styles.sosIconCircle}>
              <Phone size={28} color="#FFFFFF" />
            </View>
            <View style={styles.sosTextCol}>
              <Text style={styles.sosHead}>Police Assistance (112)</Text>
              <Text style={styles.sosDesc}>National emergency police helpline</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 18,
  },
  dangerBanner: {
    backgroundColor: Colors.error,
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  dangerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 8,
  },
  dangerSub: {
    fontSize: 13,
    color: '#FFE8E6',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
  },
  sosButtons: {
    gap: 14,
  },
  sosCardRed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C0392B',
    borderRadius: 18,
    padding: 18,
  },
  sosCardBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2980B9',
    borderRadius: 18,
    padding: 18,
  },
  sosCardDark: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    borderRadius: 18,
    padding: 18,
  },
  sosIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  sosTextCol: {
    flex: 1,
  },
  sosHead: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sosDesc: {
    fontSize: 12,
    color: '#EAEAEA',
    marginTop: 2,
  },
});
