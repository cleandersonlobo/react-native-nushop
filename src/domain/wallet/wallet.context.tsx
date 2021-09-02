import { createContext, useContext } from 'react';
import { IWalletState } from './wallet.reducer';

export const WalletContext = createContext({} as IWalletState);

export const useWallet = () => {
  const context = useContext(WalletContext);

  return context;
};
