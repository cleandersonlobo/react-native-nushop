import uuid from 'domain/shared/uuid';
import { Reducer } from 'react';
import { Wallet, Offer } from './types';
import { MockUser } from './__mocks__/user';

export enum WalletActions {
  REQUEST = 'WalletActions::REQUEST',
  REQUEST_SUCCESS = 'WalletActions::REQUEST_SUCCESS',
  REQUEST_FAILURE = 'WalletActions::REQUEST_FAILURE',
  CHANGE_SEEN_BALANCE = 'WalletActions::CHANGE_SEEN_BALANCE',
  // Shopping
  BUY_OFFER_NOW = 'WalletActions::BUY_OFFER_NOW',
}

export type IWalletActionsType =
  | {
      type: WalletActions.BUY_OFFER_NOW;
      payload: {
        offer: Offer;
        balance: number;
      };
    }
  | {
      type:
        | WalletActions.REQUEST
        | WalletActions.REQUEST_FAILURE
        | WalletActions.CHANGE_SEEN_BALANCE;
      payload?: unknown;
    };

export interface WalletState extends Wallet {
  isFetching: boolean;
  isError: boolean;
  error?: unknown;
  hideBalance: boolean;
}

export interface WalletProdovider {
  dispatch: React.Dispatch<IWalletActionsType>;
  onPressBuy: (offer: Offer) => null | { status: string };
  toggleSeenBalance: () => void;
}

export type IWalletState = WalletState & WalletProdovider;

export const initialWalletState = {
  isFetching: false,
  isError: false,
  hideBalance: false,
  user: MockUser,
};

export const walletReducer: Reducer<WalletState, IWalletActionsType> = (
  state = initialWalletState,
  action: IWalletActionsType,
) => {
  switch (action.type) {
    case WalletActions.REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case WalletActions.REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
      };
    case WalletActions.CHANGE_SEEN_BALANCE:
      return {
        ...state,
        hideBalance: !state.hideBalance,
      };
    case WalletActions.BUY_OFFER_NOW:
      if (!state?.user) return state;
      const { offer, balance } = action.payload;
      const { history = [] } = state;
      const newHistory = {
        id: uuid.v4(),
        createdAt: new Date().toISOString(),
        offer,
      };
      return {
        ...state,
        history: [newHistory, ...history],
        user: {
          ...state.user,
          balance,
        },
      };
    default:
      return state;
  }
};
