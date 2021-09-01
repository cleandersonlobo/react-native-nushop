import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  defaultScreenOtions,
  transitionSpec,
} from 'navigation/shared/screen-options';
import { ShopScreenRoutes } from './routes';
import ShopHomeScreen from './screens/home';
import ProductScreen from './screens/product';

const Stack = createStackNavigator();
const ShopNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={ShopScreenRoutes.Home}
      screenOptions={{ headerShown: false, transitionSpec }}>
      <Stack.Screen name={ShopScreenRoutes.Home} component={ShopHomeScreen} />
      <Stack.Screen
        name={ShopScreenRoutes.Product}
        component={ProductScreen}
        options={{
          ...defaultScreenOtions,
          headerShown: true,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigation;
