import { TextPrice } from 'components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useWallet } from 'domain/wallet/wallet.context';
import { AppColors } from 'core/colors';
import { useNavigation } from '@react-navigation/core';
import { RootRoutes } from 'navigation/routes';
import { WalletRoutes } from 'screens/wallet/routes';

const BalanceNavHeader = () => {
  const navigation = useNavigation();
  const { user, hideBalance } = useWallet();
  if (hideBalance) return null;

  const onPress = () => {
    navigation.navigate(
      RootRoutes.AppStack as never,
      {
        screen: WalletRoutes.Home,
      } as never,
    );
  };
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <TextPrice style={styles.text} price={user?.balance || 0} />
    </TouchableOpacity>
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
