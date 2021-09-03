import React from 'react';
import { render } from '@testing-library/react-native';
import { WalletTestIDs } from 'screens/wallet/types';
import { MockWalletHistory } from 'domain/wallet/__mocks__/history';
import WalletHistoryList from '../components/wallet-history';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

describe('WalletScreen -> WalletHistory', () => {
  it('should RENDER the wallet history empty', async () => {
    const { queryByTestId, queryAllByTestId } = render(<WalletHistoryList />);
    expect(await queryByTestId(WalletTestIDs.WalletHistoryEmpty)).toBeTruthy();
    expect(
      await queryAllByTestId(WalletTestIDs.WalletHistoryItem),
    ).toHaveLength(0);
  });

  it('should SHOW the error component when an API error occurs', async () => {
    const { queryByTestId } = render(<WalletHistoryList error />);
    expect(await queryByTestId(WalletTestIDs.WalletHistoryEmpty)).toBeFalsy();
    expect(await queryByTestId(WalletTestIDs.WalletError)).toBeTruthy();
  });

  it(`should render the history wallet with ${MockWalletHistory.length} items correctly`, async () => {
    const { queryByTestId, queryAllByTestId } = render(
      <WalletHistoryList history={MockWalletHistory} />,
    );
    expect(await queryByTestId(WalletTestIDs.WalletHistoryEmpty)).toBeFalsy();
    expect(
      await queryAllByTestId(WalletTestIDs.WalletHistoryItem),
    ).toHaveLength(MockWalletHistory.length);
  });
});
