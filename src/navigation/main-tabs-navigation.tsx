import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { AppColors } from 'core/colors';
import { StatusBar } from 'react-native';
import { ShopRoutes } from 'screens/shop/routes';
import { WalletRoutes } from 'screens/wallet/routes';
import ShopHomeScreen from 'screens/shop';
import WalletScreen from 'screens/wallet';

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
          tabBarLabel: 'Carteira',
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
        name={ShopRoutes.Home}
        component={ShopHomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Ofertas',
          tabBarInactiveTintColor: AppColors.gray,
          tabBarActiveTintColor: AppColors.secondary,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-offer" size={size} color={color} />
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
