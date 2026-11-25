import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bike, Package, Wallet, User } from 'lucide-react-native';

interface TabScreenLoaderProps {
  visible: boolean;
  tabName: 'home' | 'orders' | 'earnings' | 'profile';
  title?: string;
  subtitle?: string;
}

const TAB_CONFIGS = {
  home: {
    title: 'Loading Home...',
    icon: Bike,
  },
  orders: {
    title: 'Loading Orders...',
    icon: Package,
  },
  earnings: {
    title: 'Loading Earnings...',
    icon: Wallet,
  },
  profile: {
    title: 'Loading Profile...',
    icon: User,
  },
};

export function TabScreenLoader({
  visible,
  tabName,
  title,
}: TabScreenLoaderProps) {
  const config = TAB_CONFIGS[tabName] || TAB_CONFIGS.home;
  const displayTitle = title || config.title;
  const IconComponent = config.icon;

  // Animations
  const [spinAnim] = useState(() => new Animated.Value(0));
  const [scaleAnim] = useState(() => new Animated.Value(0.92));
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [progressAnim] = useState(() => new Animated.Value(0));
  const [dotPulse1] = useState(() => new Animated.Value(0.6));
  const [dotPulse2] = useState(() => new Animated.Value(0.6));
  const [dotPulse3] = useState(() => new Animated.Value(0.6));
  const [dotPulse4] = useState(() => new Animated.Value(0.6));

  useEffect(() => {
    if (visible) {
      // 1. Fade & Scale In
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 7,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();

      // 2. Continuous 360 Spin
      const spinLoop = Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinLoop.start();

      // 3. Multi-color Progress Sweep
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();

      // 4. Staggered Multi-Color Dots Pulse
      const createDotLoop = (anim: Animated.Value, delay: number) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(anim, {
              toValue: 1.25,
              duration: 280,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0.6,
              duration: 280,
              useNativeDriver: true,
            }),
          ])
        );
      };

      const dot1 = createDotLoop(dotPulse1, 0);
      const dot2 = createDotLoop(dotPulse2, 90);
      const dot3 = createDotLoop(dotPulse3, 180);
      const dot4 = createDotLoop(dotPulse4, 270);

      dot1.start();
      dot2.start();
      dot3.start();
      dot4.start();

      return () => {
        spinLoop.stop();
        dot1.stop();
        dot2.stop();
        dot3.stop();
        dot4.stop();
      };
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }).start();
      progressAnim.setValue(0);
    }
  }, [visible, fadeAnim, scaleAnim, spinAnim, progressAnim, dotPulse1, dotPulse2, dotPulse3, dotPulse4]);

  if (!visible) return null;

  const spinInterpolate = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      statusBarTranslucent>
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.cardContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          {/* Multi-Color Gradient Outer Border */}
          <LinearGradient
            colors={['#7C3AED', '#EC4899', '#3B82F6', '#10B981', '#F59E0B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorderWrap}>
            <View style={styles.cardInner}>
              {/* Compact Multi-Color Spinning Ring with Center Tab Icon */}
              <View style={styles.iconCenterWrapper}>
                <Animated.View
                  style={[
                    styles.spinningRing,
                    { transform: [{ rotate: spinInterpolate }] },
                  ]}>
                  <LinearGradient
                    colors={['#7C3AED', '#EC4899', '#3B82F6', '#10B981']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.ringGradient}
                  />
                </Animated.View>

                {/* Inner Icon Cutout */}
                <View style={styles.innerIconCircle}>
                  <IconComponent size={14} color="#6D28D9" strokeWidth={2.6} />
                </View>
              </View>

              {/* Short Compact Title */}
              <Text style={styles.titleText} numberOfLines={1}>
                {displayTitle}
              </Text>

              {/* Mini Multi-Color Animated Progress Bar */}
              <View style={styles.progressBarTrack}>
                <Animated.View
                  style={[
                    styles.progressBarFill,
                    { width: progressWidth },
                  ]}>
                  <LinearGradient
                    colors={['#7C3AED', '#EC4899', '#3B82F6', '#10B981']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                  />
                </Animated.View>
              </View>

              {/* 4 Multi-Color Tiny Pulsing Dots */}
              <View style={styles.dotsRow}>
                <Animated.View
                  style={[
                    styles.colorDot,
                    { backgroundColor: '#7C3AED', transform: [{ scale: dotPulse1 }] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.colorDot,
                    { backgroundColor: '#EC4899', transform: [{ scale: dotPulse2 }] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.colorDot,
                    { backgroundColor: '#38BDF8', transform: [{ scale: dotPulse3 }] },
                  ]}
                />
                <Animated.View
                  style={[
                    styles.colorDot,
                    { backgroundColor: '#34D399', transform: [{ scale: dotPulse4 }] },
                  ]}
                />
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: 140,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 12,
    elevation: 10,
  },
  gradientBorderWrap: {
    padding: 2,
    borderRadius: 18,
  },
  cardInner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  iconCenterWrapper: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  spinningRing: {
    width: 38,
    height: 38,
    borderRadius: 19,
    padding: 2.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 19,
  },
  innerIconCircle: {
    position: 'absolute',
    width: 29,
    height: 29,
    borderRadius: 14.5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  titleText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E1B4B',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  progressBarTrack: {
    width: '75%',
    height: 3,
    backgroundColor: '#F1F5F9',
    borderRadius: 1.5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 1.5,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4.5,
  },
  colorDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
});
