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
  FileText,
  ShieldCheck,
  Sparkles,
  CircleCheck,
  ArrowRight,
  FolderOpen,
  Camera,
  RefreshCw,
  Trash2,
  Check,
  AlertCircle,
} from 'lucide-react-native';

// Multi-color celebration sparkles
const SPARKLE_PARTICLES = [
  { id: 1, top: 18, right: 30, size: 13, color: '#FFD700' },
  { id: 2, top: 70, left: 26, size: 11, color: '#38BDF8' },
  { id: 3, top: 135, right: 32, size: 12, color: '#34D399' },
  { id: 4, top: 200, left: 30, size: 10, color: '#F472B6' },
  { id: 5, top: 260, right: 44, size: 11, color: '#FBBF24' },
];

const SAMPLE_RC_PREVIEW = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80';
const SAMPLE_INSURANCE_PREVIEW = 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=600&q=80';

export default function VehicleDocumentsScreen() {
  const insets = useSafeAreaInsets();
  const { setRegProgress } = useApp();

  // Document states with sample local previews
  const [rcDoc, setRcDoc] = useState<{ uri: string; name: string; size: string } | null>({
    uri: SAMPLE_RC_PREVIEW,
    name: 'Vehicle_RC_AP31CZ4920.jpg',
    size: '1.5 MB',
  });

  const [insuranceDoc, setInsuranceDoc] = useState<{ uri: string; name: string; size: string } | null>({
    uri: SAMPLE_INSURANCE_PREVIEW,
    name: 'Comprehensive_Insurance_Policy.pdf',
    size: '1.8 MB',
  });

  const [pucDoc, setPucDoc] = useState<{ uri: string; name: string; size: string } | null>(null);

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

  // Pick image / file from device gallery
  const handlePickLocalImage = async (type: 'rc' | 'insurance' | 'puc') => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [16, 10],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const name = asset.fileName || `${type.toUpperCase()}_Document.jpg`;
        const size = asset.fileSize
          ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : '1.4 MB';

        const docData = { uri: asset.uri, name, size };
        if (type === 'rc') setRcDoc(docData);
        else if (type === 'insurance') setInsuranceDoc(docData);
        else setPucDoc(docData);
      }
    } catch {
      Alert.alert('File Picker', 'Unable to access device files. Please grant permission.');
    }
  };

  // Capture live photo with camera
  const handleTakePhoto = async (type: 'rc' | 'insurance' | 'puc') => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Camera Permission Required', 'Camera access is required to photograph your vehicle documents.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 10],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const name = `${type.toUpperCase()}_CameraCapture.jpg`;
        const size = asset.fileSize
          ? `${(asset.fileSize / (1024 * 1024)).toFixed(1)} MB`
          : '1.5 MB';

        const docData = { uri: asset.uri, name, size };
        if (type === 'rc') setRcDoc(docData);
        else if (type === 'insurance') setInsuranceDoc(docData);
        else setPucDoc(docData);
      }
    } catch {
      Alert.alert('Camera Error', 'Could not open camera.');
    }
  };

  // Demo sample loader
  const handleLoadDemo = (type: 'rc' | 'insurance' | 'puc') => {
    const uri = type === 'insurance' ? SAMPLE_INSURANCE_PREVIEW : SAMPLE_RC_PREVIEW;
    const name = `${type.toUpperCase()}_Sample_Doc.jpg`;
    const docData = { uri, name, size: '1.4 MB' };
    if (type === 'rc') setRcDoc(docData);
    else if (type === 'insurance') setInsuranceDoc(docData);
    else setPucDoc(docData);
  };

  const handleContinue = () => {
    if (!rcDoc) {
      Alert.alert('RC Required', 'Please upload your Vehicle Registration Certificate (RC).');
      return;
    }
    if (!insuranceDoc) {
      Alert.alert('Insurance Required', 'Please upload your Vehicle Insurance Policy.');
      return;
    }

    setRegProgress((prev) => ({ ...prev, vehicleDocsUploaded: true }));
    router.push('/verification/bank-details');
  };

  // Render individual document upload card
  const renderDocCard = (
    type: 'rc' | 'insurance' | 'puc',
    title: string,
    desc: string,
    required: boolean,
    doc: { uri: string; name: string; size: string } | null,
    onRemove: () => void
  ) => {
    return (
      <View style={styles.docUploadCard}>
        <View style={styles.docHeader}>
          <View style={styles.docTitleCol}>
            <View style={styles.docTitleRow}>
              <Text style={styles.docTitleText}>{title}</Text>
              {required ? (
                <View style={styles.requiredBadge}>
                  <Text style={styles.requiredBadgeText}>REQUIRED</Text>
                </View>
              ) : (
                <View style={styles.optionalBadge}>
                  <Text style={styles.optionalBadgeText}>OPTIONAL</Text>
                </View>
              )}
            </View>
            <Text style={styles.docSubtitleText}>{desc}</Text>
          </View>
          {doc ? (
            <View style={styles.uploadedPill}>
              <Check size={11} color="#059669" strokeWidth={3} />
              <Text style={styles.uploadedPillText}>LOADED</Text>
            </View>
          ) : null}
        </View>

        {doc ? (
          /* Uploaded Preview State */
          <View style={styles.previewContainer}>
            <View style={styles.previewImageWrap}>
              <Image
                source={{ uri: doc.uri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
              <View style={styles.previewOverlayBadge}>
                <Text style={styles.previewOverlayText}>{type.toUpperCase()} PHOTO</Text>
              </View>
            </View>

            <View style={styles.fileDetailsRow}>
              <Text style={styles.fileNameText} numberOfLines={1}>
                {doc.name}
              </Text>
              <Text style={styles.fileSizeText}>{doc.size}</Text>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.replaceBtn}
                onPress={() => handlePickLocalImage(type)}
                activeOpacity={0.75}>
                <RefreshCw size={12} color="#6D28D9" />
                <Text style={styles.replaceBtnText}>Replace File</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={onRemove}
                activeOpacity={0.75}>
                <Trash2 size={12} color="#DC2626" />
                <Text style={styles.removeBtnText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Empty Upload State with Local Access Pickers */
          <View style={styles.emptyUploadBox}>
            <View style={styles.emptyIconWrap}>
              <FileText size={22} color="#6D28D9" strokeWidth={2.2} />
            </View>
            <Text style={styles.emptyPrompt}>Select or capture {title}</Text>

            <View style={styles.pickerRow}>
              <TouchableOpacity
                style={styles.browseBtn}
                onPress={() => handlePickLocalImage(type)}
                activeOpacity={0.8}>
                <FolderOpen size={14} color="#FFFFFF" strokeWidth={2.2} />
                <Text style={styles.browseBtnText}>Browse Files</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cameraBtn}
                onPress={() => handleTakePhoto(type)}
                activeOpacity={0.8}>
                <Camera size={14} color="#6D28D9" strokeWidth={2.2} />
                <Text style={styles.cameraBtnText}>Camera</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.demoLinkBtn}
              onPress={() => handleLoadDemo(type)}
              activeOpacity={0.75}>
              <Text style={styles.demoLinkText}>⚡ Use Demo {type.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
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

      <Header title="Vehicle Documents" showBack />

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
            <Text style={styles.stepDoneText}>3. Licence</Text>
          </View>
          <View style={styles.stepActivePill}>
            <View style={styles.activeDot} />
            <Text style={styles.stepActiveText}>4. Vehicle RC</Text>
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
              <Text style={styles.heroBadgeText}>VAHAN COMPLIANT • VEHICLE REGISTRATION</Text>
            </View>
            <View style={styles.vahanBadge}>
              <Text style={styles.vahanBadgeText}>RTO Verified</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Upload Vehicle Documents</Text>
          <Text style={styles.heroSubtitle}>
            Submit your vehicle RC and active insurance policy to enable delivery order assignments.
          </Text>
        </View>

        {/* Documents Cards List */}
        <View style={styles.docsList}>
          {renderDocCard(
            'rc',
            'Registration Certificate (RC) *',
            'Official vehicle registration paper / smart card',
            true,
            rcDoc,
            () => setRcDoc(null)
          )}

          {renderDocCard(
            'insurance',
            'Vehicle Insurance Policy *',
            'Valid comprehensive / third-party insurance',
            true,
            insuranceDoc,
            () => setInsuranceDoc(null)
          )}

          {renderDocCard(
            'puc',
            'Pollution Under Control (PUC)',
            'Emission test certificate (Optional for EV)',
            false,
            pucDoc,
            () => setPucDoc(null)
          )}
        </View>

        {/* Notice Info Box */}
        <View style={styles.noticeBox}>
          <AlertCircle size={18} color="#7C3AED" />
          <Text style={styles.noticeText}>
            Ensure all text, vehicle registration number, and expiry dates are clearly visible.
          </Text>
        </View>

        {/* Primary Action Button */}
        <GradientButton
          title="Proceed to Bank Details"
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
  vahanBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 8,
  },
  vahanBadgeText: {
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
  docsList: {
    gap: 12,
    marginBottom: 16,
  },
  docUploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#ECE4FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  docHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  docTitleCol: {
    flex: 1,
  },
  docTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  docTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  requiredBadge: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  requiredBadgeText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#D97706',
  },
  optionalBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  optionalBadgeText: {
    fontSize: 8.5,
    fontWeight: '700',
    color: '#64748B',
  },
  docSubtitleText: {
    fontSize: 11.5,
    color: '#64748B',
  },
  uploadedPill: {
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
  uploadedPillText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#059669',
  },
  previewContainer: {
    alignItems: 'center',
  },
  previewImageWrap: {
    width: '100%',
    height: 140,
    borderRadius: 14,
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
    marginBottom: 10,
  },
  fileNameText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E1B4B',
    flex: 1,
  },
  fileSizeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  replaceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F5F3FF',
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  replaceBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6D28D9',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  removeBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  emptyUploadBox: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderWidth: 1.8,
    borderColor: '#DDD6FE',
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: '#FAF8FF',
  },
  emptyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  emptyPrompt: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E1B4B',
    marginBottom: 10,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 10,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#6D28D9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  browseBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cameraBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: '#DDD6FE',
  },
  cameraBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6D28D9',
  },
  demoLinkBtn: {
    marginTop: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  demoLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
    textDecorationLine: 'underline',
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F5F3FF',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDD6FE',
    marginBottom: 18,
  },
  noticeText: {
    fontSize: 11.5,
    color: '#5B21B6',
    flex: 1,
    lineHeight: 16,
    fontWeight: '600',
  },
  continueBtn: {
    width: '100%',
  },
});
