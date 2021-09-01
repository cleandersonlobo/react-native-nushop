import React from 'react';
import { useRouteParams } from 'navigation/hooks/useRouteParams';
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { AppColors } from 'core/colors';
import TextPrice from 'components/text-price';
import { Offer } from '../types';

const ProductScreen = () => {
  const { offer } = useRouteParams<{ offer?: Offer }>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.viewImage}>
          <Image
            source={{ uri: offer?.product?.image }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.body}>
          <View>
            <Text style={styles.title}>{offer?.product.name}</Text>
            <Text style={styles.description}>{offer?.product.description}</Text>
            <TextPrice style={styles.price} price={offer?.price} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  image: { width: '100%', height: 250 },
  viewImage: {
    padding: 10,
  },
  scroll: {
    flexGrow: 1,
  },
  body: {
    flex: 1,
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: AppColors.shadowColor,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 42,
    color: AppColors.dark,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: AppColors.darkLight,
    flexWrap: 'nowrap',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 36,
    color: AppColors.orange,
  },
});
