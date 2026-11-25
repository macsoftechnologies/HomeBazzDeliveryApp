import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Colors } from '@/constants/theme';
import { Package } from 'lucide-react-native';

interface HistoryOrder {
  id: string;
  displayId: string;
  amount: number;
  itemsCount: number;
  date: string;
  status: 'Delivered' | 'Cancelled';
}

const HISTORY_ORDERS: HistoryOrder[] = [
  {
    id: 'h1',
    displayId: 'HB123449',
    amount: 720,
    itemsCount: 3,
    date: 'Nov 11, 2026, 06:20 PM',
    status: 'Delivered',
  },
  {
    id: 'h2',
    displayId: 'HB123448',
    amount: 300,
    itemsCount: 2,
    date: 'Nov 11, 2026, 04:10 PM',
    status: 'Delivered',
  },
  {
    id: 'h3',
    displayId: 'HB123447',
    amount: 950,
    itemsCount: 4,
    date: 'Nov 10, 2026, 08:45 PM',
    status: 'Delivered',
  },
  {
    id: 'h4',
    displayId: 'HB123446',
    amount: 470,
    itemsCount: 2,
    date: 'Nov 10, 2026, 02:15 PM',
    status: 'Cancelled',
  },
];

export default function OrderHistoryScreen() {
  const [filter, setFilter] = useState<'All' | 'Delivered' | 'Cancelled'>('All');

  const filtered = HISTORY_ORDERS.filter((o) => {
    if (filter === 'Delivered') return o.status === 'Delivered';
    if (filter === 'Cancelled') return o.status === 'Cancelled';
    return true;
  });

  return (
    <ScreenWrapper>
      <Header title="Order History" showBack />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(['All', 'Delivered', 'Cancelled'] as const).map((tab) => {
            const isActive = filter === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setFilter(tab)}
                activeOpacity={0.8}>
                <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Order Cards List */}
        <View style={styles.list}>
          {filtered.map((item) => {
            const isDelivered = item.status === 'Delivered';
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => router.push('/delivery/success')}>
                <View style={styles.cardLeft}>
                  <View style={styles.pickleThumb}>
                    <Package size={20} color="#D97706" />
                  </View>
                  <View style={styles.infoCol}>
                    <Text style={styles.orderId}>#{item.displayId}</Text>
                    <Text style={styles.summaryText}>
                      ₹{item.amount} • {item.itemsCount} items
                    </Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: isDelivered ? '#E8F8F0' : '#FDE8E8' },
                  ]}>
                  <Text
                    style={[
                      styles.statusBadgeText,
                      { color: isDelivered ? Colors.success : Colors.error },
                    ]}>
                    {item.status}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ECEAF5',
  },
  filterPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.secondaryText,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECEAF5',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pickleThumb: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primaryText,
  },
  summaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryText,
    marginTop: 2,
  },
  dateText: {
    fontSize: 11,
    color: Colors.secondaryText,
    marginTop: 3,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '800',
  },
});
