import { AppColors } from 'core/colors';
import React, { useState, useMemo, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TextPrice from 'components/text-price';

interface Props {
  balance: number;
}

const BalanceHeader: React.FC<Props> = ({ balance }) => {
  const [hideBalance, setHideBalance] = useState(false);
  const icon = useMemo(() => {
    if (!hideBalance) return 'eye';
    return 'eye-slash';
  }, [hideBalance]);

  const onPressToggle = useCallback(() => {
    setHideBalance(val => !val);
  }, []);
  return (
    <View style={styles.header}>
      <View style={[styles.content, styles.headerUser]}>
        <View>
          <Text style={styles.title}>Olá, Jerry Smith</Text>
        </View>
        <TouchableOpacity onPress={onPressToggle}>
          <FontAwesome name={icon} size={30} color={AppColors.light} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Saldo disponível</Text>
        <View style={[hideBalance && styles.hidePrice]}>
          <TextPrice
            style={[styles.balanceText, hideBalance && styles.hidePriceText]}
            price={balance}
          />
        </View>
      </View>
    </View>
  );
};

export default BalanceHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: AppColors.primary,
  },
  hidePrice: {
    backgroundColor: AppColors.primaryLight,
  },
  hidePriceText: {
    color: AppColors.primaryLight,
  },
  content: {
    padding: 20,
  },

  headerUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: AppColors.light,
    lineHeight: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.white,
    lineHeight: 24,
  },
  balanceText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: AppColors.white,
    lineHeight: 42,
  },
});
