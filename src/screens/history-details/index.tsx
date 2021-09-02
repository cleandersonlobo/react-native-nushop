import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouteParams } from 'navigation/hooks/useRouteParams';
import { WalletHistory } from 'domain/wallet/types';
import { AppColors } from 'core/colors';
import { useNavigation } from '@react-navigation/core';
import { AntDesign, Feather } from '@expo/vector-icons';
import { formatHistoryDate } from 'domain/shared/utils/format-date';
import { Separator, TextPrice } from 'components';
import { SeparatorSizes } from 'components/separator';

const HistoryDetailsScreen = () => {
  const navigation = useNavigation();
  const { history } = useRouteParams<{ history?: WalletHistory }>();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.viewBtnClose}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerViewText}>
          <Text style={styles.headerTitle}>Compra na loja</Text>
        </View>
        <View style={styles.iconFloat}>
          <View style={styles.circleIcon}>
            <Feather name="shopping-bag" size={20} color={AppColors.primary} />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Separator size={SeparatorSizes.L} />
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{ uri: history?.offer.product.image || '' }}
          />
        </View>
        <Text style={styles.dateString}>
          {formatHistoryDate(history?.createdAt, 'dd MMM yyyy, hh:mm')}
        </Text>
        <Text style={styles.text}>{history?.offer.product.name}</Text>
        <TextPrice style={styles.price} price={history?.offer?.price} />
      </View>
    </View>
  );
};

export default HistoryDetailsScreen;

const styles = StyleSheet.create({
  iconFloat: {
    position: 'absolute',
    bottom: -24,
    zIndex: 2,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  circleIcon: {
    height: 48,
    width: 48,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.primaryLight,
  },
  imageView: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: AppColors.white,
    shadowColor: AppColors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  content: {
    flex: 1,
    backgroundColor: AppColors.white,
    padding: 20,
    alignItems: 'center',
    zIndex: -1,
  },
  dateString: {
    color: AppColors.darkLight,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 32,
    color: AppColors.white,
    fontWeight: 'bold',
  },
  headerViewText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnClose: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    height: 150,
    backgroundColor: AppColors.primary,
  },
  text: {
    fontSize: 24,
    lineHeight: 48,
    color: AppColors.dark,
    fontWeight: '500',
  },
  price: {
    fontSize: 20,
    lineHeight: 48,
    color: AppColors.dark,
    fontWeight: '400',
  },
});
