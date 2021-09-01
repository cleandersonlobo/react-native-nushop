import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ShopScreenRoutes } from 'screens/shop/routes';
import ProductScreen from 'screens/shop/product';
import MainNavigation from './main-tabs-navigation';
import { RootRoutes } from './routes';
import { defaultScreenOtions, transitionSpec } from './shared/screen-options';

const MainStack = createStackNavigator();

const AppNavigation = () => {
  return (
    <MainStack.Navigator
      initialRouteName={RootRoutes.AppStack}
      screenOptions={{ headerShown: false, transitionSpec }}>
      <MainStack.Screen name={RootRoutes.AppStack} component={MainNavigation} />
      <MainStack.Screen
        name={ShopScreenRoutes.Product}
        component={ProductScreen}
        options={{
          ...defaultScreenOtions,
          headerShown: true,
          headerTitle: '',
        }}
      />
    </MainStack.Navigator>
  );
};

export default AppNavigation;
