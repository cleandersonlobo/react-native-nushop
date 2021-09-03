/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing';
import { WalletProvider } from 'domain/wallet/wallet.provider';

export const renderHookApollo = <T extends () => any>(
  hookMethod: T,
  mocks: any,
) => {
  return renderHook(() => hookMethod(), {
    wrapper: ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    ),
  });
};

export const customRender = (ui: any, { mocks }: any) =>
  render(ui, {
    wrapper: ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <WalletProvider>{children}</WalletProvider>
      </MockedProvider>
    ),
  });

export const renderHookWithApollo = <T extends () => any>(
  hookMethod: T,
  mocks: any,
) => {
  const hook: { current: ReturnType<T> } = {
    current: {} as ReturnType<T>,
  };

  const Component: React.FC = () => {
    hook.current = hookMethod();
    return null;
  };

  const instance = customRender(<Component />, { mocks });

  return {
    ...instance,
    hook,
  };
};
