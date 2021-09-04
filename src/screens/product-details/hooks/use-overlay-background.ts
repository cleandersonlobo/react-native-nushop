import { useEffect } from 'react';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

const colors = ['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.1)'];

export const useOverlayBackground = (visible: boolean) => {
  const color = useSharedValue(0);

  // animation background
  useEffect(() => {
    color.value = withTiming(visible ? 1 : 0, {
      duration: 250,
      easing: Easing.linear,
    });
  }, [color.value, visible]);

  const defaultSpringStyles = useAnimatedStyle(() => {
    return {
      zIndex: visible ? 1 : 0,
      backgroundColor: interpolateColor(color.value, [0, 1], colors),
    };
  });

  return defaultSpringStyles;
};
