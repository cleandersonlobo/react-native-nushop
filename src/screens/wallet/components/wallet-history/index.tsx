import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WalletHistory } from 'domain/wallet/types';
import { AppColors } from 'core/colors';
import { useNavigation } from '@react-navigation/core';
import { HistoryDetailsRoute } from 'screens/history-details/routes';
import HistoryEmpty from './history-empty';
import CardHistoryItem from './card-history-item';
import WalletErrorLoad from '../wallet-error-load';

interface Props {
  history?: WalletHistory[];
  loading?: boolean;
  error?: unknown;
  getCostumer: () => void;
}

const WalletHistoryList: React.FC<Props> = ({
  history,
  loading,
  error,
  getCostumer,
}) => {
  const navigation = useNavigation();

  const renderHistory = React.useMemo(() => {
    if (!history) return null;

    return history.map(item => (
      <CardHistoryItem
        key={item?.id}
        item={item}
        onPress={() => {
          navigation.navigate(
            HistoryDetailsRoute as never,
            { history: item } as never,
          );
        }}
      />
    ));
  }, [history, navigation]);

  return (
    <>
      <View style={styles.historyView}>
        <View>
          <Text style={styles.description}>Histórico</Text>
        </View>
      </View>
      {!history && !error && <HistoryEmpty loading={loading} />}
      {error && <WalletErrorLoad onPress={getCostumer} />}
      <View style={styles.container}>{renderHistory}</View>
    </>
  );
};

export default WalletHistoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  historyView: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingVertical: 24,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    color: AppColors.dark,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});
