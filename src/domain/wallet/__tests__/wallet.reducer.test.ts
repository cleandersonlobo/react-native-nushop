/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook, act } from '@testing-library/react-hooks';
import { useReducer } from 'react';
import { MockViewerAPI, MockUser } from 'domain/wallet/__mocks__/user';
import {
  initialWalletState,
  WalletActions,
  walletReducer,
} from '../wallet.reducer';
import { MockWalletOffer } from '../__mocks__/history';

describe('Wallet -> useReducer', () => {
  it('should renders without errors', () => {
    const { result } = renderHook(() =>
      useReducer(walletReducer, initialWalletState),
    );

    expect(result.current).toBeTruthy();
  });
  describe('Wallet Actions', () => {
    it(`should set costumer when dispatching the action ${WalletActions.SET_COSTUMER}`, async () => {
      const { result } = renderHook(() =>
        useReducer(walletReducer, { ...initialWalletState }),
      );
      const [_, dispatch] = result.current;

      await act(async () => {
        dispatch({
          type: WalletActions.SET_COSTUMER,
          payload: {
            customer: MockViewerAPI.viewer,
          },
        });
      });

      const { offers, ...costumer } = MockViewerAPI.viewer;
      const [state] = result.current;

      expect(state).toEqual({
        ...initialWalletState,
        costumer,
        offers,
      });
    });

    it(`should not show the balance when dispatching the action ${WalletActions.CHANGE_SEEN_BALANCE}`, async () => {
      const { result } = renderHook(() =>
        useReducer(walletReducer, { ...initialWalletState }),
      );
      const [_, dispatch] = result.current;

      await act(async () => {
        dispatch({
          type: WalletActions.CHANGE_SEEN_BALANCE,
          payload: {},
        });
      });

      const [state] = result.current;

      expect(state).toEqual({
        hideBalance: true,
      });
    });

    it(`should spend the customer's balance when dispatching the action ${WalletActions.BUY_OFFER_NOW}`, async () => {
      const { result } = renderHook(() =>
        useReducer(walletReducer, {
          ...initialWalletState,
          costumer: MockUser,
        }),
      );
      const [_, dispatch] = result.current;

      await act(async () => {
        dispatch({
          type: WalletActions.BUY_OFFER_NOW,
          payload: {
            balance: 200,
            checkout: {
              quantity: 1,
              total: 200,
            },
            offer: MockWalletOffer,
          },
        });
      });

      const [state] = result.current;

      expect(state).toMatchObject({
        ...initialWalletState,
        costumer: {
          ...MockUser,
          balance: 200,
        },
      });
    });
  });
});
