import { AppColors } from 'core/colors';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AccordionBackground from 'components/accordion-background';
import { LocaleService } from 'domain/locale/locale.service';

const WalletScreen = () => {
  const balance = useMemo(
    () => LocaleService.formatePrice({ price: 1000000 }),
    [],
  );
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AccordionBackground accordion />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <View style={[styles.content, styles.headerUser]}>
            <View>
              <Text style={styles.title}>Olá, Jerry Smith</Text>
            </View>
            <View>
              <MaterialIcons
                name="account-circle"
                size={30}
                color={AppColors.light}
              />
            </View>
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Saldo</Text>
            <Text style={styles.balanceText}>{balance}</Text>
          </View>
        </View>
        <View style={styles.body} />
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
  header: {
    backgroundColor: AppColors.primary,
  },
  content: {
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  headerUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
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
