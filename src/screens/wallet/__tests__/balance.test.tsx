import React from 'react';
import { render } from '@testing-library/react-native';
import { WalletTestIDs } from 'screens/wallet/types';
import { LocaleService } from 'domain/locale/locale.service';
import BalanceHeader from '../components/balance';

describe('WalletScreen -> BalanceHeader', () => {
  it('should render correctly when whitout balance', async () => {
    const balance = 0;
    const { queryByTestId, findByText } = render(
      <BalanceHeader balance={balance} />,
    );
    expect(await queryByTestId(WalletTestIDs.BalanceContainer)).toBeTruthy();
    const price = LocaleService.formatePrice({ price: balance });
    expect(await findByText(price)).toBeTruthy();
  });

  it('should render correctly with balance', async () => {
    const balance = 1000;
    const { queryByTestId, findByText } = render(
      <BalanceHeader balance={balance} />,
    );
    expect(await queryByTestId(WalletTestIDs.Balance)).toBeTruthy();
    const price = LocaleService.formatePrice({ price: balance });
    expect(await findByText(price)).toBeTruthy();
  });

  it('should not show available balance', async () => {
    const balance = 1000;
    const { queryByTestId } = render(
      <BalanceHeader balance={balance} hideBalance />,
    );
    expect(await queryByTestId(WalletTestIDs.Balance)).toBeFalsy();
  });
});
