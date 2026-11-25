import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Input } from '@/components/common/Input';
import { GradientButton } from '@/components/common/GradientButton';
import { useApp } from '@/context/AppContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CreditCard,
  FileText,
  Calendar,
  ShieldCheck,
  Sparkles,
  CircleCheck,
  ArrowRight,
  Upload,
  FolderOpen,
  Camera,
  RefreshCw,
  Trash2,
  Check,
} from 'lucide-react-native';

// Multi-color celebration sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 18, right: 30, size: 13, color: '#FFD700' },
  { id: 2, top: 70, left: 26, size: 11, color: '#38BDF8' },
  { id: 3, top: 135, right: 32, size: 12, color: '#34D399' },
  { id: 4, top: 200, left: 30, size: 10, color: '#F472B6' },
  { id: 5, top: 260, right: 44, size: 11, color: '#FBBF24' },
];

// Sample placeholder URLs for instant demonstration
const SAMPLE_DL_FRONT = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80';
const SAMPLE_DL_BACK = 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=600&q=80';

export default function DrivingLicenceScreen() {
  const insets = useSafeAreaInsets();
  const { setRegProgress } = useApp();

  const [licenceNo, setLicenceNo] = useState('AP31 20210049281');
  const [expiry, setExpiry] = useState('15/08/2035');
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');

  // Independent document states for Front and Back side uploads (same pattern as identity.tsx)
  const [frontDoc, setFrontDoc] = useState<{ uri: string; name: string; size: string } | null>({
    uri: SAMPLE_DL_FRONT,
    name: 'DL_Front_AP312021.jpg',
    size: '1.4 MB',
  });
  const [backDoc, setBackDoc] = useState<{ uri: string; name: string; size: string } | null>({
    uri: SAMPLE_DL_BACK,
    name: 'DL_Back_AP312021.jpg',
    size: '1.3 MB',
  });

  // 1. Floating ambient orbs pulse
  const [pulseAnim] = useState(() => new Animated.Value(1));

  // 2. Continuous diagonal flash sweep beam across Hero Card
  const [shimmerFlash] = useState(() => new Animated.Value(0));

  // 3. Twinkling sparkles animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Ambient pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Shimmer Flash Sweep
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

    // 3. Sparkles twinkle
    Animated.loop(
      Animated.sequence([
        Animated.timing(crackerAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(crackerAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim, shimmerFlash, crackerAnim]);

  const shimmerTranslateX = shimmerFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 480],
  });

  const crackerScale = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1.25],
  });

  const crackerRotate = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const crackerOpacity = crackerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.55, 1],
  });

  // Active side document data helper
  const getActiveDocData = () => {
    return currentSide === 'front' ? frontDoc : backDoc;
  };

  const updateActiveDocData = (data: { uri: string; name: string; size: string } | null) => {
    if (currentSide === 'front') {
      setFrontDoc(data);
    } else {
      setBackDoc(data);
    }
  };

  // Launch Local Image / File Picker
  const handlePickLocalImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 10],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const sidePrefix = currentSide.toUpperCase();
        const name = asset.fileName || `DrivingLicence_${sidePrefix}_Card.jpg`;
        const size = asset.fileSize
          ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : '1.4 MB';

        updateActiveDocData({
          uri: asset.uri,
          name,
          size,
        });
      }
    } catch {
      Alert.alert('File Picker', 'Unable to access local photos. Please check device permissions.');
    }
  };

  // Capture live photo with camera
  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Camera Permission Required', 'Camera access is required to photograph your Driving Licence.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 10],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const sidePrefix = currentSide.toUpperCase();
        const name = `DL_${sidePrefix}_CameraCapture.jpg`;
        const size = asset.fileSize
          ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : '1.5 MB';

        updateActiveDocData({
          uri: asset.uri,
          name,
          size,
        });
      }
    } catch {
      Alert.alert('Camera Error', 'Could not open camera.');
    }
  };

  // Quick Demo ID Loader for instant testing
  const handleLoadSample = () => {
    const uri = currentSide === 'front' ? SAMPLE_DL_FRONT : SAMPLE_DL_BACK;
    const name = `DL_${currentSide.toUpperCase()}_Verified_Sample.jpg`;
    updateActiveDocData({
      uri,
      name,
      size: '1.4 MB',
    });
  };

  const handleContinue = () => {
    if (!licenceNo.trim()) {
      Alert.alert('Licence Number Required', 'Please enter your Driving Licence Number.');
      return;
    }
    if (!frontDoc) {
      Alert.alert('Front Photo Required', 'Please upload or select the Front Side photo of your Driving Licence.');
      setCurrentSide('front');
      return;
    }
    if (!backDoc) {
      Alert.alert('Back Photo Required', 'Please upload or select the Back Side photo of your Driving Licence.');
      setCurrentSide('back');
      return;
    }

    setRegProgress((prev) => ({ ...prev, licenceUploaded: true }));
    router.push('/verification/vehicle-documents');
  };

  const activeDoc = getActiveDocData();

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      {/* Dynamic Multi-Stop Gradient Background */}
      <LinearGradient
        colors={['#FFFFFF', '#FAF7FF', '#F4EEFF', '#EBE0FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Ambient Pulsing Glow Orbs */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glowOrbTopRight,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
      <View style={styles.glowOrbBottomLeft} pointerEvents="none" />

      {/* Festive Twinkling Sparkles */}
      {SPARKLE_PARTICLES.map((p) => (
        <Animated.View
          key={p.id}
          pointerEvents="none"
          style={[
            styles.sparkleParticle,
            {
              top: p.top,
              left: p.left,
              right: p.right,
              transform: [{ scale: crackerScale }, { rotate: crackerRotate }],
              opacity: crackerOpacity,
            },
          ]}>
          <Sparkles size={p.size} color={p.color} />
        </Animated.View>
      ))}

      <Header title="Driving Licence" showBack />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingBottom: Math.max(insets.bottom, 24) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Step Progress Tracker */}
        <View style={styles.stepsContainer}>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>1. Details</Text>
          </View>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>2. ID Proof</Text>
          </View>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>3. Face Match</Text>
          </View>
          <View style={styles.stepActivePill}>
            <View style={styles.activeDot} />
            <Text style={styles.stepActiveText}>4. Licence</Text>
          </View>
        </View>

        {/* Dynamic Hero Card with Flash Shimmer */}
        <View style={styles.heroCard}>
          <LinearGradient
            colors={['#2E1065', '#4C1D95', '#6D28D9', '#7C3AED']}
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

          <View style={styles.heroTopRow}>
            <View style={styles.heroBadge}>
              <ShieldCheck size={11} color="#34D399" strokeWidth={2.5} />
              <Text style={styles.heroBadgeText}>MORTH VERIFIED • STEP 4 OF 6</Text>
            </View>
            <View style={styles.validityBadge}>
              <Text style={styles.validityBadgeText}>Govt Transport</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Driving Licence Details</Text>
          <Text style={styles.heroSubtitle}>
            Enter your valid licence number and upload both Front & Back photos using local files or camera.
          </Text>
        </View>

        {/* Licence Details Inputs Card */}
        <View style={styles.formCard}>
          <Text style={styles.formSectionHeader}>LICENCE IDENTIFIERS</Text>

          <Input
            label="Driving Licence Number *"
            placeholder="e.g. AP31 20210049281"
            value={licenceNo}
            onChangeText={setLicenceNo}
            autoCapitalize="characters"
            leftIcon={<FileText size={18} color="#6D28D9" />}
          />

          <Input
            label="Licence Expiry Date (DD/MM/YYYY) *"
            placeholder="DD/MM/YYYY"
            value={expiry}
            onChangeText={setExpiry}
            leftIcon={<Calendar size={18} color="#6D28D9" />}
          />
        </View>

        {/* Front / Back Side Switcher (Same layout and format as Government ID) */}
        <View style={styles.sideSwitcherSection}>
          <Text style={styles.sectionHeaderTitle}>SELECT DOCUMENT SIDE TO UPLOAD</Text>

          <View style={styles.sideSwitcherRow}>
            <TouchableOpacity
              style={[styles.sideTab, currentSide === 'front' && styles.sideTabActive]}
              onPress={() => setCurrentSide('front')}
              activeOpacity={0.8}>
              {frontDoc ? <CircleCheck size={13} color="#059669" /> : null}
              <Text style={[styles.sideTabText, currentSide === 'front' && styles.sideTabTextActive]}>
                Front Side {frontDoc ? '✓' : ''}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sideTab, currentSide === 'back' && styles.sideTabActive]}
              onPress={() => setCurrentSide('back')}
              activeOpacity={0.8}>
              {backDoc ? <CircleCheck size={13} color="#059669" /> : null}
              <Text style={[styles.sideTabText, currentSide === 'back' && styles.sideTabTextActive]}>
                Back Side {backDoc ? '✓' : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Elevated Local File & Image Upload Card (Matches Identity Proof format) */}
        <View style={styles.uploadCard}>
          {activeDoc ? (
            /* Uploaded Preview State with Local Image Preview */
            <View style={styles.previewContainer}>
              <View style={styles.previewHeaderRow}>
                <View style={styles.verifiedTag}>
                  <Check size={12} color="#059669" strokeWidth={3} />
                  <Text style={styles.verifiedTagText}>LOCAL IMAGE LOADED</Text>
                </View>
                <Text style={styles.fileSizeText}>{activeDoc.size}</Text>
              </View>

              {/* Local Image Preview Thumbnail */}
              <View style={styles.imagePreviewWrap}>
                <Image
                  source={{ uri: activeDoc.uri }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <View style={styles.previewOverlayBadge}>
                  <Text style={styles.previewOverlayText}>
                    DRIVING LICENCE ({currentSide.toUpperCase()})
                  </Text>
                </View>
              </View>

              <Text style={styles.fileNameText} numberOfLines={1}>
                {activeDoc.name}
              </Text>

              {/* Local Actions Row: Replace or Remove */}
              <View style={styles.uploadedActionsRow}>
                <TouchableOpacity
                  style={styles.actionBtnSecondary}
                  onPress={handlePickLocalImage}
                  activeOpacity={0.75}>
                  <RefreshCw size={13} color="#6D28D9" />
                  <Text style={styles.actionTextSecondary}>Change Image</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionBtnDanger}
                  onPress={() => updateActiveDocData(null)}
                  activeOpacity={0.75}>
                  <Trash2 size={13} color="#DC2626" />
                  <Text style={styles.actionTextDanger}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* Empty Upload State with Local File Pickers */
            <View style={styles.emptyUploadBox}>
              <View style={styles.uploadIconCircle}>
                <Upload size={28} color="#6D28D9" strokeWidth={2.4} />
              </View>
              <Text style={styles.uploadHeading}>
                Upload Driving Licence ({currentSide} side)
              </Text>
              <Text style={styles.uploadSubtext}>
                Select a local image from your gallery or take a clear photo
              </Text>

              {/* Local File & Camera Action Buttons */}
              <View style={styles.pickerButtonsRow}>
                <TouchableOpacity
                  style={styles.browseLocalBtn}
                  onPress={handlePickLocalImage}
                  activeOpacity={0.8}>
                  <FolderOpen size={16} color="#FFFFFF" strokeWidth={2.2} />
                  <Text style={styles.browseLocalBtnText}>Browse Files</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cameraBtn}
                  onPress={handleTakePhoto}
                  activeOpacity={0.8}>
                  <Camera size={16} color="#6D28D9" strokeWidth={2.2} />
                  <Text style={styles.cameraBtnText}>Camera</Text>
                </TouchableOpacity>
              </View>

              {/* Sample Document Demo Loader */}
              <TouchableOpacity
                style={styles.sampleLoaderBtn}
                onPress={handleLoadSample}
                activeOpacity={0.75}>
                <Sparkles size={14} color="#7C3AED" />
                <Text style={styles.sampleLoaderText}>
                  ⚡ Use Demo DL ({currentSide.toUpperCase()})
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Side Status Indicators Pill Row */}
        <View style={styles.statusIndicatorRow}>
          <TouchableOpacity
            style={[styles.statusPill, frontDoc ? styles.statusPillDone : styles.statusPillPending]}
            onPress={() => setCurrentSide('front')}>
            {frontDoc ? <Check size={12} color="#059669" strokeWidth={3} /> : <CreditCard size={12} color="#94A3B8" />}
            <Text style={[styles.statusPillText, frontDoc ? styles.statusPillTextDone : styles.statusPillTextPending]}>
              Front: {frontDoc ? 'Loaded' : 'Pending'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.statusPill, backDoc ? styles.statusPillDone : styles.statusPillPending]}
            onPress={() => setCurrentSide('back')}>
            {backDoc ? <Check size={12} color="#059669" strokeWidth={3} /> : <CreditCard size={12} color="#94A3B8" />}
            <Text style={[styles.statusPillText, backDoc ? styles.statusPillTextDone : styles.statusPillTextPending]}>
              Back: {backDoc ? 'Loaded' : 'Pending'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quality Guidelines Strip */}
        <View style={styles.guidelinesBox}>
          <View style={styles.guideRow}>
            <Check size={12} color="#059669" strokeWidth={3} />
            <Text style={styles.guideText}>DL Number, validity, and transport class must be clearly visible</Text>
          </View>
          <View style={styles.guideRow}>
            <Check size={12} color="#059669" strokeWidth={3} />
            <Text style={styles.guideText}>Avoid glare, flash reflections, and blurry captures</Text>
          </View>
        </View>

        {/* Primary Action Button */}
        <GradientButton
          title="Save & Continue to Vehicle RC"
          icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
          onPress={handleContinue}
          style={styles.continueBtn}
        />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  glowOrbTopRight: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  glowOrbBottomLeft: {
    position: 'absolute',
    bottom: 20,
    left: -50,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  sparkleParticle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ECE4FF',
    alignSelf: 'center',
  },
  stepDonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 10,
  },
  stepDoneText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  stepActivePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#6D28D9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34D399',
  },
  stepActiveText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroCard: {
    borderRadius: 24,
    padding: 18,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(167, 139, 250, 0.4)',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  shimmerFlashWrap: {
    position: 'absolute',
    top: -60,
    bottom: -60,
    width: 140,
    zIndex: 2,
  },
  shimmerFlashBeam: {
    flex: 1,
    width: '100%',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 9,
    paddingVertical: 4.5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  validityBadge: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.35)',
  },
  validityBadgeText: {
    color: '#A7F3D0',
    fontSize: 9.5,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#E9D5FF',
    lineHeight: 17,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  formSectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6D28D9',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6D28D9',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  sideSwitcherSection: {
    marginBottom: 14,
  },
  sideSwitcherRow: {
    flexDirection: 'row',
    backgroundColor: '#F3E8FF',
    borderRadius: 14,
    padding: 4,
    gap: 6,
  },
  sideTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  sideTabActive: {
    backgroundColor: '#6D28D9',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sideTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B21A8',
  },
  sideTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    overflow: 'hidden',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 12,
  },
  previewContainer: {
    padding: 16,
  },
  previewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  verifiedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  verifiedTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.4,
  },
  fileSizeText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  imagePreviewWrap: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    position: 'relative',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    paddingVertical: 3.5,
    borderRadius: 6,
  },
  previewOverlayText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  fileNameText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  uploadedActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
    backgroundColor: '#FAF5FF',
  },
  actionTextSecondary: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#6D28D9',
  },
  actionBtnDanger: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  actionTextDanger: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#DC2626',
  },
  emptyUploadBox: {
    alignItems: 'center',
    paddingVertical: 26,
    paddingHorizontal: 16,
  },
  uploadIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  uploadSubtext: {
    fontSize: 11.5,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  pickerButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginBottom: 12,
  },
  browseLocalBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#6D28D9',
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  browseLocalBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cameraBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#FAF5FF',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },
  cameraBtnText: {
    color: '#6D28D9',
    fontSize: 12,
    fontWeight: '700',
  },
  sampleLoaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#FAF5FF',
  },
  sampleLoaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
  },
  statusIndicatorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  statusPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusPillDone: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
  },
  statusPillPending: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  statusPillText: {
    fontSize: 11.5,
    fontWeight: '700',
  },
  statusPillTextDone: {
    color: '#059669',
  },
  statusPillTextPending: {
    color: '#64748B',
  },
  guidelinesBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
    marginBottom: 16,
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  guideText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
    flex: 1,
  },
  continueBtn: {
    marginBottom: 10,
  },
});
