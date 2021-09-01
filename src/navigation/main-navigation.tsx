import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopNavigation from 'screens/shop';
import { ShopScreenRoutes } from 'screens/shop/routes';
import { WalletRoutes } from 'screens/wallet/routes';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import { AppColors } from 'core/colors';
import { StatusBar } from 'react-native';
import WalletScreen from '../screens/wallet';

const MainTabs = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <MainTabs.Navigator
      initialRouteName={WalletRoutes.Home}
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
        },
      }}>
      <MainTabs.Screen
        name={WalletRoutes.Home}
        component={WalletScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Wallet',
          tabBarInactiveTintColor: AppColors.gray,
          tabBarActiveTintColor: AppColors.secondary,
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name="wallet" size={size} color={color} />
          ),
        }}
        listeners={{
          focus: () => {
            StatusBar.setBarStyle('light-content');
          },
        }}
      />
      <MainTabs.Screen
        name={ShopScreenRoutes.Home}
        component={ShopNavigation}
        options={{
          headerShown: false,
          tabBarLabel: 'Shop',
          tabBarInactiveTintColor: AppColors.gray,
          tabBarActiveTintColor: AppColors.secondary,
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" size={size} color={color} />
          ),
        }}
        listeners={{
          focus: () => {
            StatusBar.setBarStyle('dark-content');
          },
        }}
      />
    </MainTabs.Navigator>
  );
};

export default MainNavigation;
