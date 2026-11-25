import React from 'react';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { OnboardingSlider } from '@/components/common/OnboardingSlider';

export default function OnboardingScreen2() {
  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      <OnboardingSlider initialIndex={1} />
    </ScreenWrapper>
  );
}
