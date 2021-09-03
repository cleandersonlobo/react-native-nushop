import React from 'react';
import { Checkout, Offer, Customer } from 'domain/wallet/types';
import { useLazyQuery } from '@apollo/client';
import { WalletContext } from './wallet.context';
import {
  initialWalletState,
  WalletActions,
  walletReducer,
} from './wallet.reducer';
import { WalletErros } from './constants';
import { WalletQueries } from './wallet.service';

export const WalletProdovider: React.FC = ({ children }) => {
  const [getViewer, { loading, error, data, called, refetch }] = useLazyQuery(
    WalletQueries.viewer,
  );

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

  const fetchWallet = async () => {
    refetch?.();
  };

  const updateViewer = (customer: Customer) => {
    dispatch({
      type: WalletActions.SET_VIEWER,
      payload: {
        customer,
      },
    });
  };

  React.useEffect(() => {
    if (data) updateViewer(data?.viewer);
  }, [data]);

  React.useEffect(() => {
    getViewer();
  }, [getViewer]);

  return (
    <WalletContext.Provider
      value={{
        ...props,
        loading,
        called,
        error,
        fetchWallet,
        updateViewer,
        dispatch,
        onPressBuy,
        toggleSeenBalance,
      }}>
      {children}
    </WalletContext.Provider>
  );
};
