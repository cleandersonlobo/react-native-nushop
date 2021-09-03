import { AppColors } from 'core/colors';
import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccordionBackground from 'components/accordion-background';
import { useWallet } from 'domain/wallet/wallet.context';
import BalanceHeader from './components/balance';
import WalletHistory from './components/wallet-history';

const WalletScreen = () => {
  const { costumer, history, loading, error, getCostumer } = useWallet();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AccordionBackground accordion />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={AppColors.white}
            tintColor={AppColors.white}
            refreshing={loading}
            onRefresh={getCostumer}
          />
        }>
        <BalanceHeader balance={costumer?.balance || 0} name={costumer?.name} />
        <WalletHistory
          history={history}
          loading={loading}
          error={error}
          getCostumer={getCostumer}
        />
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
