/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, View } from 'react-native';

import { AppColors } from 'core/colors';
import { styles } from './styles';

interface AccordionHooksProps {
  accordion: boolean;
  delay?: number;
  duration: number;
}

const useAccordionAnimation = ({
  accordion,
  delay = 0,
  duration,
}: AccordionHooksProps) => {
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: accordion ? 1 : 0,
      duration,
      delay,
      useNativeDriver: false,
    }).start();
  }, [accordion, delay, duration]);

  return animation.current;
};

interface AccordionBackgroundProps {
  topColor?: string;
  bottomColor?: string;
  accordion?: boolean;
}

const AccordionBackground: React.FC<AccordionBackgroundProps> = ({
  topColor = AppColors.primary,
  bottomColor,
  accordion = true,
}) => {
  if (Platform.OS === 'android') return null;

  const animation = useAccordionAnimation({
    accordion,
    duration: 100,
    delay: 120,
  });
  const flex = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, !bottomColor || topColor ? 0.5 : 1],
  });
  if (!accordion || (!topColor && !bottomColor)) return null;
  return (
    <View style={styles.container}>
      {topColor && (
        <Animated.View style={{ flex, backgroundColor: topColor }} />
      )}
      {bottomColor && (
        <Animated.View style={{ flex, backgroundColor: bottomColor }} />
      )}
    </View>
  );
};

export default AccordionBackground;
