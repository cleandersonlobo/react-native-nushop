import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TextProps,
} from 'react-native';
import { AppColors } from 'core/colors';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  text?: string;
  textStyles?: TextProps['style'];
}

type ButtonProps = TouchableOpacityProps & Props;

const NuButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  style,
  text,
  textStyles,
}) => {
  const buttonStyles = useMemo(() => {
    switch (variant) {
      case 'outline':
        return {
          button: styles.outline,
          text: styles.textOutline,
        };
      case 'secondary':
        return {
          button: styles.secondary,
          text: styles.textSecondary,
        };
      default:
        return {
          button: styles.primary,
          text: {},
        };
    }
  }, [variant]);
  return (
    <TouchableOpacity style={[styles.button, buttonStyles.button, style]}>
      <Text style={[styles.buttonText, buttonStyles.text, textStyles]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default NuButton;

const styles = StyleSheet.create({
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: AppColors.primary,
  },
  textSecondary: {
    color: AppColors.white,
  },
  textOutline: {
    color: AppColors.orange,
  },
  primary: {
    backgroundColor: AppColors.primaryLight,
  },
  secondary: {
    backgroundColor: AppColors.secondary,
  },
  outline: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.orange,
  },
  button: {
    paddingHorizontal: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});
