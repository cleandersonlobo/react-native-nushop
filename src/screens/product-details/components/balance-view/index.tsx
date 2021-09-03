import { TextPrice } from 'components';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useWallet } from 'domain/wallet/wallet.context';
import { AppColors } from 'core/colors';
import { useNavigation } from '@react-navigation/native';
import { RootRoutes } from 'navigation/routes';
import { WalletRoutes } from 'screens/wallet/routes';

const BalanceNavHeader = () => {
  const navigation = useNavigation();
  const { costumer, hideBalance } = useWallet();
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
      <Text style={styles.label}>Saldo</Text>
      <TextPrice style={styles.text} price={costumer?.balance || 0} />
    </TouchableOpacity>
  );
};

export default BalanceNavHeader;

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    backgroundColor: AppColors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  text: {
    color: AppColors.primary,
  },
  label: {
    fontSize: 8,
    color: AppColors.dark,
  },
});
