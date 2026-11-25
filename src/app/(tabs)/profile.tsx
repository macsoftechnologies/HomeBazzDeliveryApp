import { HomeBazzLogo } from '@/components/common/HomeBazLogo';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { TabScreenLoader } from '@/components/common/TabScreenLoader';
import { useApp } from '@/context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import {
  Award,
  Bell,
  Bike,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  Lock,
  LogOut,
  Pencil,
  ShieldCheck,
  Sliders,
  Sparkles,
  Star,
  User,
} from 'lucide-react-native';
import { useEffect, useState, useCallback } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function MyProfileScreen() {
  const { partnerProfile, isOnline, setIsOnline } = useApp();

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

  // State for interactive modals
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState({
    title: 'Profile Updated!',
    subtitle: 'Your partner preferences and duty settings are now active.',
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Subtle pulsing animation for verified badge
  const [badgePulse] = useState(() => new Animated.Value(1));
  // Ambient glow scale animation for profile hero card
  const [pulseAnim] = useState(() => new Animated.Value(1));
  // Continuous diagonal flash shaded beam animation
  const [shimmerFlash] = useState(() => new Animated.Value(0));
  // Sparkling star particle twinkle animation
  const [sparkleAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Badge pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(badgePulse, {
          toValue: 1.06,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(badgePulse, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Ambient glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2400,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3. Shimmer flash light sweep
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerFlash, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.delay(1200),
        Animated.timing(shimmerFlash, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 4. Sparkle twinkle
    Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [badgePulse, pulseAnim, shimmerFlash, sparkleAnim]);

  const shimmerTranslateX = shimmerFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 440],
  });

  const sparkleScale = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1.25],
  });

  const sparkleRotate = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  const handleDutyToggle = (val: boolean) => {
    setIsOnline(val);
    setSuccessMessage({
      title: val ? 'You are Now Online! 🚀' : 'You are Now Offline 🌙',
      subtitle: val
        ? 'You will now receive nearby delivery pickup requests.'
        : 'Order assignments are paused. Take a well-deserved rest!',
    });
    setShowSuccessModal(true);
  };

  const handleQuickSave = () => {
    setSuccessMessage({
      title: 'Partner Profile Verified! ✨',
      subtitle: 'All KYC documents and bank credentials are 100% verified and active.',
    });
    setShowSuccessModal(true);
  };

  const menuItems = [
    {
      id: 'personal',
      title: 'Personal Details',
      subtitle: 'Name, phone, blood group & address',
      icon: User,
      route: '/auth/personal-details',
    },
    {
      id: 'vehicle',
      title: 'Vehicle Details',
      subtitle: 'Bike registration & driving license',
      icon: Bike,
      route: '/verification/vehicle-type',
    },
    {
      id: 'bank',
      title: 'Bank Account & Payouts',
      subtitle: 'State Bank of India (••••9012)',
      icon: Building2,
      route: '/verification/bank-details',
    },
    {
      id: 'preferences',
      title: 'Delivery Preferences',
      subtitle: 'Max radius, food & grocery categories',
      icon: Sliders,
      route: '/settings',
    },
    {
      id: 'password',
      title: 'Change Password & Security',
      subtitle: '2FA authentication and credentials',
      icon: Lock,
      route: '/profile/change-password',
    },
    {
      id: 'support',
      title: 'Help & 24/7 Support',
      subtitle: 'Emergency assistance & partner helpline',
      icon: HelpCircle,
      route: '/support',
    },
  ];

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      {/* Multi-Color Small Card Page Loader on Tab Navigation */}
      <TabScreenLoader visible={isTabLoading} tabName="profile" />

      {/* Top Header with HomeBazz Compact Logo and Notification Icon */}
      <View style={styles.topHeader}>
        <View style={styles.headerLogoWrap}>
          <HomeBazzLogo size="mini" showSubtitle={false} />
        </View>

        <View style={styles.headerRightButtons}>
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => router.push('/notifications')}
            activeOpacity={0.8}>
            <Bell size={18} color="#111447" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Identity Card with Radiant Gradient, Flash Sweep, and Ambient Glows */}
        <LinearGradient
          colors={['#240778', '#3C0F96', '#591EC4', '#7B3BF2', '#9F5CFF']}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 1, y: 0.95 }}
          style={styles.profileCard}>
          {/* Top-Right Radiant Diffusion Orb */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.profileGlowOrb,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />

          {/* Secondary Bottom-Left Ambient Halo */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.profileGlowOrb2,
              { transform: [{ scale: pulseAnim }] },
            ]}
          />

          {/* Continuous Diagonal Flash Shaded Sweep Light Beam */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.profileFlashBeamWrap,
              { transform: [{ translateX: shimmerTranslateX }, { rotate: '25deg' }] },
            ]}>
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0)',
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0.35)',
                'rgba(255, 255, 255, 0.70)',
                'rgba(255, 255, 255, 0.35)',
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0)',
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.profileFlashBeam}
            />
          </Animated.View>

          {/* Sparkling Stars Twinkle */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.profileSparkle1,
              {
                transform: [{ scale: sparkleScale }, { rotate: sparkleRotate }],
                opacity: sparkleOpacity,
              },
            ]}>
            <Sparkles size={16} color="#FFD700" />
          </Animated.View>

          <Animated.View
            pointerEvents="none"
            style={[
              styles.profileSparkle2,
              {
                transform: [{ scale: sparkleScale }, { rotate: sparkleRotate }],
                opacity: sparkleOpacity,
              },
            ]}>
            <Sparkles size={12} color="#38BDF8" />
          </Animated.View>

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarOuterWrap}>
              <LinearGradient
                colors={['#A78BFA', '#7C3AED']}
                style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>RK</Text>
              </LinearGradient>
              <TouchableOpacity
                style={styles.editPencilBadge}
                activeOpacity={0.8}
                onPress={() => router.push('/auth/personal-details')}>
                <Pencil size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{partnerProfile.name}</Text>
                <Animated.View
                  style={[
                    styles.verifiedPill,
                    { transform: [{ scale: badgePulse }] },
                  ]}>
                  <ShieldCheck size={11} color="#34D399" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </Animated.View>
              </View>

              <Text style={styles.userRole}>HomeBazz Express Rider</Text>
              <Text style={styles.userId}>Partner ID: #{partnerProfile.id}</Text>
            </View>
          </View>

          {/* Quick Stats Strip in Frosted Glass */}
          <View style={styles.statsStrip}>
            <View style={styles.statBox}>
              <View style={styles.statIconRow}>
                <Star size={13} color="#FBBF24" fill="#FBBF24" />
                <Text style={styles.statVal}>4.9</Text>
              </View>
              <Text style={styles.statSub}>Rating</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <View style={styles.statIconRow}>
                <Award size={13} color="#C4B5FD" />
                <Text style={styles.statVal}>1,248</Text>
              </View>
              <Text style={styles.statSub}>Deliveries</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <View style={styles.statIconRow}>
                <CheckCircle2 size={13} color="#34D399" />
                <Text style={styles.statVal}>99.4%</Text>
              </View>
              <Text style={styles.statSub}>On-Time</Text>
            </View>
          </View>

          {/* Online / Duty Status Toggle Switch in Frosted Glass */}
          <View style={styles.dutyCardRow}>
            <View style={styles.dutyTextWrap}>
              <View
                style={[
                  styles.dutyStatusDot,
                  { backgroundColor: isOnline ? '#10B981' : '#F87171' },
                ]}
              />
              <View>
                <Text style={styles.dutyStatusTitle}>
                  {isOnline ? 'Online • Accepting Orders' : 'Offline • Duty Off'}
                </Text>
                <Text style={styles.dutyStatusSub}>
                  {isOnline ? 'Visible to nearby stores' : 'Paused - Tap to go online'}
                </Text>
              </View>
            </View>
            <Switch
              value={isOnline}
              onValueChange={handleDutyToggle}
              trackColor={{ false: 'rgba(255, 255, 255, 0.3)', true: '#10B981' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </LinearGradient>

        {/* Quick KYC Status Banner */}
        <TouchableOpacity
          style={styles.kycBanner}
          activeOpacity={0.85}
          onPress={handleQuickSave}>
          <View style={styles.kycLeft}>
            <View style={styles.kycIconBg}>
              <ShieldCheck size={20} color="#7C3AED" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.kycTitle}>KYC Verification Complete</Text>
              <Text style={styles.kycSub}>Aadhaar, PAN & Driving License Approved</Text>
            </View>
          </View>
          <View style={styles.kycCheckBadge}>
            <Check size={12} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {/* Account Menu Items Card */}
        <View style={styles.menuCard}>
          <Text style={styles.menuGroupHeading}>ACCOUNT SETTINGS</Text>
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === menuItems.length - 1;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuRow, !isLast && styles.menuRowBorder]}
                activeOpacity={0.7}
                onPress={() => router.push(item.route as any)}>
                <View style={styles.menuIconBg}>
                  <Icon size={18} color="#6C3AE8" />
                </View>

                <View style={styles.menuCenter}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSub}>{item.subtitle}</Text>
                </View>

                <ChevronRight size={18} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout Action Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setShowLogoutModal(true)}
          activeOpacity={0.8}>
          <LogOut size={18} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out of Account</Text>
        </TouchableOpacity>

        {/* App Version Info */}
        <Text style={styles.versionText}>HomeBazz Express Partner v2.4.0 • Made with ❤️</Text>
      </ScrollView>

      {/* Interactive Success Feedback / Duty Status Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View
              style={[
                styles.modalSuccessIconCircle,
                { backgroundColor: isOnline ? '#ECFDF5' : '#FEF2F2' },
              ]}>
              {isOnline ? (
                <CheckCircle2 size={44} color="#10B981" />
              ) : (
                <Clock size={42} color="#EF4444" />
              )}
            </View>
            <Text style={styles.modalSuccessTitle}>{successMessage.title}</Text>
            <Text style={styles.modalSuccessSubtitle}>{successMessage.subtitle}</Text>

            <TouchableOpacity
              style={[
                styles.modalGotItBtn,
                { backgroundColor: isOnline ? '#6C3AE8' : '#374151' },
              ]}
              onPress={() => setShowSuccessModal(false)}
              activeOpacity={0.85}>
              <Text style={styles.modalGotItText}>Got It, Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Interactive Custom Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalLogoutIconCircle}>
              <LogOut size={36} color="#EF4444" />
            </View>
            <Text style={styles.modalSuccessTitle}>Sign Out?</Text>
            <Text style={styles.modalSuccessSubtitle}>
              Are you sure you want to log out of HomeBazz Express? You won{"'"}t receive order alerts until you sign back in.
            </Text>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.85}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmLogoutBtn}
                onPress={() => {
                  setShowLogoutModal(false);
                  router.replace('/auth/login');
                }}
                activeOpacity={0.85}>
                <Text style={styles.modalConfirmLogoutText}>Yes, Log Out</Text>
              </TouchableOpacity>
            </View>
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
  headerRightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 95,
  },
  profileCard: {
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },
  profileGlowOrb: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  profileGlowOrb2: {
    position: 'absolute',
    bottom: -45,
    left: -30,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(167, 139, 250, 0.22)',
  },
  profileFlashBeamWrap: {
    position: 'absolute',
    top: -80,
    bottom: -80,
    width: 75,
  },
  profileFlashBeam: {
    flex: 1,
    width: '100%',
  },
  profileSparkle1: {
    position: 'absolute',
    top: 14,
    right: 20,
  },
  profileSparkle2: {
    position: 'absolute',
    top: 44,
    right: 68,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarOuterWrap: {
    position: 'relative',
    marginRight: 14,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  editPencilBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  userName: {
    fontSize: 19,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#34D399',
  },
  userRole: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E9D5FF',
    marginTop: 2,
  },
  userId: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 1,
    fontWeight: '600',
  },
  statsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 16,
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statVal: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statSub: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  dutyCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  dutyTextWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  dutyStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dutyStatusTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dutyStatusSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 1,
  },
  kycBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3E8FF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    marginBottom: 16,
  },
  kycLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  kycIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kycTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5B21B6',
  },
  kycSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  kycCheckBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 16,
  },
  menuGroupHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginTop: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuCenter: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  menuSub: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },

  // Modal Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalSuccessIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalLogoutIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalSuccessTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111447',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSuccessSubtitle: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  modalGotItBtn: {
    width: '100%',
    backgroundColor: '#6C3AE8',
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalGotItText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  modalCancelBtn: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '700',
  },
  modalConfirmLogoutBtn: {
    flex: 1.2,
    backgroundColor: '#EF4444',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmLogoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
