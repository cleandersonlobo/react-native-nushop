import { AppColors } from 'core/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TextPrice from 'components/text-price';

interface Props {
  balance: number;
}

const BalanceHeader: React.FC<Props> = ({ balance }) => {
  return (
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
        <TextPrice style={styles.balanceText} price={balance} />
      </View>
    </View>
  );
};

export default BalanceHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: AppColors.primary,
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
