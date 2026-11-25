import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { OtpInput } from '@/components/common/OtpInput';
import { GradientButton } from '@/components/common/GradientButton';
import { Colors } from '@/constants/theme';
import { useApp } from '@/context/AppContext';
import { Camera, CheckCircle2, Store, RotateCcw, ShieldCheck } from 'lucide-react-native';

export default function ReturnToSellerScreen() {
  const { confirmReturn, activeOrder } = useApp();
  const [photoCaptured, setPhotoCaptured] = useState(true);
  const [sellerReturnOtp, setSellerReturnOtp] = useState('8832');

  const handleSubmitReturn = () => {
    confirmReturn();
    Alert.alert(
      'Return Completed',
      'The package has been verified and returned to the seller. Return compensation of ₹45 credited.',
      [{ text: 'OK', onPress: () => router.replace('/(tabs)/home') }]
    );
  };

  return (
    <ScreenWrapper scrollable>
      <Header title="Return to Seller" showBack />

      <View style={styles.content}>
        {/* Seller Info Card */}
        <View style={styles.sellerCard}>
          <View style={styles.storeIconCircle}>
            <Store size={22} color={Colors.primary} />
          </View>
          <View style={styles.sellerMeta}>
            <Text style={styles.badgeLabel}>RETURN DESTINATION</Text>
            <Text style={styles.sellerName}>{activeOrder?.sellerName || 'HomeBaz Store'}</Text>
            <Text style={styles.sellerAddress}>
              {activeOrder?.sellerAddress || 'Dwarakanagar, Visakhapatnam'}
            </Text>
          </View>
        </View>

        {/* Photo Proof Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Take Photo of Parcel</Text>
          <Text style={styles.cardDesc}>
            Photograph the returned items in their current sealed condition for safety records.
          </Text>

          <TouchableOpacity
            style={[styles.cameraBox, photoCaptured && styles.cameraBoxDone]}
            onPress={() => setPhotoCaptured(!photoCaptured)}
            activeOpacity={0.8}>
            <View style={[styles.cameraCircle, photoCaptured && styles.cameraCircleDone]}>
              {photoCaptured ? (
                <CheckCircle2 size={24} color={Colors.success} />
              ) : (
                <Camera size={24} color={Colors.primary} />
              )}
            </View>
            <Text style={styles.cameraTitle}>
              {photoCaptured ? 'Returned_Items_Proof.jpg' : 'Tap to Photograph'}
            </Text>
            <Text style={styles.cameraSub}>
              {photoCaptured ? 'Photo attached & verified' : 'Package condition check'}
            </Text>
          </TouchableOpacity>

          <Text style={[styles.cardTitle, { marginTop: 14 }]}>Seller Handover Code</Text>
          <Text style={styles.cardDesc}>
            Ask store merchant to enter their return acknowledgement PIN.
          </Text>

          <OtpInput length={4} value={sellerReturnOtp} onChange={setSellerReturnOtp} />

          <View style={styles.secureRow}>
            <ShieldCheck size={16} color={Colors.success} />
            <Text style={styles.secureText}>
              Protects you against unauthorized inventory discrepancy claims
            </Text>
          </View>

          <GradientButton
            title="Submit Return Handover"
            icon={<RotateCcw size={18} color="#FFFFFF" />}
            onPress={handleSubmitReturn}
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
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 20,
  },
  storeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sellerMeta: {
    flex: 1,
  },
  badgeLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.error,
    letterSpacing: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primaryText,
    marginTop: 2,
  },
  sellerAddress: {
    fontSize: 13,
    color: Colors.secondaryText,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primaryText,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: Colors.secondaryText,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  cameraBox: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#FAF9FF',
    marginBottom: 10,
  },
  cameraBoxDone: {
    borderColor: Colors.success,
    borderStyle: 'solid',
    backgroundColor: Colors.successBg,
  },
  cameraCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  cameraCircleDone: {
    backgroundColor: '#FFFFFF',
  },
  cameraTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primaryText,
  },
  cameraSub: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 2,
  },
  secureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 14,
  },
  secureText: {
    fontSize: 11,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  submitBtn: {
    width: '100%',
  },
});
