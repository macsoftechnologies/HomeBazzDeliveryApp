import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { GradientButton } from '@/components/common/GradientButton';
import { Colors } from '@/constants/theme';
import { Lock, ShieldCheck } from 'lucide-react-native';

export default function ChangePasswordScreen() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleUpdate = () => {
    if (!newPass || newPass !== confirmPass) {
      Alert.alert('Error', 'New passwords do not match or are empty');
      return;
    }
    Alert.alert('Success', 'Password updated successfully!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <ScreenWrapper scrollable>
      <Header title="Change Password" showBack />

      <View style={styles.content}>
        <View style={styles.card}>
          <Input
            label="Current Password"
            placeholder="Enter current password"
            value={currentPass}
            onChangeText={setCurrentPass}
            secureTextEntry
            leftIcon={<Lock size={18} color={Colors.primary} />}
          />

          <Input
            label="New Password"
            placeholder="At least 8 characters"
            value={newPass}
            onChangeText={setNewPass}
            secureTextEntry
            leftIcon={<Lock size={18} color={Colors.primary} />}
          />

          <Input
            label="Confirm New Password"
            placeholder="Re-enter new password"
            value={confirmPass}
            onChangeText={setConfirmPass}
            secureTextEntry
            leftIcon={<Lock size={18} color={Colors.primary} />}
          />

          <View style={styles.securityRow}>
            <ShieldCheck size={16} color={Colors.success} />
            <Text style={styles.securityText}>Use letters, numbers, and symbols for best safety</Text>
          </View>

          <GradientButton
            title="Update Password"
            onPress={handleUpdate}
            style={styles.submitBtn}
          />
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
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 14,
  },
  securityText: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  submitBtn: {
    marginTop: 8,
  },
});
