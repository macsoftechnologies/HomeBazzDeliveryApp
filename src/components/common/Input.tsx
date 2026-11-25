import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  prefix?: string;
  containerStyle?: object;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  prefix,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputBox, error ? styles.inputError : null]}>
        {prefix ? <Text style={styles.prefixText}>{prefix}</Text> : null}
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
        <TextInput
          placeholderTextColor="#A0A4B8"
          style={styles.textInput}
          {...props}
        />
        {rightIcon ? (
          <TouchableOpacity
            disabled={!onRightIconPress}
            onPress={onRightIconPress}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            style={styles.rightIcon}>
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
  },
  inputError: {
    borderColor: Colors.error,
  },
  prefixText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginRight: 8,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
    padding: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.primaryText,
    paddingVertical: 8,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
  },
});
