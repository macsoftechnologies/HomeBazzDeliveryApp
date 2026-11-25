import { GradientButton } from '@/components/common/GradientButton';
import { Header } from '@/components/common/Header';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { SuccessToast } from '@/components/common/SuccessToast';
import { useApp } from '@/context/AppContext';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import {
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  DoorOpen,
  FolderOpen,
  MapPin,
  Package,
  Phone,
  RotateCcw,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Trash2,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CRACKER_PARTICLES = [
  { id: 1, top: 10, right: 34, size: 13, color: '#FFD700' },
  { id: 2, top: 30, left: 32, size: 11, color: '#38BDF8' },
  { id: 3, bottom: 20, right: 28, size: 12, color: '#34D399' },
  { id: 4, bottom: 24, left: 36, size: 10, color: '#F472B6' },
  { id: 5, top: 60, right: 18, size: 9, color: '#F59E0B' },
];

export default function CompleteDeliveryScreen() {
  const { verifyDelivery, activeOrder } = useApp();
  const insets = useSafeAreaInsets();

  const [digits, setDigits] = useState(['4', '2', '9', '6']);
  const [contactlessDrop, setContactlessDrop] = useState(false);
  const [error, setError] = useState('');
  const [resendSent, setResendSent] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Doorstep delivery photo state
  const [doorstepPhoto, setDoorstepPhoto] = useState<{
    uri: string;
    name: string;
    size: string;
  } | null>(null);
  const [showPhotoSection, setShowPhotoSection] = useState(false);

  // Sparkle twinkle and parcel pulse animation
  const [animVal] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animVal, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(animVal, {
          toValue: 0,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [animVal]);

  const sparkleScale = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1.25],
  });
  const parcelScale = animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const handleDigitChange = (val: string, index: number) => {
    const next = [...digits];
    next[index] = val;
    setDigits(next);
  };

  const handleResend = () => {
    setResendSent(true);
    setTimeout(() => setResendSent(false), 3000);
  };

  const handleCallCustomer = () => {
    Linking.openURL(`tel:${activeOrder?.customerPhone || '+919876543210'}`);
  };

  const handlePickLocalImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const name = asset.fileName || 'Doorstep_Delivery_Proof.jpg';
        const size = asset.fileSize
          ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : '1.4 MB';
        setDoorstepPhoto({ uri: asset.uri, name, size });
        setShowPhotoSection(false);
      }
    } catch {
      Alert.alert(
        'File Access Error',
        'Unable to browse device photos. Please check storage permissions.'
      );
    }
  };

  const handleLaunchCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission Required',
          'Camera access is needed to capture delivery proof photos.'
        );
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const name = asset.fileName || 'Camera_Doorstep_Proof.jpg';
        const size = asset.fileSize
          ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : '1.2 MB';
        setDoorstepPhoto({ uri: asset.uri, name, size });
        setShowPhotoSection(false);
      }
    } catch {
      Alert.alert('Camera Error', 'Could not open camera.');
    }
  };

  const handleUseDemoPhoto = () => {
    setDoorstepPhoto({
      uri: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
      name: 'Doorstep_Parcel_Proof.jpg',
      size: '1.3 MB',
    });
    setShowPhotoSection(false);
  };

  const handleComplete = () => {
    const code = digits.join('');
    if (code.length === 4) {
      verifyDelivery(code);
      setShowSuccessToast(true);
      setTimeout(() => {
        router.replace('/delivery/success');
      }, 1100);
    } else {
      setError('Please enter the 4-digit OTP provided by customer');
    }
  };

  const orderThumb =
    (activeOrder as any)?.image || require('@/assets/images/Food/Food1.jpg');

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#F8F7FF">
      <SuccessToast
        visible={showSuccessToast}
        title="Delivery Completed!"
        message="Handover confirmed. Payout has been credited to your wallet!"
        type="success"
      />

      <Header title="Customer Delivery Handover" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 95 },
        ]}
        showsVerticalScrollIndicator={false}>
        {/* 1. Customer & Product Summary Card with Quick Call Action */}
        <View style={styles.customerCard}>
          <Image source={orderThumb} style={styles.productThumb} resizeMode="cover" />

          <View style={styles.customerMetaCol}>
            <View style={styles.orderIdRow}>
              <Text style={styles.orderIdText}>#{activeOrder?.id || 'HB123456'}</Text>
              <View style={styles.prepaidBadge}>
                <CircleCheck size={10} color="#059669" />
                <Text style={styles.prepaidBadgeText}>Prepaid Order</Text>
              </View>
            </View>

            <Text style={styles.customerName}>
              {activeOrder?.customerName || 'Sankar Rao'}
            </Text>

            <View style={styles.addressRow}>
              <MapPin size={11} color="#6C3AE8" />
              <Text style={styles.customerAddress} numberOfLines={1}>
                {activeOrder?.customerAddress || '12-4-45, Oceanview Apts, Beach Road'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.callCircleBtn}
            onPress={handleCallCustomer}
            activeOpacity={0.8}>
            <Phone size={18} color="#6C3AE8" />
          </TouchableOpacity>
        </View>

        {/* 2. Festive Centerpiece with Delivery Box & Sparkles */}
        <View style={styles.centerHero}>
          {CRACKER_PARTICLES.map((p) => (
            <Animated.View
              key={p.id}
              style={[
                styles.sparkleDot,
                {
                  top: p.top,
                  left: (p as any).left,
                  right: (p as any).right,
                  bottom: (p as any).bottom,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  transform: [{ scale: sparkleScale }],
                },
              ]}
            />
          ))}

          <View style={styles.boxGlowRing}>
            <Animated.View
              style={[
                styles.parcelBox,
                { transform: [{ scale: parcelScale }] },
              ]}>
              <Package size={52} color="#D97706" />
              <View style={styles.checkBadge}>
                <Check size={18} color="#FFFFFF" strokeWidth={3} />
              </View>
            </Animated.View>
          </View>

          <Text style={styles.headingTitle}>Customer Delivery OTP</Text>
          <Text style={styles.subtitle}>
            Ask {activeOrder?.customerName || 'customer'} for the 4-digit code shown on their HomeBazz app or SMS.
          </Text>
        </View>

        {/* 3. 4-Digit OTP Input Card */}
        <View style={styles.card}>
          <Text style={styles.cardOtpLabel}>ENTER 4-DIGIT VERIFICATION CODE</Text>
          <View style={styles.otpRow}>
            {digits.map((digit, idx) => (
              <TextInput
                key={idx}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                ]}
                value={digit}
                onChangeText={(text) => handleDigitChange(text, idx)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Resend Code Link */}
          <View style={styles.resendRow}>
            <TouchableOpacity
              onPress={handleResend}
              style={styles.resendBtn}
              activeOpacity={0.75}>
              <RotateCcw size={13} color="#6C3AE8" />
              <Text style={styles.resendText}>
                {resendSent ? 'Code Resent to Customer ✓' : 'Resend Code via SMS'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 4. Delivery Proof Options: Local Photo Upload & Contactless Drop */}
          <View style={styles.proofOptionsWrap}>
            {/* Doorstep Photo Section */}
            <View style={styles.photoContainerCard}>
              <TouchableOpacity
                style={[
                  styles.photoHeaderRow,
                  doorstepPhoto && styles.photoHeaderRowActive,
                ]}
                onPress={() => setShowPhotoSection(!showPhotoSection)}
                activeOpacity={0.8}>
                <View style={styles.photoHeaderLeft}>
                  <View
                    style={[
                      styles.photoHeaderIconWrap,
                      doorstepPhoto && { backgroundColor: '#ECFDF5' },
                    ]}>
                    <Camera
                      size={18}
                      color={doorstepPhoto ? '#059669' : '#6C3AE8'}
                    />
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.photoHeaderTitle,
                        doorstepPhoto && { color: '#059669' },
                      ]}>
                      {doorstepPhoto
                        ? 'Doorstep Photo Attached ✓'
                        : 'Take Doorstep Photo (Proof)'}
                    </Text>
                    <Text style={styles.photoHeaderSub}>
                      {doorstepPhoto
                        ? 'Image verified for contactless delivery'
                        : 'Local device file access & camera'}
                    </Text>
                  </View>
                </View>

                {doorstepPhoto ? (
                  <View style={styles.attachedPill}>
                    <CheckCircle2 size={12} color="#059669" />
                    <Text style={styles.attachedPillText}>Attached</Text>
                  </View>
                ) : (
                  <View style={styles.expandArrow}>
                    {showPhotoSection ? (
                      <ChevronUp size={18} color="#6C3AE8" />
                    ) : (
                      <ChevronDown size={18} color="#6C3AE8" />
                    )}
                  </View>
                )}
              </TouchableOpacity>

              {/* Photo Preview when an image is attached */}
              {doorstepPhoto && (
                <View style={styles.previewBox}>
                  <View style={styles.previewImageWrap}>
                    <Image
                      source={{ uri: doorstepPhoto.uri }}
                      style={styles.previewImage}
                      resizeMode="cover"
                    />
                    <View style={styles.previewOverlayBadge}>
                      <Text style={styles.previewOverlayText}>
                        DOORSTEP DROP PROOF
                      </Text>
                    </View>
                  </View>

                  <View style={styles.fileDetailsRow}>
                    <Text style={styles.fileNameText} numberOfLines={1}>
                      {doorstepPhoto.name}
                    </Text>
                    <Text style={styles.fileSizeText}>
                      {doorstepPhoto.size}
                    </Text>
                  </View>

                  {/* Actions: Replace / Remove */}
                  <View style={styles.photoActionsRow}>
                    <TouchableOpacity
                      style={styles.replaceBtn}
                      onPress={handlePickLocalImage}
                      activeOpacity={0.8}>
                      <RotateCw size={13} color="#6C3AE8" />
                      <Text style={styles.replaceBtnText}>Replace Photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => setDoorstepPhoto(null)}
                      activeOpacity={0.8}>
                      <Trash2 size={13} color="#DC2626" />
                      <Text style={styles.removeBtnText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Local Photo Access Picker Box (when expanded and no photo yet) */}
              {!doorstepPhoto && showPhotoSection && (
                <View style={styles.emptyUploadBox}>
                  <View style={styles.emptyIconWrap}>
                    <FolderOpen size={22} color="#6C3AE8" />
                  </View>
                  <Text style={styles.emptyPrompt}>
                    Browse device gallery or take live camera photo
                  </Text>

                  {/* Action buttons row */}
                  <View style={styles.pickerRow}>
                    <TouchableOpacity
                      style={styles.browseBtn}
                      onPress={handlePickLocalImage}
                      activeOpacity={0.85}>
                      <FolderOpen size={14} color="#FFFFFF" />
                      <Text style={styles.browseBtnText}>Browse Files</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.cameraBtn}
                      onPress={handleLaunchCamera}
                      activeOpacity={0.85}>
                      <Camera size={14} color="#6C3AE8" />
                      <Text style={styles.cameraBtnText}>Camera</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Quick sample demo button */}
                  <TouchableOpacity
                    style={styles.demoLinkBtn}
                    onPress={handleUseDemoPhoto}
                    activeOpacity={0.7}>
                    <Text style={styles.demoLinkText}>
                      Use Sample Doorstep Photo
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Gate / Security Drop Toggle */}
            <TouchableOpacity
              style={[
                styles.proofToggleBtn,
                contactlessDrop && styles.proofToggleBtnActive,
              ]}
              onPress={() => setContactlessDrop(!contactlessDrop)}
              activeOpacity={0.8}>
              <DoorOpen size={16} color={contactlessDrop ? '#059669' : '#6C3AE8'} />
              <Text
                style={[
                  styles.proofToggleText,
                  contactlessDrop && styles.proofToggleTextActive,
                ]}>
                {contactlessDrop ? 'Gate / Security Drop Selected ✓' : 'Left at Gate / Security Guard'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 5. Security & Guarantee Note */}
          <View style={styles.securityNote}>
            <ShieldCheck size={14} color="#059669" />
            <Text style={styles.securityNoteText}>
              Verifies handover instantly and releases ₹120 to your wallet
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar with Safe-Area Insets */}
      <View
        style={[
          styles.bottomActionBar,
          { paddingBottom: Math.max(insets.bottom, 16) + 6 },
        ]}>
        <GradientButton
          title="Verify OTP & Complete Delivery ✓"
          icon={<Sparkles size={18} color="#FFFFFF" />}
          onPress={handleComplete}
          style={styles.completeBtn}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  productThumb: {
    width: 54,
    height: 54,
    borderRadius: 14,
    marginRight: 12,
  },
  customerMetaCol: {
    flex: 1,
  },
  orderIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  orderIdText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#6C3AE8',
  },
  prepaidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  prepaidBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#059669',
  },
  customerName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111447',
    marginBottom: 2,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  customerAddress: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  callCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  centerHero: {
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  sparkleDot: {
    position: 'absolute',
    borderRadius: 8,
  },
  boxGlowRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(217, 119, 6, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  parcelBox: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headingTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#111447',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 8,
  },
  cardOtpLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 0.8,
    textAlign: 'center',
    marginBottom: 14,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 14,
  },
  otpBox: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: '#F8F7FF',
    borderWidth: 1.5,
    borderColor: '#D8B4FE',
    fontSize: 25,
    fontWeight: '900',
    color: '#111447',
    shadowColor: '#6C3AE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  otpBoxFilled: {
    borderColor: '#7C3AED',
    backgroundColor: '#EDE9FE',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
  },
  resendRow: {
    alignItems: 'center',
    marginBottom: 14,
  },
  resendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  resendText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  proofOptionsWrap: {
    gap: 10,
    marginBottom: 14,
  },
  photoContainerCard: {
    backgroundColor: '#FAF8FF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    overflow: 'hidden',
  },
  photoHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  photoHeaderRowActive: {
    backgroundColor: '#F0FDF4',
  },
  photoHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  photoHeaderIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoHeaderTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  photoHeaderSub: {
    fontSize: 10.5,
    color: '#64748B',
    marginTop: 1,
  },
  attachedPill: {
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
  attachedPillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#059669',
  },
  expandArrow: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBox: {
    padding: 12,
    paddingTop: 0,
  },
  previewImageWrap: {
    width: '100%',
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#000',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewOverlayBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  previewOverlayText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  fileDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  fileNameText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1E1B4B',
    flex: 1,
  },
  fileSizeText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
  },
  photoActionsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  replaceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  replaceBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  removeBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#DC2626',
  },
  emptyUploadBox: {
    alignItems: 'center',
    margin: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
    borderRadius: 14,
    backgroundColor: '#FAF8FF',
  },
  emptyIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  emptyPrompt: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 10,
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#6C3AE8',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  browseBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cameraBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: '#DDD6FE',
  },
  cameraBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  demoLinkBtn: {
    marginTop: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  demoLinkText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#7C3AED',
    textDecorationLine: 'underline',
  },
  proofToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F8F6FF',
    borderRadius: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#E9D5FF',
  },
  proofToggleBtnActive: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  proofToggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6C3AE8',
  },
  proofToggleTextActive: {
    color: '#059669',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  securityNoteText: {
    fontSize: 11,
    color: '#4B5563',
    fontWeight: '600',
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
  completeBtn: {
    width: '100%',
  },
});
