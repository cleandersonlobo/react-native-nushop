import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  TextProps,
  View,
} from 'react-native';
import { AppColors } from 'core/colors';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  text?: string;
  textStyles?: TextProps['style'];
  rightComponent?: React.ReactNode | React.ReactNode[];
  fullWidth?: boolean;
}

type ButtonProps = TouchableOpacityProps & Props;

const NuButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  style,
  text,
  textStyles,
  fullWidth,
  rightComponent,
  ...restProps
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
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyles.button,
        style,
        fullWidth && styles.fullWidth,
      ]}
      {...restProps}>
      <View style={styles.rightCol}>{rightComponent}</View>
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
    color: AppColors.white,
  },
  fullWidth: {
    width: '100%',
  },
  textSecondary: {
    color: AppColors.white,
  },
  textOutline: {
    color: AppColors.primary,
  },
  primary: {
    backgroundColor: AppColors.orange,
  },
  secondary: {
    backgroundColor: AppColors.secondary,
  },
  outline: {
    backgroundColor: AppColors.white,
    borderWidth: 1,
    borderColor: AppColors.primary,
  },
  rightCol: {
    left: 32,
    position: 'absolute',
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
