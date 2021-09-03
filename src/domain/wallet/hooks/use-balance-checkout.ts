import { Checkout, Offer, useWallet } from 'domain/wallet';
import { WalletErros } from '../constants';
import { WalletActions } from '../wallet.reducer';

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
