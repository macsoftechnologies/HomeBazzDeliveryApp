import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import {
  ShoppingCart,
  CheckCircle2,
  CircleDollarSign,
  Gift,
  ShieldCheck,
  Zap,
  CheckCheck,
  ChevronRight,
  Bell,
  Clock,
} from 'lucide-react-native';

interface NotificationItem {
  id: string;
  category: 'orders' | 'earnings' | 'system';
  title: string;
  subtitle: string;
  time: string;
  icon: 'order' | 'delivery' | 'payout' | 'incentive' | 'kyc' | 'surge';
  unread?: boolean;
  route?: string;
  amountTag?: string;
}

const getNotificationTheme = (icon: NotificationItem['icon']) => {
  switch (icon) {
    case 'order':
      return {
        gradient: ['#FAF5FF', '#F3E8FF', '#EDE9FE'] as [string, string, ...string[]],
        border: '#A78BFA',
        iconBg: '#7C3AED',
        iconColor: '#FFFFFF',
        amountBg: '#DDD6FE',
        amountColor: '#4C1D95',
        accent: '#7C3AED',
      };
    case 'delivery':
      return {
        gradient: ['#F0FDF4', '#DCFCE7', '#BBF7D0'] as [string, string, ...string[]],
        border: '#34D399',
        iconBg: '#059669',
        iconColor: '#FFFFFF',
        amountBg: '#BBF7D0',
        amountColor: '#064E3B',
        accent: '#059669',
      };
    case 'payout':
      return {
        gradient: ['#F0FDFA', '#CCFBF1', '#99F6E4'] as [string, string, ...string[]],
        border: '#2DD4BF',
        iconBg: '#0D9488',
        iconColor: '#FFFFFF',
        amountBg: '#99F6E4',
        amountColor: '#134E4A',
        accent: '#0D9488',
      };
    case 'incentive':
      return {
        gradient: ['#FFFBEB', '#FEF3C7', '#FDE68A'] as [string, string, ...string[]],
        border: '#FBBF24',
        iconBg: '#D97706',
        iconColor: '#FFFFFF',
        amountBg: '#FDE68A',
        amountColor: '#78350F',
        accent: '#D97706',
      };
    case 'kyc':
      return {
        gradient: ['#F0F9FF', '#E0F2FE', '#BAE6FD'] as [string, string, ...string[]],
        border: '#38BDF8',
        iconBg: '#0284C7',
        iconColor: '#FFFFFF',
        amountBg: '#BAE6FD',
        amountColor: '#0C4A6E',
        accent: '#0284C7',
      };
    case 'surge':
      return {
        gradient: ['#FFF7ED', '#FFEDD5', '#FED7AA'] as [string, string, ...string[]],
        border: '#FB923C',
        iconBg: '#EA580C',
        iconColor: '#FFFFFF',
        amountBg: '#FED7AA',
        amountColor: '#7C2D12',
        accent: '#EA580C',
      };
    default:
      return {
        gradient: ['#FAF5FF', '#F3E8FF', '#EDE9FE'] as [string, string, ...string[]],
        border: '#C4B5FD',
        iconBg: '#6C3AE8',
        iconColor: '#FFFFFF',
        amountBg: '#EDE9FE',
        amountColor: '#6C3AE8',
        accent: '#6C3AE8',
      };
  }
};

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<'all' | 'orders' | 'earnings' | 'system'>('all');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      category: 'orders',
      title: 'New High Priority Order Assigned',
      subtitle: 'Order #HB123456 (3 items) is ready for pickup at HomeBazz Gourmet Store.',
      time: '2 mins ago',
      icon: 'order',
      unread: true,
      route: '/orders/details',
      amountTag: '₹720 Prepaid',
    },
    {
      id: 'n2',
      category: 'orders',
      title: 'Delivery Handover Confirmed',
      subtitle: 'Order #HB123451 was completed on time. Customer gave a 5.0 ★ rating!',
      time: '28 mins ago',
      icon: 'delivery',
      unread: true,
      route: '/delivery/success',
      amountTag: '+₹120 Pay',
    },
    {
      id: 'n3',
      category: 'earnings',
      title: 'Wallet Withdrawal Processed',
      subtitle: '₹1,240 transferred successfully to State Bank of India A/C ••••9012.',
      time: '1 hour ago',
      icon: 'payout',
      route: '/(tabs)/earnings',
      amountTag: '₹1,240 Sent',
    },
    {
      id: 'n4',
      category: 'earnings',
      title: 'Peak Hours Delivery Bonus Unlocked',
      subtitle: 'Great job! You achieved 10 completed orders today. ₹100 incentive added.',
      time: '2 hours ago',
      icon: 'incentive',
      route: '/earnings/payouts',
      amountTag: '+₹100 Bonus',
    },
    {
      id: 'n5',
      category: 'system',
      title: 'Partner KYC Documents Approved',
      subtitle: 'Your Aadhaar, PAN & Driving License are fully verified with HomeBazz Network.',
      time: 'Yesterday',
      icon: 'kyc',
      route: '/(tabs)/profile',
      amountTag: 'Verified ✓',
    },
    {
      id: 'n6',
      category: 'orders',
      title: 'Rain Surge Incentive Active',
      subtitle: 'Earn +₹25 extra per delivery in Beach Road and MVP Colony area.',
      time: 'Yesterday',
      icon: 'surge',
      route: '/(tabs)/home',
      amountTag: '+₹25/order',
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const filtered = notifications.filter((item) => {
    if (activeFilter === 'orders') return item.category === 'orders';
    if (activeFilter === 'earnings') return item.category === 'earnings';
    if (activeFilter === 'system') return item.category === 'system';
    return true;
  });

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      <Header
        title="Notifications"
        showBack
        rightAction={
          unreadCount > 0 ? (
            <TouchableOpacity
              style={styles.markReadBtn}
              onPress={handleMarkAllRead}
              activeOpacity={0.8}>
              <CheckCheck size={16} color="#6C3AE8" />
              <Text style={styles.markReadText}>Read All</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 40 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* Category Filters Bar */}
        <View style={styles.filterTabBar}>
          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'all' && styles.filterPillActive]}
            onPress={() => setActiveFilter('all')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'all' && styles.filterPillTextActive,
              ]}>
              All ({notifications.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'orders' && styles.filterPillActive]}
            onPress={() => setActiveFilter('orders')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'orders' && styles.filterPillTextActive,
              ]}>
              Orders (3)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'earnings' && styles.filterPillActive]}
            onPress={() => setActiveFilter('earnings')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'earnings' && styles.filterPillTextActive,
              ]}>
              Payouts (2)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'system' && styles.filterPillActive]}
            onPress={() => setActiveFilter('system')}
            activeOpacity={0.8}>
            <Text
              style={[
                styles.filterPillText,
                activeFilter === 'system' && styles.filterPillTextActive,
              ]}>
              Alerts (1)
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <View style={styles.list}>
          {filtered.map((item) => {
            const theme = getNotificationTheme(item.icon);
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.cardOuter}
                activeOpacity={0.85}
                onPress={() => {
                  if (item.route) router.push(item.route as any);
                }}>
                <LinearGradient
                  colors={theme.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.cardGradient,
                    { borderColor: theme.border },
                    item.unread && styles.cardUnreadShadow,
                  ]}>
                  {/* Icon Circle by Type */}
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: theme.iconBg },
                    ]}>
                    {item.icon === 'order' && <ShoppingCart size={20} color={theme.iconColor} />}
                    {item.icon === 'delivery' && <CheckCircle2 size={20} color={theme.iconColor} />}
                    {item.icon === 'payout' && <CircleDollarSign size={20} color={theme.iconColor} />}
                    {item.icon === 'incentive' && <Gift size={20} color={theme.iconColor} />}
                    {item.icon === 'kyc' && <ShieldCheck size={20} color={theme.iconColor} />}
                    {item.icon === 'surge' && <Zap size={20} color={theme.iconColor} />}
                  </View>

                  {/* Content Column */}
                  <View style={styles.textCol}>
                    <View style={styles.titleRow}>
                      <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                      </Text>
                      {item.amountTag && (
                        <View style={[styles.amountPill, { backgroundColor: theme.amountBg }]}>
                          <Text style={[styles.amountPillText, { color: theme.amountColor }]}>
                            {item.amountTag}
                          </Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.subtitle}>{item.subtitle}</Text>

                    <View style={styles.metaRow}>
                      <View style={styles.timeWrap}>
                        <Clock size={11} color="#6B7280" />
                        <Text style={styles.time}>{item.time}</Text>
                      </View>
                      <ChevronRight size={15} color={theme.iconBg} />
                    </View>
                  </View>

                  {/* Unread Glow Dot */}
                  {item.unread && (
                    <View style={[styles.unreadDot, { backgroundColor: theme.accent }]} />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}

          {filtered.length === 0 && (
            <View style={styles.emptyWrap}>
              <Bell size={42} color="#D1D5DB" />
              <Text style={styles.emptyTitle}>No Notifications</Text>
              <Text style={styles.emptySub}>You are all caught up with your updates.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  markReadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  scrollContent: {
    padding: 16,
  },
  filterTabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    marginBottom: 14,
    gap: 4,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  filterPillActive: {
    backgroundColor: '#6C3AE8',
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  list: {
    gap: 12,
  },
  cardOuter: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  cardGradient: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    position: 'relative',
  },
  cardUnreadShadow: {
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  textCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 6,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111447',
    flex: 1,
  },
  amountPill: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  amountPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  subtitle: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6C3AE8',
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
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
