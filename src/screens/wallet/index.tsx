import { AppColors } from 'core/colors';
import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccordionBackground from 'components/accordion-background';
import BalanceHeader from './components/balance/index';
import HeaderWallet from './components/header';

const WalletScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AccordionBackground accordion />
      <FlatList
        contentContainerStyle={styles.scrollView}
        ListEmptyComponent={<View style={styles.body} />}
        ListHeaderComponent={
          <View>
            <BalanceHeader balance={1000000} />
            <HeaderWallet />
          </View>
        }
        data={[]}
        renderItem={() => <View />}
      />
    </SafeAreaView>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  body: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
});
