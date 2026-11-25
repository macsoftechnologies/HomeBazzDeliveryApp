import { Colors } from '@/constants/theme';
import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

interface HomeBazzLogoProps {
  size?: 'mini' | 'small' | 'medium' | 'large' | 'xlarge';
  lightMode?: boolean;
  showSubtitle?: boolean;
  subtitle?: string;
  showTagline?: boolean;
  tagline?: string;
  animated?: boolean;
  style?: ViewStyle;
}

export const HomeBazzLogo: React.FC<HomeBazzLogoProps> = ({
  size = 'medium',
  lightMode = false,
  showSubtitle = true,
  subtitle = 'Delivery App',
  showTagline = false,
  tagline = 'Delivering Happiness, Door to Door',
  style,
}) => {
  // Dimensions based on size (original logo aspect ratio is ~1018:792 = 1.285)
  const dimensions = {
    mini: { width: 80, height: 42, subSize: 7 },
    small: { width: 95, height: 55, subSize: 8 },
    medium: { width: 160, height: 120, subSize: 11 },
    large: { width: 220, height: 172, subSize: 12 },
    xlarge: { width: 280, height: 218, subSize: 13 },
  }[size];

  return (
    <View style={[styles.container, style]}>
      {/* If lightMode is true (e.g. on purple gradient splash background), wrap in a clean white rounded card so the official logo colors pop perfectly */}
      {lightMode ? (
        <View style={styles.lightContainer}>
          <View style={styles.whiteCardBadge}>
            <Image
              source={require('@/assets/images/homebazz_logo.png')}
              style={{
                width: dimensions.width * 0.85,
                height: dimensions.height * 0.85,
              }}
              resizeMode="contain"
            />
          </View>
          {showSubtitle && (
            <View style={styles.lightSubtitleWrap}>
              <Text style={styles.lightSubtitleText}>
                {showTagline ? tagline : subtitle}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.standardContainer}>
          <Image
            source={require('@/assets/images/homebazz_logo.png')}
            style={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            resizeMode="contain"
          />
          {showSubtitle && (
            <View style={styles.subtitlePill}>
              <Text style={styles.subtitleText}>
                {showTagline ? tagline : subtitle}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export const HomeBazLogo = HomeBazzLogo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  standardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteCardBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  lightSubtitleWrap: {
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lightSubtitleText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  subtitlePill: {
    marginTop: 2,
    backgroundColor: '#F3EEFF',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 8,
  },
  subtitleText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
