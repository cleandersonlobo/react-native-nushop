import { cleanup } from '@testing-library/react-hooks';
import { renderHookWithApollo } from 'domain/shared/utils/tests-utils';
import { waitFor } from '@testing-library/react-native';
import { useWallet } from '../wallet.context';

import { MockViewerAPI, MockUser } from '../__mocks__/user';
import { WalletQueries } from '../wallet.service';

describe('Wallet -> useWallet', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });
  it('renders hook without error', async () => {
    const mocks = [
      {
        request: {
          query: WalletQueries.viewer,
          variables: {},
        },
        result: {
          data: null,
        },
      },
    ];
    const { hook } = renderHookWithApollo(useWallet, mocks);

    await waitFor(() => {
      expect(hook.current.loading).toBeFalsy();
    });
  });

  it('render hook with customer data', async () => {
    const mocks = [
      {
        request: {
          query: WalletQueries.viewer,
          variables: {},
        },
        result: {
          data: MockViewerAPI,
        },
      },
    ];
    const { hook } = renderHookWithApollo(useWallet, mocks);

    await waitFor(() => {
      expect(hook.current.loading).toBeFalsy();
    });
    expect(hook.current.costumer).toEqual(MockUser);
  });
});
