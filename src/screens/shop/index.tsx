import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from 'core/colors';
import { useWallet } from 'domain/wallet/wallet.context';
import ProductCard from './components/product-card';
import OffersEmpty from './components/offers-empty';
import { ShopTestIDS } from './types';

const ShopHomeScreen = () => {
  const { offers, loading, refetchWallet } = useWallet();
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FlatList
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Ofertas</Text>
          </View>
        }
        ListEmptyComponent={<OffersEmpty />}
        refreshing={loading}
        onRefresh={refetchWallet}
        data={offers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard testID={ShopTestIDS.ProductCard} item={item} />
        )}
      />
    </SafeAreaView>
  );
};

export default ShopHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
  },
  headerTitle: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
