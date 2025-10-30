import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Stack } from 'expo-router';
import store, { persistor } from '../src/store/configureStore';
import Header from '../src/common/ui/components/Header';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="search-results" />
          <Stack.Screen name="hotel-details" />
          <Stack.Screen name="booking-confirmation" />
          <Stack.Screen name="my-bookings" />
          <Stack.Screen name="booking-details" />
        </Stack>
      </PersistGate>
    </Provider>
  );
};

export default RootLayout;