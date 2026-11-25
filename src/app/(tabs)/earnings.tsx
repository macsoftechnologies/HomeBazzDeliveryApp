import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { TabScreenLoader } from '@/components/common/TabScreenLoader';
import { HomeBazzLogo } from '@/components/common/HomeBazLogo';
import { useApp } from '@/context/AppContext';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  History,
  ShieldCheck,
  TrendingUp,
  Wallet,
  X,
  Gift,
  ArrowDownLeft,
  ChevronRight,
} from 'lucide-react-native';

// Ambient floating sparkles for festive earnings hero
const SPARKLE_PARTICLES = [
  { id: 1, top: 18, right: 34, size: 13, color: '#FFD700' },
  { id: 2, top: 46, left: 28, size: 11, color: '#38BDF8' },
  { id: 3, top: 95, right: 30, size: 12, color: '#34D399' },
  { id: 4, top: 140, left: 34, size: 10, color: '#F472B6' },
  { id: 5, top: 175, right: 54, size: 11, color: '#FBBF24' },
];

export default function EarningsOverviewScreen() {
  const { partnerProfile } = useApp();

  // Multi-color page transition loader on tab navigation
  const [isTabLoading, setIsTabLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsTabLoading(true);
      const timer = setTimeout(() => {
        setIsTabLoading(false);
      }, 550);
      return () => clearTimeout(timer);
    }, [])
  );

  // Local state for earnings and withdrawal
  const [balance, setBalance] = useState(1240);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('1240');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transferredAmount, setTransferredAmount] = useState(1240);

  // Active time period filter
  const [periodFilter, setPeriodFilter] = useState<'today' | 'week' | 'month'>('today');

  // Animations
  const [cardPulse] = useState(() => new Animated.Value(1));
  const [shimmerFlash] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Subtle card breathing pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(cardPulse, {
          toValue: 1.015,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(cardPulse, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Continuous shimmer flash beam sweep
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerFlash, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.delay(1400),
        Animated.timing(shimmerFlash, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [cardPulse, shimmerFlash]);

  const shimmerTranslateX = shimmerFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 480],
  });

  const handlePresetSelect = (amt: number) => {
    const safeAmt = Math.min(amt, balance);
    setWithdrawAmount(safeAmt.toString());
  };

  const handleExecuteWithdrawal = () => {
    const amt = parseFloat(withdrawAmount) || 0;
    if (amt <= 0 || amt > balance) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTransferredAmount(amt);
      setBalance((prev) => Math.max(0, prev - amt));
      setShowWithdrawModal(false);
      setShowSuccessModal(true);
    }, 700);
  };

  const payoutHistory = [
    {
      id: 'po_1',
      date: 'Yesterday, 09:30 PM',
      ref: 'HBW-72940',
      amount: 1420,
      bank: 'State Bank of India (••••9012)',
      mode: 'Instant IMPS',
      status: 'Paid',
    },
    {
      id: 'po_2',
      date: '22 Nov 2026, 08:15 PM',
      ref: 'HBW-72108',
      amount: 1850,
      bank: 'State Bank of India (••••9012)',
      mode: 'Instant IMPS',
      status: 'Paid',
    },
    {
      id: 'po_3',
      date: '21 Nov 2026, 09:00 PM',
      ref: 'HBW-71455',
      amount: 980,
      bank: 'State Bank of India (••••9012)',
      mode: 'UPI Instant',
      status: 'Paid',
    },
  ];

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      {/* Multi-Color Small Card Page Loader on Tab Navigation */}
      <TabScreenLoader visible={isTabLoading} tabName="earnings" />

      {/* Top Header with Compact Sleek Logo */}
      <View style={styles.topHeader}>
        <View style={styles.headerLogoWrap}>
          <HomeBazzLogo size="mini" showSubtitle={false} />
        </View>

        <View style={styles.headerRightActions}>
          <TouchableOpacity
            style={styles.payoutHistoryBtn}
            onPress={() => router.push('/earnings/payouts')}
            activeOpacity={0.8}>
            <History size={15} color="#6C3AE8" />
            <Text style={styles.payoutHistoryBtnText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* ======================================================== */}
        {/* 1. DYNAMIC SHIMMER BALANCE HERO CARD                     */}
        {/* ======================================================== */}
        <Animated.View style={{ transform: [{ scale: cardPulse }] }}>
          <View style={styles.heroCard}>
            <LinearGradient
              colors={['#170B3B', '#31104B', '#5122B8', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />

            {/* Flash Shimmer Beam Sweep */}
            <Animated.View
              pointerEvents="none"
              style={[
                styles.shimmerFlashWrap,
                { transform: [{ translateX: shimmerTranslateX }, { rotate: '25deg' }] },
              ]}>
              <LinearGradient
                colors={[
                  'rgba(255, 255, 255, 0)',
                  'rgba(255, 255, 255, 0.08)',
                  'rgba(255, 255, 255, 0.45)',
                  'rgba(255, 255, 255, 0.85)',
                  'rgba(255, 255, 255, 0.45)',
                  'rgba(255, 255, 255, 0.08)',
                  'rgba(255, 255, 255, 0)',
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.shimmerFlashBeam}
              />
            </Animated.View>

            {/* Ambient Sparkles */}
            {SPARKLE_PARTICLES.map((p) => (
              <View
                key={p.id}
                style={[
                  styles.sparkleDot,
                  {
                    top: p.top,
                    left: (p as any).left,
                    right: (p as any).right,
                    width: p.size,
                    height: p.size,
                    backgroundColor: p.color,
                  },
                ]}
              />
            ))}

            {/* Top Pill Row */}
            <View style={styles.todayPillRow}>
              <View style={styles.balanceTagWrap}>
                <Wallet size={12} color="#A78BFA" />
                <Text style={styles.todayLabel}>AVAILABLE PAYOUT BALANCE</Text>
              </View>

              <View style={styles.growthBadge}>
                <TrendingUp size={11} color="#10B981" />
                <Text style={styles.growthText}>+12.4% Today</Text>
              </View>
            </View>

            {/* Amount Row */}
            <View style={styles.amountDisplayRow}>
              <Text style={styles.rupeeHeroSign}>₹</Text>
              <Text style={styles.todayAmount}>
                {balance.toLocaleString('en-IN')}
              </Text>
              <View style={styles.readyBadge}>
                <ShieldCheck size={11} color="#34D399" />
                <Text style={styles.readyBadgeText}>Instant IMPS</Text>
              </View>
            </View>

            <Text style={styles.heroSubtext}>
              Zero commission deducted • 100% earnings go directly to your account
            </Text>

            {/* Quick Metrics Inside Hero */}
            <View style={styles.heroStatsRow}>
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatLabel}>Orders</Text>
                <Text style={styles.heroStatVal}>10 Done</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatLabel}>Surge Pay</Text>
                <Text style={[styles.heroStatVal, { color: '#34D399' }]}>+₹220</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatLabel}>Customer Tips</Text>
                <Text style={[styles.heroStatVal, { color: '#FCD34D' }]}>+₹100</Text>
              </View>
            </View>

            {/* Action Buttons Row Inside Hero */}
            <View style={styles.heroActionBtnsRow}>
              <TouchableOpacity
                style={styles.primaryWithdrawBtn}
                activeOpacity={0.85}
                onPress={() => setShowWithdrawModal(true)}>
                <CircleDollarSign size={16} color="#4C1D95" />
                <Text style={styles.primaryWithdrawText}>Withdraw to Bank</Text>
                <ArrowUpRight size={15} color="#4C1D95" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBankBtn}
                activeOpacity={0.85}
                onPress={() => router.push('/profile/bank-account')}>
                <Building2 size={15} color="#FFFFFF" />
                <Text style={styles.secondaryBankText}>Bank Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* ======================================================== */}
        {/* 2. WEEKLY INCENTIVE MILESTONE TARGET CARD                */}
        {/* ======================================================== */}
        <View style={styles.milestoneCard}>
          <View style={styles.milestoneHeader}>
            <View style={styles.giftIconWrap}>
              <Gift size={18} color="#D97706" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.milestoneTitleRow}>
                <Text style={styles.milestoneTitle}>Weekly Milestone Bonus</Text>
                <View style={styles.bonusPill}>
                  <Text style={styles.bonusPillText}>+₹500 Extra</Text>
                </View>
              </View>
              <Text style={styles.milestoneSub}>
                Complete 20 deliveries by Sunday to unlock incentive
              </Text>
            </View>
          </View>

          <View style={styles.milestoneProgressWrap}>
            <View style={styles.milestoneProgressLabels}>
              <Text style={styles.milestoneStepText}>18 / 20 Deliveries</Text>
              <Text style={styles.milestoneRemainText}>2 more orders to win!</Text>
            </View>
            <View style={styles.milestoneTrack}>
              <View style={[styles.milestoneFill, { width: '90%' }]} />
            </View>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 3. 3-PERIOD STATS CARDS (Today / This Week / This Month) */}
        {/* ======================================================== */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>EARNINGS SUMMARY</Text>
          <Text style={styles.sectionSubRight}>Updated Just Now</Text>
        </View>

        <View style={styles.periodStatsRow}>
          {/* Card 1: Today */}
          <TouchableOpacity
            style={[
              styles.periodStatCard,
              periodFilter === 'today' && styles.periodStatCardActive,
            ]}
            onPress={() => setPeriodFilter('today')}
            activeOpacity={0.8}>
            <View style={styles.periodCardTop}>
              <Text style={styles.periodCardLabel}>Today</Text>
              <View style={[styles.periodDot, { backgroundColor: '#10B981' }]} />
            </View>
            <Text style={styles.periodCardAmount}>₹1,240</Text>
            <Text style={styles.periodCardSub}>10 Orders</Text>
          </TouchableOpacity>

          {/* Card 2: This Week */}
          <TouchableOpacity
            style={[
              styles.periodStatCard,
              periodFilter === 'week' && styles.periodStatCardActive,
            ]}
            onPress={() => setPeriodFilter('week')}
            activeOpacity={0.8}>
            <View style={styles.periodCardTop}>
              <Text style={styles.periodCardLabel}>This Week</Text>
              <View style={[styles.periodDot, { backgroundColor: '#7C3AED' }]} />
            </View>
            <Text style={styles.periodCardAmount}>
              ₹{partnerProfile.thisWeekEarnings || '4,680'}
            </Text>
            <Text style={styles.periodCardSub}>38 Orders</Text>
          </TouchableOpacity>

          {/* Card 3: This Month */}
          <TouchableOpacity
            style={[
              styles.periodStatCard,
              periodFilter === 'month' && styles.periodStatCardActive,
            ]}
            onPress={() => setPeriodFilter('month')}
            activeOpacity={0.8}>
            <View style={styles.periodCardTop}>
              <Text style={styles.periodCardLabel}>This Month</Text>
              <View style={[styles.periodDot, { backgroundColor: '#F59E0B' }]} />
            </View>
            <Text style={styles.periodCardAmount}>
              ₹{partnerProfile.thisMonthEarnings || '18,450'}
            </Text>
            <Text style={styles.periodCardSub}>142 Orders</Text>
          </TouchableOpacity>
        </View>

        {/* ======================================================== */}
        {/* 4. EARNINGS COMPOSITION BREAKDOWN                        */}
        {/* ======================================================== */}
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownHeaderRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <CircleDollarSign size={16} color="#6C3AE8" />
              <Text style={styles.cardMainTitle}>Today{"'"}s Earning Breakdown</Text>
            </View>
            <View style={styles.ordersBadgeMini}>
              <Text style={styles.ordersBadgeMiniText}>10 Deliveries</Text>
            </View>
          </View>

          {/* Breakdown Items */}
          <View style={styles.breakdownList}>
            <View style={styles.breakdownItemRow}>
              <View style={styles.breakdownItemLeft}>
                <View style={[styles.colorDot, { backgroundColor: '#6C3AE8' }]} />
                <View>
                  <Text style={styles.breakdownItemTitle}>Base Delivery Pay</Text>
                  <Text style={styles.breakdownItemSub}>₹92 avg per completed trip</Text>
                </View>
              </View>
              <Text style={styles.breakdownItemValue}>₹920</Text>
            </View>

            <View style={styles.breakdownItemRow}>
              <View style={styles.breakdownItemLeft}>
                <View style={[styles.colorDot, { backgroundColor: '#10B981' }]} />
                <View>
                  <Text style={styles.breakdownItemTitle}>Peak Hours & Rain Surge</Text>
                  <Text style={styles.breakdownItemSub}>Evening dinner rush bonus</Text>
                </View>
              </View>
              <Text style={[styles.breakdownItemValue, { color: '#059669' }]}>+ ₹220</Text>
            </View>

            <View style={styles.breakdownItemRow}>
              <View style={styles.breakdownItemLeft}>
                <View style={[styles.colorDot, { backgroundColor: '#F59E0B' }]} />
                <View>
                  <Text style={styles.breakdownItemTitle}>Customer Tips</Text>
                  <Text style={styles.breakdownItemSub}>100% credited to partner</Text>
                </View>
              </View>
              <Text style={[styles.breakdownItemValue, { color: '#D97706' }]}>+ ₹100</Text>
            </View>

            <View style={styles.breakdownItemRow}>
              <View style={styles.breakdownItemLeft}>
                <View style={[styles.colorDot, { backgroundColor: '#94A3B8' }]} />
                <View>
                  <Text style={styles.breakdownItemTitle}>Platform Fee & Commission</Text>
                  <Text style={styles.breakdownItemSub}>0% Promo rate applied</Text>
                </View>
              </View>
              <Text style={styles.breakdownItemFree}>₹0 (Free)</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Total Row */}
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>Total Net Earnings</Text>
              <Text style={styles.totalSub}>Ready for payout</Text>
            </View>
            <Text style={styles.totalValue}>₹{balance.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        {/* ======================================================== */}
        {/* 5. PRIMARY BANK ACCOUNT CARD                             */}
        {/* ======================================================== */}
        <TouchableOpacity
          style={styles.bankCard}
          onPress={() => router.push('/profile/bank-account')}
          activeOpacity={0.85}>
          <View style={styles.bankLeft}>
            <View style={styles.bankIconBg}>
              <Building2 size={20} color="#6C3AE8" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.bankName}>State Bank of India</Text>
                <View style={styles.primaryBadge}>
                  <Text style={styles.primaryText}>Primary A/C</Text>
                </View>
              </View>
              <Text style={styles.bankAcc}>
                A/C: •••••••• 9012 • IFSC: SBIN0001420
              </Text>
              <Text style={styles.upiSub}>UPI: rajesh.kumar@oksbi</Text>
            </View>
          </View>

          <View style={styles.bankRightPill}>
            <ShieldCheck size={14} color="#059669" />
            <Text style={styles.bankRightText}>Verified</Text>
          </View>
        </TouchableOpacity>

        {/* ======================================================== */}
        {/* 6. RECENT PAYOUTS & TRANSFERS LIST                       */}
        {/* ======================================================== */}
        <View style={styles.historyCard}>
          <View style={styles.historyCardHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <History size={16} color="#6C3AE8" />
              <Text style={styles.cardMainTitle}>Recent Bank Payouts</Text>
            </View>

            <TouchableOpacity
              onPress={() => router.push('/earnings/payouts')}
              activeOpacity={0.75}
              style={styles.viewAllBtn}>
              <Text style={styles.viewAllText}>View All History</Text>
              <ChevronRight size={13} color="#6C3AE8" />
            </TouchableOpacity>
          </View>

          {payoutHistory.map((item, idx) => (
            <View
              key={item.id}
              style={[
                styles.historyRow,
                idx !== payoutHistory.length - 1 && styles.historyRowBorder,
              ]}>
              <View style={styles.historyLeft}>
                <View style={styles.transferIconCircle}>
                  <ArrowDownLeft size={16} color="#059669" />
                </View>
                <View>
                  <Text style={styles.historyDate}>{item.date}</Text>
                  <Text style={styles.historyRef}>Ref: {item.ref} • {item.mode}</Text>
                </View>
              </View>

              <View style={styles.historyRight}>
                <Text style={styles.historyAmt}>+₹{item.amount.toLocaleString('en-IN')}</Text>
                <View style={styles.historyPaidBadge}>
                  <CheckCircle2 size={10} color="#059669" />
                  <Text style={styles.historyPaidText}>Transferred</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ======================================================== */}
      {/* 7. INTERACTIVE WITHDRAW BOTTOM SHEET MODAL               */}
      {/* ======================================================== */}
      <Modal
        visible={showWithdrawModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWithdrawModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.withdrawModalCard}>
            <View style={styles.modalDragHandle} />

            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Instant Bank Withdrawal</Text>
              <TouchableOpacity
                onPress={() => setShowWithdrawModal(false)}
                style={styles.closeBtn}>
                <X size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSub}>
              Available balance:{' '}
              <Text style={{ fontWeight: '800', color: '#111447' }}>
                ₹{balance.toLocaleString('en-IN')}
              </Text>
            </Text>

            {/* Input Amount */}
            <View style={styles.amountInputWrap}>
              <Text style={styles.rupeeSymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                value={withdrawAmount}
                onChangeText={setWithdrawAmount}
                placeholder="0"
                selectionColor="#6C3AE8"
              />
            </View>

            {/* Quick Preset Chips */}
            <View style={styles.presetChipsRow}>
              {[500, 1000, balance].map((amt) => (
                <TouchableOpacity
                  key={amt}
                  style={[
                    styles.chip,
                    withdrawAmount === amt.toString() && styles.chipActive,
                  ]}
                  onPress={() => handlePresetSelect(amt)}>
                  <Text
                    style={[
                      styles.chipText,
                      withdrawAmount === amt.toString() && styles.chipTextActive,
                    ]}>
                    {amt === balance ? `Full (₹${balance})` : `₹${amt}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Target Account Info */}
            <View style={styles.targetBankBox}>
              <Building2 size={20} color="#6C3AE8" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.targetBankName}>State Bank of India (Primary)</Text>
                <Text style={styles.targetBankAcc}>
                  A/C: •••••••• 9012 • Instant IMPS (Free)
                </Text>
              </View>
              <CheckCircle2 size={16} color="#10B981" />
            </View>

            {/* Action Button */}
            <TouchableOpacity
              style={styles.submitWithdrawBtn}
              onPress={handleExecuteWithdrawal}
              disabled={isProcessing}
              activeOpacity={0.85}>
              <Text style={styles.submitWithdrawText}>
                {isProcessing
                  ? 'Processing Transfer...'
                  : `Transfer ₹${withdrawAmount || 0} to Bank Now`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ======================================================== */}
      {/* 8. INTERACTIVE SUCCESS MODAL                             */}
      {/* ======================================================== */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}>
        <View style={styles.modalBackdropCenter}>
          <View style={styles.successModalCard}>
            <View style={styles.successIconCircle}>
              <CheckCircle2 size={46} color="#10B981" />
            </View>

            <Text style={styles.successTitle}>Withdrawal Initiated!</Text>
            <Text style={styles.successSubtitle}>
              ₹{transferredAmount.toLocaleString('en-IN')} has been sent to State Bank of India A/C ••••9012. Expected in your account within 2-5 minutes.
            </Text>

            <View style={styles.refBox}>
              <Text style={styles.refLabel}>TRANSACTION REFERENCE</Text>
              <Text style={styles.refVal}>HBW-9482103</Text>
            </View>

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => setShowSuccessModal(false)}
              activeOpacity={0.85}>
              <Text style={styles.doneBtnText}>Back to Earnings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    gap: 8,
  },
  payoutHistoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  payoutHistoryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 95,
  },

  // 1. Hero Card Styles
  heroCard: {
    borderRadius: 24,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(167, 139, 250, 0.4)',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 8,
  },
  shimmerFlashWrap: {
    position: 'absolute',
    top: -100,
    bottom: -100,
    width: 90,
  },
  shimmerFlashBeam: {
    flex: 1,
  },
  sparkleDot: {
    position: 'absolute',
    borderRadius: 8,
    zIndex: 1,
  },
  todayPillRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceTagWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  todayLabel: {
    fontSize: 10.5,
    color: '#DDD6FE',
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.35)',
  },
  growthText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#34D399',
  },
  amountDisplayRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  rupeeHeroSign: {
    fontSize: 26,
    fontWeight: '800',
    color: '#A78BFA',
    marginRight: 4,
  },
  todayAmount: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  readyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#34D399',
  },
  heroSubtext: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: 14,
    lineHeight: 15,
  },
  heroStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  heroStatItem: {
    alignItems: 'center',
  },
  heroStatLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '700',
    marginBottom: 2,
  },
  heroStatVal: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  heroStatDivider: {
    width: 1,
    height: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  heroActionBtnsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  primaryWithdrawBtn: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryWithdrawText: {
    color: '#4C1D95',
    fontSize: 13,
    fontWeight: '800',
  },
  secondaryBankBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryBankText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '700',
  },

  // 2. Milestone Card
  milestoneCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    shadowColor: '#D97706',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  giftIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  milestoneTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  milestoneTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#92400E',
  },
  bonusPill: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  bonusPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  milestoneSub: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
  milestoneProgressWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  milestoneProgressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  milestoneStepText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#92400E',
  },
  milestoneRemainText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#D97706',
  },
  milestoneTrack: {
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FEF3C7',
    overflow: 'hidden',
  },
  milestoneFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#F59E0B',
  },

  // 3. Period Stats
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  sectionSubRight: {
    fontSize: 10.5,
    color: '#94A3B8',
    fontWeight: '600',
  },
  periodStatsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  periodStatCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  periodStatCardActive: {
    borderColor: '#7C3AED',
    backgroundColor: '#FAF5FF',
  },
  periodCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  periodCardLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '700',
  },
  periodDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  periodCardAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111447',
  },
  periodCardSub: {
    fontSize: 10.5,
    color: '#9CA3AF',
    marginTop: 2,
    fontWeight: '600',
  },

  // 4. Breakdown Card
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 16,
  },
  breakdownHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardMainTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111447',
  },
  ordersBadgeMini: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  ordersBadgeMiniText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  breakdownList: {
    gap: 12,
  },
  breakdownItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  breakdownItemTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  breakdownItemSub: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 1,
  },
  breakdownItemValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111447',
  },
  breakdownItemFree: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111447',
  },
  totalSub: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 1,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#6C3AE8',
  },

  // 5. Bank Card
  bankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    marginBottom: 16,
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  bankLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  bankIconBg: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111447',
  },
  primaryBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
  },
  primaryText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#059669',
  },
  bankAcc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  upiSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  bankRightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  bankRightText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#059669',
  },

  // 6. History Card
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    marginBottom: 14,
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  historyRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  transferIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyDate: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  historyRef: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 2,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyAmt: {
    fontSize: 14,
    fontWeight: '900',
    color: '#059669',
  },
  historyPaidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
    marginTop: 2,
  },
  historyPaidText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#059669',
  },

  // 7. Modals
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  modalDragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginBottom: 14,
  },
  withdrawModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111447',
  },
  closeBtn: {
    padding: 4,
  },
  modalSub: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
  },
  amountInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F7FF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#7C3AED',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  rupeeSymbol: {
    fontSize: 26,
    fontWeight: '800',
    color: '#6C3AE8',
    marginRight: 6,
  },
  amountInput: {
    flex: 1,
    fontSize: 26,
    fontWeight: '900',
    color: '#111447',
  },
  presetChipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: '#EDE9FE',
    borderWidth: 1.5,
    borderColor: '#7C3AED',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  chipTextActive: {
    color: '#6C3AE8',
    fontWeight: '800',
  },
  targetBankBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F7FF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  targetBankName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111447',
  },
  targetBankAcc: {
    fontSize: 10.5,
    color: '#6B7280',
    marginTop: 1,
  },
  submitWithdrawBtn: {
    backgroundColor: '#6C3AE8',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitWithdrawText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  // Success Modal
  modalBackdropCenter: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successModalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  successIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111447',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 12.5,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  refBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  refLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.6,
  },
  refVal: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111447',
    marginTop: 2,
  },
  doneBtn: {
    width: '100%',
    backgroundColor: '#6C3AE8',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});
