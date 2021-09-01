import { AppColors } from 'core/colors';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccordionBackground from 'components/accordion-background';
import BalanceHeader from './components/balance/index';

const WalletScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AccordionBackground accordion />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <BalanceHeader balance={100000000} />
        <View style={styles.body}>
          <Text style={styles.description}>Histórico</Text>
        </View>
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
  body: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.darkLight,
    lineHeight: 22,
  },
});
