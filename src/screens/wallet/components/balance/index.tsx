import { AppColors } from 'core/colors';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TextPrice from 'components/text-price';
import { WalletTestIDs } from 'screens/wallet/types';

interface Props {
  balance: number;
  name?: string;
  hideBalance?: boolean;
  toggleSeenBalance?: () => void;
}

const BalanceHeader: React.FC<Props> = ({
  balance,
  name,
  hideBalance,
  toggleSeenBalance,
}) => {
  const icon = useMemo(() => {
    if (!hideBalance) return 'eye';
    return 'eye-slash';
  }, [hideBalance]);

  return (
    <View style={styles.header} testID={WalletTestIDs.BalanceContainer}>
      <View style={[styles.content, styles.headerUser]}>
        <View>
          <Text style={styles.title}>Olá{name ? `, ${name}` : ''}</Text>
        </View>
        <TouchableOpacity
          onPress={toggleSeenBalance}
          testID={WalletTestIDs.BtnToggleSeenBalance}>
          <FontAwesome name={icon} size={30} color={AppColors.light} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Saldo disponível</Text>
        <View style={[hideBalance && styles.hidePrice]}>
          {!hideBalance && (
            <TextPrice
              testID={WalletTestIDs.Balance}
              style={styles.balanceText}
              price={balance}
              numberOfLines={1}
            />
          )}
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
    height: 42,
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
