import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '@/context/AppContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="splash" />
          <Stack.Screen name="onboarding/1" />
          <Stack.Screen name="onboarding/2" />
          <Stack.Screen name="onboarding/3" />
          <Stack.Screen name="auth/welcome" />
          <Stack.Screen name="auth/register" />
          <Stack.Screen name="auth/otp" />
          <Stack.Screen name="auth/personal-details" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="verification/identity" />
          <Stack.Screen name="verification/selfie" />
          <Stack.Screen name="verification/vehicle-type" />
          <Stack.Screen name="verification/driving-licence" />
          <Stack.Screen name="verification/vehicle-documents" />
          <Stack.Screen name="verification/bank-details" />
          <Stack.Screen name="verification/document-review" />
          <Stack.Screen name="verification/status" />
          <Stack.Screen name="verification/success" />
          <Stack.Screen name="partner/permissions" />
          <Stack.Screen name="partner/training" />
          <Stack.Screen name="partner/go-online" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="orders/new-request" />
          <Stack.Screen name="orders/details" />
          <Stack.Screen name="orders/history" />
          <Stack.Screen name="pickup/navigate" />
          <Stack.Screen name="pickup/verify" />
          <Stack.Screen name="delivery/navigate" />
          <Stack.Screen name="delivery/verify" />
          <Stack.Screen name="delivery/success" />
          <Stack.Screen name="exceptions/delivery-failed" />
          <Stack.Screen name="exceptions/return-to-seller" />
          <Stack.Screen name="earnings/payouts" />
          <Stack.Screen name="profile/performance" />
          <Stack.Screen name="profile/change-password" />
          <Stack.Screen name="profile/emergency-sos" />
          <Stack.Screen name="profile/bank-account" />
          <Stack.Screen name="notifications" />
          <Stack.Screen name="support" />
          <Stack.Screen name="settings" />
        </Stack>
      </AppProvider>
    </SafeAreaProvider>
  );
}
