import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Location from 'expo-location';

import {Provider as StoreProvider} from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNav from './src/components/AppNav';

import { loadCurrentLocation } from './src/actions';
import store from './src/store/configureStore';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#000000',
    // accent: '#ffffff',
  },
};

const defaultLocation = {
  latitude: 37,
  longitude: -122,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
}

export default function App() {
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        store.dispatch(loadCurrentLocation(defaultLocation));
      }

      let location = await Location.getCurrentPositionAsync({})
      .then((location)=>
        store.dispatch(loadCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          })
        ))
      .catch((error)=>
        store.dispatch(loadCurrentLocation(defaultLocation))
      );
    })();
  });

  return (
    <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <AppNav />
        </PaperProvider>
      </StoreProvider>
  );
}

const styles = StyleSheet.create({
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  }
});
