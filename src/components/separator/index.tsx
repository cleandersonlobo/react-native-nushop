import React from 'react';
import { View } from 'react-native';

export enum SeparatorSizes {
  S = 'S',
  M = 'M',
  L = 'L',
  LX = 'LX',
}

const Sizes = {
  [SeparatorSizes.S]: 8,
  [SeparatorSizes.M]: 16,
  [SeparatorSizes.L]: 24,
  [SeparatorSizes.LX]: 32,
};

export interface SeparatorProps {
  size?: SeparatorSizes | 'S' | 'M' | 'L' | 'LX';
  horizontal?: boolean;
}

const Separator: React.FC<SeparatorProps> = ({
  size = SeparatorSizes.S,
  horizontal,
}) => {
  const value = Sizes[size];
  return <View style={horizontal ? { width: value } : { height: value }} />;
};

export default Separator;
