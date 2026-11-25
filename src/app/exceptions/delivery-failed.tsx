import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { GradientButton } from '@/components/common/GradientButton';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { AlertTriangle, ShieldAlert } from 'lucide-react-native';

const REASONS = [
  'Customer not available',
  'Wrong address / unreachable location',
  'Customer refused delivery',
  'Product issue / packaging damaged',
  'Other reason',
];

export default function DeliveryFailedScreen() {
  const { markDeliveryFailed } = useApp();
  const [selectedReason, setSelectedReason] = useState(REASONS[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    markDeliveryFailed(selectedReason, notes);
    router.replace('/exceptions/return-to-seller');
  };

  return (
    <ScreenWrapper scrollable>
      <Header title="Delivery Failed" showBack />

      <View style={styles.content}>
        <View style={styles.warningHeader}>
          <View style={styles.warningIconWrap}>
            <AlertTriangle size={32} color={Colors.error} />
          </View>
          <Text style={styles.title}>Report Undelivered Order</Text>
          <Text style={styles.subtitle}>
            Please specify why this order could not be handed over. The package must be returned safely to the seller.
          </Text>
        </View>

        <View style={styles.reasonsCard}>
          <Text style={styles.cardHeading}>Select Reason</Text>

          <View style={styles.reasonsList}>
            {REASONS.map((r, i) => {
              const isSelected = selectedReason === r;
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.reasonItem, isSelected && styles.reasonItemActive]}
                  onPress={() => setSelectedReason(r)}
                  activeOpacity={0.8}>
                  <View style={[styles.radioOuter, isSelected && styles.radioOuterActive]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.reasonText, isSelected && styles.reasonTextActive]}>
                    {r}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Input
            label="Additional Remarks"
            placeholder="e.g. Called customer 3 times, phone switched off."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            containerStyle={{ marginTop: 8 }}
          />

          <View style={styles.supportNote}>
            <ShieldAlert size={16} color={Colors.primary} />
            <Text style={styles.supportText}>
              All return trips are compensated with return travel allowance.
            </Text>
          </View>

          <GradientButton
            title="Initiate Return to Seller"
            variant="danger"
            onPress={handleSubmit}
            style={styles.submitBtn}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flex: 1,
  },
  warningHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  warningIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.errorBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryText,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.secondaryText,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  reasonsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primaryText,
    marginBottom: 14,
  },
  reasonsList: {
    gap: 10,
    marginBottom: 14,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#FAF9FF',
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  reasonItemActive: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorBg,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.secondaryText,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioOuterActive: {
    borderColor: Colors.error,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error,
  },
  reasonText: {
    fontSize: 14,
    color: Colors.primaryText,
    fontWeight: '600',
    flex: 1,
  },
  reasonTextActive: {
    color: Colors.error,
    fontWeight: '700',
  },
  supportNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accent,
    padding: 12,
    borderRadius: 12,
    marginVertical: 14,
  },
  supportText: {
    flex: 1,
    fontSize: 12,
    color: Colors.primaryText,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: 6,
  },
});
