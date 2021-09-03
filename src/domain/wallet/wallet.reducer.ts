import uuid from 'domain/shared/uuid';
import { Reducer } from 'react';
import { Checkout, TCustomer } from 'domain/wallet/types';
import { Wallet, Offer } from './types';

export enum WalletActions {
  SET_VIEWER = 'WalletActions::SET_VIEWER',
  CHANGE_SEEN_BALANCE = 'WalletActions::CHANGE_SEEN_BALANCE',
  BUY_OFFER_NOW = 'WalletActions::BUY_OFFER_NOW',
}

export type IWalletActionsType =
  | {
      type: WalletActions.BUY_OFFER_NOW;
      payload: {
        offer: Offer;
        balance: number;
        checkout: Checkout;
      };
    }
  | {
      type: WalletActions.SET_VIEWER;
      payload: {
        customer: TCustomer;
      };
    }
  | {
      type: WalletActions.CHANGE_SEEN_BALANCE;
      payload?: unknown;
    };

export interface WalletState extends Wallet {
  hideBalance: boolean;
  offers?: TCustomer['offers'];
}

export interface WalletProdovider {
  loading: boolean;
  called: boolean;
  error?: unknown;
  dispatch: React.Dispatch<IWalletActionsType>;
  onPressBuy: (offer: Offer, checkout: Checkout) => null | { status: string };
  toggleSeenBalance: () => void;
  fetchWallet: () => void;
  getCostumer: () => void;
  updateCostumer: (customer: TCustomer) => void;
}

export type IWalletState = WalletState & WalletProdovider;

export const initialWalletState = {
  hideBalance: false,
};

export const walletReducer: Reducer<WalletState, IWalletActionsType> = (
  state = initialWalletState,
  action: IWalletActionsType,
) => {
  switch (action.type) {
    case WalletActions.SET_VIEWER:
      const { offers, ...costumer } = action.payload.customer;
      return {
        ...state,
        costumer,
        offers,
      };
    case WalletActions.CHANGE_SEEN_BALANCE:
      return {
        ...state,
        hideBalance: !state.hideBalance,
      };
    case WalletActions.BUY_OFFER_NOW:
      if (!state?.costumer) return state;
      const { offer, balance, checkout } = action.payload;
      const { history = [] } = state;
      const newHistory = {
        id: uuid.v4(),
        createdAt: new Date().toISOString(),
        offer,
        ...checkout,
      };
      return {
        ...state,
        history: [newHistory, ...history],
        costumer: {
          ...state.costumer,
          balance,
        },
      };
    default:
      return state;
  }
};
