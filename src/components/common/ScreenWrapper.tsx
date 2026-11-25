import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  backgroundColor?: string;
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  backgroundColor = Colors.background,
  edges = ['top', 'left', 'right'],
}) => {
  return (
    <SafeAreaView
      edges={edges}
      style={[styles.safeArea, { backgroundColor }, style]}>
      <StatusBar style={backgroundColor === Colors.primary ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}>
        {scrollable ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.scrollContent, contentContainerStyle]}>
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.staticContent, contentContainerStyle]}>
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  staticContent: {
    flex: 1,
  },
});
