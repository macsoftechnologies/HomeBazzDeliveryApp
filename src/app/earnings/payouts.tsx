import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Colors } from '@/constants/theme';
import { ArrowDownLeft } from 'lucide-react-native';

interface PayoutItem {
  id: string;
  amount: number;
  date: string;
  bank: string;
  status: 'paid' | 'pending' | 'failed';
  refId: string;
}

const PAYOUTS: PayoutItem[] = [
  {
    id: 'pay_1',
    amount: 5000,
    date: '18 Nov, 2026',
    bank: 'State Bank of India (****9012)',
    status: 'paid',
    refId: 'UTR9384729104',
  },
  {
    id: 'pay_2',
    amount: 4320,
    date: '11 Nov, 2026',
    bank: 'State Bank of India (****9012)',
    status: 'paid',
    refId: 'UTR8492048291',
  },
  {
    id: 'pay_3',
    amount: 3000,
    date: '04 Nov, 2026',
    bank: 'State Bank of India (****9012)',
    status: 'paid',
    refId: 'UTR7392019482',
  },
  {
    id: 'pay_4',
    amount: 2500,
    date: '28 Oct, 2026',
    bank: 'State Bank of India (****9012)',
    status: 'failed',
    refId: 'FAIL_IFSC_RETRY',
  },
];

export default function PayoutHistoryScreen() {
  return (
    <ScreenWrapper scrollable>
      <Header title="Payout History" showBack />

      <View style={styles.content}>
        {/* Total Settled Banner */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Settled Payouts</Text>
          <Text style={styles.summaryVal}>₹14,820</Text>
          <Text style={styles.summarySub}>Automated weekly transfers every Monday 06:00 AM</Text>
        </View>

        <Text style={styles.listHeading}>Past Transfers</Text>

        <View style={styles.list}>
          {PAYOUTS.map((item) => {
            const isPaid = item.status === 'paid';
            const isFailed = item.status === 'failed';
            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardLeft}>
                  <View
                    style={[
                      styles.iconCircle,
                      isPaid
                        ? styles.paidBg
                        : isFailed
                        ? styles.failedBg
                        : styles.pendingBg,
                    ]}>
                    <ArrowDownLeft
                      size={20}
                      color={
                        isPaid
                          ? Colors.success
                          : isFailed
                          ? Colors.error
                          : Colors.warning
                      }
                    />
                  </View>
                  <View>
                    <Text style={styles.amountText}>₹{item.amount.toLocaleString()}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.bankText}>{item.bank}</Text>
                  </View>
                </View>

                <View style={styles.cardRight}>
                  <View
                    style={[
                      styles.statusBadge,
                      isPaid
                        ? styles.paidBadge
                        : isFailed
                        ? styles.failedBadge
                        : styles.pendingBadge,
                    ]}>
                    <Text
                      style={[
                        styles.statusBadgeText,
                        isPaid
                          ? styles.paidText
                          : isFailed
                          ? styles.failedText
                          : styles.pendingText,
                      ]}>
                      {item.status.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.refText}>{item.refId}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 18,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  summaryLabel: {
    fontSize: 13,
    color: Colors.secondaryText,
    fontWeight: '600',
  },
  summaryVal: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.primaryText,
    marginTop: 4,
  },
  summarySub: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 6,
  },
  listHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primaryText,
    marginBottom: 12,
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
    borderColor: Colors.borderLight,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paidBg: {
    backgroundColor: Colors.successBg,
  },
  failedBg: {
    backgroundColor: Colors.errorBg,
  },
  pendingBg: {
    backgroundColor: Colors.warningBg,
  },
  amountText: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.primaryText,
  },
  dateText: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 2,
  },
  bankText: {
    fontSize: 11,
    color: Colors.secondaryText,
    marginTop: 1,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  paidBadge: {
    backgroundColor: Colors.successBg,
  },
  failedBadge: {
    backgroundColor: Colors.errorBg,
  },
  pendingBadge: {
    backgroundColor: Colors.warningBg,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  paidText: {
    color: Colors.success,
  },
  failedText: {
    color: Colors.error,
  },
  pendingText: {
    color: Colors.warning,
  },
  refText: {
    fontSize: 10,
    color: Colors.secondaryText,
    marginTop: 4,
  },
});
