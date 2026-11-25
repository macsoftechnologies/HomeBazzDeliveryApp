import React from 'react';
import { ScreenWrapper } from '@/components/common/ScreenWrapper';
import { OnboardingSlider } from '@/components/common/OnboardingSlider';

export default function OnboardingScreen1() {
  return (
    <ScreenWrapper edges={['top', 'left', 'right']} backgroundColor="#FFFFFF">
      <OnboardingSlider initialIndex={0} />
    </ScreenWrapper>
  );
}
