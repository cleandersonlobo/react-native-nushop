import { WalletErros } from '../constants';
import { useWallet } from '../wallet.context';
import { WalletActions } from '../wallet.reducer';
import { Checkout, Offer } from '../types';

export const useBalanceWallet = () => {
  const { costumer, dispatch } = useWallet();

  const onCheckout = (offer: Offer, checkout: Checkout) => {
    if (!costumer) return null;
    if (costumer?.balance < checkout?.total) {
      return {
        status: WalletErros.WithoutBalance,
      };
    }

    const balance = costumer?.balance - checkout.total;
    dispatch({
      type: WalletActions.BUY_OFFER_NOW,
      payload: {
        balance,
        offer,
        checkout,
      },
    });
    return {
      status: WalletErros.Success,
    };
  };

  return {
    onCheckout,
  };
};
