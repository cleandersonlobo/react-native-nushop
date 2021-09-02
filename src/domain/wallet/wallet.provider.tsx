import React from 'react';
import { Offer } from 'domain/wallet/types';
import { WalletContext } from './wallet.context';
import {
  initialWalletState,
  WalletActions,
  walletReducer,
} from './wallet.reducer';
import { WalletErros } from './constants';

export const WalletProdovider: React.FC = ({ children }) => {
  const [props, dispatch] = React.useReducer(walletReducer, initialWalletState);

  const onPressBuy = (offer: Offer) => {
    const { user } = props;
    if (user?.balance && user.balance < offer?.price) {
      return {
        status: WalletErros.WithoutBalance,
      };
    }

    if (!user) return null;
    const balance = user?.balance - offer.price;
    dispatch({
      type: WalletActions.BUY_OFFER_NOW,
      payload: {
        balance,
        offer,
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
