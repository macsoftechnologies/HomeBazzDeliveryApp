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
import { GradientButton } from '@/components/common/GradientButton';
import { useApp } from '@/context/AppContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CreditCard,
  Upload,
  CircleCheck,
  ShieldCheck,
  Sparkles,
  Camera,
  FolderOpen,
  Trash2,
  RefreshCw,
  FileText,
  Check,
} from 'lucide-react-native';

// Multi-color celebratory sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 18, right: 32, size: 13, color: '#FFD700' },
  { id: 2, top: 70, left: 28, size: 11, color: '#38BDF8' },
  { id: 3, top: 140, right: 30, size: 12, color: '#34D399' },
  { id: 4, top: 200, left: 34, size: 10, color: '#F472B6' },
  { id: 5, top: 260, right: 48, size: 11, color: '#FBBF24' },
];

// High quality demo placeholder for instant verification testing
const DEMO_AADHAAR_PREVIEW = 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=600&q=80';
const DEMO_PAN_PREVIEW = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80';

export default function IdentityVerificationScreen() {
  const insets = useSafeAreaInsets();
  const { setRegProgress } = useApp();
  const [docType, setDocType] = useState<'aadhaar' | 'pan'>('aadhaar');
  const [currentSide, setCurrentSide] = useState<'front' | 'back'>('front');

  // Separate image states for front & back
  const [aadhaarFront, setAadhaarFront] = useState<{ uri: string; name: string; size: string } | null>({
    uri: DEMO_AADHAAR_PREVIEW,
    name: 'Aadhaar_Front_UIDAI.jpg',
    size: '1.4 MB',
  });
  const [aadhaarBack, setAadhaarBack] = useState<{ uri: string; name: string; size: string } | null>(null);

  const [panFront, setPanFront] = useState<{ uri: string; name: string; size: string } | null>({
    uri: DEMO_PAN_PREVIEW,
    name: 'PAN_Card_National.jpg',
    size: '1.2 MB',
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

  // Active document data helper
  const getActiveDocData = () => {
    if (docType === 'pan') return panFront;
    return currentSide === 'front' ? aadhaarFront : aadhaarBack;
  };

  const updateActiveDocData = (data: { uri: string; name: string; size: string } | null) => {
    if (docType === 'pan') {
      setPanFront(data);
    } else if (currentSide === 'front') {
      setAadhaarFront(data);
    } else {
      setAadhaarBack(data);
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
        const docPrefix = docType.toUpperCase();
        const sidePrefix = docType === 'pan' ? 'FRONT' : currentSide.toUpperCase();
        const name = asset.fileName || `${docPrefix}_${sidePrefix}_Doc.jpg`;
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
      Alert.alert('File Picker', 'Unable to access local gallery. Please grant photo permissions.');
    }
  };

  // Launch Camera to take live photo of document
  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Camera Permission', 'Camera permission is required to capture your document.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 10],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const docPrefix = docType.toUpperCase();
        const sidePrefix = docType === 'pan' ? 'FRONT' : currentSide.toUpperCase();
        const name = `${docPrefix}_${sidePrefix}_Capture.jpg`;
        const size = asset.fileSize
          ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : '1.6 MB';

        updateActiveDocData({
          uri: asset.uri,
          name,
          size,
        });
      }
    } catch {
      Alert.alert('Camera', 'Unable to launch camera. Please try browsing files.');
    }
  };

  // Quick Demo ID Loader for instant testing
  const handleUseDemoSample = () => {
    const demoUri = docType === 'pan' ? DEMO_PAN_PREVIEW : DEMO_AADHAAR_PREVIEW;
    const name = docType === 'pan' ? 'PAN_Card_Sample.jpg' : `Aadhaar_${currentSide.toUpperCase()}_Sample.jpg`;
    updateActiveDocData({
      uri: demoUri,
      name,
      size: '1.2 MB',
    });
  };

  const handleContinue = () => {
    const currentDoc = getActiveDocData();
    if (!currentDoc) {
      Alert.alert('Document Required', 'Please upload or select an ID image to continue.');
      return;
    }
    setRegProgress((prev) => ({ ...prev, identityUploaded: true }));
    router.push('/verification/selfie');
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

      <Header title="Identity Proof" showBack />

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
            <Text style={styles.stepDoneText}>1. Mobile</Text>
          </View>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>2. OTP</Text>
          </View>
          <View style={styles.stepDonePill}>
            <CircleCheck size={11} color="#059669" />
            <Text style={styles.stepDoneText}>3. Details</Text>
          </View>
          <View style={styles.stepActivePill}>
            <View style={styles.activeDot} />
            <Text style={styles.stepActiveText}>4. Identity</Text>
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
              <Text style={styles.heroBadgeText}>STEP 4 OF 4 • KYC VERIFICATION</Text>
            </View>
            <View style={styles.complianceBadge}>
              <Text style={styles.complianceBadgeText}>UIDAI & NSDL</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Government ID Verification</Text>
          <Text style={styles.heroSubtitle}>
            Select your ID proof and upload a clear photo from your local files or camera.
          </Text>
        </View>

        {/* Document Type Selector Cards */}
        <View style={styles.docTypeSection}>
          <Text style={styles.sectionHeaderTitle}>CHOOSE ID TYPE</Text>
          <View style={styles.selectorGroup}>
            {/* Aadhaar Card */}
            <TouchableOpacity
              style={[styles.selectorCard, docType === 'aadhaar' && styles.selectorActive]}
              onPress={() => setDocType('aadhaar')}
              activeOpacity={0.8}>
              <View style={styles.radioOuter}>
                {docType === 'aadhaar' && <View style={styles.radioInner} />}
              </View>
              <View style={styles.selectorInfo}>
                <Text style={styles.selectorTitle}>Aadhaar Card</Text>
                <Text style={styles.selectorDesc}>12-digit UIDAI identity document (Front & Back)</Text>
              </View>
              <View style={[styles.docIconBox, docType === 'aadhaar' && styles.docIconBoxActive]}>
                <CreditCard size={20} color={docType === 'aadhaar' ? '#6D28D9' : '#64748B'} />
              </View>
            </TouchableOpacity>

            {/* PAN Card */}
            <TouchableOpacity
              style={[styles.selectorCard, docType === 'pan' && styles.selectorActive]}
              onPress={() => setDocType('pan')}
              activeOpacity={0.8}>
              <View style={styles.radioOuter}>
                {docType === 'pan' && <View style={styles.radioInner} />}
              </View>
              <View style={styles.selectorInfo}>
                <Text style={styles.selectorTitle}>PAN Card</Text>
                <Text style={styles.selectorDesc}>Permanent Account Number (NSDL / UTIITSL)</Text>
              </View>
              <View style={[styles.docIconBox, docType === 'pan' && styles.docIconBoxActive]}>
                <FileText size={20} color={docType === 'pan' ? '#6D28D9' : '#64748B'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Aadhaar Front / Back Side Switcher */}
        {docType === 'aadhaar' && (
          <View style={styles.sideSwitcherRow}>
            <TouchableOpacity
              style={[styles.sideTab, currentSide === 'front' && styles.sideTabActive]}
              onPress={() => setCurrentSide('front')}
              activeOpacity={0.8}>
              {aadhaarFront ? <CircleCheck size={12} color="#059669" /> : null}
              <Text style={[styles.sideTabText, currentSide === 'front' && styles.sideTabTextActive]}>
                Front Side {aadhaarFront ? '✓' : ''}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sideTab, currentSide === 'back' && styles.sideTabActive]}
              onPress={() => setCurrentSide('back')}
              activeOpacity={0.8}>
              {aadhaarBack ? <CircleCheck size={12} color="#059669" /> : null}
              <Text style={[styles.sideTabText, currentSide === 'back' && styles.sideTabTextActive]}>
                Back Side {aadhaarBack ? '✓' : ''}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Elevated Local File & Image Upload Card */}
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
                    {docType === 'aadhaar'
                      ? `AADHAAR ${currentSide.toUpperCase()}`
                      : 'PAN CARD FRONT'}
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
                Upload {docType === 'aadhaar' ? `Aadhaar (${currentSide} side)` : 'PAN Card'}
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

              {/* Convenient Sample Document Demo Loader */}
              <TouchableOpacity
                style={styles.sampleLoaderBtn}
                onPress={handleUseDemoSample}
                activeOpacity={0.75}>
                <Text style={styles.sampleLoaderText}>⚡ Use Sample Document (Demo)</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Quick Quality Instructions */}
          <View style={styles.guidelinesRow}>
            <View style={styles.guideItem}>
              <Check size={11} color="#059669" strokeWidth={3} />
              <Text style={styles.guideText}>All 4 corners visible</Text>
            </View>
            <View style={styles.guideItem}>
              <Check size={11} color="#059669" strokeWidth={3} />
              <Text style={styles.guideText}>Text clear & sharp</Text>
            </View>
            <View style={styles.guideItem}>
              <Check size={11} color="#059669" strokeWidth={3} />
              <Text style={styles.guideText}>PNG, JPG up to 10MB</Text>
            </View>
          </View>
        </View>

        {/* Primary Action Button */}
        <GradientButton
          title="Upload & Continue to Selfie"
          icon={<CircleCheck size={18} color="#FFFFFF" strokeWidth={2.5} />}
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
    top: -100,
    bottom: -100,
    width: 80,
  },
  shimmerFlashBeam: {
    flex: 1,
    width: '100%',
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  heroBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  complianceBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  complianceBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.88)',
    lineHeight: 18,
  },
  docTypeSection: {
    marginBottom: 14,
  },
  sectionHeaderTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  selectorGroup: {
    gap: 10,
  },
  selectorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  selectorActive: {
    borderColor: '#6D28D9',
    backgroundColor: '#FAF7FF',
    borderWidth: 2,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6D28D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6D28D9',
  },
  selectorInfo: {
    flex: 1,
  },
  selectorTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  selectorDesc: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  docIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docIconBoxActive: {
    backgroundColor: '#EDE9FE',
  },
  sideSwitcherRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  sideTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  sideTabActive: {
    backgroundColor: '#F5F3FF',
    borderColor: '#6D28D9',
    borderWidth: 2,
  },
  sideTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  sideTabTextActive: {
    color: '#6D28D9',
    fontWeight: '800',
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 18,
  },
  previewContainer: {
    alignItems: 'center',
  },
  previewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
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
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  fileSizeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  imagePreviewWrap: {
    width: '100%',
    height: 175,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
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
    paddingVertical: 3,
    borderRadius: 6,
  },
  previewOverlayText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  fileNameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E1B4B',
    marginTop: 10,
    marginBottom: 12,
  },
  uploadedActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  actionBtnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  actionTextSecondary: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6D28D9',
  },
  actionBtnDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  actionTextDanger: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  emptyUploadBox: {
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
    borderRadius: 18,
    backgroundColor: '#FAF8FF',
  },
  uploadIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E1B4B',
    marginBottom: 4,
    textAlign: 'center',
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  pickerButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
  },
  browseLocalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#6D28D9',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  browseLocalBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cameraBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },
  cameraBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6D28D9',
  },
  sampleLoaderBtn: {
    marginTop: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  sampleLoaderText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#7C3AED',
    textDecorationLine: 'underline',
  },
  guidelinesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  guideText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
  },
  continueBtn: {
    width: '100%',
  },
});
