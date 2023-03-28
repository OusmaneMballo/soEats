import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailRestaurant from './components/detailRestaurant/detailRestaurant';
import CarteRestaurant from './components/commande/carteRestaurant';
import MenuComponent from './components/menu/menu';

import OrderPage from './components/orderPage/orderPage'
import OrderFormPage from './components/orderPage/customer/orderFormPage'
import Restaurants from './components/restaurants/restaurants';
import Product from './components/product/product';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
     <NavigationContainer
     >
      <Stack.Navigator initialRouteName="Restaurants" screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen
          name="Restaurants"
          component={Restaurants}
        />
        <Stack.Screen
          name="DetailRestaurant"
          component={DetailRestaurant}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="order"
          component={CarteRestaurant}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="OrderPage"
          component={OrderPage}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="OrderFormPage"
          component={OrderFormPage}
        />
         <Stack.Screen
          name="Menu"
          component={MenuComponent}
        />
        <Stack.Screen
          name="ProductDetail"
          component={Product}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

