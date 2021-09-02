import { TextPrice } from 'components';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useWallet } from 'domain/wallet/wallet.context';
import { AppColors } from 'core/colors';

const BalanceNavHeader = () => {
  const { user, hideBalance } = useWallet();
  if (hideBalance) return null;
  return (
    <View style={styles.button}>
      <TextPrice style={styles.text} price={user?.balance || 0} />
    </View>
  );
};

export default BalanceNavHeader;

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    backgroundColor: AppColors.primaryLight,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: AppColors.primary,
  },
});
