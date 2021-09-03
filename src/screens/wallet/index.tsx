import { AppColors } from 'core/colors';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccordionBackground from 'components/accordion-background';
import { useWallet } from 'domain/wallet/wallet.context';
import BalanceHeader from './components/balance';
import WalletHistory from './components/wallet-history';

const WalletScreen = () => {
  const { user, history, loading } = useWallet();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AccordionBackground accordion />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <BalanceHeader balance={user?.balance || 0} name={user?.name} />
        <WalletHistory history={history} loading={loading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  scrollView: {
    flexGrow: 1,
  },
});
