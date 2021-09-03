import { gql, useMutation } from '@apollo/client';

import { useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import { Offer } from '../wallet/types';
import { TDataPurchase } from './types';

export const CheckoutMutations = {
  purchase: gql`
    mutation Purchase($offerId: ID!) {
      purchase(offerId: $offerId) {
        success
        errorMessage
      }
    }
  `,
};

export const usePurchase = () => {
  // const {} = useWallet();
  const [purchase, { loading, data, error }] = useMutation<TDataPurchase>(
    CheckoutMutations.purchase,
  );

  const purchaseOffer = (offer: Offer) => {
    purchase({
      variables: {
        offerId: offer.id,
      },
    });
  };

  useEffect(() => {
    if (!data && error) {
      showMessage({
        message: 'Ops, aconteceu alguma coisa errada!',
        description: 'Tente novamente!',
        type: 'danger',
        duration: 2500,
      });
    }
  }, [data, error]);

  return {
    purchase: purchaseOffer,
    loading,
    data,
    error,
  };
};
