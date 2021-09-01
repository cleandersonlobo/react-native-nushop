import React from 'react';
import { Easing, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppColors } from 'core/colors';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

export const AnimationSpec: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 150,
    easing: Easing.out(Easing.poly(4)),
  },
};

export const transitionSpec = {
  open: AnimationSpec,
  close: AnimationSpec,
};

export const defaultScreenOtions = {
  headerStyle: {
    borderBottomWidth: 0,
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  headerLeftContainerStyle: {
    paddingLeft: 5,
  },
  headerBackTitleVisible: false,
  headerTintColor: AppColors.secondary,
  headerBackImage: () =>
    Platform.select({
      ios: (
        <Ionicons
          name="chevron-back-outline"
          size={32}
          color={AppColors.dark}
        />
      ),
      android: <Ionicons name="arrow-back" size={32} color={AppColors.dark} />,
    }),
};
