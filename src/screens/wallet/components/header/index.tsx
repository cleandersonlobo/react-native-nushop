import { AppColors } from 'core/colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HeaderWallet = () => {
  return (
    <View style={styles.historyView}>
      <View>
        <Text style={styles.description}>Histórico</Text>
      </View>
      <View style={styles.indicator} />
    </View>
  );
};

export default HeaderWallet;

const styles = StyleSheet.create({
  historyView: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingVertical: 24,
  },
  indicator: {
    marginTop: 8,
    height: 1,
    backgroundColor: AppColors.light,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.dark,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});
