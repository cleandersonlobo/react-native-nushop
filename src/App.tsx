import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import FlashMessage from 'react-native-flash-message';
import AppNavigation from 'navigation/app-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WalletProdovider } from 'domain/wallet/wallet.provider';

export const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <WalletProdovider>
          <AppNavigation />
        </WalletProdovider>
      </NavigationContainer>
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
};

export default App;
