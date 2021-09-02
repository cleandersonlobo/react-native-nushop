import React, { useMemo } from 'react';
import { Text, TextProps } from 'react-native';
import { LocaleService } from 'domain/locale/locale.service';

interface Props extends TextProps {
  price?: number;
  leftPriceText?: string;
  rightPriceText?: string;
}

const TextPrice: React.FC<Props> = ({
  price,
  leftPriceText = '',
  rightPriceText = '',
  ...restProps
}) => {
  const value = useMemo(
    () => LocaleService.formatePrice({ price: price || 0 }),
    [price],
  );
  return (
    <Text {...restProps}>
      {leftPriceText}
      {value}
      {rightPriceText}
    </Text>
  );
};

export default TextPrice;
