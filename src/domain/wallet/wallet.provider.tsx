import React from 'react';
import { Checkout, Offer, TCustomer } from 'domain/wallet/types';
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
  const [getCostumer, { loading, error, data, called, refetch }] = useLazyQuery(
    WalletQueries.viewer,
  );

  const [props, dispatch] = React.useReducer(walletReducer, initialWalletState);

  const onPressBuy = (offer: Offer, checkout: Checkout) => {
    const { costumer } = props;
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

  const toggleSeenBalance = () => {
    dispatch({ type: WalletActions.CHANGE_SEEN_BALANCE });
  };

  const fetchWallet = async () => {
    refetch?.();
  };

  const updateCostumer = (customer: TCustomer) => {
    dispatch({
      type: WalletActions.SET_VIEWER,
      payload: {
        customer,
      },
    });
  };

  React.useEffect(() => {
    if (data) updateCostumer(data?.viewer);
  }, [data]);

  // run when opening the APP
  React.useEffect(() => {
    getCostumer();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        ...props,
        loading,
        called,
        error,
        getCostumer,
        fetchWallet,
        updateCostumer,
        dispatch,
        onPressBuy,
        toggleSeenBalance,
      }}>
      {children}
    </WalletContext.Provider>
  );
};
