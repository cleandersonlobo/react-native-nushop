import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { AppColors } from 'core/colors';
import Separator, { SeparatorSizes } from 'components/separator';
import { WalletTestIDs } from 'screens/wallet/types';

interface Props {
  loading?: boolean;
}

const HistoryEmpty: React.FC<Props> = ({ loading }) => {
  return (
    <View style={styles.container} testID={WalletTestIDs.WalletHistoryEmpty}>
      <View style={styles.content}>
        <SimpleLineIcons name="wallet" size={32} color={AppColors.darkLight} />
        <Separator size={SeparatorSizes.M} />
        {loading ? (
          <>
            <Text style={styles.text}>Carregando dados da carteira...</Text>
            <ActivityIndicator size={32} color={AppColors.darkLight} />
          </>
        ) : (
          <>
            <Text style={styles.text}>Você ainda não fez nenhuma compra.</Text>
            <Text style={styles.text}>Suas atividades aprecerão aqui.</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default HistoryEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    top: '-20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    width: '100%',
  },
  text: {
    fontSize: 14,
    color: AppColors.darkLight,
    lineHeight: 24,
  },
});
