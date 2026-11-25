import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { GradientButton } from '@/components/common/GradientButton';
import { Colors } from '@/constants/theme';
import { CheckCircle2, Bike, HeartHandshake, ShieldAlert, Award, PackageCheck } from 'lucide-react-native';

const GUIDELINES = [
  {
    id: '1',
    text: 'Accept orders promptly to keep delivery times under 25 minutes.',
    icon: Bike,
  },
  {
    id: '2',
    text: 'Pick up items carefully from HomeBaz verified sellers on time.',
    icon: PackageCheck,
  },
  {
    id: '3',
    text: 'Deliver politely to customer doorsteps with high customer satisfaction.',
    icon: HeartHandshake,
  },
  {
    id: '4',
    text: 'Keep food & packages in proper insulated delivery bags.',
    icon: Award,
  },
  {
    id: '5',
    text: 'Follow local road safety, helmet mandates, and speed limits.',
    icon: ShieldAlert,
  },
];

export default function TrainingSafetyScreen() {
  return (
    <ScreenWrapper scrollable>
      <Header title="Partner Guidelines" showBack />

      <View style={styles.content}>
        <View style={styles.topIllustration}>
          <View style={styles.circle}>
            <Bike size={54} color={Colors.primary} />
          </View>
          <Text style={styles.guideTitle}>Delivery Partner Code of Conduct</Text>
          <Text style={styles.guideSub}>
            Delivering happiness door to door requires punctuality, politeness, and safety.
          </Text>
        </View>

        <View style={styles.cardList}>
          {GUIDELINES.map((item) => {
            return (
              <View key={item.id} style={styles.guidelineRow}>
                <View style={styles.checkCircle}>
                  <CheckCircle2 size={20} color={Colors.success} />
                </View>
                <Text style={styles.guidelineText}>{item.text}</Text>
              </View>
            );
          })}
        </View>

        <GradientButton
          title="Got It, Start Delivering"
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.continueBtn}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flex: 1,
  },
  topIllustration: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primaryText,
    textAlign: 'center',
    marginBottom: 6,
  },
  guideSub: {
    fontSize: 13,
    color: Colors.secondaryText,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 18,
  },
  cardList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    gap: 14,
    marginBottom: 24,
  },
  guidelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guidelineText: {
    flex: 1,
    fontSize: 14,
    color: Colors.primaryText,
    fontWeight: '600',
    lineHeight: 19,
  },
  continueBtn: {
    marginTop: 'auto',
  },
});
