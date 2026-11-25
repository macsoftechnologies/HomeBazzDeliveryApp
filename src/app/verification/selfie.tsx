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
  Camera,
  RefreshCw,
  UserCheck,
  ShieldCheck,
  Sparkles,
  CircleCheck,
  ArrowRight,
  FolderOpen,
  Check,
  Sun,
  Eye,
  Smile,
} from 'lucide-react-native';

// Multi-color celebration sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 18, right: 30, size: 13, color: '#FFD700' },
  { id: 2, top: 68, left: 26, size: 11, color: '#38BDF8' },
  { id: 3, top: 135, right: 32, size: 12, color: '#34D399' },
  { id: 4, top: 200, left: 30, size: 10, color: '#F472B6' },
  { id: 5, top: 265, right: 44, size: 11, color: '#FBBF24' },
];

// Sample high-quality verified selfie photo for instant preview testing
const SAMPLE_SELFIE_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

export default function SelfieVerificationScreen() {
  const insets = useSafeAreaInsets();
  const { setRegProgress } = useApp();

  // Screen initially opens in "Ready to Capture" state (false)
  const [captured, setCaptured] = useState(false);
  const [selfieUri, setSelfieUri] = useState<string | null>(null);

  // 1. Concentric halo pulsing animation
  const [pulseAnim] = useState(() => new Animated.Value(1));
  const [haloScale] = useState(() => new Animated.Value(1));

  // 2. Continuous diagonal flash sweep beam across Hero Card
  const [shimmerFlash] = useState(() => new Animated.Value(0));

  // 3. Twinkling sparkles animation
  const [crackerAnim] = useState(() => new Animated.Value(0));

  // 4. Scanning line animation across the biometric face circle
  const [scanAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    // 1. Halo & Icon pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(haloScale, {
          toValue: 1.18,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(haloScale, {
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

    // 4. Scanning line vertical sweep
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim, haloScale, shimmerFlash, crackerAnim, scanAnim]);

  const shimmerTranslateX = shimmerFlash.interpolate({
    inputRange: [0, 1],
    outputRange: [-260, 480],
  });

  const scanTranslateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-90, 90],
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

  // Launch Live Camera for Selfie
  const handleCaptureWithCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Camera Permission Required', 'Please grant camera access to take your verification selfie.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelfieUri(result.assets[0].uri);
        setCaptured(true);
      }
    } catch {
      Alert.alert('Camera Error', 'Could not open camera. You can also pick a photo from your gallery.');
    }
  };

  // Launch Local Gallery for Selfie
  const handlePickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelfieUri(result.assets[0].uri);
        setCaptured(true);
      }
    } catch {
      Alert.alert('Gallery Error', 'Could not access photo library.');
    }
  };

  // Use Sample Verified Selfie (Fast Demo)
  const handleUseDemoSelfie = () => {
    setSelfieUri(SAMPLE_SELFIE_URL);
    setCaptured(true);
  };

  const handleRetake = () => {
    setCaptured(false);
    setSelfieUri(null);
  };

  const handleSubmitProceed = () => {
    setRegProgress((prev) => ({ ...prev, selfieCaptured: true }));
    router.push('/verification/vehicle-type');
  };

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
          styles.glowOrbTopCenter,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
      <View style={styles.glowOrbBottomRight} pointerEvents="none" />

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

      <Header title="Face Verification" showBack />

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
          <View style={styles.stepActivePill}>
            <View style={styles.activeDot} />
            <Text style={styles.stepActiveText}>3. Face Match</Text>
          </View>
          <View style={styles.stepInactivePill}>
            <Text style={styles.stepInactiveText}>4. Vehicle</Text>
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
              <Text style={styles.heroBadgeText}>STEP 3 OF 4 • BIOMETRIC VERIFICATION</Text>
            </View>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>AI Liveness Check</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Live Face Verification</Text>
          <Text style={styles.heroSubtitle}>
            {captured
              ? 'Your selfie has been captured and successfully verified with your government ID.'
              : 'Please position your face inside the frame and take a clear selfie in good lighting.'}
          </Text>
        </View>

        {/* Biometric Camera Viewport Card */}
        <View style={styles.cameraCard}>
          {captured ? (
            /* STATE 2: SELFIE CAPTURED SUCCESSFULLY */
            <View style={styles.capturedArea}>
              <View style={styles.capturedFrameWrap}>
                <View style={styles.capturedOuterRing} />
                <View style={styles.capturedImageContainer}>
                  {selfieUri ? (
                    <Image
                      source={{ uri: selfieUri }}
                      style={styles.selfieImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <UserCheck size={90} color="#6D28D9" />
                  )}
                </View>

                {/* Verified Green Badge Checkmark */}
                <View style={styles.verifiedBadgeIcon}>
                  <Check size={18} color="#FFFFFF" strokeWidth={3} />
                </View>
              </View>

              {/* Status & AI Match */}
              <View style={styles.matchStatusTag}>
                <Check size={13} color="#059669" strokeWidth={2.5} />
                <Text style={styles.matchStatusTagText}>AI BIOMETRIC MATCH: 99.4%</Text>
              </View>

              <Text style={styles.statusSuccessTitle}>Selfie Captured Successfully</Text>
              <Text style={styles.statusSuccessDesc}>
                Face liveness confirmed. Your face matches the photo on your official ID proof.
              </Text>

              {/* Action Buttons: Submit & Proceed vs Retake */}
              <View style={styles.capturedActionButtons}>
                <GradientButton
                  title="Submit & Proceed"
                  icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
                  onPress={handleSubmitProceed}
                  style={styles.proceedBtn}
                />

                <TouchableOpacity
                  style={styles.retakeBtn}
                  onPress={handleRetake}
                  activeOpacity={0.75}>
                  <RefreshCw size={15} color="#6D28D9" strokeWidth={2.2} />
                  <Text style={styles.retakeBtnText}>Retake Selfie</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* STATE 1: READY TO CAPTURE */
            <View style={styles.readyArea}>
              <View style={styles.viewfinderContainer}>
                {/* Concentric Halo Outer Ring */}
                <Animated.View
                  style={[
                    styles.haloOuter,
                    { transform: [{ scale: haloScale }] },
                  ]}
                />
                {/* Concentric Halo Middle Ring */}
                <Animated.View
                  style={[
                    styles.haloMiddle,
                    { transform: [{ scale: pulseAnim }] },
                  ]}
                />

                {/* Oval Face Guide Frame */}
                <View style={styles.ovalFaceGuide}>
                  {/* Scanning Beam Sweep */}
                  <Animated.View
                    style={[
                      styles.scanLine,
                      { transform: [{ translateY: scanTranslateY }] },
                    ]}
                  />

                  {/* Corner Guide Brackets */}
                  <View style={[styles.cornerBracket, styles.bracketTopLeft]} />
                  <View style={[styles.cornerBracket, styles.bracketTopRight]} />
                  <View style={[styles.cornerBracket, styles.bracketBottomLeft]} />
                  <View style={[styles.cornerBracket, styles.bracketBottomRight]} />

                  <Camera size={44} color="#6D28D9" strokeWidth={1.8} />
                  <Text style={styles.alignPromptText}>Align face here</Text>
                </View>
              </View>

              <View style={styles.readyStatusBadge}>
                <View style={styles.readyDot} />
                <Text style={styles.readyStatusText}>CAMERA READY TO CAPTURE</Text>
              </View>

              {/* 3 Clear Quality Instructions */}
              <View style={styles.guidelinesBox}>
                <View style={styles.guideRow}>
                  <Sun size={15} color="#D97706" />
                  <Text style={styles.guideRowText}>Good lighting without strong backlights</Text>
                </View>
                <View style={styles.guideRow}>
                  <Eye size={15} color="#6D28D9" />
                  <Text style={styles.guideRowText}>No sunglasses, caps, or face masks</Text>
                </View>
                <View style={styles.guideRow}>
                  <Smile size={15} color="#059669" />
                  <Text style={styles.guideRowText}>Look straight with a neutral expression</Text>
                </View>
              </View>

              {/* Action Buttons for Capture */}
              <View style={styles.captureButtonsRow}>
                {/* 1. Live Camera Button */}
                <TouchableOpacity
                  style={styles.openCameraBtn}
                  onPress={handleCaptureWithCamera}
                  activeOpacity={0.85}>
                  <Camera size={18} color="#FFFFFF" strokeWidth={2.4} />
                  <Text style={styles.openCameraBtnText}>Take Live Selfie</Text>
                </TouchableOpacity>

                {/* 2. Pick from Gallery Button */}
                <TouchableOpacity
                  style={styles.browseGalleryBtn}
                  onPress={handlePickFromGallery}
                  activeOpacity={0.85}>
                  <FolderOpen size={16} color="#6D28D9" strokeWidth={2.2} />
                  <Text style={styles.browseGalleryBtnText}>Browse Files</Text>
                </TouchableOpacity>
              </View>

              {/* Fast-Track Demo Button */}
              <TouchableOpacity
                style={styles.demoSelfieBtn}
                onPress={handleUseDemoSelfie}
                activeOpacity={0.75}>
                <Text style={styles.demoSelfieText}>⚡ Load Sample Verified Selfie (Instant Demo)</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Security & Verification Assurance Note */}
        <View style={styles.securityNoteRow}>
          <ShieldCheck size={14} color="#059669" />
          <Text style={styles.securityNoteText}>
            Encrypted Biometric Verification • Used strictly for partner profile authentication
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  glowOrbTopCenter: {
    position: 'absolute',
    top: -50,
    alignSelf: 'center',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  glowOrbBottomRight: {
    position: 'absolute',
    bottom: -40,
    right: -40,
    width: 250,
    height: 250,
    borderRadius: 125,
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
  stepInactivePill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  stepInactiveText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
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
  aiBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  aiBadgeText: {
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
  cameraCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 22,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  readyArea: {
    alignItems: 'center',
    width: '100%',
  },
  viewfinderContainer: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 6,
  },
  haloOuter: {
    position: 'absolute',
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: 'rgba(124, 58, 237, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.15)',
  },
  haloMiddle: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(124, 58, 237, 0.12)',
  },
  ovalFaceGuide: {
    width: 155,
    height: 185,
    borderRadius: 78,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderStyle: 'dashed',
    backgroundColor: '#FAF7FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2.5,
    backgroundColor: '#059669',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },
  cornerBracket: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderColor: '#6D28D9',
  },
  bracketTopLeft: {
    top: 14,
    left: 14,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
  },
  bracketTopRight: {
    top: 14,
    right: 14,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
  },
  bracketBottomLeft: {
    bottom: 14,
    left: 14,
    borderBottomWidth: 2.5,
    borderLeftWidth: 2.5,
  },
  bracketBottomRight: {
    bottom: 14,
    right: 14,
    borderBottomWidth: 2.5,
    borderRightWidth: 2.5,
  },
  alignPromptText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6D28D9',
    marginTop: 6,
  },
  readyStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5F3FF',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginTop: 10,
    marginBottom: 14,
  },
  readyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6D28D9',
  },
  readyStatusText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6D28D9',
    letterSpacing: 0.5,
  },
  guidelinesBox: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 18,
  },
  guideRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  guideRowText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  captureButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  openCameraBtn: {
    flex: 1.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#6D28D9',
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  openCameraBtnText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  browseGalleryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F5F3FF',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },
  browseGalleryBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6D28D9',
  },
  demoSelfieBtn: {
    marginTop: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  demoSelfieText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#7C3AED',
    textDecorationLine: 'underline',
  },
  capturedArea: {
    alignItems: 'center',
    width: '100%',
  },
  capturedFrameWrap: {
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 8,
  },
  capturedOuterRing: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 3,
    borderColor: '#34D399',
    backgroundColor: '#ECFDF5',
  },
  capturedImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selfieImage: {
    width: '100%',
    height: '100%',
  },
  verifiedBadgeIcon: {
    position: 'absolute',
    bottom: 4,
    right: 14,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  matchStatusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginTop: 8,
    marginBottom: 8,
  },
  matchStatusTagText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#059669',
    letterSpacing: 0.6,
  },
  statusSuccessTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#111447',
    marginBottom: 4,
    textAlign: 'center',
  },
  statusSuccessDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 18,
    lineHeight: 16,
  },
  capturedActionButtons: {
    width: '100%',
    gap: 10,
  },
  proceedBtn: {
    width: '100%',
  },
  retakeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 14,
    backgroundColor: '#F5F3FF',
    borderWidth: 1.5,
    borderColor: '#DDD6FE',
  },
  retakeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6D28D9',
  },
  securityNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  securityNoteText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 15,
  },
});
