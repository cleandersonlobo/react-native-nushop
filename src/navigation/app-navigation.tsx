import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductScreen from 'screens/product-details';
import { ProductDetailsRoutes } from 'screens/product-details/routes';
import { HistoryDetailsRoute } from 'screens/history-details/routes';
import MainNavigation from './main-tabs-navigation';
import { RootRoutes } from './routes';
import { defaultScreenOtions, transitionSpec } from './shared/screen-options';
import HistoryDetailsScreen from '../screens/history-details/index';

const MainStack = createStackNavigator();

const AppNavigation = () => {
  return (
    <MainStack.Navigator
      initialRouteName={RootRoutes.AppStack}
      screenOptions={{ headerShown: false, transitionSpec }}>
      <MainStack.Screen name={RootRoutes.AppStack} component={MainNavigation} />
      <MainStack.Screen
        name={ProductDetailsRoutes.Home}
        component={ProductScreen}
        options={{
          ...defaultScreenOtions,
          headerShown: true,
          headerTitle: '',
        }}
      />
      <MainStack.Group screenOptions={{ presentation: 'modal' }}>
        <MainStack.Screen
          name={HistoryDetailsRoute}
          component={HistoryDetailsScreen}
          options={{
            ...defaultScreenOtions,
            headerShown: false,
          }}
        />
      </MainStack.Group>
    </MainStack.Navigator>
  );
};

export default AppNavigation;
