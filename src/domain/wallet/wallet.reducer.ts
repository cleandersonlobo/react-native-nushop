import { Reducer } from 'react';
import { Wallet } from './types';
import { MockWalletHistory } from './__mocks__/history';
import { MockUser } from './__mocks__/user';

export enum WalletActions {
  REQUEST = 'WalletActions::REQUEST',
  REQUEST_SUCCESS = 'WalletActions::REQUEST_SUCCESS',
  REQUEST_FAILURE = 'WalletActions::REQUEST_FAILURE',
}

export interface IWalletActionsType {
  type:
    | WalletActions.REQUEST
    | WalletActions.REQUEST_SUCCESS
    | WalletActions.REQUEST_FAILURE;
  payload?: unknown;
}

export interface WalletState extends Wallet {
  isFetching: boolean;
  isError: boolean;
  error?: unknown;
}

export interface WalletProdovider {
  dispatch: React.Dispatch<IWalletActionsType>;
}

export type IWalletState = WalletState & WalletProdovider;

export const initialWalletState = {
  isFetching: false,
  isError: false,
  user: MockUser,
  history: MockWalletHistory,
};

export const walletReducer: Reducer<WalletState, IWalletActionsType> = (
  state = initialWalletState,
  action = { payload: {} } as IWalletActionsType,
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
    default:
      return state;
  }
};
