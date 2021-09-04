import React, { useCallback, useEffect } from 'react';
import { useRouteParams } from 'navigation/hooks/useRouteParams';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { AppColors } from 'core/colors';
import { NuButton, Separator, TextPrice } from 'components';
import { MaterialIcons } from '@expo/vector-icons';
import { Offer, Checkout, useBalanceWallet } from 'domain/wallet';
import { usePurchase } from 'domain/checkout/checkout.service';
import Animated from 'react-native-reanimated';
import TransactionModal from './components/transaction-modal';
import { ProductDetailsIDs } from './types';
import { useOverlayBackground } from './hooks/use-overlay-background';

const ProductScreen = () => {
  const { onCheckout } = useBalanceWallet();

  const { purchase, loading, data } = usePurchase();

  const { offer } = useRouteParams<{ offer: Offer }>();

  const [state, setState] = React.useState({
    visible: false,
    status: '',
  });

  const overlayStyles = useOverlayBackground(state.visible);

  const [checkout] = React.useState<Checkout>({
    total: offer?.price || 0,
    quantity: 1,
  });

  const openModal = useCallback((status?: string) => {
    setState(vals => ({ status: status || vals?.status, visible: true }));
  }, []);

  const closeModal = useCallback((status?: string) => {
    setState(vals => ({
      visible: false,
      status: typeof status === 'string' ? status || vals.status : vals.status,
    }));
  }, []);

  const onPressBuyNow = () => {
    purchase(offer);
  };

  useEffect(() => {
    if (data?.purchase) {
      if (data?.purchase.success) {
        const response = onCheckout(offer, checkout);
        if (response) openModal(response.status);
      } else {
        openModal('');
      }
    }
  }, [data]);

  return (
    <>
      <Animated.View style={[styles.overlay, overlayStyles]} />
      <View style={styles.container} testID={ProductDetailsIDs.Container}>
        <TransactionModal
          visible={state.visible}
          onClose={closeModal}
          status={state.status}
          text={data?.purchase.errorMessage}
        />
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
              <TextPrice style={styles.price} price={offer?.price} />
              <Separator />
              <Text style={styles.description}>
                {offer?.product.description}
              </Text>
            </View>
            <View style={styles.viewButton}>
              <NuButton
                testID={ProductDetailsIDs.BtnBuyNow}
                variant="secondary"
                style={styles.button}
                text="Comprar agora"
                onPress={onPressBuyNow}
                loading={loading}
                rightComponent={
                  <MaterialIcons
                    name="attach-money"
                    size={24}
                    color={AppColors.white}
                  />
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: 'absolute',
    height: Dimensions.get('window').height,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  viewButton: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: AppColors.light,
  },
  button: {
    width: '100%',
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
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 24,
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
    lineHeight: 28,
    color: AppColors.darkLight,
    flexWrap: 'nowrap',
    paddingRight: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 36,
    color: AppColors.orange,
  },
});
