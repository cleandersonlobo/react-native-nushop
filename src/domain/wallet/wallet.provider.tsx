import React from 'react';
import { Checkout, Offer } from 'domain/wallet/types';
import { WalletContext } from './wallet.context';
import {
  initialWalletState,
  WalletActions,
  walletReducer,
} from './wallet.reducer';
import { WalletErros } from './constants';

export const WalletProdovider: React.FC = ({ children }) => {
  const [props, dispatch] = React.useReducer(walletReducer, initialWalletState);

  const onPressBuy = (offer: Offer, checkout: Checkout) => {
    const { user } = props;
    if (!user) return null;
    if (user?.balance < checkout?.total) {
      return {
        status: WalletErros.WithoutBalance,
      };
    }

    const balance = user?.balance - checkout.total;
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

  const toggleSeenBalance = () => {
    dispatch({ type: WalletActions.CHANGE_SEEN_BALANCE });
  };
  return (
    <WalletContext.Provider
      value={{ ...props, dispatch, onPressBuy, toggleSeenBalance }}>
      {children}
    </WalletContext.Provider>
  );
};
