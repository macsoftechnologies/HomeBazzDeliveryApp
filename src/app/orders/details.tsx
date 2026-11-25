import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { useApp } from '@/context/AppContext';
import { openDirectGoogleMap } from '@/utils/mapNavigation';
import {
  Store,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Receipt,
  Navigation,
  CheckCircle2,
  FileText,
  ExternalLink,
  QrCode,
} from 'lucide-react-native';

const FOOD_ITEMS = [
  {
    id: 1,
    name: 'Gongura Pickle (Spicy Andhra Special)',
    weight: '500g Glass Jar',
    quantity: 1,
    price: 250,
    image: require('@/assets/images/Food/Food1.jpg'),
  },
  {
    id: 2,
    name: 'Traditional Mango Avakaya Pickle',
    weight: '1kg Jar',
    quantity: 1,
    price: 220,
    image: require('@/assets/images/Food/Food2.jpg'),
  },
  {
    id: 3,
    name: 'Lemon Pickle Traditional Homemade',
    weight: '500g Pack',
    quantity: 1,
    price: 200,
    image: require('@/assets/images/Food/Food3.jpg'),
  },
];

export default function OrderDetailsScreen() {
  const { activeOrder } = useApp();
  const insets = useSafeAreaInsets();

  const order = activeOrder || {
    displayId: 'HB123456',
    orderTime: 'Today, 02:14 PM',
    estDeliveryTime: '02:45 PM (31 mins)',
    sellerName: 'HomeBazz Gourmet & Spices',
    sellerAddress: 'Shop #14, 4th Lane, Dwarakanagar, Visakhapatnam',
    sellerPhone: '+91 9123456789',
    sellerDistance: '0.8 km from you',
    customerName: 'Sankar Rao',
    customerAddress: '12-4-45, Oceanview Apts, Beach Road, Visakhapatnam - 530016',
    customerPhone: '+91 9876543210',
    customerDistance: '2.4 km trip',
    totalAmount: 670,
    partnerEarnings: 85,
  };

  const handleCallSeller = () => {
    Linking.openURL(`tel:${order.sellerPhone}`);
  };

  const handleCallCustomer = () => {
    Linking.openURL(`tel:${order.customerPhone}`);
  };

  const handleNavSeller = () => {
    openDirectGoogleMap(
      {
        title: order.sellerName,
        address: order.sellerAddress,
        latitude: 17.7294,
        longitude: 83.3089,
      },
      'two_wheeler'
    );
  };

  const handleNavCustomer = () => {
    openDirectGoogleMap(
      {
        title: order.customerName,
        address: order.customerAddress,
        latitude: 17.7126,
        longitude: 83.3155,
      },
      'two_wheeler'
    );
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      <Header title="Order Details" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 90 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Order Status Hero Bar */}
        <View style={styles.statusHeroCard}>
          <View style={styles.statusHeroLeft}>
            <View style={styles.idBadgeRow}>
              <Text style={styles.orderIdText}>#{order.displayId}</Text>
              <View style={styles.readyBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.readyBadgeText}>Ready for Pick Up</Text>
              </View>
            </View>

            <View style={styles.timeInfoRow}>
              <Clock size={13} color="#6B7280" />
              <Text style={styles.timeInfoText}>
                Order Placed: {order.orderTime}
              </Text>
            </View>
          </View>

          <View style={styles.earningsPillBox}>
            <Text style={styles.earningsLabel}>YOUR PAY</Text>
            <Text style={styles.earningsValue}>₹85</Text>
          </View>
        </View>

        {/* Visual Route Stepper Flow */}
        <View style={styles.routeCard}>
          <Text style={styles.sectionHeaderTitle}>DELIVERY ROUTE</Text>

          {/* Step 1: Store Pickup */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineIconCol}>
              <View style={styles.stepCircleStore}>
                <Store size={16} color="#6C3AE8" />
              </View>
              <View style={styles.stepLineDashed} />
            </View>

            <View style={styles.stepInfoCol}>
              <View style={styles.stepTopRow}>
                <Text style={styles.stepTitle}>Pick Up from Seller</Text>
                <View style={styles.stepActionsRow}>
                  <TouchableOpacity
                    style={styles.callSmallBtn}
                    onPress={handleCallSeller}
                    activeOpacity={0.8}>
                    <Phone size={12} color="#6C3AE8" />
                    <Text style={styles.callSmallBtnText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mapSmallBtn}
                    onPress={handleNavSeller}
                    activeOpacity={0.8}>
                    <ExternalLink size={12} color="#059669" />
                    <Text style={styles.mapSmallBtnText}>Maps</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.storeNameText}>{order.sellerName}</Text>
              <Text style={styles.storeAddrText}>{order.sellerAddress}</Text>

              <View style={styles.distanceBadge}>
                <Navigation size={11} color="#6C3AE8" />
                <Text style={styles.distanceText}>
                  {(order as any).sellerDistance || '0.8 km from you'}
                </Text>
              </View>
            </View>
          </View>

          {/* Step 2: Customer Delivery */}
          <View style={styles.timelineRow}>
            <View style={styles.timelineIconCol}>
              <View style={styles.stepCircleCustomer}>
                <MapPin size={16} color="#10B981" />
              </View>
            </View>

            <View style={styles.stepInfoCol}>
              <View style={styles.stepTopRow}>
                <Text style={styles.stepTitle}>Deliver to Customer</Text>
                <View style={styles.stepActionsRow}>
                  <TouchableOpacity
                    style={styles.callSmallBtn}
                    onPress={handleCallCustomer}
                    activeOpacity={0.8}>
                    <Phone size={12} color="#6C3AE8" />
                    <Text style={styles.callSmallBtnText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mapSmallBtn}
                    onPress={handleNavCustomer}
                    activeOpacity={0.8}>
                    <ExternalLink size={12} color="#059669" />
                    <Text style={styles.mapSmallBtnText}>Maps</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.customerNameText}>{order.customerName}</Text>
              <Text style={styles.customerAddrText}>{order.customerAddress}</Text>

              <View style={styles.instructionBox}>
                <Text style={styles.instructionLabel}>Customer Note:</Text>
                <Text style={styles.instructionText}>
                  {"Please ring bell twice. In case of no answer, leave with building security."}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Order Items with Real Images */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <FileText size={16} color="#6C3AE8" />
              <Text style={styles.cardHeaderTitle}>
                Package Items ({FOOD_ITEMS.length})
              </Text>
            </View>
            <View style={styles.sealedBadge}>
              <ShieldCheck size={12} color="#059669" />
              <Text style={styles.sealedText}>Pre-Packed</Text>
            </View>
          </View>

          <View style={styles.itemsList}>
            {FOOD_ITEMS.map((item, idx) => (
              <View
                key={item.id}
                style={[
                  styles.itemRow,
                  idx !== FOOD_ITEMS.length - 1 && styles.itemRowBorder,
                ]}>
                <Image
                  source={item.image}
                  style={styles.itemImage}
                  resizeMode="cover"
                />

                <View style={styles.itemMeta}>
                  <Text style={styles.itemName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemWeight}>{item.weight}</Text>
                  <Text style={styles.itemQtyBadge}>Qty: {item.quantity}</Text>
                </View>

                <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bill Breakdown Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Receipt size={16} color="#6C3AE8" />
              <Text style={styles.cardHeaderTitle}>Bill Details</Text>
            </View>
            <Text style={styles.prepaidPill}>Online Paid ✓</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Total</Text>
            <Text style={styles.billVal}>₹670</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Packaging & Store Handling</Text>
            <Text style={styles.billVal}>₹30</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Partner Fee</Text>
            <Text style={styles.billVal}>₹60</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Customer Tip</Text>
            <Text style={[styles.billVal, { color: '#059669' }]}>+ ₹25</Text>
          </View>

          <View style={styles.billDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Customer Amount</Text>
            <Text style={styles.totalValue}>₹785</Text>
          </View>
        </View>

        {/* Safety & Package Quality Notice */}
        <View style={styles.qualityNotice}>
          <CheckCircle2 size={16} color="#10B981" />
          <Text style={styles.qualityNoticeText}>
            Ensure all 3 items are sealed in the HomeBazz carry bag before leaving store.
          </Text>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar with Safe-Area Insets */}
      <View
        style={[
          styles.bottomActionBar,
          { paddingBottom: Math.max(insets.bottom, 16) },
        ]}>
        <TouchableOpacity
          style={styles.handoverQuickBtn}
          onPress={() => router.push('/pickup/verify')}
          activeOpacity={0.85}>
          <QrCode size={16} color="#6C3AE8" />
          <Text style={styles.handoverQuickText}>Verify Handover</Text>
        </TouchableOpacity>

        <View style={{ flex: 1.6 }}>
          <GradientButton
            title="Start Navigation"
            icon={<Navigation size={18} color="#FFFFFF" />}
            onPress={() => router.push('/pickup/navigate')}
            style={styles.ctaBtn}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  statusHeroCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 14,
  },
  statusHeroLeft: {
    flex: 1,
  },
  idBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  orderIdText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111447',
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6C3AE8',
  },
  readyBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  timeInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  timeInfoText: {
    fontSize: 12,
    color: '#6B7280',
  },
  earningsPillBox: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.6,
  },
  earningsValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#059669',
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
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  timelineRow: {
    flexDirection: 'row',
  },
  timelineIconCol: {
    alignItems: 'center',
    width: 32,
    marginRight: 12,
  },
  stepCircleStore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#7C3AED',
  },
  stepCircleCustomer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#10B981',
  },
  stepLineDashed: {
    width: 2,
    height: 60,
    backgroundColor: '#D8B4FE',
    marginVertical: 4,
  },
  stepInfoCol: {
    flex: 1,
    paddingBottom: 16,
  },
  stepTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  stepTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
  },
  callSmallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  callSmallBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  storeNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111447',
    marginTop: 2,
  },
  storeAddrText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
    marginTop: 2,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  distanceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  customerNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111447',
    marginTop: 2,
  },
  customerAddrText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
    marginTop: 2,
  },
  instructionBox: {
    backgroundColor: '#F8F7FF',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#7C3AED',
  },
  instructionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6C3AE8',
    marginBottom: 2,
  },
  instructionText: {
    fontSize: 11,
    color: '#4B5563',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  card: {
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
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111447',
  },
  sealedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  sealedText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  prepaidPill: {
    fontSize: 11,
    fontWeight: '800',
    color: '#059669',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  itemsList: {
    gap: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  itemRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemImage: {
    width: 52,
    height: 52,
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
  itemWeight: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  itemQtyBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C3AE8',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111447',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  billLabel: {
    fontSize: 13,
    color: '#4B5563',
  },
  billVal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111447',
  },
  billDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111447',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#6C3AE8',
  },
  qualityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 10,
  },
  qualityNoticeText: {
    fontSize: 12,
    color: '#065F46',
    flex: 1,
    lineHeight: 17,
  },
  bottomActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECE4FF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 8,
  },
  handoverQuickBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F5F3FF',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },
  handoverQuickText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  stepActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mapSmallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  mapSmallBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  ctaBtn: {
    width: '100%',
  },
});
