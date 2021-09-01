import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { ShopScreenRoutes } from './routes';
import ShopHomeScreen from './screens/home';
import ProductScreen from './screens/product';

const Stack = createStackNavigator();
const ShopNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ShopScreenRoutes.Home}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ShopScreenRoutes.Home} component={ShopHomeScreen} />
      <Stack.Screen name={ShopScreenRoutes.Product} component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default ShopNavigation;
