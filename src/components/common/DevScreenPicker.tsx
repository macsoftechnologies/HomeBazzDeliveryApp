import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { LayoutGrid, X, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/theme';

export const SCREEN_CATALOG = [
  {
    category: '1. App Introduction & Onboarding',
    screens: [
      { id: '01', name: '01. Splash Screen', route: '/splash' },
      { id: '02', name: '02. Onboarding 1 - Earn with HomeBaz', route: '/onboarding/1' },
      { id: '03', name: '03. Onboarding 2 - Flexible Hours', route: '/onboarding/2' },
      { id: '04', name: '04. Onboarding 3 - Deliver Locally', route: '/onboarding/3' },
      { id: '05', name: '05. Welcome Screen', route: '/auth/welcome' },
    ],
  },
  {
    category: '2. Registration & Verification',
    screens: [
      { id: '06', name: '06. Mobile Registration', route: '/auth/register' },
      { id: '07', name: '07. OTP Verification', route: '/auth/otp' },
      { id: '08', name: '08. Personal Details', route: '/auth/personal-details' },
      { id: '09', name: '09. Identity Verification', route: '/verification/identity' },
      { id: '10', name: '10. Selfie Verification', route: '/verification/selfie' },
    ],
  },
  {
    category: '3. Vehicle & Bank Details Setup',
    screens: [
      { id: '11', name: '11. Vehicle Type Selection', route: '/verification/vehicle-type' },
      { id: '12', name: '12. Driving Licence', route: '/verification/driving-licence' },
      { id: '13', name: '13. Vehicle Documents', route: '/verification/vehicle-documents' },
      { id: '14', name: '14. Bank Account Details', route: '/verification/bank-details' },
      { id: '15', name: '15. Document Review', route: '/verification/document-review' },
    ],
  },
  {
    category: '4. Approval & Activation',
    screens: [
      { id: '16', name: '16. Verification Status', route: '/verification/status' },
      { id: '17', name: '17. Approved Success', route: '/verification/success' },
    ],
  },
  {
    category: '5. Login & Permission Setup',
    screens: [
      { id: '18', name: '18. Partner Login', route: '/auth/login' },
      { id: '19', name: '19. App Permissions', route: '/partner/permissions' },
      { id: '20', name: '20. Training & Safety Guidelines', route: '/partner/training' },
    ],
  },
  {
    category: '6. Main Dashboard & Online Flow',
    screens: [
      { id: '21', name: '21. Home Dashboard', route: '/(tabs)/home' },
      { id: '22', name: '22. Go Online / Offline', route: '/partner/go-online' },
      { id: '23', name: '23. New Order Request', route: '/orders/new-request' },
      { id: '24', name: '24. Orders List', route: '/(tabs)/orders' },
    ],
  },
  {
    category: '7. Pickup from Seller',
    screens: [
      { id: '25', name: '25. Order Details', route: '/orders/details' },
      { id: '26', name: '26. Navigate to Seller', route: '/pickup/navigate' },
      { id: '27', name: '27. Pickup Verification (OTP/QR)', route: '/pickup/verify' },
    ],
  },
  {
    category: '8. Deliver to Customer',
    screens: [
      { id: '28', name: '28. Navigate to Customer', route: '/delivery/navigate' },
      { id: '29', name: '29. Delivery Verification (OTP/Photo)', route: '/delivery/verify' },
      { id: '30', name: '30. Delivery Success', route: '/delivery/success' },
    ],
  },
  {
    category: '9. Exceptional Cases',
    screens: [
      { id: '31', name: '31. Delivery Failed', route: '/exceptions/delivery-failed' },
      { id: '32', name: '32. Return to Seller', route: '/exceptions/return-to-seller' },
    ],
  },
  {
    category: '10. Earnings & Payments',
    screens: [
      { id: '33', name: '33. Earnings Overview', route: '/(tabs)/earnings' },
      { id: '34', name: '34. Payout History', route: '/earnings/payouts' },
    ],
  },
  {
    category: '11. History & Performance',
    screens: [
      { id: '35', name: '35. Order History', route: '/orders/history' },
      { id: '36', name: '36. Ratings & Performance', route: '/profile/performance' },
    ],
  },
  {
    category: '12. Delivery & Support / Notifications',
    screens: [
      { id: '37', name: '37. Notifications', route: '/notifications' },
      { id: '38', name: '38. Help & Support', route: '/support' },
    ],
  },
  {
    category: '13. Profile & Settings',
    screens: [
      { id: '39', name: '39. My Profile', route: '/(tabs)/profile' },
      { id: '40', name: '40. Settings', route: '/settings' },
    ],
  },
];

export const DevScreenPicker: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const navigateTo = (route: string) => {
    setVisible(false);
    setTimeout(() => {
      try {
        router.push(route as any);
      } catch (e) {
        console.warn('Navigation error:', e);
      }
    }, 150);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.85}
        onPress={() => setVisible(true)}>
        <LayoutGrid size={18} color="#FFFFFF" />
        <Text style={styles.floatingText}>40 Screens</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>HomeBaz Express Directory</Text>
                <Text style={styles.modalSubtitle}>All 40 Screens Visual Showcase</Text>
              </View>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.closeBtn}>
                <X size={20} color={Colors.primaryText} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
              {SCREEN_CATALOG.map((cat, idx) => (
                <View key={idx} style={styles.catSection}>
                  <Text style={styles.catTitle}>{cat.category}</Text>
                  {cat.screens.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.screenRow}
                      onPress={() => navigateTo(item.route)}
                      activeOpacity={0.7}>
                      <View style={styles.screenNumBadge}>
                        <Text style={styles.screenNumText}>{item.id}</Text>
                      </View>
                      <Text style={styles.screenName}>{item.name}</Text>
                      <ChevronRight size={18} color={Colors.secondaryText} />
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
              <View style={{ height: 40 }} />
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(81, 34, 184, 0.85)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 20, 71, 0.6)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 60,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primaryText,
  },
  modalSubtitle: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: Colors.accent,
  },
  scrollList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  catSection: {
    marginTop: 18,
  },
  catTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  screenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 12,
    backgroundColor: Colors.background,
    borderRadius: 10,
    marginBottom: 6,
  },
  screenNumBadge: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  screenNumText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
  },
  screenName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryText,
  },
});
