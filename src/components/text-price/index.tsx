import React, { useMemo } from 'react';
import { Text, TextProps } from 'react-native';
import { LocaleService } from 'domain/locale/locale.service';

interface Props extends TextProps {
  price?: number;
}

const TextPrice: React.FC<Props> = ({ price, ...restProps }) => {
  const value = useMemo(
    () => LocaleService.formatePrice({ price: price || 0 }),
    [price],
  );
  return <Text {...restProps}>{value}</Text>;
};

export default TextPrice;
