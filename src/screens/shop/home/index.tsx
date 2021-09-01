import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from 'core/colors';
import { MOCK_OFFERS } from './__mocks__/offers';
import ProductCard from './components/product-card/index';

const ShopHomeScreen = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerTitle}>
            <Text style={styles.title}>Ofertas</Text>
          </View>
        }
        data={MOCK_OFFERS.offers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
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
