import { HomeBazzLogo } from '@/components/common/HomeBazLogo';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { LinearGradient } from 'expo-linear-gradient';
import { TabScreenLoader } from '@/components/common/TabScreenLoader';
import { router, useFocusEffect } from 'expo-router';
import {
  Bike,
  ChevronRight,
  MapPin,
  PackageCheck,
  Search,
  Store,
} from 'lucide-react-native';
import { useState, useEffect, useCallback } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OrdersListScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'delivered'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Multi-color page transition loader on tab navigation
  const [isTabLoading, setIsTabLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsTabLoading(true);
      const timer = setTimeout(() => {
        setIsTabLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }, [])
  );

  // Floating animated pulse for delivery status micro-icons
  const [transitPulse] = useState(() => new Animated.Value(1));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(transitPulse, {
          toValue: 1.15,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(transitPulse, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [transitPulse]);

  const displayOrders = [
    {
      id: 'hb_1',
      displayId: 'HB123456',
      amount: 720,
      itemCount: 3,
      productName: 'Gongura Pickle & Sweets Box',
      customer: 'Sankar Rao',
      address: 'Dwarakanagar, Visakhapatnam',
      distance: '2.4 km',
      time: 'Today, 02:14 PM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/Food/Food1.jpg'),
    },
    {
      id: 'hb_2',
      displayId: 'HB123455',
      amount: 470,
      itemCount: 2,
      productName: 'Mango Pickle Traditional Jar',
      customer: 'Priya Sharma',
      address: 'MVP Colony, Sector 4',
      distance: '3.1 km',
      time: 'Today, 01:20 PM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/Food/Food2.jpg'),
    },
    {
      id: 'hb_3',
      displayId: 'HB123454',
      amount: 1020,
      itemCount: 4,
      productName: 'Avakaya & Andhra Spice Mix',
      customer: 'Kalyan Verma',
      address: 'Gajuwaka Main Rd, Steel City',
      distance: '5.6 km',
      time: 'Today, 12:40 PM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/Food/Food3.jpg'),
    },
    {
      id: 'hb_4',
      displayId: 'HB123453',
      amount: 250,
      itemCount: 1,
      productName: 'Lemon Pickle & Homemade Masala',
      customer: 'Anjali Devi',
      address: 'Siripuram Towers, Flat 302',
      distance: '4.2 km',
      time: 'Today, 11:45 AM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/Food/Food4.jpg'),
    },
    {
      id: 'hb_5',
      displayId: 'HB123452',
      amount: 650,
      itemCount: 2,
      productName: 'Pootharekulu Special Ghee Sweets',
      customer: 'Venkata Ramana',
      address: 'Dwarakanagar 2nd Lane',
      distance: '1.2 km',
      time: 'Today, 11:15 AM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/Food/Food5.jpg'),
    },
    {
      id: 'hb_6',
      displayId: 'HB123451',
      amount: 320,
      itemCount: 3,
      productName: 'Murukku & Jantarikalu Snacks Box',
      customer: 'Lakshmi Prasanna',
      address: 'Siripuram Circle',
      distance: '2.0 km',
      time: 'Today, 10:50 AM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/Food/Food6.jpg'),
    },
    {
      id: 'hb_7',
      displayId: 'HB123450',
      amount: 890,
      itemCount: 2,
      productName: 'Pure Buffalo Ghee & Bellam Laddu',
      customer: 'Nagaraju M.',
      address: 'Madhurawada Car Shed',
      distance: '6.5 km',
      time: 'Today, 10:25 AM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/Food/Food7.jpg'),
    },
    {
      id: 'hb_8',
      displayId: 'HB123449',
      amount: 410,
      itemCount: 2,
      productName: 'Crispy Ribbon Pakoda & Chekkalu',
      customer: 'Divya Reddy',
      address: 'Akkayyapalem 80 Feet Rd',
      distance: '2.8 km',
      time: 'Today, 10:00 AM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/Food/Food8.jpg'),
    },
    {
      id: 'hb_9',
      displayId: 'HB123448',
      amount: 340,
      itemCount: 3,
      productName: 'Garlic Karampodi & Kandi Podi',
      customer: 'Suresh Babu',
      address: 'Seethammadhara North Ext.',
      distance: '3.4 km',
      time: 'Today, 09:40 AM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/Food/Food9.jpg'),
    },
    {
      id: 'hb_10',
      displayId: 'HB123447',
      amount: 290,
      itemCount: 1,
      productName: 'Tomato & Red Chilli Chutney Jar',
      customer: 'Bhavani Shankar',
      address: 'Rushikonda IT SEZ',
      distance: '8.1 km',
      time: 'Today, 09:15 AM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/Food/Food10.jpg'),
    },
    {
      id: 'hb_11',
      displayId: 'HB123446',
      amount: 780,
      itemCount: 2,
      productName: 'Kaju Katli & Dry Fruit Gift Box',
      customer: 'Gautam Kumar',
      address: 'Jagadamba Main Centre',
      distance: '1.5 km',
      time: 'Today, 08:50 AM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/Food/Food11.jpg'),
    },
    {
      id: 'hb_12',
      displayId: 'HB123445',
      amount: 260,
      itemCount: 1,
      productName: 'Spicy Corn Mixture & Dal Moth',
      customer: 'Kavitha S.',
      address: 'Railway New Colony',
      distance: '2.1 km',
      time: 'Today, 08:20 AM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/Food/Food12.jpg'),
    },
    {
      id: 'hb_13',
      displayId: 'HB123444',
      amount: 540,
      itemCount: 4,
      productName: 'Handmade Terracotta Diya Set',
      customer: 'Ramakrishna P.',
      address: 'Lawsons Bay Colony',
      distance: '3.9 km',
      time: 'Today, 08:00 AM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/handmade/handmade1.jpg'),
    },
    {
      id: 'hb_14',
      displayId: 'HB123443',
      amount: 820,
      itemCount: 2,
      productName: 'Artisan Terracotta Garden Planter',
      customer: 'Madhavi Latha',
      address: 'Pendurthi Highway',
      distance: '7.4 km',
      time: 'Yesterday, 07:45 PM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/handmade/handmade2.jpg'),
    },
    {
      id: 'hb_15',
      displayId: 'HB123442',
      amount: 1250,
      itemCount: 2,
      productName: 'Brass Pooja Bell & Oil Lamp',
      customer: 'Chandra Sekhar',
      address: 'Simhachalam Foothills',
      distance: '9.2 km',
      time: 'Yesterday, 07:10 PM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/handmade/handmade3.jpg'),
    },
    {
      id: 'hb_16',
      displayId: 'HB123441',
      amount: 950,
      itemCount: 1,
      productName: 'Carved Wooden Spice Storage Box',
      customer: 'Neelima Rao',
      address: 'Kommadi Junction',
      distance: '10.0 km',
      time: 'Yesterday, 06:30 PM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/handmade/handmade4.jpg'),
    },
    {
      id: 'hb_17',
      displayId: 'HB123440',
      amount: 680,
      itemCount: 3,
      productName: 'Handcrafted Jute Storage Baskets',
      customer: 'Anand Varma',
      address: 'Waltair Station Rd',
      distance: '2.5 km',
      time: 'Yesterday, 05:45 PM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/handmade/handmade5.jpg'),
    },
    {
      id: 'hb_18',
      displayId: 'HB123439',
      amount: 620,
      itemCount: 2,
      productName: 'Handloom Cotton Ikat Table Runner',
      customer: 'Padmavathi T.',
      address: 'Yendada Beach View',
      distance: '5.8 km',
      time: 'Yesterday, 05:00 PM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/art-decor/decor1.jpg'),
    },
    {
      id: 'hb_19',
      displayId: 'HB123438',
      amount: 1400,
      itemCount: 1,
      productName: 'Traditional Kalamkari Wall Hanging',
      customer: 'Subba Rao K.',
      address: 'Sagar Nagar Highway',
      distance: '6.2 km',
      time: 'Yesterday, 04:15 PM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/art-decor/decor2.jpg'),
    },
    {
      id: 'hb_20',
      displayId: 'HB123437',
      amount: 750,
      itemCount: 1,
      productName: 'Handmade Brass Wind Chime',
      customer: 'Srinivas G.',
      address: 'Old Post Office Area',
      distance: '3.0 km',
      time: 'Yesterday, 03:30 PM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/art-decor/decor3.jpg'),
    },
    {
      id: 'hb_21',
      displayId: 'HB123436',
      amount: 1850,
      itemCount: 2,
      productName: 'Kundan & Pearl Studded Bangles',
      customer: 'Sunitha K.',
      address: 'Kurupam Market Rd',
      distance: '2.2 km',
      time: 'Yesterday, 02:45 PM',
      badge: 'Pick Up',
      badgeType: 'purple',
      image: require('@/assets/images/jewellery/jewellery1.jpg'),
    },
    {
      id: 'hb_22',
      displayId: 'HB123435',
      amount: 1120,
      itemCount: 1,
      productName: 'Silver Filigree Jhumka Earrings',
      customer: 'Deepika S.',
      address: 'Kancharapalem Jn',
      distance: '4.0 km',
      time: 'Yesterday, 02:00 PM',
      badge: 'Deliver',
      badgeType: 'green',
      image: require('@/assets/images/jewellery/jewellery2.jpg'),
    },
  ];

  const filtered = displayOrders.filter((item) => {
    // Filter by Tab
    if (activeTab === 'pending' && item.badge !== 'Pick Up') return false;
    if (activeTab === 'delivered' && item.badge !== 'Deliver') return false;

    // Filter by Search Query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return (
        item.displayId.toLowerCase().includes(q) ||
        item.productName.toLowerCase().includes(q) ||
        item.customer.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      {/* Multi-Color Small Card Page Loader on Tab Navigation */}
      <TabScreenLoader visible={isTabLoading} tabName="orders" />

      {/* Top Header with HomeBazz Logo */}
      <View style={styles.topHeader}>
        <View style={styles.headerLogoWrap}>
          <HomeBazzLogo size="mini" showSubtitle={false} />
        </View>

        <View style={styles.headerRightActions}>
          <View style={styles.activeOrdersBadge}>
            <Text style={styles.activeOrdersText}>{filtered.length} Active</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 95 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={18} color="#6B7280" />
          <TextInput
            placeholder="Search order ID, food or customer..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Tab Filters */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'all' && styles.tabItemActive]}
            onPress={() => setActiveTab('all')}
            activeOpacity={0.8}>
            <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
              All ({displayOrders.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'pending' && styles.tabItemActive]}
            onPress={() => setActiveTab('pending')}
            activeOpacity={0.8}>
            <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>
              Pick Up (12)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'delivered' && styles.tabItemActive]}
            onPress={() => setActiveTab('delivered')}
            activeOpacity={0.8}>
            <Text style={[styles.tabText, activeTab === 'delivered' && styles.tabTextActive]}>
              Delivered (10)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Orders Cards List with Shaded Gradients & Delivery Animation */}
        <View style={styles.ordersList}>
          {filtered.map((item) => {
            const isGreen = item.badgeType === 'green';
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.orderCardTouch}
                activeOpacity={0.88}
                onPress={() => {
                  if (item.badge === 'Pick Up') {
                    router.push('/orders/details');
                  } else {
                    router.push('/delivery/navigate');
                  }
                }}>
                <LinearGradient
                  colors={
                    isGreen
                      ? ['#FFFFFF', '#F2FDF6', '#E8FBF0']
                      : ['#FFFFFF', '#FAF7FF', '#F3ECFF']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.orderCard,
                    { borderColor: isGreen ? '#A7F3D0' : '#E9D5FF' },
                  ]}>
                  <View style={styles.cardTopRow}>
                    {/* Real Product Image Thumbnail */}
                    <Image
                      source={item.image}
                      style={styles.foodThumb}
                      resizeMode="cover"
                    />

                    {/* Order Main Info */}
                    <View style={styles.orderMainInfo}>
                      <View style={styles.orderIdRow}>
                        <Text style={styles.orderDisplayId}>#{item.displayId}</Text>
                        <View
                          style={[
                            styles.badgePill,
                            {
                              backgroundColor: isGreen ? '#D1FAE5' : '#EDE9FE',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.badgeText,
                              { color: isGreen ? '#059669' : '#6C3AE8' },
                            ]}>
                            {item.badge}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.productName} numberOfLines={1}>
                        {item.productName}
                      </Text>

                      <View style={styles.priceAndTransitRow}>
                        <Text style={styles.priceItems}>
                          ₹{item.amount} • {item.itemCount} Items
                        </Text>

                        {/* Animated Transit / Delivery Micro Badge */}
                        <View
                          style={[
                            styles.transitBadge,
                            { backgroundColor: isGreen ? '#DCFCE7' : '#F3E8FF' },
                          ]}>
                          <Animated.View style={{ transform: [{ scale: transitPulse }] }}>
                            {isGreen ? (
                              <Bike size={12} color="#059669" />
                            ) : (
                              <Store size={12} color="#6C3AE8" />
                            )}
                          </Animated.View>
                          <Text
                            style={[
                              styles.transitText,
                              { color: isGreen ? '#059669' : '#6C3AE8' },
                            ]}>
                            {isGreen ? 'Out for Delivery' : 'Ready at Store'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Divider */}
                  <View style={styles.cardDivider} />

                  {/* Location & Time Footer */}
                  <View style={styles.cardFooter}>
                    <View style={styles.locationWrap}>
                      <MapPin size={13} color="#6B7280" />
                      <Text style={styles.addressText} numberOfLines={1}>
                        {item.address} ({item.distance})
                      </Text>
                    </View>

                    <View style={styles.actionPrompt}>
                      <Text style={styles.viewDetailsText}>
                        {item.badge === 'Pick Up' ? 'Start Pickup' : 'Navigate'}
                      </Text>
                      <ChevronRight size={14} color="#6C3AE8" />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}

          {filtered.length === 0 && (
            <View style={styles.emptyBox}>
              <PackageCheck size={48} color="#9CA3AF" />
              <Text style={styles.emptyTitle}>No Orders Found</Text>
              <Text style={styles.emptySub}>Try searching with a different keyword or tab.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EEF9',
  },
  headerLogoWrap: {
    justifyContent: 'center',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeOrdersBadge: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  activeOrdersText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 95,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#111447',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    marginBottom: 14,
    gap: 4,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  tabItemActive: {
    backgroundColor: '#6C3AE8',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  ordersList: {
    gap: 12,
  },
  orderCardTouch: {
    borderRadius: 20,
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  orderCard: {
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
  },
  cardTopRow: {
    flexDirection: 'row',
    gap: 12,
  },
  foodThumb: {
    width: 68,
    height: 68,
    borderRadius: 14,
  },
  orderMainInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  orderDisplayId: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111447',
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 4,
  },
  priceAndTransitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  transitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 8,
  },
  transitText: {
    fontSize: 10,
    fontWeight: '800',
  },
  priceItems: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
    marginRight: 8,
  },
  addressText: {
    fontSize: 11,
    color: '#6B7280',
    flex: 1,
  },
  actionPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewDetailsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  emptyBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111447',
    marginTop: 12,
  },
  emptySub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
});
