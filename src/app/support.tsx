import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { Header } from '@/components/common/Header';
import { Colors } from '@/constants/theme';
import {
  MessageSquare,
  LifeBuoy,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react-native';

const FAQS = [
  { q: 'How are delivery payouts calculated?', a: 'Based on base distance fee + items + surge bonus.' },
  { q: 'What if a customer does not pick up phone?', a: 'Wait 5 minutes, call 3 times, then report via Delivery Failed.' },
  { q: 'How do I update my vehicle registration?', a: 'Go to Profile > Vehicle Details to upload new RC papers.' },
];

export default function HelpSupportScreen() {
  const handleChat = () => {
    Alert.alert('Partner Support Live Chat', 'Connecting to HomeBaz Partner Support desk...');
  };

  const handleTicket = () => {
    Alert.alert('Raise a Ticket', 'Support ticket form opened. Priority response within 15 minutes.');
  };

  return (
    <ScreenWrapper scrollable>
      <Header title="Help & Support" showBack />

      <View style={styles.content}>
        {/* Support Action Cards */}
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard} onPress={handleChat} activeOpacity={0.8}>
            <View style={styles.iconCircle}>
              <MessageSquare size={22} color={Colors.primary} />
            </View>
            <Text style={styles.actionTitle}>Chat with Support</Text>
            <Text style={styles.actionSub}>Instant partner help</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleTicket} activeOpacity={0.8}>
            <View style={styles.iconCircle}>
              <LifeBuoy size={22} color={Colors.primary} />
            </View>
            <Text style={styles.actionTitle}>Raise a Ticket</Text>
            <Text style={styles.actionSub}>Report order issues</Text>
          </TouchableOpacity>
        </View>

        {/* Emergency SOS Banner */}
        <TouchableOpacity
          style={styles.sosCard}
          onPress={() => router.push('/profile/emergency-sos')}
          activeOpacity={0.85}>
          <ShieldAlert size={24} color="#FFFFFF" />
          <View style={styles.sosMeta}>
            <Text style={styles.sosTitle}>Emergency SOS Assistance</Text>
            <Text style={styles.sosSub}>Road accident or medical safety hotline</Text>
          </View>
          <ChevronRight size={18} color="#FFFFFF" />
        </TouchableOpacity>

        {/* FAQs */}
        <View style={styles.faqSection}>
          <Text style={styles.faqHeading}>Frequently Asked Questions</Text>
          <View style={styles.faqList}>
            {FAQS.map((item, idx) => (
              <View key={idx} style={styles.faqItem}>
                <View style={styles.faqQRow}>
                  <HelpCircle size={16} color={Colors.primary} />
                  <Text style={styles.faqQuestion}>{item.q}</Text>
                </View>
                <Text style={styles.faqAnswer}>{item.a}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 18,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primaryText,
    textAlign: 'center',
  },
  actionSub: {
    fontSize: 11,
    color: Colors.secondaryText,
    marginTop: 2,
    textAlign: 'center',
  },
  sosCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  sosMeta: {
    flex: 1,
    marginLeft: 12,
  },
  sosTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sosSub: {
    fontSize: 12,
    color: '#FFE2E0',
    marginTop: 2,
  },
  faqSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  faqHeading: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.primaryText,
    marginBottom: 14,
  },
  faqList: {
    gap: 14,
  },
  faqItem: {
    backgroundColor: '#FAF9FF',
    borderRadius: 14,
    padding: 14,
  },
  faqQRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  faqQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primaryText,
    flex: 1,
  },
  faqAnswer: {
    fontSize: 12,
    color: Colors.secondaryText,
    lineHeight: 18,
    marginLeft: 24,
  },
});
