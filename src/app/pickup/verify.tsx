import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { OtpInput } from '@/components/common/OtpInput';
import { GradientButton } from '@/components/common/GradientButton';
import { SuccessToast } from '@/components/common/SuccessToast';
import { useApp } from '@/context/AppContext';
import {
  QrCode,
  Store,
  CheckCircle2,
  ShieldCheck,
  PackageCheck,
  Check,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react-native';

export default function PickupVerificationScreen() {
  const { verifyPickup, activeOrder } = useApp();
  const insets = useSafeAreaInsets();

  const [otp, setOtp] = useState('7824');
  const [error, setError] = useState('');
  const [showQrModal, setShowQrModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [checklist, setChecklist] = useState({
    sealChecked: true,
    itemsCounted: true,
    fragileLabeled: true,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConfirmPickup = () => {
    const success = verifyPickup(otp);
    if (success) {
      setError('');
      setShowToast(true);
      setTimeout(() => {
        router.push('/delivery/navigate');
      }, 1100);
    } else {
      setError('Invalid Seller OTP. Please ask store merchant for the correct code.');
    }
  };

  const handleScanQrSuccess = () => {
    setOtp('7824');
    setShowQrModal(false);
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      <SuccessToast
        visible={showToast}
        title="Handover Confirmed!"
        message="Package picked up. Starting delivery navigation to customer..."
        type="success"
      />

      <Header title="Pickup Verification" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 90 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Store Merchant Header Card */}
        <View style={styles.storeCard}>
          <View style={styles.storeIconWrap}>
            <Store size={22} color="#6C3AE8" />
          </View>
          <View style={styles.storeMeta}>
            <View style={styles.storeNameRow}>
              <Text style={styles.storeTitle}>
                {activeOrder?.sellerName || 'HomeBazz Gourmet Store'}
              </Text>
              <View style={styles.verifiedStoreBadge}>
                <ShieldCheck size={11} color="#059669" />
                <Text style={styles.verifiedStoreText}>Verified</Text>
              </View>
            </View>
            <Text style={styles.storeSub}>
              Order #{activeOrder?.displayId || 'HB123456'} • 3 Items (Pickles & Sweets)
            </Text>
            <Text style={styles.storeAddress}>
              Shop #14, 4th Lane, Dwarakanagar
            </Text>
          </View>
        </View>

        {/* Quality Handover Checklist */}
        <View style={styles.card}>
          <Text style={styles.cardSectionHeader}>HANDOVER QUALITY CHECK</Text>

          <TouchableOpacity
            style={styles.checkItemRow}
            activeOpacity={0.8}
            onPress={() => toggleCheck('sealChecked')}>
            <View
              style={[
                styles.checkboxBox,
                checklist.sealChecked && styles.checkboxBoxActive,
              ]}>
              {checklist.sealChecked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.checkTitle}>Tamper-Proof HomeBazz Seal Intact</Text>
              <Text style={styles.checkSub}>Package box is sealed with security tape</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkItemRow}
            activeOpacity={0.8}
            onPress={() => toggleCheck('itemsCounted')}>
            <View
              style={[
                styles.checkboxBox,
                checklist.itemsCounted && styles.checkboxBoxActive,
              ]}>
              {checklist.itemsCounted && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.checkTitle}>3 of 3 Order Items Included</Text>
              <Text style={styles.checkSub}>Verified with store merchant invoice</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.checkItemRow, { borderBottomWidth: 0 }]}
            activeOpacity={0.8}
            onPress={() => toggleCheck('fragileLabeled')}>
            <View
              style={[
                styles.checkboxBox,
                checklist.fragileLabeled && styles.checkboxBoxActive,
              ]}>
              {checklist.fragileLabeled && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.checkTitle}>Glass Jar Fragile Handling Warning</Text>
              <Text style={styles.checkSub}>Secure bubble wrap for liquid / oil pickles</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* OTP Verification Card */}
        <View style={styles.verificationCard}>
          <View style={styles.otpHeaderRow}>
            <PackageCheck size={20} color="#6C3AE8" />
            <Text style={styles.cardTitle}>Merchant Pickup OTP</Text>
          </View>

          <Text style={styles.cardDesc}>
            Enter the 4-digit pickup code shown on the seller{"'"}s HomeBazz merchant screen.
          </Text>

          <View style={styles.otpWrap}>
            <OtpInput length={4} value={otp} onChange={setOtp} />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.orDivider}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR SCAN QR</Text>
            <View style={styles.orLine} />
          </View>

          {/* QR Scan Button */}
          <TouchableOpacity
            style={styles.qrScanBtn}
            onPress={() => setShowQrModal(true)}
            activeOpacity={0.85}>
            <View style={styles.qrIconCircle}>
              <QrCode size={18} color="#6C3AE8" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.qrScanTitle}>Scan Merchant Handover QR</Text>
              <Text style={styles.qrScanSubtitle}>Instant OTP autofill & verification</Text>
            </View>
            <ArrowRight size={16} color="#6C3AE8" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar with Safe-Area Insets */}
      <View
        style={[
          styles.bottomActionBar,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}>
        <GradientButton
          title="Confirm Handover & Start Navigation"
          icon={<CheckCircle2 size={18} color="#FFFFFF" />}
          onPress={handleConfirmPickup}
          style={styles.confirmBtn}
        />
      </View>

      {/* Interactive Simulated QR Scanner Modal */}
      <Modal
        visible={showQrModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowQrModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Scan Merchant QR</Text>
              <TouchableOpacity onPress={() => setShowQrModal(false)} style={styles.closeBtn}>
                <X size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSub}>
              Align camera over the merchant QR displayed on the seller{"'"}s HomeBazz tablet or bill.
            </Text>

            {/* Simulated Camera Scanner Viewfinder */}
            <View style={styles.viewfinderBox}>
              <View style={[styles.corner, styles.cornerTL]} />
              <View style={[styles.corner, styles.cornerTR]} />
              <View style={[styles.corner, styles.cornerBL]} />
              <View style={[styles.corner, styles.cornerBR]} />
              <QrCode size={110} color="#6C3AE8" />
              <View style={styles.scanLaserBeam} />
            </View>

            <Text style={styles.scannerPrompt}>Detecting HomeBazz merchant code...</Text>

            <TouchableOpacity
              style={styles.scanSuccessSimBtn}
              onPress={handleScanQrSuccess}
              activeOpacity={0.85}>
              <Sparkles size={16} color="#FFFFFF" />
              <Text style={styles.scanSuccessSimText}>Simulate QR Auto-Match</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  storeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 14,
  },
  storeIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  storeMeta: {
    flex: 1,
  },
  storeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  storeTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111447',
    flex: 1,
  },
  verifiedStoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
  },
  verifiedStoreText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  storeSub: {
    fontSize: 12,
    color: '#6C3AE8',
    fontWeight: '600',
    marginTop: 2,
  },
  storeAddress: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 14,
  },
  cardSectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  checkItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxBoxActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1F2937',
  },
  checkSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  verificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 14,
  },
  otpHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111447',
  },
  cardDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  otpWrap: {
    alignItems: 'center',
    marginVertical: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 16,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  orText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.6,
  },
  qrScanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F7FF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  qrIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  qrScanTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111447',
  },
  qrScanSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECE4FF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  confirmBtn: {
    width: '100%',
  },

  // QR Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111447',
  },
  closeBtn: {
    padding: 4,
  },
  modalSub: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  viewfinderBox: {
    width: 190,
    height: 190,
    borderRadius: 20,
    backgroundColor: '#F8F7FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  corner: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderColor: '#6C3AE8',
  },
  cornerTL: { top: 8, left: 8, borderTopWidth: 3, borderLeftWidth: 3 },
  cornerTR: { top: 8, right: 8, borderTopWidth: 3, borderRightWidth: 3 },
  cornerBL: { bottom: 8, left: 8, borderBottomWidth: 3, borderLeftWidth: 3 },
  cornerBR: { bottom: 8, right: 8, borderBottomWidth: 3, borderRightWidth: 3 },
  scanLaserBeam: {
    position: 'absolute',
    left: 12,
    right: 12,
    height: 2,
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  scannerPrompt: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 16,
  },
  scanSuccessSimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    backgroundColor: '#6C3AE8',
    borderRadius: 14,
    paddingVertical: 12,
  },
  scanSuccessSimText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
