import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WalletHistory } from 'domain/wallet/types';
import { Feather } from '@expo/vector-icons';
import { TextPrice } from 'components';
import { AppColors } from 'core/colors';
import { formatHistoryDate } from 'domain/shared/utils/format-date';

interface Props {
  onPress?: () => void;
  item: WalletHistory;
}

const CardHistoryItem: React.FC<Props> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftCol}>
        <View style={styles.circleIcon}>
          <Feather name="shopping-bag" size={20} color={AppColors.darkLight} />
        </View>
      </View>
      <View style={styles.viewDetails}>
        <Text style={styles.title}>Compra na loja</Text>
        <Text style={styles.subtitle}>
          {item?.quantity > 1 ? `${item?.quantity}x ` : ''}
          {item?.offer?.product?.name}
        </Text>
        <TextPrice style={styles.subtitle} price={item?.total || 0} />
      </View>
      <View style={styles.viewDate}>
        <Text style={styles.subtitle}>
          {formatHistoryDate(item?.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardHistoryItem;

const styles = StyleSheet.create({
  viewDate: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
    borderBottomColor: AppColors.light,
    borderBottomWidth: 1,
    backgroundColor: AppColors.white,
  },
  viewDetails: {
    flex: 2,
  },
  leftCol: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleIcon: {
    height: 48,
    width: 48,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.light,
  },
  title: {
    fontSize: 15,
    color: AppColors.dark,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: AppColors.darkLight,
    lineHeight: 24,
    letterSpacing: 0.4,
  },
});
