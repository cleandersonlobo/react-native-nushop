import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import client from 'domain/shared/apollo';
import FlashMessage from 'react-native-flash-message';
import AppNavigation from 'navigation/app-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WalletProvider } from 'domain/wallet/wallet.provider';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <WalletProvider>
            <AppNavigation />
          </WalletProvider>
        </NavigationContainer>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

export default App;
