import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationService } from './config';
import { MainStackNavigator } from './config/navigationConfig';

const Navigation = () => {
  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}>
      <MainStackNavigator />
    </NavigationContainer>
  );
}
export default Navigation;