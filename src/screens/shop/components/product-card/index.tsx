import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from 'core/colors';
import { LocaleService } from 'domain/locale/locale.service';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Offer } from 'domain/wallet/types';
import { ProductDetailsRoutes } from 'screens/product-details/routes';

interface Props {
  item: Offer;
}

const ProductCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation();

  const price = useMemo(
    () => LocaleService.formatePrice({ price: item.price }),
    [item.price],
  );

  const stars = useMemo(() => {
    return Array.from({ length: 5 }).map((_, index) => (
      <AntDesign
        key={`star_${index.toString()}`}
        name="star"
        size={12}
        color={AppColors.warning}
        style={styles.icon}
      />
    ));
  }, []);

  const onPress = () => {
    navigation.navigate(
      ProductDetailsRoutes.Home as never,
      { offer: item } as never,
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.viewImage}>
        <Image
          source={{ uri: item.product.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.viewDetails}>
        <Text style={styles.title}>{item.product.name}</Text>
        <View style={styles.viewStars}>{stars}</View>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  viewStars: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 3,
  },
  card: {
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
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
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  viewImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
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
