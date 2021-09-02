import React from 'react';
import { WalletContext } from './wallet.context';
import { initialWalletState, walletReducer } from './wallet.reducer';

export const WalletProdovider: React.FC = ({ children }) => {
  const [props, dispatch] = React.useReducer(walletReducer, initialWalletState);
  return (
    <WalletContext.Provider value={{ ...props, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};
