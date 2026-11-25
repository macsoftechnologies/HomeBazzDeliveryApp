import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { GradientButton } from '@/components/common/GradientButton';
import { Colors } from '@/constants/theme';
import { CreditCard, Landmark, CheckCircle2, ShieldCheck } from 'lucide-react-native';

export default function BankAccountManagementScreen() {
  const [bankName, setBankName] = useState('State Bank of India');
  const [accountNo, setAccountNo] = useState('123456789012');
  const [ifsc, setIfsc] = useState('SBIN0001234');
  const [holder, setHolder] = useState('Rajesh Kumar');

  const handleSave = () => {
    Alert.alert('Bank Account Saved', 'Account verified successfully with penny-drop test.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <ScreenWrapper scrollable>
      <Header title="Bank Account" showBack />

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.badgeRow}>
            <CheckCircle2 size={16} color={Colors.success} />
            <Text style={styles.badgeText}>Primary Payout Account</Text>
          </View>

          <Input
            label="Account Holder Name"
            value={holder}
            onChangeText={setHolder}
            leftIcon={<Landmark size={18} color={Colors.primary} />}
          />

          <Input
            label="Bank Name"
            value={bankName}
            onChangeText={setBankName}
            leftIcon={<Landmark size={18} color={Colors.primary} />}
          />

          <Input
            label="Account Number"
            value={accountNo}
            onChangeText={setAccountNo}
            keyboardType="number-pad"
            leftIcon={<CreditCard size={18} color={Colors.primary} />}
          />

          <Input
            label="IFSC Code"
            value={ifsc}
            onChangeText={(t) => setIfsc(t.toUpperCase())}
            autoCapitalize="characters"
            leftIcon={<Landmark size={18} color={Colors.primary} />}
          />

          <View style={styles.secureBox}>
            <ShieldCheck size={16} color={Colors.success} />
            <Text style={styles.secureText}>
              All payouts are processed using RBI-approved secure IMPS/NEFT rail.
            </Text>
          </View>

          <GradientButton title="Save Bank Details" onPress={handleSave} style={styles.saveBtn} />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.successBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.success,
  },
  secureBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 12,
    marginVertical: 14,
  },
  secureText: {
    fontSize: 12,
    color: Colors.primaryText,
    flex: 1,
  },
  saveBtn: {
    marginTop: 6,
  },
});
