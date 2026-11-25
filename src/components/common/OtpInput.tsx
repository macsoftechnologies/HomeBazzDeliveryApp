import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (val: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({ length = 6, value, onChange }) => {
  const inputs = useRef<any[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  // Dynamically calculate responsive box size and spacing so 6 boxes fit on any screen size
  const totalAvailableWidth = Math.min(SCREEN_WIDTH - 64, 340);
  const gap = length > 4 ? 8 : 12;
  const boxWidth = Math.min(48, Math.max(38, Math.floor((totalAvailableWidth - (length - 1) * gap) / length)));
  const boxHeight = Math.round(boxWidth * 1.18);

  const handleChange = (text: string, index: number) => {
    // Strip non-numeric characters
    const clean = text.replace(/[^0-9]/g, '');
    const chars = value.split('');
    chars[index] = clean.slice(-1) || '';
    const newVal = chars.join('');
    onChange(newVal);

    if (clean && index < length - 1) {
      inputs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!value[index] && index > 0) {
        inputs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      }
    }
  };

  return (
    <View style={[styles.container, { gap }]}>
      {Array.from({ length }).map((_, i) => {
        const char = value[i] || '';
        const isFocused = focusedIndex === i;
        const isFilled = Boolean(char);

        return (
          <View
            key={i}
            style={[
              styles.boxWrapper,
              { width: boxWidth, height: boxHeight },
              isFilled ? styles.boxWrapperFilled : null,
              isFocused ? styles.boxWrapperActive : null,
            ]}>
            <TextInput
              ref={(ref) => {
                inputs.current[i] = ref;
              }}
              value={char}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              onFocus={() => setFocusedIndex(i)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              style={[
                styles.input,
                isFilled ? styles.inputFilled : null,
                isFocused ? styles.inputActive : null,
              ]}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 14,
  },
  boxWrapper: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  boxWrapperFilled: {
    borderColor: '#8B5CF6',
    backgroundColor: '#FAF7FF',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  boxWrapperActive: {
    borderColor: '#6D28D9',
    borderWidth: 2,
    backgroundColor: '#FAF5FF',
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    padding: 0,
  },
  inputFilled: {
    color: Colors.primary,
  },
  inputActive: {
    color: '#4318B4',
  },
});
