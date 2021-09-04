import React from 'react';
import { customRender } from 'domain/shared/utils/tests-utils';
import ProductScreen from 'screens/product-details';
import { TransactionMessages } from 'domain/checkout/checkout.interface';
import { CheckoutMutations } from 'domain/checkout/checkout.service';
import { MocksPurshase } from 'domain/checkout/__mocks__/purchase';
import { act, cleanup, fireEvent } from '@testing-library/react-native';
import { WalletQueries } from 'domain/wallet/wallet.service';
import { MockViewerAPI } from 'domain/wallet/__mocks__/user';
import { ProductDetailsIDs } from '../types';
import { MockOffer } from '../__mocks__/offer';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
    useRoute: () => ({
      params: {
        offer: MockOffer,
      },
    }),
  };
});

describe('ProductScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('render without error', async () => {
    const { getByTestId } = customRender(<ProductScreen />, { mocks: [] });

    expect(getByTestId(ProductDetailsIDs.Container)).toBeTruthy();
  });

  it('should render offer details without errors', async () => {
    const { getByTestId, findByText } = customRender(<ProductScreen />, {
      mocks: [],
    });

    expect(getByTestId(ProductDetailsIDs.BtnBuyNow)).toBeTruthy();
    expect(await findByText(MockOffer.product.name)).toBeTruthy();
  });

  describe('Purchase', () => {
    it.each([
      ['success', TransactionMessages.PurchaseSuccessfully],
      ['insufficientFunds', TransactionMessages.InsufficientFunds],
      ['offerExpired', TransactionMessages.OfferExpired],
      ['youDoNotHaveMoney', TransactionMessages.YouDontHaveMuchMoney],
    ])(
      'should complete a purchase when the type "%s" is made correctly with the alert message "%s"',
      async (type, message) => {
        // AQUI
        const mocks = [
          {
            request: {
              query: WalletQueries.viewer,
              variables: {},
            },
            result: {
              data: {
                viewer: {
                  ...MockViewerAPI.viewer,
                  balance:
                    type === 'insufficientFunds'
                      ? 0
                      : MockViewerAPI.viewer.balance,
                },
              },
            },
          },
          {
            request: {
              query: CheckoutMutations.purchase,
              variables: { offerId: MockOffer.id },
            },
            result: {
              data: MocksPurshase[type],
            },
          },
        ];

        const { getByTestId, findByText } = customRender(<ProductScreen />, {
          mocks,
        });
        // costumer request
        await new Promise(resolve => setTimeout(resolve, 0)); // wait for response

        expect(getByTestId(ProductDetailsIDs.BtnBuyNow)).toBeTruthy();

        await act(async () => {
          fireEvent.press(getByTestId(ProductDetailsIDs.BtnBuyNow));
        });

        expect(getByTestId(ProductDetailsIDs.TransactionModal)).toBeTruthy();

        expect(await findByText(message)).toBeTruthy();
      },
    );
  });
});
