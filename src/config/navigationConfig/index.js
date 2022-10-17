import React from 'react';
import {
  createNativeStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/native-stack';
import {AuthStack} from './AuthStack';
import {HomeStack} from './HomeStack';

export const MainStackNavigator = () => {
  const MainStackNavigator = createNativeStackNavigator();
  const AppStacks = [...AuthStack, ...HomeStack];

  return (
    <MainStackNavigator.Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        headerShown: false,
      }}>
      {AppStacks.map(stack => (
        <MainStackNavigator.Screen {...stack} />
      ))}
    </MainStackNavigator.Navigator>
  );
};
