import React from 'react';
import { TCustomer } from 'domain/wallet/types';
import { useLazyQuery } from '@apollo/client';
import { WalletContext } from './wallet.context';
import {
  initialWalletState,
  WalletActions,
  walletReducer,
} from './wallet.reducer';
import { WalletQueries } from './wallet.service';

export const WalletProdovider: React.FC = ({ children }) => {
  const [getCostumer, { loading, error, data, called, refetch }] = useLazyQuery(
    WalletQueries.viewer,
  );

  const [props, dispatch] = React.useReducer(walletReducer, initialWalletState);

  const toggleSeenBalance = () => {
    dispatch({ type: WalletActions.CHANGE_SEEN_BALANCE });
  };

  const refetchWallet = async () => {
    if (called) refetch?.();
    else getCostumer();
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
        refetchWallet,
        updateCostumer,
        dispatch,
        toggleSeenBalance,
      }}>
      {children}
    </WalletContext.Provider>
  );
};
