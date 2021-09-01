import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from 'core/colors';
import { LocaleService } from 'domain/locale/locale.service';
import { Offer } from '../../../types';

interface Props {
  item: Offer;
}

const ProductCard: React.FC<Props> = ({ item }) => {
  const price = useMemo(
    () => LocaleService.formatePrice({ price: item.price }),
    [item.price],
  );
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.viewImage}>
        <Image
          source={{ uri: item.product.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.viewDetails}>
        <Text style={styles.title}>{item.product.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.product.description}
        </Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: AppColors.white,
    shadowColor: AppColors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  viewDetails: { justifyContent: 'space-around', flex: 1 },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 24,
    color: AppColors.dark,
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    color: AppColors.darkLight,
    flexWrap: 'nowrap',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    color: AppColors.orange,
  },
});
