import { GradientButton } from '@/components/common/GradientButton';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { useApp } from '@/context/AppContext';
import { router } from 'expo-router';
import {
  AlertTriangle,
  Check,
  Clock,
  Navigation,
  ShieldAlert,
  ShoppingBag,
  Store,
  X,
  CheckCircle2,
  Sparkles,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FOOD_IMAGES = [
  require('@/assets/images/Food/Food1.jpg'),
  require('@/assets/images/Food/Food2.jpg'),
  require('@/assets/images/Food/Food3.jpg'),
];

export default function NewOrderRequestScreen() {
  const { activeOrder, acceptOrder, rejectOrder } = useApp();
  const insets = useSafeAreaInsets();
  const [timer, setTimer] = useState(30);

  // Modal for Accept Order Confirmation (Small Popup)
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  // Modal for Reject Order Confirmation
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('Store location is too far away');

  const rejectReasons = [
    'Store location is too far away',
    'Vehicle fuel low / mechanical issue',
    'Heavy traffic / extreme weather',
    'Personal emergency / ending shift',
  ];

  useEffect(() => {
    if (showAcceptModal) return;
    if (timer <= 0) {
      router.back();
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, showAcceptModal]);

  const order = activeOrder || {
    id: 'ord_1',
    displayId: 'HB123456',
    totalAmount: 670,
    deliveryFee: 85,
    itemCount: 3,
    distance: '2.4 km',
    estimatedTime: '18 mins',
    sellerName: 'HomeBazz Gourmet Store',
    sellerAddress: 'Shop #14, 4th Lane, Dwarakanagar',
    customerName: 'Sankar Rao',
    customerAddress: '12-4-45, Oceanview, Beach Road',
  };

  const orderItems = [
    { id: 1, name: 'Gongura Pickle 500g Jar', price: 250, qty: 1, img: FOOD_IMAGES[0] },
    { id: 2, name: 'Mango Avakaya Pickle 1kg', price: 220, qty: 1, img: FOOD_IMAGES[1] },
    { id: 3, name: 'Traditional Lemon Pickle', price: 200, qty: 1, img: FOOD_IMAGES[2] },
  ];

  const handleAccept = () => {
    acceptOrder(order.id);
    setShowAcceptModal(true);
  };

  const handleConfirmReject = () => {
    rejectOrder(order.id);
    setShowRejectModal(false);
    router.back();
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 95 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <View>
            <Text style={styles.screenTitle}>New Delivery Request</Text>
            <Text style={styles.orderIdHeader}>Order #{order.displayId}</Text>
          </View>
          <View style={styles.timerBadge}>
            <Clock size={16} color="#EF4444" />
            <Text style={styles.timerText}>{timer}s</Text>
          </View>
        </View>

        {/* Big Earnings Hero Callout */}
        <View style={styles.earningHeroCard}>
          <Text style={styles.earningLabel}>YOUR ESTIMATED EARNINGS</Text>
          <View style={styles.earningValRow}>
            <Text style={styles.rupeeHero}>₹</Text>
            <Text style={styles.earningVal}>{order.deliveryFee}</Text>
          </View>
          <View style={styles.orderSummaryPill}>
            <Text style={styles.orderSummaryText}>
              Trip: {order.distance} • Est. {order.estimatedTime} • Total ₹{order.totalAmount}
            </Text>
          </View>
        </View>

        {/* Route Details Card */}
        <View style={styles.routeCard}>
          <Text style={styles.cardHeaderTitle}>PICKUP & DROP ROUTE</Text>

          <View style={styles.stepBlock}>
            <View style={styles.iconCirclePurple}>
              <Store size={18} color="#6C3AE8" />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepType}>PICKUP STORE (0.8 km)</Text>
              <Text style={styles.locationTitle}>{order.sellerName}</Text>
              <Text style={styles.locationDesc}>{order.sellerAddress}</Text>
            </View>
          </View>

          <View style={styles.connectorLine} />

          <View style={styles.stepBlock}>
            <View style={styles.iconCircleGreen}>
              <Navigation size={18} color="#10B981" />
            </View>
            <View style={styles.stepInfo}>
              <Text style={styles.stepTypeGreen}>DELIVER TO CUSTOMER (2.4 km)</Text>
              <Text style={styles.locationTitle}>{order.customerName}</Text>
              <Text style={styles.locationDesc}>{order.customerAddress}</Text>
            </View>
          </View>
        </View>

        {/* Order Items Preview (Requested by user) */}
        <View style={styles.itemsCard}>
          <View style={styles.itemsCardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <ShoppingBag size={16} color="#6C3AE8" />
              <Text style={styles.cardHeaderTitle}>Order Items ({order.itemCount})</Text>
            </View>
            <Text style={styles.itemsTotalFee}>Prepaid ₹{order.totalAmount}</Text>
          </View>

          {orderItems.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.itemRow,
                idx !== orderItems.length - 1 && styles.itemRowBorder,
              ]}>
              <Image source={item.img} style={styles.itemThumb} resizeMode="cover" />
              <View style={styles.itemMeta}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>Quantity: {item.qty}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Actions Floating Bar with Safe-Area Padding (Fixed NavTab Overlap) */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 16) + 4 },
        ]}>
        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => setShowRejectModal(true)}
          activeOpacity={0.85}>
          <X size={18} color="#EF4444" />
          <Text style={styles.rejectBtnText}>Reject</Text>
        </TouchableOpacity>

        <View style={{ flex: 2 }}>
          <GradientButton
            title="Accept Order"
            icon={<Check size={20} color="#FFFFFF" strokeWidth={2.5} />}
            onPress={handleAccept}
          />
        </View>
      </View>

      {/* Interactive Reject Confirmation Modal with Reason Selection */}
      <Modal
        visible={showRejectModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRejectModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.rejectModalCard}>
            <View style={styles.warningCircle}>
              <AlertTriangle size={32} color="#EF4444" />
            </View>

            <Text style={styles.rejectModalTitle}>Decline Order #{order.displayId}?</Text>
            <Text style={styles.rejectModalSubtitle}>
              Please select a reason for declining this delivery:
            </Text>

            {/* Reasons List */}
            <View style={styles.reasonsList}>
              {rejectReasons.map((reason) => {
                const isSelected = selectedReason === reason;
                return (
                  <TouchableOpacity
                    key={reason}
                    style={[
                      styles.reasonRow,
                      isSelected && styles.reasonRowSelected,
                    ]}
                    onPress={() => setSelectedReason(reason)}
                    activeOpacity={0.8}>
                    <View
                      style={[
                        styles.radioCircle,
                        isSelected && styles.radioCircleSelected,
                      ]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                    <Text
                      style={[
                        styles.reasonText,
                        isSelected && styles.reasonTextSelected,
                      ]}>
                      {reason}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Warning Note */}
            <View style={styles.rejectWarningBanner}>
              <ShieldAlert size={14} color="#D97706" />
              <Text style={styles.rejectWarningText}>
                Declining assignments may temporarily affect your priority score.
              </Text>
            </View>

            {/* Modal Action Buttons */}
            <View style={styles.modalActionRow}>
              <TouchableOpacity
                style={styles.modalKeepBtn}
                onPress={() => setShowRejectModal(false)}
                activeOpacity={0.85}>
                <Text style={styles.modalKeepText}>Keep Order</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmRejectBtn}
                onPress={handleConfirmReject}
                activeOpacity={0.85}>
                <Text style={styles.modalConfirmRejectText}>Confirm Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Small Order Accepted Confirmation Modal Popup */}
      <Modal
        visible={showAcceptModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowAcceptModal(false);
          router.replace('/orders/details');
        }}>
        <View style={styles.modalBackdrop}>
          <View style={styles.acceptModalCard}>
            {/* Top Close Button */}
            <TouchableOpacity
              style={styles.acceptModalCloseBtn}
              onPress={() => {
                setShowAcceptModal(false);
                router.replace('/orders/details');
              }}
              activeOpacity={0.8}>
              <X size={18} color="#94A3B8" />
            </TouchableOpacity>

            {/* Glowing Success Badge */}
            <View style={styles.acceptBadgeWrap}>
              <View style={styles.acceptBadgeHalo} />
              <View style={styles.acceptBadgeIcon}>
                <CheckCircle2 size={34} color="#FFFFFF" strokeWidth={2.5} />
              </View>
            </View>

            {/* Title & Celebration Subtitle */}
            <View style={styles.acceptTitleRow}>
              <Text style={styles.acceptModalTitle}>Order Accepted!</Text>
              <Sparkles size={16} color="#F59E0B" />
            </View>
            <Text style={styles.acceptModalSub}>
              Trip assigned to you. Prepare to pickup package from the seller.
            </Text>

            {/* Quick Summary Card */}
            <View style={styles.acceptSummaryCard}>
              <View style={styles.summaryTopRow}>
                <View>
                  <Text style={styles.summaryIdLabel}>ORDER ID</Text>
                  <Text style={styles.summaryIdValue}>#{order.displayId}</Text>
                </View>
                <View style={styles.summaryEarningPill}>
                  <Text style={styles.summaryEarningLabel}>PAYOUT</Text>
                  <Text style={styles.summaryEarningValue}>₹{order.deliveryFee}</Text>
                </View>
              </View>

              <View style={styles.summaryDivider} />

              <View style={styles.summaryLocationRow}>
                <Store size={15} color="#6C3AE8" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.summaryStoreName} numberOfLines={1}>
                    {order.sellerName}
                  </Text>
                  <Text style={styles.summaryStoreDist}>
                    Pickup • {order.distance} total trip
                  </Text>
                </View>
              </View>
            </View>

            {/* Modal Actions */}
            <View style={styles.acceptModalActions}>
              <GradientButton
                title="Start Navigation"
                icon={<Navigation size={16} color="#FFFFFF" />}
                onPress={() => {
                  setShowAcceptModal(false);
                  router.replace('/pickup/navigate');
                }}
                style={styles.modalNavBtn}
              />

              <TouchableOpacity
                style={styles.modalViewDetailsBtn}
                onPress={() => {
                  setShowAcceptModal(false);
                  router.replace('/orders/details');
                }}
                activeOpacity={0.85}>
                <Text style={styles.modalViewDetailsText}>View Order Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 18,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111447',
  },
  orderIdHeader: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  timerText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EF4444',
  },
  earningHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 14,
  },
  earningLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
  },
  earningValRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  rupeeHero: {
    fontSize: 26,
    fontWeight: '900',
    color: '#6C3AE8',
    marginRight: 2,
  },
  earningVal: {
    fontSize: 42,
    fontWeight: '900',
    color: '#6C3AE8',
  },
  orderSummaryPill: {
    backgroundColor: '#F8F7FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  orderSummaryText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 14,
  },
  cardHeaderTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  stepBlock: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconCirclePurple: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleGreen: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepInfo: {
    flex: 1,
  },
  stepType: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6C3AE8',
    letterSpacing: 0.6,
  },
  stepTypeGreen: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.6,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111447',
    marginTop: 2,
  },
  locationDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  connectorLine: {
    width: 2,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginLeft: 17,
    marginVertical: 4,
  },
  itemsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemsTotalFee: {
    fontSize: 12,
    fontWeight: '800',
    color: '#059669',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    marginRight: 12,
  },
  itemMeta: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111447',
  },
  itemQty: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ECE4FF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
  },
  rejectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
    paddingVertical: 14,
  },
  rejectBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EF4444',
  },

  // Reject Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rejectModalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
  },
  warningCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  rejectModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111447',
    textAlign: 'center',
    marginBottom: 4,
  },
  rejectModalSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  reasonsList: {
    width: '100%',
    gap: 8,
    marginBottom: 14,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  reasonRowSelected: {
    backgroundColor: '#EDE9FE',
    borderColor: '#7C3AED',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircleSelected: {
    borderColor: '#7C3AED',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C3AED',
  },
  reasonText: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '600',
    flex: 1,
  },
  reasonTextSelected: {
    color: '#6C3AE8',
    fontWeight: '700',
  },
  rejectWarningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 12,
    marginBottom: 18,
  },
  rejectWarningText: {
    fontSize: 11,
    color: '#92400E',
    flex: 1,
    lineHeight: 15,
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  modalKeepBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalKeepText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4B5563',
  },
  modalConfirmRejectBtn: {
    flex: 1.2,
    backgroundColor: '#EF4444',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalConfirmRejectText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  acceptModalCard: {
    width: '88%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 12,
    position: 'relative',
  },
  acceptModalCloseBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  acceptBadgeWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  acceptBadgeHalo: {
    position: 'absolute',
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
  },
  acceptBadgeIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  acceptTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  acceptModalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
  },
  acceptModalSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  acceptSummaryCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  summaryTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryIdLabel: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  summaryIdValue: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1E293B',
    marginTop: 1,
  },
  summaryEarningPill: {
    alignItems: 'flex-end',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  summaryEarningLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
  },
  summaryEarningValue: {
    fontSize: 13,
    fontWeight: '900',
    color: '#047857',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  summaryLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryStoreName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  summaryStoreDist: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 1,
  },
  acceptModalActions: {
    width: '100%',
    gap: 8,
  },
  modalNavBtn: {
    width: '100%',
  },
  modalViewDetailsBtn: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  modalViewDetailsText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#475569',
  },
});
