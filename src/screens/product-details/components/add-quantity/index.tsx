import { AppColors } from 'core/colors';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Offer, Checkout } from 'domain/wallet/types';
import { AntDesign } from '@expo/vector-icons';
import { TextPrice } from 'components';

interface Props {
  offer: Offer;
  checkout: Checkout;
  setCheckout: React.Dispatch<React.SetStateAction<Checkout>>;
}
// TODO: Option to buy more than one offer
const AddQuantity: React.FC<Props> = ({ offer, checkout, setCheckout }) => {
  const increaseQuantity = React.useCallback(() => {
    setCheckout(vals => ({
      quantity: vals.quantity + 1,
      total: (vals.quantity + 1) * offer.price,
    }));
  }, [offer.price, setCheckout]);
  const decreaseQuantity = React.useCallback(() => {
    setCheckout(vals =>
      vals.quantity === 1
        ? vals
        : {
            quantity: vals.quantity - 1,
            total: (vals.quantity - 1) * offer.price,
          },
    );
  }, [offer.price, setCheckout]);
  return (
    <View style={styles.viewCheckout}>
      <View style={styles.viewQuantity}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <AntDesign name="minuscircleo" size={30} color={AppColors.primary} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{checkout.quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity}>
          <AntDesign name="pluscircleo" size={30} color={AppColors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.totalPrice}>
        <TextPrice
          numberOfLines={1}
          style={styles.totalPriceText}
          price={checkout.total}
        />
      </View>
    </View>
  );
};

export default AddQuantity;

const styles = StyleSheet.create({
  viewCheckout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  viewQuantity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalPrice: {
    marginLeft: 8,
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  totalPriceText: {
    fontSize: 18,
    lineHeight: 24,
    color: AppColors.dark,
  },
  quantityText: {
    fontSize: 16,
    lineHeight: 18,
  },
});
